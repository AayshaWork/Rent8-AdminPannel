const Property = require("../models/Property");

// CREATE PROPERTY (Normal User ke liye - app/website se ad daalne ke liye)
exports.createProperty = async (req, res) => {
  try {
    // Jab user ad daalega, uska default status schema se apne aap "pending" set ho jayega
    const property = await Property.create(req.body);

    res.json({ 
      success: true, 
      message: "Property submitted for review", 
      data: property 
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET LIVE PROPERTIES (Public Feed - App/Website par dikhane ke liye)
exports.getLiveProperties = async (req, res) => {
  try {
    // Normal users ko sirf wahi properties dikhengi jo Admin ne approve ("live") kar di hain
    const properties = await Property.find({ status: "live" })
      .populate("owner_id", "name phone") // Owner ka naam aur number dikhane ke liye
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: properties.length,
      data: properties,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.createAdController = async (req, res) => {
  try {
    // 1. Text data extract kar
    const {
      title,
      facilities,
      rent,
      deposit,
      address,
      brokerage,
      map_location_url,
      contact_preference,
    } = req.body;

    // req.user.id auth middleware se aayega, warna tu req.body.user_id bhi use kar sakta hai
    const userId = req.user.id || req.body.user_id;

    // 2. Photos Handle Kar
    let uploadedPhotoUrls = [];
    
    // Agar frontend ne photos bheji hain (req.files array hota hai multiple upload mein)
    if (req.files && req.files.length > 0) {
      // Har file ko parallel mein upload karne ke liye Promise.all use karte hain
      const uploadPromises = req.files.map((file) => {
        return uploadFile(file.buffer, file.originalname, "properties");
      });
      
      // Sabke URLs ek array mein aa jayenge
      uploadedPhotoUrls = await Promise.all(uploadPromises);
    }

    // 3. Unique ad_id generate kar (e.g., prop_9988)
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const generatedAdId = `prop_${randomNum}`;

    // 4. Database mein save kar
    const newAd = await PropertyAd.create({
      user_id: userId,
      ad_id: generatedAdId,
      title,
      facilities,
      rent: Number(rent),       // Frontend string bhej sakta hai, DB ko Number chahiye
      deposit: Number(deposit),
      address,
      brokerage,
      map_location_url,
      photos: uploadedPhotoUrls, // URLs ka array yahan save hoga
      contact_preference,
      ad_status: "pending_approval", // Admin approve karega tab live hoga
    });

    // 5. Ekdum wahi format return kar jo developer ne PDF mein manga hai
    res.json({
      status: "success",
      message: "Property ad posted successfully!",
      data: {
        property_id: newAd.ad_id,
        live_url: `${process.env.FRONTEND_BASE_URL}/ad/${newAd.ad_id}`, // Agar web version hai toh
      },
    });

  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// Get Properties List (Home Feed & Search)
exports.getPropertiesController = async (req, res) => {
  try {
    const { city, search_query, page = 1, limit = 10 } = req.body; // PDF me POST likha hai body ke sath
    
    // Pagination logic
    const skip = (page - 1) * limit;

    // Filter Query banayenge
    let query = {
      status: "live" // Home feed pe sirf live ads dikhne chahiye
    };

    // Agar user ne kuch search kiya hai (e.g., "1BHK")
    if (search_query) {
      query.title = { $regex: search_query, $options: "i" }; // "i" matlab case-insensitive
    }

    // Agar city bheji hai toh address mein city search karenge
    if (city) {
      query.full_address = { $regex: city, $options: "i" };
    }

    // Database se properties fetch karo
    const properties = await PropertyAd.find(query)
      .sort({ createdAt: -1 }) // Naye ads pehle
      .skip(skip)
      .limit(Number(limit));

    // Total results for pagination
    const totalResults = await PropertyAd.countDocuments(query);

    // Frontend wale format me data map karo
    const formattedProperties = properties.map((ad) => {
      return {
        ad_id: ad.ad_id,
        title: ad.title,
        price: `₹ ${ad.rent}/mo`, 
        location: ad.full_address,
        image_url: ad.images && ad.images.length > 0 ? ad.images[0] : "", // Pehli image
        is_favorite: false // Future wishlist feature ke liye
      };
    });

    res.json({
      status: "success",
      message: "Properties fetched successfully",
      data: {
        total_results: totalResults,
        properties: formattedProperties
      }
    });

  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// Get Property Details (Specific Ad Info)
exports.getPropertyDetailsController = async (req, res) => {
  try {
    // PDF me likha hai GET (ya GET with query params), toh req.query se lenge
    const { ad_id } = req.query; 

    if (!ad_id) {
      return res.status(400).json({ status: "error", message: "ad_id is required" });
    }

    // Ad find karo aur 'owner_id' ko populate karo taaki owner ka data mil jaye
    const ad = await PropertyAd.findOne({ ad_id: ad_id }).populate("owner_id", "unique_r8_id phone");

    if (!ad) {
      return res.status(404).json({ status: "error", message: "Property not found" });
    }

    // Date ko format karna ("28 Apr 2023" jaise doc me manga hai)
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = ad.createdAt.toLocaleDateString('en-IN', options);

    // Document ke exact format me map karo
    res.json({
      status: "success",
      data: {
        ad_id: ad.ad_id,
        title: ad.title,
        posted_date: formattedDate,
        monthly_rent: ad.rent,
        security_deposit: ad.deposit,
        is_brokerage: ad.brokerage,
        facilities: ad.facilities.join(", "), // Array ko wapas comma-separated string bana diya
        detailed_address: ad.full_address,
        map_location_url: ad.map_location_url || "",
        images: ad.images,
        
        // Owner Details
        owner_details: {
          rent8_id: ad.owner_id ? ad.owner_id.unique_r8_id : "Unknown",
          // Agar contact_preference sirf app_id wali ho toh null bhej sakte ho, par abhi simple rakhte hain
          contact_number: ad.owner_id ? ad.owner_id.phone : null 
        }
      }
    });

  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};