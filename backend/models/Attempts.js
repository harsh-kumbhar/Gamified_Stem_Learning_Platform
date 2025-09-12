import mongoose from "mongoose";

const attemptSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
    answers: [
      {
        questionId: { type: mongoose.Schema.Types.ObjectId, required: true },
        selectedOption: { type: Number, required: true },
        isCorrect: { type: Boolean, default: false },
        marks: { type: Number, default: 0 },
      },
    ],
    score: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Attempts = mongoose.model("Attempt", attemptSchema);
export default Attempts;
