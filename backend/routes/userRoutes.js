// File: routes/userRoutes.js

const express = require("express");
const router = express.Router();
const multer = require("multer");
const { updateProfileController } = require("../controllers/userController");
const { auth } = require("../middleware/authMiddleware");

// 1. Controller import kar (jahan tera main logic likha hai)


// 2. Auth middleware import kar (jo tune pehle banaya tha)
// Taaki bina login wale log profile update na kar sakein


// 3. Multer setup (Memory Storage)
const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

// ==========================================
// ROUTES DEFINITION
// ==========================================

// Update Profile Route: 
// Pehle 'auth' check karega -> Phir 'multer' file read karega -> Phir 'controller' chalega
router.post(
  "/update_profile", 
auth,                              // 👈 Security ke liye auth lagana mat bhoolna
  upload.single("profile_image"),       // 👈 Form-data mein field ka naam "profile_image" hona chahiye

updateProfileController
);

// Baki ke module 1 wale routes bhi yahan aa sakte hain:
// router.post("/send_otp", sendOtpController);
// router.post("/verify_otp", verifyOtpController);
// router.get("/get_profile", auth, getProfileController);

module.exports = router;