const User = require("../models/User");
const { uploadFile } = require("../utils/uploadService");

exports.updateProfileController = async (req, res) => {
  try {
    // 🛡️ Security: user_id hum body se nahi lenge, auth middleware (token) se nikalenge
    const userId = req.user.id; 
    const { name } = req.body;
    
    // User ko database mein dhoondo
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }

    // 1. 🚀 SIRF Naam Update karo (Unique ID ko bilkul NAHI chhedna hai)
    if (name && name.trim() !== "") {
      user.name = name.trim();
      // ❌ Yahan se naya ID generate karne wala code hata diya gaya hai!
    }

    // 2. 📸 Profile Photo Upload (Agar file aayi hai toh)
    if (req.file) {
      // Helper function ko buffer bhej rahe hain
      const profileImageUrl = await uploadFile(
        req.file.buffer, 
        req.file.originalname, 
        "users"
      );
      user.profile_image_url = profileImageUrl;
    }

    // 3. Database mein save kar do
    await user.save();

    // 4. Response do (Ab naya ID nahi ban raha, toh hum wahi same ID wapas bhejenge)
    res.json({
      status: "success",
      message: "Profile updated successfully",
      data: {
        name: user.name,
        unique_r8_id: user.unique_r8_id, // 👈 Purani (Asli) wali ID hi wapas jayegi
        profile_image_url: user.profile_image_url || null
      }
    });

  } catch (err) {
    console.error("Profile Update Error: ", err);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};