const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  profile_pic: String,
  role: { type: String, enum: ["user", "owner"], default: "user" },
  isPremium: { type: Boolean, default: false },
  fcm_token: String
});

module.exports = mongoose.model("User", userSchema);