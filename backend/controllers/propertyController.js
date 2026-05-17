const Property = require('../models/Property');
const Payment = require('../models/Payment');

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
      title, facilities, rent, deposit, address, 
      brokerage, map_location_url, 
      contact_preference, // 👈 Ab yeh simple string aayega
      lat, lng,
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
      photoUrls = req.files.map(file => `http://10.245.248.242:5000/uploads/properties/${file.filename}`);
    }

    const newProperty = new Property({
      owner_id: userId,
      ad_id: propertyId,
      title: title,
      facilities: [facilities],
      rent: Number(rent),
      deposit: Number(deposit),
      full_address: address,
      brokerage: brokerage,
      map_location_url: map_location_url,
      location: { 
        type: "Point", 
        coordinates: [Number(lng), Number(lat)] 
      }, 
      images: photoUrls,
      contact_preference: finalContactPreference, // 👈 Seedha Schema wala Enum value jayega
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

// 2️⃣ SUBMIT PAYMENT PROOF API
exports.submitPaymentProof = async (req, res) => {
// ... same as before
}