const User = require("../models/User");
const bcrypt = require("bcryptjs");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateToken");
const Property = require("../models/Property");
const Settings = require("../models/Settings");
const Report = require("../models/Report");

// ==========================================
// 🔴 LOGIN (ADMIN)
// ==========================================
exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    // SECURITY: Only allow users with 'admin' or 'owner' roles
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
  console.log("FULL ERROR:", err);
  console.log("RESPONSE:", err.response?.data);

  alert(err.response?.data?.message || err.message);
}
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    
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
    const totalUsers = await User.countDocuments({ role: "user" });

    // Dummy data for now
    const statsData = {
      revenue: 145000,       
      activeAds: 1240,       
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
    const { id } = req.params; 
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (user.role === "admin" || user.role === "owner") {
      return res.status(403).json({ success: false, message: "Cannot block an Admin" });
    }

    user.status = user.status === "BLOCKED" ? "ACTIVE" : "BLOCKED";
    await user.save(); 

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

// ==========================================
// 🏠 PROPERTIES MANAGEMENT
// ==========================================

exports.getProperties = async (req, res) => {
  try {
    const { status } = req.query;
    const query = status ? { status } : {};

    const properties = await Property.find(query)
      .populate("owner_id", "name email phone")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: properties.length,
      data: properties,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🚀 NAYA APPROVE AD FUNCTION (With Expiry Logic)
// exports.approveAd = async (req, res) => {
//   try {
//       // Postman ya frontend se ad_id aur plan_type aayega
//       const { ad_id, plan_type } = req.body; 

//       // TESTING LOGIC: Standard = 2 min, Double = 4 min
//       let durationInMinutes = plan_type === 'Standard' ? 2 : 4; 
      
//       const expiryDate = new Date();
//       expiryDate.setMinutes(expiryDate.getMinutes() + durationInMinutes); 

//       // Asli logic (Future me isey use karna):
//       // let days = plan_type === 'Standard' ? 8 : 16;
//       // expiryDate.setDate(expiryDate.getDate() + days);

//       const property = await Property.findOneAndUpdate(
//           { ad_id: ad_id }, 
//           { 
//               status: 'live', 
//               expiry_at: expiryDate 
//           },
//           { new: true } 
//       );

//       if (!property) {
//           return res.status(404).json({ success: false, message: "Property not found" });
//       }

//       res.json({
//           success: true,
//           message: `Property successfully approved! It is now LIVE and will expire in ${durationInMinutes} minutes.`,
//           data: property
//       });
//   } catch (err) {
//       res.status(500).json({ success: false, message: err.message });
//   }
// };

// 🚀 NAYA APPROVE AD FUNCTION (Testing Expiry ke sath)
exports.approveAd = async (req, res) => {
  try {
      // 🚀 URL se Property ki asli _id aayegi
      const { id } = req.params; 
      // const { plan_type } = req.body; // Agar future me bhejta hai toh

      // 🚀 TESTING LOGIC: Hum sidha 2 minute wala time set kar rahe hain
      const expiryDate = new Date();
      expiryDate.setMinutes(expiryDate.getMinutes() + 2); // Sirf 2 minute baad expire

      // ad_id ki jagah seedha _id (MongoDB id) se find aur update kar rahe hain
      const property = await Property.findByIdAndUpdate(
          id, 
          { 
              status: 'live', 
              expiry_at: expiryDate 
          },
          { new: true } 
      );

      if (!property) {
          return res.status(404).json({ success: false, message: "Property not found" });
      }

      res.json({
          success: true,
          message: `Property is now LIVE! It will expire automatically in 2 minutes for testing.`,
          data: property
      });
  } catch (err) {
      res.status(500).json({ success: false, message: err.message });
  }
};




// REJECT PROPERTY (Status: pending -> rejected)
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
// ⚙️ SETTINGS MANAGEMENT
// ==========================================
exports.getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    res.json({ success: true, data: settings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    const { standardDays, standardPrice, premiumDays, premiumPrice, qrImage } = req.body;

    let settings = await Settings.findOne();

    if (!settings) {
      settings = new Settings({});
    }

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

// ==========================================
// ⚠️ REPORTS MANAGEMENT
// ==========================================
exports.getAllReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate("propertyId", "title images") 
      .populate("reportedBy", "name email")    
      .sort({ createdAt: -1 });

    res.json({ success: true, data: reports });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteReportedProperty = async (req, res) => {
  try {
    const { propertyId, reportId } = req.params;

    await Property.findByIdAndDelete(propertyId);
    await Report.findByIdAndUpdate(reportId, { status: "resolved" });

    res.json({ success: true, message: "Property removed and report resolved" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.ignoreReport = async (req, res) => {
  try {
    const { id } = req.params;
    await Report.findByIdAndUpdate(id, { status: "ignored" });
    res.json({ success: true, message: "Report ignored" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};