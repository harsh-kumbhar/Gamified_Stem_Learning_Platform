import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";   // Import DB connection
import userRoutes from "./routes/userRoutes.js";

// Load environment variables
dotenv.config();

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // for parsing application/json

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend is running 🚀" });
});

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Gamified STEM Learning Platform Backend 🚀");
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});



app.use("/api/users", userRoutes);
