const Property = require("../models/Property");

exports.createProperty = async (req, res) => {
  try {
    const property = await Property.create(req.body);

    res.json({ message: "Property added", property });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// GET ALL
exports.getAllProperties = async (req, res) => {
  const data = await Property.find().populate("owner_id");
  res.json(data);
};

exports.getProperties = async (req, res) => {
  const { status } = req.query;

  const query = status ? { status } : {};

  const properties = await Property.find(query);

  res.json({
    success: true,
    data: properties,
  });
};

exports.approveProperty = async (req, res) => {
  await Property.findByIdAndUpdate(req.params.id, {
    status: "approved",
  });

  res.json({
    success: true,
    message: "Property approved",
  });
};

exports.rejectProperty = async (req, res) => {
  const { reason } = req.body;

  await Property.findByIdAndUpdate(req.params.id, {
    status: "rejected",
    rejectReason: reason,
  });

  res.json({
    success: true,
    message: "Property rejected",
  });
};