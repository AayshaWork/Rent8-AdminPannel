const User = require("../models/User");

// register
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.create({ name, email, password });

    res.json({ message: "User registered", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login success", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};