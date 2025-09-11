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
export const getQuizzes = async (req, res) => {
  try {
    const { courseId } = req.params;

    const query = courseId ? { courseId } : {};
    const quizzes = await Quiz.find(query)
      .populate("courseId", "title grade")
      .populate("createdBy", "name email role");

    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching quizzes", error: err.message });
  }
};
