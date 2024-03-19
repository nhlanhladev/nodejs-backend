const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const TOKEN_SECRET_KEY = "nhlanhla123";
const { sendResetPasswordEmail } = require("../utils/email");

const crypto = require("crypto");

const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { username, email, password, phone } = req.body;
  if (!username || !email || !password || !phone) {
    res
      .status(400)
      .json({ message: "Username and password and email are required" });
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(404).json("User already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("password hashed is:", hashedPassword);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    phone,
  });
  console.log("created successfully", user);
  res.status(200).json(user);
};

//login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const userAvailable = await User.findOne({ email });
  if (
    userAvailable &&
    (await bcrypt.compare(password, userAvailable.password))
  ) {
    const token = await jwt.sign(
      {
        userAvailable: {
          username: userAvailable.username,
          email: userAvailable.email,
          id: userAvailable.id,
        },
      },
      TOKEN_SECRET_KEY,
      { expiresIn: "1m" }
    );
    jwt.verify(token, TOKEN_SECRET_KEY, (error, decode) => {
      if (error) {
        res.status(400).json({ message: "failed to verify token" });
      }
      res.status(200).json({ message: " token is verified", token });
    });
  } else {
    res.status(400).json({ message: "invalid email or password" });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(403).send({ message: "user not found" });
  }
  const token = await crypto.randomBytes(20).toString("hex");
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3600000;

  await user.save();
  user.sendResetPasswordEmail(user.email, token);
};

const resetPassword = async (req, res) => {
  const { token, password } = req.body;
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });
  if (!user) {
    return res.status(200).json({ message: "invalid or expired token" });
  }
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
  res.status(200).json({ message: "Password reset successfully" });
};

module.exports = { registerUser, loginUser, forgotPassword, resetPassword };
