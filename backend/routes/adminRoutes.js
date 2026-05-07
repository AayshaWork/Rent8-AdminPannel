const express = require("express");
const router = express.Router();

const { 
  adminLogin, 
  getAllUsers, 
  getDashboardStats 
} = require("../controllers/adminController");

const { auth, isAdmin } = require("../middleware/authMiddleware");


// router.post("/login", adminLogin);

// 2. Get All Users Route (Protected)
// URL banega: GET /api/admin/users
router.get("/users", auth, isAdmin, getAllUsers);

// 3. Dashboard Stats Route (Protected)
// URL banega: GET /api/admin/dashboard-stats
router.get("/dashboard-stats", auth, isAdmin, getDashboardStats);

// console.log("--- DEBUGGING IMPORTS ---");
// console.log("auth is:", typeof auth);
// console.log("isAdmin is:", typeof isAdmin);
// console.log("adminLogin is:", typeof adminLogin);
// console.log("getAllUsers is:", typeof getAllUsers);
// console.log("getDashboardStats is:", typeof getDashboardStats);
// console.log("-------------------------");

// 1. Admin Login Route
router.post("/admin/login", adminLogin);
module.exports = router;