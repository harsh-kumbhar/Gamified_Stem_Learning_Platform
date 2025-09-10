import mongoose from "mongoose";

// Sub-schema for questions
const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: { type: [String], required: true }, // array of options
  correctAnswer: { type: Number, required: true }, // index of correct option
  marks: { type: Number, default: 1 } // ✅ new field (default 1)
});

const quizSchema = new mongoose.Schema(
  {
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    // ✅ optional title
    title: { type: String },

    // ✅ now using sub-schema, ensures consistency
    questions: { type: [questionSchema], required: true },

    // ✅ calculated automatically
    totalMarks: { type: Number, default: 0 }
  },
  { timestamps: true }
);

// Pre-save hook → auto calculate totalMarks
quizSchema.pre("save", function (next) {
  if (this.questions && this.questions.length > 0) {
    this.totalMarks = this.questions.reduce(
      (sum, q) => sum + (q.marks || 0),
      0
    );
  } else {
    this.totalMarks = 0;
  }
  next();
});

const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;
