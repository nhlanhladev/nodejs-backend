const express = require("express");
const router = express.Router();
const Task = require("../model/taskModel");
const {
  getAllTasks,
  getTask,
  addTask,
  updateTask,
  deleteTask,
} = require("../controller/taskController");

//get all for tasks
router.get("/", getAllTasks);
router.get("/:id", getTask);
router.post("/add", addTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
