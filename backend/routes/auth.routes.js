const express = require("express");

const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../controllers/auth.controller");
const { protect } = require("../middlewares/auth.middleware");

const router = express.Router();

// Auth Routes

router.post("/register", registerUser); // Register a new user
router.post("/login", loginUser); // Login a user
router.get("/profile", protect, getUserProfile); // Get user profile (protected route)

module.exports = router;
