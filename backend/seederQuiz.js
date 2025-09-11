import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Course from "./models/Course.js"
import Quiz  from "./models/Quiz.js";
dotenv.config();

const seedQuizzes = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // ✅ Get a course and teacher (must exist first)
    const course = await Course.findOne();
    const teacher = await User.findOne({ role: "teacher" });

    if (!course || !teacher) {
      console.log("⚠️ Need at least 1 course and 1 teacher to seed quizzes.");
      process.exit(1);
    }

    const quizzes = [
      {
        title: "Algebra Quiz",
        courseId: course._id,
        teacherId: teacher._id,
        questions: [
          {
            questionText: "What is 2 + 2?",
            options: ["3", "4", "5", "6"],
            correctAnswer: 1,
            marks: 2,
          },
          {
            questionText: "Solve: x + 3 = 5, find x.",
            options: ["1", "2", "3", "5"],
            correctAnswer: 1,
            marks: 3,
          },
        ],
      },
    ];

    await Quiz.insertMany(quizzes);
    console.log("✅ Quizzes seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding quizzes:", err);
    process.exit(1);
  }
};

seedQuizzes();
