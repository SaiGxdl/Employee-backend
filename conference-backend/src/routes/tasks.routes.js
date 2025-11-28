// src/routes/tasks.routes.js
import express from "express";
import { createTask, listTasks, getTask, updateTask, deleteTask } from "../controllers/task.controller.js";
import { createTaskSchema, updateTaskSchema } from "../validators/task.validator.js";
import validate from "../utils/validate.js";

const router = express.Router();

router.post("/", validate(createTaskSchema), createTask);
router.get("/", listTasks);
router.get("/:id", getTask);
router.put("/:id", validate(updateTaskSchema), updateTask);
router.delete("/:id", deleteTask);

export default router;
