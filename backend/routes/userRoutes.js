import express from "express";
import { registerUser, loginUser, getProfile } from "../controllers/userController.js";
import { protect, authorizeRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile", protect, getProfile);

router.get("/teacher-dashboard", protect, authorizeRole("teacher"), (req, res) => {
  res.json({ message: "Welcome Teacher Dashboard" });
});

router.get("/student-dashboard", protect, authorizeRole("student"), (req, res) => {
  res.json({ message: "Welcome Student Dashboard" });
});

export default router;
