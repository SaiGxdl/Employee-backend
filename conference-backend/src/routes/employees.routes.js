// src/routes/employees.routes.js
import express from "express";
import { createEmployee, listEmployees, getEmployee, updateEmployee, deleteEmployee } from "../controllers/employee.controller.js";
import { createEmployeeSchema, updateEmployeeSchema } from "../validators/employee.validator.js";
import validate from "../utils/validate.js";

const router = express.Router();

router.post("/", validate(createEmployeeSchema), createEmployee);
router.get("/", listEmployees);
router.get("/:id", getEmployee);
router.put("/:id", validate(updateEmployeeSchema), updateEmployee);
router.delete("/:id", deleteEmployee);

export default router;
