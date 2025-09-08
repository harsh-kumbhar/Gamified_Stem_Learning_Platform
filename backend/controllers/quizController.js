import Quiz from "../models/Quiz.js";

// Create quiz (teacher only)
export const createQuiz = async (req, res) => {
  try {
    const { courseId, questions } = req.body;
    const quiz = await Quiz.create({
      courseId,
      teacherId: req.user._id,
      questions,
    });
    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ message: "Error creating quiz", error: error.message });
  }
};

// Get quizzes by courseId
export const getQuizzesByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const quizzes = await Quiz.find({ courseId });
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching quizzes", error: error.message });
  }
};
