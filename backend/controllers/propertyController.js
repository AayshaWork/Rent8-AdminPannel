const Property = require('../models/Property');
const Payment = require('../models/Payment');
const mongoose = require("mongoose");

function getDistanceFromPune(lat, lng) {
  const PUNE_LAT = 18.5204; 
  const PUNE_LNG = 73.8567; 
  
  const R = 6371; 
  const dLat = (Number(lat) - PUNE_LAT) * (Math.PI / 180);
  const dLon = (Number(lng) - PUNE_LNG) * (Math.PI / 180);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(PUNE_LAT * (Math.PI / 180)) * Math.cos(Number(lat) * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2); 
    
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
  const distance = R * c; 
  
  return distance;
}

// 1️⃣ CREATE PROPERTY AD API
exports.createPropertyAd = async (req, res) => {

  try {
    const { 
      title, facilities, rent, deposit, full_address, 
      brokerage, map_location_url, 
      contact_preference, // 👈 Ab yeh simple string aayega
      lat, lng,short_location,
      alternate_number 
    } = req.body;

    if (!lat || !lng) {
      return res.status(400).json({ status: "error", message: "Location coordinates (lat, lng) are required." });
    }

    const distance_from_center = getDistanceFromPune(lat, lng);
    
    if (distance_from_center > 40) {
      return res.status(400).json({ 
        status: "error", 
        message: "Oops! We are currently accepting properties only within Pune (40 KM radius).",
        distance_km: Math.round(distance_from_center) 
      });
    }

    // 🚀 FIX: Validation for Schema Enum
    // Agar Flutter se kuch gadbad aayi, toh hum default "both" set kar denge taaki app crash na ho
    const validPreferences = ["phone", "app_id", "both"];
    const finalContactPreference = validPreferences.includes(contact_preference) 
                                   ? contact_preference 
                                   : "both";

    const userId = req.user.id; 
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const propertyId = `prop_${randomNum}`;

    let photoUrls = [];
    if (req.files && req.files.length > 0) {
      photoUrls = req.files.map(file => `http://172.18.29.242:5000/uploads/properties/${file.filename}`);
    }

    const newProperty = new Property({
      owner_id: userId,
      ad_id: propertyId,
      title: title,
      facilities: [facilities],
      rent: Number(rent),
      deposit: Number(deposit),
      full_address: full_address,
      brokerage: brokerage,
      map_location_url: map_location_url,
      location: { 
        type: "Point", 
        coordinates: [Number(lng), Number(lat)] 
      }, 
      lat: req.body.lat, // 👈 Ye dono line honi chahiye
    lng: req.body.lng,
      images: photoUrls,
      contact_preference: finalContactPreference, 
      short_location: short_location || "Location not available",
      // 👈 Seedha Schema wala Enum value jayega
      alternate_number: alternate_number || null 
    });

    await newProperty.save();

    res.status(201).json({
      status: "success",
      message: "Property ad posted successfully!",
      data: newProperty 
    });

  } catch (error) {
    console.error("Create Ad Error:", error);
    res.status(500).json({ 
      status: "error", 
      message: "Server error while posting ad",
      asli_error: error.message 
    });
  }
};


// ==========================================
// ✏️ EDIT / UPDATE AD
// ==========================================
  exports.updateAd = async (req, res) => {
    try {
        const { ad_id } = req.body;
        const userId = req.user.id;

        if (!ad_id) {
            return res.status(400).json({ success: false, message: "ad_id is required" });
        }

        // 🚀 Smart Query (Flutter aur Postman dono ke liye)
        let query = { owner_id: userId };
        if (mongoose.Types.ObjectId.isValid(ad_id)) {
            query._id = ad_id;
        } else {
            query.ad_id = ad_id;
        }

        const property = await Property.findOne(query);

        if (!property) {
            return res.status(404).json({ success: false, message: "Ad not found or unauthorized to edit." });
        }

        // 🔄 Dynamic Update: Jo field body me aayegi, sirf wahi update hogi
        const updates = req.body;
        delete updates.ad_id; // ID ko update nahi karna hai

        // 📸 FOTO UPDATE LOGIC: Agar nayi photos aayi hain toh unhe process karo
        if (req.files && req.files.length > 0) {
            const newImageUrls = req.files.map(file => {
                return `${req.protocol}://${req.get("host")}/uploads/properties/${file.filename}`;
            });
            
            // Note: Agar tera database 1 se zyada photos support karta hai (Array hai), 
            // toh ye exact line chalegi:
            updates.image = newImageUrls; 
            
            // (Agar DB me sirf 1 image ki jagah hai, toh isko aise likhna: updates.image = newImageUrls[0]; )
        }

        Object.keys(updates).forEach((key) => {
            property[key] = updates[key];
        });

        // 🛡️ SECURITY FEATURE: Agar Live ya Rejected ad ko edit kiya, 
        // toh usko wapas 'pending_approval' (Admin Review) me bhej do
        if (property.status === 'live' || property.status === 'rejected') {
            property.status = 'pending_approval';
        }

        await property.save();

        return res.status(200).json({ 
            success: true, 
            message: "Ad updated successfully. Sent for review if it was live.", 
            data: property 
        });

    } catch (error) {
        console.error("🔴 EDIT API CRASH ERROR:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// propertyController.js file mein yeh naya function add kar

exports.getNearbyProperties = async (req, res) => {
  try {
    const lat = parseFloat(req.query.lat);
    const lng = parseFloat(req.query.lng);

    if (!lat || !lng) {
      return res.status(400).json({ success: false, message: "Latitude aur Longitude zaroori hai!" });
    }

    const maxDistanceInMeters = 15000; // 15 KM

    // 🚀 FIX: Yahan variable ka naam 'nearbyAds' rakha hai
    const nearbyAds = await Property.find({
      status: 'live',
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [lng, lat] // [longitude, latitude]
          },
          $maxDistance: maxDistanceInMeters
        }
      }
    })
    .select("title rent short_location images ad_id")
    .limit(50);

    // 🚀 FIX: Ab yahan bhi 'nearbyAds' hi use ho raha hai, toh crash nahi hoga!
    const formattedData = nearbyAds.map(ad => ({
      id: ad._id,
      ad_id: ad.ad_id,
      title: ad.title,
      price: `₹${ad.rent}/mo`,
      location: ad.short_location,
      image: ad.images && ad.images.length > 0 ? ad.images[0] : ""
    }));

    res.status(200).json({
      success: true,
      count: formattedData.length,
      data: formattedData
    });

  } catch (error) {
    console.error("Home Screen API Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 2️⃣ SUBMIT PAYMENT PROOF API
exports.submitPaymentProof = async (req, res) => {
// ... same as before
}