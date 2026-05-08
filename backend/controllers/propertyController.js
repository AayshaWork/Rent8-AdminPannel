const Property = require("../models/Property");

// CREATE PROPERTY (Normal User ke liye - app/website se ad daalne ke liye)
exports.createProperty = async (req, res) => {
  try {
    // Jab user ad daalega, uska default status schema se apne aap "pending" set ho jayega
    const property = await Property.create(req.body);

    res.json({ 
      success: true, 
      message: "Property submitted for review", 
      data: property 
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET LIVE PROPERTIES (Public Feed - App/Website par dikhane ke liye)
exports.getLiveProperties = async (req, res) => {
  try {
    // Normal users ko sirf wahi properties dikhengi jo Admin ne approve ("live") kar di hain
    const properties = await Property.find({ status: "live" })
      .populate("owner_id", "name phone") // Owner ka naam aur number dikhane ke liye
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: properties.length,
      data: properties,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};