const { uploadFile } = require("../utils/uploadService");


exports.updateProfileController = async (req, res) => {
  try {
    const { user_id, name } = req.body;
    let profileImageUrl = null;

    // Agar frontend ne file bheji hai
    if (req.file) {
      // ✅ Magic yahan hai! Hum helper function ko buffer bhej rahe hain
      profileImageUrl = await uploadFile(
        req.file.buffer, 
        req.file.originalname, 
        "users" // folder ka naam
      );
    }

    // Ab profileImageUrl ko DB mein save kar de
    // user.profile_image_url = profileImageUrl;
    // await user.save();

    res.json({
      status: "success",
      data: {
        profile_image_url: profileImageUrl
      }
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};