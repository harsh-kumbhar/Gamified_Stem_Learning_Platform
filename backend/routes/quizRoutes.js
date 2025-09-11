import express from "express";
import Quiz from "../models/Quiz.js";

const router = express.Router();

// Get quizzes by courseId
router.get("/:courseId", async (req, res) => {
  try {
    const quizzes = await Quiz.find({ courseId: req.params.courseId });
    res.json(quizzes);
  } catch (err) {
    console.error("Error fetching quizzes:", err);
    res.status(500).json({ message: "Server error while fetching quizzes" });
  }
});

export default router;
