import express from "express";
import { registerUser, loginUser, getProfile } from "../controllers/userController.js";
import { protect, authorizeRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected
router.get("/profile", protect, getProfile);

// Example: Teacher-only route
router.get("/teacher-dashboard", protect, authorizeRole("teacher"), (req, res) => {
  res.json({ message: "Welcome Teacher Dashboard" });
});

// Example: Student-only route
router.get("/student-dashboard", protect, authorizeRole("student"), (req, res) => {
  res.json({ message: "Welcome Student Dashboard" });
});



export default router;
