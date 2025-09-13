import express from "express";
import Quiz from "../models/Quiz.js";
import { createQuiz, getQuizzes, getQuizById, submitAttempt } from "../controllers/quizController.js";
import { protect, authorizeRole } from "../middleware/authMiddleware.js";
const router = express.Router();

// ✅ Get quizzes by courseId
router.get("/course/:courseId", async (req, res) => {
  try {
    const quizzes = await Quiz.find({ courseId: req.params.courseId });
    res.json(quizzes);
  } catch (err) {
    console.error("❌ Error fetching quizzes by course:", err);
    res.status(500).json({ message: "Server error while fetching quizzes" });
  }
});

// ✅ Get quiz by quizId
router.get("/:quizId", async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.json(quiz);
  } catch (err) {
    console.error("❌ Error fetching quiz by ID:", err);
    res.status(500).json({ message: "Server error while fetching quiz" });
  }
});


// After other routes
router.post("/:quizId/attempt", submitAttempt);
router.post("/", protect, authorizeRole("teacher"), createQuiz);
router.get("/", getQuizzes);
router.get("/course/:courseId", getQuizzes);
router.get("/:quizId", getQuizById);
router.post("/:quizId/attempt", submitAttempt);
export default router;
