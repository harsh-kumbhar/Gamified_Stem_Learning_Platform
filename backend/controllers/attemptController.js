import Attempt from "../models/Attempts.js";
import Quiz from "../models/Quiz.js";

// ✅ Start an attempt (just creates an empty attempt record if needed)
export const startAttempt = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { studentId } = req.body;

    // check if quiz exists
    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    // check if student already has an attempt for this quiz
    let attempt = await Attempt.findOne({ studentId, quizId });
    if (!attempt) {
      attempt = await Attempt.create({
        studentId,
        quizId,
        answers: [],
        score: 0,
        totalMarks: quiz.totalMarks,
      });
    }

    res.json({ message: "Attempt started", attempt });
  } catch (err) {
    console.error("❌ Error starting attempt:", err);
    res.status(500).json({ message: "Error starting attempt", error: err.message });
  }
};

// ✅ Submit attempt (calculate score + save)
export const submitAttempt = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { studentId, answers } = req.body; 
    // answers = [{ questionId, selectedOption }]

    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    let score = 0;
    let totalMarks = 0;

    const details = quiz.questions.map((q) => {
      const submittedAns = answers.find(
        (a) => String(a.questionId) === String(q._id)
      );
      const marks = q.marks || 1;
      totalMarks += marks;

      const isCorrect = submittedAns && submittedAns.selectedOption === q.correctAnswer;
      if (isCorrect) score += marks;

      return {
        questionId: q._id,
        questionText: q.questionText,
        options: q.options,
        yourAnswerIndex: submittedAns ? submittedAns.selectedOption : null,
        correctAnswerIndex: q.correctAnswer,
        marks,
        obtained: isCorrect ? marks : 0,
      };
    });

    // save attempt (update if exists)
    let attempt = await Attempt.findOneAndUpdate(
      { studentId, quizId },
      { studentId, quizId, answers, score, totalMarks },
      { new: true, upsert: true }
    );

    res.json({
      message: "Attempt submitted successfully",
      score,
      totalMarks,
      percent: ((score / totalMarks) * 100).toFixed(2),
      details,
      attempt,
    });
  } catch (err) {
    console.error("❌ Error submitting attempt:", err);
    res.status(500).json({ message: "Error submitting attempt", error: err.message });
  }
};

// ✅ Get all attempts by student
export const getAttemptsByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const attempts = await Attempt.find({ studentId })
      .populate("quizId", "title totalMarks")
      .sort({ createdAt: -1 });

    res.json(attempts);
  } catch (err) {
    console.error("❌ Error fetching attempts by student:", err);
    res.status(500).json({ message: "Error fetching attempts", error: err.message });
  }
};

// ✅ Get one attempt by ID (for result page)
export const getAttemptById = async (req, res) => {
  try {
    const attempt = await Attempt.findById(req.params.attemptId)
      .populate("quizId", "title totalMarks")
      .populate("studentId", "name email");

    if (!attempt) return res.status(404).json({ message: "Attempt not found" });

    res.json(attempt);
  } catch (err) {
    console.error("❌ Error fetching attempt by ID:", err);
    res.status(500).json({ message: "Error fetching attempt", error: err.message });
  }
};
