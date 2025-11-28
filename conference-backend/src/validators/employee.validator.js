// src/validators/employee.validator.js
import Joi from "joi";

export const createEmployeeSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  role: Joi.string().min(2).max(80).required(),
  department: Joi.string().allow("").optional()
});

export const updateEmployeeSchema = Joi.object({
  name: Joi.string().min(2).max(100).optional(),
  email: Joi.string().email().optional(),
  role: Joi.string().min(2).max(80).optional(),
  department: Joi.string().allow("").optional()
});
