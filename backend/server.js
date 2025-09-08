// backend/server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config(); // loads variables from .env

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/api/health", (req, res) => {
  res.json({ status: "Backend is running 🚀" });
});

// Start server

app.get("/", (req, res) => {
    res.send("Welcome to the Gamified STEM Learning Platform Backend 🚀");
  });
  
