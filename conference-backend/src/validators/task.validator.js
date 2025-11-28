// src/validators/task.validator.js
import Joi from "joi";
import mongoose from "mongoose";

const objectId = Joi.string().custom((value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) return helpers.error("any.invalid");
  return value;
}, "ObjectId validation");

export const createTaskSchema = Joi.object({
  title: Joi.string().min(2).max(200).required(),
  description: Joi.string().allow("").optional(),
  status: Joi.string().valid("pending","in-progress","done").optional(),
  assignedTo: objectId.optional(),
  dueDate: Joi.date().iso().optional()
});

export const updateTaskSchema = Joi.object({
  title: Joi.string().min(2).max(200).optional(),
  description: Joi.string().allow("").optional(),
  status: Joi.string().valid("pending","in-progress","done").optional(),
  assignedTo: objectId.optional(),
  dueDate: Joi.date().iso().optional()
});
