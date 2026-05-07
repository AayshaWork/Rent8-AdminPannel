const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  createProperty,
  getAllProperties,
} = require("../controllers/propertyController");

// 🔥 final working (no role headache for now)
router.post("/create", auth(), createProperty);
router.get("/all", auth(), getAllProperties);

module.exports = router;