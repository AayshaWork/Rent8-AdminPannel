const express = require("express");
const router = express.Router();

const {
  register,
  login,
  sendOtp,
  verifyOtp,
  logout,
} = require("../controllers/authController");
const { auth } = require("../middleware/authMiddleware");



router.post("/register", register);
router.post("/login", login);
router.post("/logout", auth, logout)
router.post("/send-otp", sendOtp);
router.post("/verify-otp",verifyOtp);

module.exports = router;