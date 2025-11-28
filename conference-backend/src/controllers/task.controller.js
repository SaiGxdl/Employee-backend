// src/controllers/task.controller.js
import Task from "../models/Task.js";

export async function createTask(req, res) {
  try {
    const t = await Task.create(req.body);
    return res.status(201).json(t);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

export async function listTasks(req, res) {
  try {
    // support query params: status, assignedTo
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.assignedTo) filter.assignedTo = req.query.assignedTo;
    const tasks = await Task.find(filter).populate("assignedTo", "name email role");
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function getTask(req, res) {
  try {
    const t = await Task.findById(req.params.id).populate("assignedTo", "name email role");
    if (!t) return res.status(404).json({ message: "Task not found" });
    res.json(t);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function updateTask(req, res) {
  try {
    const t = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate("assignedTo", "name email role");
    if (!t) return res.status(404).json({ message: "Task not found" });
    res.json(t);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function deleteTask(req, res) {
  try {
    const t = await Task.findByIdAndDelete(req.params.id);
    if (!t) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
