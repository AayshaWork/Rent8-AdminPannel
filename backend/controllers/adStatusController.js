const Property = require("../models/Property");
const mongoose = require("mongoose");


exports.cancelRequest = async (req, res) => {
    try {
        const { ad_id } = req.body;
        const userId = req.user.id;

        // Smart Query
        let query = { owner_id: userId };
        if (mongoose.Types.ObjectId.isValid(ad_id)) {
            query._id = ad_id;
        } else {
            query.ad_id = ad_id;
        }

        const property = await Property.findOne(query);

        if (!property) {
            return res.status(404).json({ success: false, message: "Ad not found" });
        }

        // 👇 Wapas property.status kar diya hai
        if (property.status === 'pending_approval' || property.status === 'pending_payment') {
            
            property.status = 'cancelled'; 
            await property.save();

            return res.status(200).json({ 
                success: true, 
                message: "Request cancelled. Ad moved to Expired tab." 
            });
        } else {
            return res.status(400).json({ 
                success: false, 
                message: `Cannot cancel an ad. Current status is: ${property.status}` 
            });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


exports.reactivateAd = async (req, res) => {
    try {
        const { ad_id } = req.body;
        const userId = req.user.id;

        let query = { owner_id: userId };
        if (mongoose.Types.ObjectId.isValid(ad_id)) {
            query._id = ad_id;
        } else {
            query.ad_id = ad_id;
        }

        const property = await Property.findOne(query);

        if (!property) {
            return res.status(404).json({ success: false, message: "Ad not found" });
        }

        // 👇 Wapas property.status kar diya hai
        if (property.status === 'expired' || property.status === 'deactivated' || property.status === 'cancelled') {
            
            property.status = 'pending_approval'; 
            await property.save();

            return res.status(200).json({ 
                success: true, 
                message: "Ad sent for Admin approval. Moved to Pending tab." 
            });
        } else {
            return res.status(400).json({ 
                success: false, 
                message: `Only expired, deactivated or cancelled ads can be reactivated. Current status is: ${property.status}` 
            });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deactivateAd = async (req, res) => {
    try {
        const { ad_id } = req.body;
        const userId = req.user.id;

 
let query = { owner_id: userId };
        if (mongoose.Types.ObjectId.isValid(ad_id)) {
            query._id = ad_id; // Flutter ke liye (24-char Mongo ID)
        } else {
            query.ad_id = ad_id; // Postman ke liye (prop_xxx ID)
        }

        const property = await Property.findOne(query);
        if (!property) {
            return res.status(404).json({ success: false, message: "Ad not found" });
        }

        if (property.status === 'live') {
            property.status = 'deactivated'; // Ya expired
            property.expiry_at = null; // Expiry hata di kyunki ad ab live nahi hai
            await property.save();

            return res.status(200).json({ 
                success: true, 
                message: "Ad deactivated successfully. Moved to Expired tab." 
            });
        } else {
            return res.status(400).json({ 
                success: false, 
                message: "Only live ads can be deactivated." 
            });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


exports.deleteAd = async (req, res) => {
    try {
       const { ad_id } = req.body;
        const userId = req.user.id;

        let query = { owner_id: userId };
        if (mongoose.Types.ObjectId.isValid(ad_id)) {
            query._id = ad_id; 
        } else {
            query.ad_id = ad_id; 
        }

        const property = await Property.findOneAndDelete(query); 

        if (!property) {
            return res.status(404).json({ success: false, message: "Ad not found or access denied." });
        }

        return res.status(200).json({ success: true, message: "Ad deleted permanently." });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};