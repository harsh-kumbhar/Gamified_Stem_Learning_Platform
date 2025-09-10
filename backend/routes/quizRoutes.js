import express from "express";
import { createQuiz, getQuizzes } from "../controllers/quizController.js";
import { protect, authorizeRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// Teacher only
router.post("/", protect, authorizeRole("teacher"), createQuiz);

// Public
router.get("/", getQuizzes);

// Get quizzes by courseId
router.get("/:courseId", getQuizzes);

export default router;
