const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    // Kis property ko report kiya gaya
    propertyId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Property", 
      required: true 
    },
    // Kis user ne report kiya
    reportedBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    // Report ka reason (e.g., Fake Images, Wrong Price)
    reason: { 
      type: String, 
      required: true 
    },
    // Extra details jo user likhna chahe
    description: { 
      type: String 
    },
    // Report ka status (Admin ne dekha ya nahi)
    status: { 
      type: String, 
      enum: ["pending", "resolved", "ignored"], 
      default: "pending" 
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);