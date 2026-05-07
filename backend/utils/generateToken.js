const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  return jwt.sign(
    // ✅ Convert _id to string to prevent object-type bugs
    { id: user._id.toString(), role: user.role }, 
    process.env.JWT_ACCESS_SECRET,
    // 💡 Suggestion: Keep this short (e.g., 15m - 1h) for production security
    { expiresIn: "15m" } 
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id.toString() },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );
};

module.exports = { generateAccessToken, generateRefreshToken };