const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    ad_id: { 
      type: String,
      unique: true,
      required: true
    },
    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    title: { 
      type: String, 
      required: true,
      trim: true 
    },
    facilities: [String], 
    rent: { 
      type: Number, 
      required: true 
    },
    deposit: { 
      type: Number, 
      required: true 
    },
    full_address: { 
      type: String, 
      required: true 
    },
    map_location_url: { 
      type: String 
    },
    location: {
      type: {
        type: String,
        enum: ['Point'], 
       
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: false 
      }
    },
    brokerage: { 
      type: String, // ⚠️ Update: Boolean ki jagah String ('Yes'/'No') kar diya tere form ke hisaab se
      default: "No" 
    },
    alternate_number: {
    type: String, // String rakho taaki "+91" bhi save ho sake
    default: null
  },
    images: [String], 
    contact_preference: { 
      type: String,
      enum: ["phone", "app_id", "both"],
      default: "both"
    },
    status: {
      type: String,
      // 🚀 NAYA: "pending_payment" add kiya list mein aur default banaya
      enum: ["pending_payment", "pending_approval", "live", "rejected", "deactivated", "expired"],
      default: "pending_payment" 
    }, 
    reject_reason: { 
      type: String,
      default: null
    }
  },
  { timestamps: true } 
);

propertySchema.index({ location: "2dsphere" });
module.exports = mongoose.model("Property", propertySchema);