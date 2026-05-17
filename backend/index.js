require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const os = require("os");
const path = require("path");

// 🚀 1. Apni Cron wali file ko import karo
const startExpiryCron = require('./cron/expiryCron'); 

const app = express();
const PORT = process.env.PORT || 5000;

// 2. Connect Database Firsts
connectDB();

// 3. Middlewares
app.use(express.json());
// Yeh line Express ko allow karegi ki wo 'uploads' folder ki files ko browser mein dikhaye
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
// CORS restriction (Sirf apna frontend allow karein, baaki block)
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:5173"], // React/Vite ports
  credentials: true
}));

// 4. Test Route
app.get("/", (req, res) => {
  res.send("Rent8 Backend API running 🚀");
});

// 5. Route Imports (Sab kuch single time)
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const myAdsRoutes = require('./routes/myAdsRoutes');
const adDetailsRoutes = require('./routes/adDetailsRoutes');

// 6. Mount Routes (Sabko /api ke andar daal diya)
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes); // 👉 URL banegi: http://IP:5000/api/admin/approve_ad
app.use("/api/property", propertyRoutes);
app.use("/api", userRoutes);
app.use("/api/payment", paymentRoutes);
app.use('/api/my-ads', myAdsRoutes);
app.use('/api/ad-details', adDetailsRoutes);
// 7. Global Error Handler (Hamesha sabse last mein aayega) 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong on the server!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined
  });
});

// 🚀 8. Cron Job ko start kar do (Ye background me teri expire wali file chalayega)
startExpiryCron();

// 9. Function jo khud tumhara Wi-Fi/Hotspot IP nikal lega
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return "localhost";
}

// 10. Start Server (0.0.0.0 daalna zaroori hai phone ke liye)
app.listen(PORT, "0.0.0.0", () => {
  const ip = getLocalIP();
  console.log(`✅ Server running locally on: http://localhost:${PORT}`);
  console.log(`📱 FLUTTER APP BASE URL YE DAALO: http://${ip}:${PORT}/api/`);
});