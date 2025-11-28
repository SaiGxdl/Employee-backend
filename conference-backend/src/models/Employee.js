// src/models/Employee.js
import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  role: { type: String, required: true, trim: true },
  department: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Employee", EmployeeSchema);
