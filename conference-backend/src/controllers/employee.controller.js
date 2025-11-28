// src/controllers/employee.controller.js
import Employee from "../models/Employee.js";

export async function createEmployee(req, res) {
  try {
    const emp = await Employee.create(req.body);
    return res.status(201).json(emp);
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ message: "Email already exists" });
    return res.status(500).json({ message: err.message });
  }
}

export async function listEmployees(req, res) {
  try {
    const employees = await Employee.find().sort({ name: 1 });
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function getEmployee(req, res) {
  try {
    const e = await Employee.findById(req.params.id);
    if (!e) return res.status(404).json({ message: "Employee not found" });
    res.json(e);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function updateEmployee(req, res) {
  try {
    const e = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!e) return res.status(404).json({ message: "Employee not found" });
    res.json(e);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function deleteEmployee(req, res) {
  try {
    const e = await Employee.findByIdAndDelete(req.params.id);
    if (!e) return res.status(404).json({ message: "Employee not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
