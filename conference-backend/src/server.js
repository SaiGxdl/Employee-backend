// src/server.js
import express from "express";
import cors from "cors";
// import helmet from "helmet"; // ⛔ remove Helmet for now
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

import { connectDB } from "./config/db.js";
import employeesRoutes from "./routes/employees.routes.js";
import tasksRoutes from "./routes/tasks.routes.js";

// __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// 🔐 security & middleware (without CSP)
app.use(cors());
app.use(express.json({ limit: "10kb" }));
app.use(morgan("tiny"));

// 🔹 Serve index.html and other static files from project root
// (__dirname = src, so "../" = project root where index.html lives)
app.use(express.static(path.join(__dirname, "../")));

// health
app.get("/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// routes
app.use("/api/employees", employeesRoutes);
app.use("/api/tasks", tasksRoutes);

// basic error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();
