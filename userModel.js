const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "please enter your username"],
    },
    email: {
      type: String,
      required: [true, "please enter your email address"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "please enter your email address"],
    },
    phone: {
      type: Number,
      required: [true, "please enter your number "],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", userSchema);
