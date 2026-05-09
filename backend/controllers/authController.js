
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateToken");
const User = require("../models/User");


exports.register = async (req, res) => {
  try {
    // Frontend se hum adminSecret bhi receive karenge (optional)
    const { name, email, password, adminSecret } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // 🛡️ SECURITY LOGIC: Role assign karne ka secure tarika
    let assignedRole = "user"; // Default role hamesha user rahega

    // Agar request mein aayi secret key hamari environment file ki key se match karti hai
    if (adminSecret && adminSecret === process.env.ADMIN_SECRET_KEY) {
      assignedRole = "admin";
    }

    const user = await User.create({
      name,
      email,
      password,
      role: assignedRole, // Dynamic role assign hoga
    });

    res.json({
      success: true,
      message: `${assignedRole.toUpperCase()} registered successfully`,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
// LOGIN (USER)
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || user.role !== "user") {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // FIXED: Using the helper method you defined in your User schema
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    res.json({
      success: true,
      data: {
        accessToken,
        refreshToken,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken)
      return res.status(401).json({ msg: "No refresh token" });

    const user = await User.findOne({ refreshToken });
    if (!user) return res.status(403).json({ msg: "Invalid refresh token" });

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const newAccessToken = generateAccessToken(user);

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(403).json({ msg: "Token expired" });
  }
};



exports.logout = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.refreshToken = null;
    await user.save();

    res.json({ msg: "Logged out" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.sendOtp = async (req, res) => {
  // console.log("hello"); 

  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({
        success: false,
        message: "Phone is required",
      });
    }

    const otp = "1234";
    const expiry = new Date(Date.now() + 5 * 60 * 1000);

    let user = await User.findOne({ phone });

    if (!user) {
      user = await User.create({ phone, otp, otpExpiry: expiry });
    } else {
      user.otp = otp;
      user.otpExpiry = expiry;
      await user.save();
    }

    res.json({
      success: true,
      message: "OTP sent successfully",
      otp: otp,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // Type-safe comparison to prevent Number vs String bugs
    if (String(user.otp) !== String(otp) || user.otpExpiry < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    // Clear OTP after successful use
    user.otp = null;
    user.otpExpiry = null;

    // Ensure role exists safely
    if (!user.role) {
        user.role = "user";
    }

// (Upar ka tera code same rahega...)

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    // Check if name is missing to determine if it's a new user
    const isNewUser = user.name ? false : true;

    res.json({
      success: true,
      data: {
        id: user._id,         
        name: user.name,     
        email: user.email,   
        phone: user.phone,             
        profile_pic: user.profile_pic, 
        isPremium: user.isPremium,     
        accessToken,
        refreshToken,
        role: user.role,
        is_new_user: isNewUser,        
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


//  1. GET MY PROFILE (Koi bhi logged-in user apna profile dekh sakta hai)
exports.getMyProfile = async (req, res) => {
  try {
    // req.user.id hume hamare 'auth' middleware se mil raha hai!
    const user = await User.findById(req.user.id).select("-password -refreshToken -otp");
    
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};