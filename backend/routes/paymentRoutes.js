const express = require('express');
const router = express.Router();
const multer = require('multer');

// 1. IMPORTS (Ab function ka sahi naam 'auth' use kar rahe hain)
const paymentController = require('../controllers/paymentController');
const { auth } = require('../middleware/authMiddleware'); // 👈 FIX: Yahan 'auth' import kiya

// 2. MULTER SETUP
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/payments/'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// 3. MAIN ROUTE
router.post(
  '/submit_payment_proof', 
  auth, // 👈 FIX: Yahan 'auth' middleware laga diya
upload.array('screenshots', 3),
  paymentController.submitPaymentProof
);

module.exports = router;