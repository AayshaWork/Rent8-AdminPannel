const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const {
  getDashboard,
  getRevenue,
  getGrowth,
} = require("../controllers/dashboardController");

router.get("/", auth(), getDashboard);
router.get("/revenue", auth(), getRevenue);
router.get("/growth", auth(), getGrowth);

module.exports = router;