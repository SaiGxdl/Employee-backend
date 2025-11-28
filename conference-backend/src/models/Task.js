// src/models/Task.js
import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  status: { type: String, enum: ["pending","in-progress","done"], default: "pending" },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: false },
  dueDate: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Task", TaskSchema);
