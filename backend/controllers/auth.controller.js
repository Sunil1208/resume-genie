const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Generate JWT token

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

/*
    @desc    Register a new user
    @route   POST /api/auth/register
    @access  Public
*/
const registerUser = async (req, res) => {
  try {
    const { name, email, password, profileImageUrl } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Full Name is required!" });
    }
    if (!email) {
      return res.status(400).json({ message: "Email is required!" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    // Check if user already exists

    const userExists = await User.find({ email });
    if (userExists.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      profileImageUrl,
    });
    if (user) {
      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        profileImageUrl: user.profileImageUrl,
        token: generateToken(user._id),
      });
    } else {
      return res.status(400).json({ message: "Unable to register the user!" });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

/*
    @desc    Login a user
    @route   POST /api/auth/login
    @access  Public
*/
const loginUser = async (req, res) => {};

/*
    @desc    Get user profile
    @route   GET /api/auth/profile
    @access  Private (Requires JWT token)
*/
const getUserProfile = async (req, res) => {};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
};
