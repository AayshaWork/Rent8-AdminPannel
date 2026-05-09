const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const multer = require("multer");
const {
  createProperty,
  getAllProperties,
  createAdController,
  getPropertyDetailsController,
  getPropertiesController,
} = require("../controllers/propertyController");
const { uploadFile } = require("../utils/uploadService");


// Route: Dhyan de, document mein field ka naam "photos[]" hai
// "10" ka matlab max 10 photos ek sath upload ho sakti hain
router.post(
  "/create_property_ad",
  auth, 
  upload.array("photos[]", 10), 
  createAdController
);

// Home feed (Filter aur Pagination ke sath)
// Note: Isme `auth` middleware lagana teri marzi hai, agar app bina login ke home screen dikhati hai toh mat lagana.
router.post("/get_properties", getPropertiesController); 

// Specific property details
router.get("/get_property_details", getPropertyDetailsController);


// final working (no role headache for now)
router.post("/create", auth(), createProperty);
router.get("/all", auth(), getAllProperties);

module.exports = router;