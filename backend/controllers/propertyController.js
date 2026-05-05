const Property = require("../models/Property");

exports.createProperty = async (req, res) => {
  try {
    const property = await Property.create(req.body);

    res.json({ message: "Property added", property });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};