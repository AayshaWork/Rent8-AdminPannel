const jwt = require("jsonwebtoken");

// 🛡️ GUARD 1: Check if user is logged in
const auth = (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const token = header.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    req.user = decoded; // User ki info (id aur role) yahan attach ho gayi

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

// 🛡️ GUARD 2: Check if user is Admin
const isAdmin = (req, res, next) => {
  // Yeh humesha `auth` ke baad chalega, isliye req.user already check ho chuka hoga
  if (!req.user || (req.user.role !== "admin" && req.user.role !== "owner")) {
    return res.status(403).json({
      success: false,
      message: "Access Denied. Admin resources only.",
    });
  }
  
  next();
};

// ⚠️ DHYAN DEIN: Ab hume dono function export karne hain
module.exports = { auth, isAdmin };