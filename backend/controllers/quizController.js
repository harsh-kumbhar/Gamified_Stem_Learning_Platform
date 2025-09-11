import Quiz from "../models/Quiz.js";
import Course from "../models/Course.js";
import User from "../models/User.js";

// Create Quiz (Teacher only)
export const createQuiz = async (req, res) => {
  try {
    const { courseId, title, questions } = req.body;

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
      createdBy: req.user.id,
    });

    res.status(201).json({ message: "Quiz created successfully", quiz });
  } catch (err) {
    res.status(500).json({ message: "Error creating quiz", error: err.message });
  }
};

// Get quizzes (optionally by courseId)
import mongoose from "mongoose";

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
    console.error("❌ Error fetching quizzes:", err);  // <-- Add this
    res.status(500).json({ message: "Error fetching quizzes", error: err.message });
  }
};


// POST /api/quizzes/:quizId/attempt
export const attemptQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { answers } = req.body; // [{ questionIndex: 0, selectedOption: 2 }, ...]
    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    // scoring
    let score = 0;
    const details = quiz.questions.map((q, idx) => {
      const userAns = answers?.find(a => a.questionIndex === idx)?.selectedOption;
      const correct = q.correctAnswer;
      const marks = q.marks || 1;
      const obtained = (userAns === correct) ? marks : 0;
      score += obtained;
      return {
        questionIndex: idx,
        questionText: q.questionText,
        yourAnswerIndex: userAns ?? null,
        correctAnswerIndex: correct,
        marks,
        obtained
      };
    });

    res.json({ totalMarks: quiz.totalMarks, obtained: score, percent: (quiz.totalMarks ? (score/quiz.totalMarks)*100 : 0), details });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

