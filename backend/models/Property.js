const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  title: String,
  facilities: [String],
  rent: Number,
  deposit: Number,
  full_address: String,
  coordinates: {
    lat: Number,
    lng: Number
  },
  brokerage: Boolean,
  images: [String],
  owner_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  status: {
    type: String,
    enum: ["pending", "live", "rejected"],
    default: "pending"
  }
});

module.exports = mongoose.model("Property", propertySchema);