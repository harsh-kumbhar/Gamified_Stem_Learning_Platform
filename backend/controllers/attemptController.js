import Attempt from "../models/Attempts.js";
import Quiz from "../models/Quiz.js";

// ✅ Start Attempt (just register a new attempt, no answers yet)
export const startAttempt = async (req, res) => {
  try {
    const { studentId } = req.body;
    const { quizId } = req.params;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    const attempt = new Attempt({
      studentId,
      quizId,
      answers: [],
      score: 0,
    });

    await attempt.save();
    res.status(201).json(attempt);
  } catch (err) {
    console.error("❌ Error starting attempt:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Submit Attempt (calculate score)
export const submitAttempt = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { studentId, answers } = req.body;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    let score = 0;
    const evaluatedAnswers = answers.map((ans) => {
      const question = quiz.questions.id(ans.questionId);
      if (!question) return ans;

      const isCorrect = question.correctAnswer === ans.selectedOption;
      const marks = isCorrect ? question.marks : 0;
      score += marks;

      return {
        questionId: ans.questionId,
        selectedOption: ans.selectedOption,
        isCorrect,
        marks,
      };
    });

    const attempt = new Attempt({
      studentId,
      quizId,
      answers: evaluatedAnswers,
      score,
    });

    await attempt.save();
    res.status(201).json(attempt);
  } catch (err) {
    console.error("❌ Error submitting attempt:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get Attempt History (all attempts of a student)
export const getAttemptsByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const attempts = await Attempt.find({ studentId })
      .populate("quizId", "title totalMarks")
      .sort({ createdAt: -1 });

    res.json(attempts);
  } catch (err) {
    console.error("❌ Error fetching attempts:", err);
    res.status(500).json({ message: "Server error" });
  }
};
