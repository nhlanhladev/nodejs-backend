const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      required: true,
    },
    author: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);
