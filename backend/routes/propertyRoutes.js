// const express = require("express");
// const router = express.Router();
// const { auth } = require("../middleware/authMiddleware");
// const multer = require("multer");
// const fs = require("fs");

// // 🚀 FOLDER CREATE KARO AGAR NAHI BANA HAI
// const propertyDir = './public/uploads/properties';
// const paymentDir = './public/uploads/payments';
// if (!fs.existsSync(propertyDir)) fs.mkdirSync(propertyDir, { recursive: true });
// if (!fs.existsSync(paymentDir)) fs.mkdirSync(paymentDir, { recursive: true });

// // 🚀 DISK STORAGE (Taaki photo sach mein folder mein save ho aur undefined na aaye)
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     if (file.fieldname === "screenshot") {
//       cb(null, paymentDir);
//     } else {
//       cb(null, propertyDir);
//     }
//   },
//   filename: function (req, file, cb) {
//     // Unique naam generate hoga
//     cb(null, Date.now() + '-' + file.originalname.replace(/\s/g, '')); 
//   }
// });

// const upload = multer({ 
//   storage: storage,
//   limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
// });

// const {
//   createPropertyAd,
//   submitPaymentProof 
// } = require("../controllers/propertyController");

// // ==========================================
// // 🚀 APIs
// // ==========================================

// router.post(
//   "/create_property_ad",
//   auth, 
//   upload.array("photos[]", 9), 
//   createPropertyAd
// );

// router.post(
//   "/submit_payment_proof",
//   auth,
//   upload.single("screenshot"), 
//   submitPaymentProof
// );

// module.exports = router;


const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/authMiddleware");
const multer = require("multer");
const fs = require("fs");
const adStatusController = require("../controllers/adStatusController");
// File ke top par yeh line add kar de
const propertyController = require("../controllers/propertyController");
const { updateAd } = require("../controllers/propertyController"); // Tera controller path
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
console.log("🔥 CONTROLLER CHECK:", adStatusController);
router.post("/cancel", auth, adStatusController.cancelRequest);
router.post("/reactivate", auth, adStatusController.reactivateAd);
router.post("/deactivate", auth, adStatusController.deactivateAd);
router.post("/delete", auth, adStatusController.deleteAd);
router.post("/edit", auth, upload.array('photos', 9), updateAd);
router.get("/nearby", propertyController.getNearbyProperties);

console.log("Check Ad Status Controller:", adStatusController);

module.exports = router;