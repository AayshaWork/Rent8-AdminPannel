const User = require("../models/User");
const bcrypt = require("bcryptjs");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateToken");

// LOGIN (ADMIN)
exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    // 🛡️ SECURITY: Only allow users with 'admin' or 'owner' roles
    if (!user || (user.role !== "admin" && user.role !== "owner")) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Authorized personnel only.",
      });
    }

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
      message: "Admin login successful",
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

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Password hide kar diya
    
    res.json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getDashboardStats = async (req, res) => {
  try {
    // Database se total normal users count nikalna
    const totalUsers = await User.countDocuments({ role: "user" });

    // TODO: Jab Ads/Properties aur Payments model ban jayenge, tab inki real queries lagayenge:
    // const activeAds = await Ad.countDocuments({ status: "active" });
    // const pendingApprovals = await Ad.countDocuments({ status: "pending" });
    
    // Abhi ke liye dummy data bhej rahe hain frontend format match karne ke liye
    const statsData = {
      revenue: 145000,       // Dummy Revenue
      activeAds: 1240,       // Dummy Active Ads
      pending: 14,           // Dummy Pending Approvals
      reports: totalUsers,   // Asli total users count
    };

    res.json({
      success: true,
      data: statsData,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};