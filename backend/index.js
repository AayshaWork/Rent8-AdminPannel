require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Connect Database First
connectDB();

// 2. Middlewares
app.use(express.json());

// CORS restriction (Sirf apna frontend allow karein, baaki block)
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:5173"], // React/Vite ports
  credentials: true
}));

// 3. Test Route
app.get("/", (req, res) => {
  res.send("Rent8 Backend API running 🚀");
});

// 4. Route Imports
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
// const propertyRoutes = require("./routes/propertyRoutes");

// 5. Mount Routes (Sabko /api ke andar daal diya)
app.use("/api/auth", authRoutes);
app.use("/api", adminRoutes); // ✅ Ab frontend isko /api/admin/login se call karega
// app.use("/api/property", propertyRoutes);

// 6. Global Error Handler (Hamesha sabse last mein aayega)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong on the server!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined
  });
});

// 7. Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});