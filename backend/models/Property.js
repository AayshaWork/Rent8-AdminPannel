// const mongoose = require("mongoose");

// const propertySchema = new mongoose.Schema(
//   {
//     title: { 
//       type: String, 
//       required: true,
//       trim: true 
//     },
//     facilities: [String],
//     rent: { 
//       type: Number, 
//       required: true 
//     },
//     deposit: { 
//       type: Number, 
//       required: true 
//     },
//     full_address: { 
//       type: String, 
//       required: true 
//     },
    
//     location: {
//       type: {
//         type: String,
//         enum: ['Point'], 
//         default: 'Point'
//       },
//       coordinates: {
//         type: [Number], // format: [longitude, latitude]
//         required: true
//       }
//     },

//     brokerage: { 
//       type: Boolean, 
//       default: false 
//     },
//     images: [String],
//     owner_id: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true
//     },
//     status: {
//       type: String,
//       enum: ["pending", "live", "rejected"],
//       default: "pending"
//     }, 
//     rejectReason: { 
//       type: String,
//       default: null
//     }
//   },
//   { timestamps: true } 
// );

// // Geo-spatial index for faster location queries
// propertySchema.index({ location: "2dsphere" });

// module.exports = mongoose.model("Property", propertySchema);


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
        default: 'Point'
      },
      coordinates: {
        type: [Number], // format: [longitude, latitude]
        required: false // (Abhi false rakha hai, incase Google Map URL se coordinates fetch na ho payein)
      }
    },
    brokerage: { 
      type: Boolean, 
      default: false 
    },
    images: [String], 
    contact_preference: { 
     
      type: String,
      enum: ["phone", "app_id", "both"],
      default: "both"
    },
    status: {
     
      type: String,
      enum: ["pending_approval", "live", "rejected", "deactivated", "expired"],
      default: "pending_approval"
    }, 
    reject_reason: { 
    
      type: String,
      default: null
    }
  },
  { timestamps: true } 
);

// Geo-spatial index for faster location queries
propertySchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Property", propertySchema);