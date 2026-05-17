const express = require("express");
const router = express.Router();

// Controller ko import kiya
const { getAdDetails } = require("../controllers/adDetailsController");

// Route: GET /api/ad-details/:id
// (Yeh API public hogi, isliye shayad isme auth middleware ki zarurat na pade, 
// kyunki koi bhi bina login kiye Ad dekh sakta hai. Agar login zaroori hai, toh auth laga dena)
router.get("/:id", getAdDetails);

module.exports = router;