const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  forgotPassword,
  resetPassword,
} = require("../controllers/userController");

const protect = require("../middleware/authMiddleware");

// Register User
router.post("/register", registerUser);

// Login User
router.post("/login", loginUser);

// Forgot Password
router.post("/forgot-password", forgotPassword);

// Reset Password
router.post("/reset-password/:token", resetPassword);

// Get User Profile
router.get("/profile", protect, getProfile);

// Update User Profile
router.put("/profile", protect, updateProfile);

module.exports = router;