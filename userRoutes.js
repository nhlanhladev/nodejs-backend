const express = require("express");
const router = express.Router();
const User = require("../model/userModel");
const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
} = require("../controller/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
