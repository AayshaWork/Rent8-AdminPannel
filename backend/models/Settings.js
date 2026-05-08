const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
  {
    // Standard Plan
    standardDays: { type: Number, default: 8 },
    standardPrice: { type: Number, default: 200 },
    
    // Premium/Double Plan
    premiumDays: { type: Number, default: 16 },
    premiumPrice: { type: Number, default: 289 },
    
    // Payment QR Code (URL save karenge)
    qrImage: { 
      type: String, 
      default: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=rent8@upi&pn=Rent8" 
    },
    
    // Currency 
    currency: { type: String, default: "INR" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Settings", settingsSchema);