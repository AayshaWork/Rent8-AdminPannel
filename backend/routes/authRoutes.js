const express = require("express");
const router = express.Router();

const {
  register,
  login,
  sendOtp,
  verifyOtp,
  logout,
} = require("../controllers/authController");



router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout)
router.post("/send-otp", sendOtp);
router.post("/verify-otp",verifyOtp);

module.exports = router;