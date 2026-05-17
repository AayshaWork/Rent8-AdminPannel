// routes/myAdsRoutes.js
const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/authMiddleware'); 
const { getMyAds, deleteMyAd, cancelMyAd } = require('../controllers/myAdsController');

// Ab yahan URL simple rakh sakte ho
router.get('/', auth, getMyAds);
router.delete('/:id', auth, deleteMyAd);
router.put('/:id/cancel', auth, cancelMyAd);

module.exports = router;