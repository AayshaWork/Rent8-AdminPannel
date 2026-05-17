const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/authMiddleware");
const multer = require("multer");
const fs = require("fs");

// 🚀 FOLDER CREATE KARO AGAR NAHI BANA HAI
const propertyDir = './public/uploads/properties';
const paymentDir = './public/uploads/payments';
if (!fs.existsSync(propertyDir)) fs.mkdirSync(propertyDir, { recursive: true });
if (!fs.existsSync(paymentDir)) fs.mkdirSync(paymentDir, { recursive: true });

// 🚀 DISK STORAGE (Taaki photo sach mein folder mein save ho aur undefined na aaye)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "screenshot") {
      cb(null, paymentDir);
    } else {
      cb(null, propertyDir);
    }
  },
  filename: function (req, file, cb) {
    // Unique naam generate hoga
    cb(null, Date.now() + '-' + file.originalname.replace(/\s/g, '')); 
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

const {
  createPropertyAd,
  submitPaymentProof 
} = require("../controllers/propertyController");

// ==========================================
// 🚀 APIs
// ==========================================

router.post(
  "/create_property_ad",
  auth, 
  upload.array("photos[]", 9), 
  createPropertyAd
);

router.post(
  "/submit_payment_proof",
  auth,
  upload.single("screenshot"), 
  submitPaymentProof
);

module.exports = router;