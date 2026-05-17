const Property = require("../models/Property");
const mongoose = require("mongoose");

exports.getAdDetails = async (req, res) => {
    try {
        const adId = req.params.id;

        // 🚀 SMART QUERY: Check if ID is Custom (prop_3260) or MongoDB ObjectId
        let query = {};
        if (mongoose.Types.ObjectId.isValid(adId)) {
            query._id = adId;
        } else {
            query.ad_id = adId;
        }

        // 👤 POPULATE: Owner ka data laana bahut zaroori hai Chat aur dusre users ke liye!
        const ad = await Property.findOne(query).populate('owner_id', 'username name phone');

        if (!ad) {
            return res.status(404).json({ success: false, message: "Ad not found" });
        }

        // 💎 DATA FORMATTING
        
        // Chat aur Screen pe dikhane ke liye owner ka asli naam
        const ownerName = (ad.owner_id && (ad.owner_id.username || ad.owner_id.name)) || "Rent8User";
        const formattedUsername = `@${ownerName}-R8`;
        
        const formattedPhone = (ad.owner_id && ad.owner_id.phone) 
            ? `+91 ${ad.owner_id.phone}` 
            : "Not Available";

        // 📸 IMAGE BLANK ISSUE FIX: Array check proper lagaya hai
        let imageUrls = [];
        if (Array.isArray(ad.image) && ad.image.length > 0) imageUrls = ad.image;
        else if (Array.isArray(ad.images) && ad.images.length > 0) imageUrls = ad.images;
        else if (Array.isArray(ad.photos) && ad.photos.length > 0) imageUrls = ad.photos;
        else if (typeof ad.image === 'string' && ad.image !== "") imageUrls = [ad.image]; // Agar single string hui toh array me dal dega
let latitude = null;
        let longitude = null;

        if (ad.location && ad.location.coordinates && ad.location.coordinates.length === 2) {
            longitude = ad.location.coordinates[0]; // Pehla number Lng hota hai (73.8567)
            latitude = ad.location.coordinates[1];  // Dusra number Lat hota hai (18.5204)
        } else {
            // Backup agar tune direct save kiya ho kabhi
            latitude = ad.lat || (ad.location && ad.location.lat) || null;
            longitude = ad.lng || (ad.location && ad.location.lng) || null;
        }
        // 🏠 FINAL DATA RESPONSE
        const detailedData = {
            id: ad.ad_id || ad._id,
            owner_id: ad.owner_id ? ad.owner_id._id : null, 
            title: ad.title || "Property Details",
            // 👈 CHAT ME YEH ID KAAM AAYEGI!
            images: imageUrls,                              // Blank image issue fixed
            brokerage: ad.brokerage || "No",                     
            posted_on: ad.createdAt,                             
            rent: ad.rent,                                       
            deposit: ad.deposit,                                 
            facilities: ad.facilities,                           
            detailed_address: ad.full_address || ad.address,     
            map_details: {                                       
               map_url: ad.map_location_url || ad.mapLocationUrl || ad.map_url || "",
             lat: latitude,  // 👈 Ab yahan se Asli Latitude jayega
             lng: longitude
            },
            owner_username: formattedUsername,                   
            register_number: formattedPhone,                     
            alternate_number: ad.alternateNumber || "N/A"        
        };

        // Success Response
        res.status(200).json({
            success: true,
            data: detailedData
        });

    } catch (error) {
        console.error("🔴 GET AD DETAILS ERROR:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};