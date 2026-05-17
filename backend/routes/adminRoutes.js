const express = require("express");
const router = express.Router();

const { 
  adminLogin, 
  getAllUsers, 
  getDashboardStats, 
  toggleUserBlockStatus,
  getProperties,
  approveAd,
  rejectProperty,
  updateSettings,
  getSettings,
  ignoreReport,
  deleteReportedProperty,
  getAllReports
} = require("../controllers/adminController");

const { auth, isAdmin } = require("../middleware/authMiddleware");


router.post("/login", adminLogin);
router.get("/users", auth, isAdmin, getAllUsers);

router.put("/users/:id/block", auth, isAdmin, toggleUserBlockStatus);

router.get("/properties", auth, isAdmin, getProperties);
router.get("/dashboard-stats", auth, isAdmin, getDashboardStats);
// URL: GET /api/admin/settings
router.get("/settings", auth, isAdmin, getSettings);
router.put('/properties/:id/reject', auth, isAdmin, rejectProperty);
router.put('/properties/:id/approve', auth, isAdmin, approveAd);

// URL: PUT /api/admin/settings
router.put("/settings", auth, isAdmin, updateSettings);
// Reports dekhne ke liye
router.get("/reports", auth, isAdmin, getAllReports);

// Property delete karne ke liye (Action from Report)
router.delete("/reports/delete-property/:propertyId/:reportId", auth, isAdmin, deleteReportedProperty);

// Report ignore karne ke liye
router.put("/reports/ignore/:id", auth, isAdmin, ignoreReport);


module.exports = router