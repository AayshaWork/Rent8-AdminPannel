const User = require("../models/User");
const bcrypt = require("bcryptjs");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateToken");
const Property = require("../models/Property");
const Settings = require("../models/Settings");
const Report = require("../models/Report");

// LOGIN (ADMIN)
exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    //  SECURITY: Only allow users with 'admin' or 'owner' roles
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
      pending: 14,           
      reports: totalUsers,  
    };

    res.json({
      success: true,
      data: statsData,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.toggleUserBlockStatus = async (req, res) => {
  try {
    const { id } = req.params; // URL se user ki ID nikalenge
    
    // Database mein user ko find karein
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Admin khud ko ya dusre admin ko block na kar sake (Security)
    if (user.role === "admin" || user.role === "owner") {
      return res.status(403).json({ success: false, message: "Cannot block an Admin" });
    }

    // Status toggle logic (Agar pehle se BLOCKED hai toh ACTIVE karo, warna BLOCKED)
    // Note: Agar DB me pehle status nahi tha, toh usey BLOCKED set kar dega
    user.status = user.status === "BLOCKED" ? "ACTIVE" : "BLOCKED";
    
    await user.save(); // Database update karein

    res.json({
      success: true,
      message: `User successfully ${user.status === 'BLOCKED' ? 'blocked' : 'unblocked'}`,
      data: {
        id: user._id,
        status: user.status
      }
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//  GET PROPERTIES (By Status - Pending/Live/Rejected)
exports.getProperties = async (req, res) => {
  try {
    const { status } = req.query;
    const query = status ? { status } : {};

    // .populate() se owner ki details bhi aa jayengi (sirf name, email, phone)
    const properties = await Property.find(query)
      .populate("owner_id", "name email phone")
      .sort({ createdAt: -1 }); // Nayi property sabse upar

    res.json({
      success: true,
      count: properties.length,
      data: properties,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// APPROVE PROPERTY (Status: pending -> live)
exports.approveProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      { status: "live" }, // Schema ke hisaab se "live"
      { new: true }
    );

    if (!property) {
      return res.status(404).json({ success: false, message: "Property not found" });
    }

    res.json({
      success: true,
      message: "Property successfully approved and is now live!",
      data: property
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//  REJECT PROPERTY (Status: pending -> rejected)
exports.rejectProperty = async (req, res) => {
  try {
    const { reason } = req.body;

    const property = await Property.findByIdAndUpdate(
      req.params.id,
      { 
        status: "rejected", 
        rejectReason: reason || "No reason provided" 
      },
      { new: true }
    );

    if (!property) {
      return res.status(404).json({ success: false, message: "Property not found" });
    }

    res.json({
      success: true,
      message: "Property has been rejected.",
      data: property
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// ==========================================
// 🟢 GET SETTINGS (Data Frontend ko bhejna)
// ==========================================
exports.getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    
    // Agar database me koi setting nahi hai, toh ek default bana do
    if (!settings) {
      settings = await Settings.create({});
    }

    res.json({ success: true, data: settings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ==========================================
// 🔵 UPDATE SETTINGS (Frontend se naya data save karna)
// ==========================================
exports.updateSettings = async (req, res) => {
  try {
    const { standardDays, standardPrice, premiumDays, premiumPrice, qrImage } = req.body;

    let settings = await Settings.findOne();

    if (!settings) {
      settings = new Settings({});
    }

    // Naya data update kar rahe hain
    if (standardDays) settings.standardDays = standardDays;
    if (standardPrice) settings.standardPrice = standardPrice;
    if (premiumDays) settings.premiumDays = premiumDays;
    if (premiumPrice) settings.premiumPrice = premiumPrice;
    if (qrImage) settings.qrImage = qrImage;

    await settings.save();

    res.json({ success: true, message: "Settings updated successfully", data: settings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🟢 GET ALL REPORTS (Admin ke liye)
exports.getAllReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate("propertyId", "title images") // Property ki thodi details
      .populate("reportedBy", "name email")    // Reporter ki details
      .sort({ createdAt: -1 });

    res.json({ success: true, data: reports });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🔴 DELETE REPORTED PROPERTY (Ad ko remove karna)
exports.deleteReportedProperty = async (req, res) => {
  try {
    const { propertyId, reportId } = req.params;

    // 1. Property delete karein
    await Property.findByIdAndDelete(propertyId);

    // 2. Report ko 'resolved' mark karein
    await Report.findByIdAndUpdate(reportId, { status: "resolved" });

    res.json({ success: true, message: "Property removed and report resolved" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🟡 IGNORE REPORT (Agar report fake nikli)
exports.ignoreReport = async (req, res) => {
  try {
    const { id } = req.params;
    await Report.findByIdAndUpdate(id, { status: "ignored" });
    res.json({ success: true, message: "Report ignored" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};