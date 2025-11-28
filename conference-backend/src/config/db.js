// src/config/db.js
import mongoose from "mongoose";

export async function connectDB(mongoUri) {
  if (!mongoUri) throw new Error("MONGODB_URI not provided");
  mongoose.set("strictQuery", true);
  try {
    await mongoose.connect(mongoUri, {
      // options are handled by mongoose defaults in modern versions
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    throw err;
  }
}
