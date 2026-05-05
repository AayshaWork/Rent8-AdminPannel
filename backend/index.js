const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

const connectDB = require("./config/db");  // ✔️ correct

connectDB();  // ✔️ call
// routes (future)
const authRoutes = require("./routes/authRoutes");
const propertyRoutes = require ("./routes/propertyRoutes")
app.use("/api/property", propertyRoutes)
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});