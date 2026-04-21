const authService = require("../services/authService");
const generateToken = require("../utils/generateToken");

// REGISTER
const register = async (req, res) => {
  try {
    const user = await authService.registerUser(req.body);

    const token = generateToken(user._id);

    res.status(201).json({
      message: "User registered successfully",
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const user = await authService.loginUser(
      req.body.email,
      req.body.password
    );

    const token = generateToken(user._id);

    res.status(200).json({
      message: "Login successful",
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
};