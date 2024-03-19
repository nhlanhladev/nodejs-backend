const express = require("express");
const Task = require("../model/taskModel");

const getAllTasks = async (req, res) => {
  try {
    const task = await Task.find();
    res.status(200).json(task);
    console.log({ task });
  } catch (error) {
    res.status(404).json({ message: "not found", error });
  }
};

const getTask = async (req, res) => {
  try {
    const findTask = await Task.findById(req.params.id);
    if (!findTask) {
      res.status(404);
      throw new Error("Tasks not found");
    } else {
      res.status(200).json(findTask);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate(id, req.body);
    if (!task) {
      return res
        .status(404)
        .json({ message: `cannot find the task with id ${id}` });
    }
    const updatedTask = await Task.findById(id);
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(200).json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const deleteTask = await Task.findByIdAndDelete(req.params.id);
    if (deleteTask) {
      console.log("delete task");
      res.status(200).json(deleteTask);
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = { getAllTasks, getTask, updateTask, addTask, deleteTask };
