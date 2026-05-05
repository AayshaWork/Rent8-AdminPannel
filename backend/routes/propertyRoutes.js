const express = require("express");
const router = express.Router();

const { createProperty, getAllProperties } = require("../controllers/propertyController");

router.post("/create", createProperty);
router.get("/all", getAllProperties);

module.exports = router;