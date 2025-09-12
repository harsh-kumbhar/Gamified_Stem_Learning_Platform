// backend/models/Attempts.js
import mongoose from "mongoose";

const attemptSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
    answers: [
      {
        questionId: mongoose.Schema.Types.ObjectId,
        selectedOption: Number,
      },
    ],
    score: { type: Number, required: true },
    totalMarks: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Attempt", attemptSchema);
