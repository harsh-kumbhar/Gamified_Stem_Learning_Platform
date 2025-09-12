// backend/controllers/quizController.js
import mongoose from "mongoose";
import Quiz from "../models/Quiz.js";
import Course from "../models/Course.js";
import User from "../models/User.js";
import Attempt from "../models/Attempts.js";

// ✅ Create Quiz (Teacher only)
export const createQuiz = async (req, res) => {
  try {
    const { courseId, title, questions, totalMarks } = req.body;

    // Ensure teacher is valid
    const teacher = await User.findById(req.user.id);
    if (!teacher || teacher.role !== "teacher") {
      return res.status(403).json({ message: "Only teachers can create quizzes" });
    }

    // Ensure course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const quiz = await Quiz.create({
      title,
      courseId,
      questions,
      totalMarks: totalMarks || questions.reduce((sum, q) => sum + (q.marks || 1), 0),
      createdBy: req.user.id,
    });

    res.status(201).json({ message: "Quiz created successfully", quiz });
  } catch (err) {
    console.error("❌ Error creating quiz:", err);
    res.status(500).json({ message: "Error creating quiz", error: err.message });
  }
};

// ✅ Get quizzes (optionally by courseId)
export const getQuizzes = async (req, res) => {
  try {
    const { courseId } = req.params;

    let query = {};
    if (courseId) {
      if (!mongoose.Types.ObjectId.isValid(courseId)) {
        return res.status(400).json({ message: "Invalid courseId format" });
      }
      query = { courseId };
    }

    const quizzes = await Quiz.find(query)
      .populate("courseId", "title grade")
      .populate("createdBy", "name email role");

    res.json(quizzes);
  } catch (err) {
    console.error("❌ Error fetching quizzes:", err);
    res.status(500).json({ message: "Error fetching quizzes", error: err.message });
  }
};

// ✅ Get quiz by quizId
export const getQuizById = async (req, res) => {
  try {
    const { quizId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(quizId)) {
      return res.status(400).json({ message: "Invalid quizId format" });
    }

    const quiz = await Quiz.findById(quizId).populate("courseId", "title grade");
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    res.json(quiz);
  } catch (err) {
    console.error("❌ Error fetching quiz by ID:", err);
    res.status(500).json({ message: "Error fetching quiz", error: err.message });
  }
};

// ✅ Submit Quiz Attempt
export const submitAttempt = async (req, res) => {
  try {
    console.log("📩 Incoming Attempt:", req.body);

    const { quizId } = req.params;
    const { studentId, answers } = req.body;

    console.log("🆔 Quiz ID:", quizId);
    console.log("🧑 Student ID:", studentId);
    console.log("📝 Answers:", answers);

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      console.log("❌ Quiz not found in DB");
      return res.status(404).json({ message: "Quiz not found" });
    }

    // scoring
    let score = 0;
    let totalMarks = 0;

    quiz.questions.forEach((q) => {
      const submittedAns = answers.find(
        (a) => String(a.questionId) === String(q._id)
      );
      totalMarks += q.marks || 1;
      if (submittedAns && submittedAns.selectedOption === q.correctAnswer) {
        score += q.marks || 1;
      }
    });

    console.log("✅ Calculated Score:", score, "/", totalMarks);

    const attempt = await Attempt.create({
      studentId,
      quizId,
      answers,
      score,
      totalMarks,
    });

    res.json({
      message: "Attempt submitted successfully",
      score,
      totalMarks,
      percent: ((score / totalMarks) * 100).toFixed(2),
      attempt,
    });
  } catch (err) {
    console.error("❌ Error submitting attempt:", err);
    res.status(500).json({ message: "Error submitting attempt", error: err.message });
  }
};
