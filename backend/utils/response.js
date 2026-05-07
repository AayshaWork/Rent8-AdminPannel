exports.success = (res, data, message = "") => {
  res.json({ success: true, message, data });
};

exports.error = (res, message = "Error", error = {}) => {
  res.status(400).json({ success: false, message, error });
};