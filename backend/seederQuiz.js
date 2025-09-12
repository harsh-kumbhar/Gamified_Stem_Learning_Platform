// seedQuizzes.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Course from "./models/Course.js";
import Quiz from "./models/Quiz.js";

dotenv.config();

const seedQuizzes = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const courses = await Course.find();
    const teacher = await User.findOne({ role: "teacher" });

    if (!courses.length || !teacher) {
      console.log("⚠️ Need at least 1 course and 1 teacher to seed quizzes.");
      process.exit(1);
    }

    const mathCourse = courses.find(c => c.course_id === "MATH101");
    const scienceCourse = courses.find(c => c.course_id === "SCI201");

    const quizzes = [
      // --- 3 Math Quizzes ---
      {
        title: "Algebra Quiz",
        courseId: mathCourse._id,
        teacherId: teacher._id,
        questions: [
          { questionText: "What is 2 + 2?", options: ["3", "4", "5", "6"], correctAnswer: 1, marks: 2 },
          { questionText: "Solve x + 3 = 5, find x.", options: ["1", "2", "3", "5"], correctAnswer: 1, marks: 3 },
        ],
      },
      {
        title: "Geometry Quiz",
        courseId: mathCourse._id,
        teacherId: teacher._id,
        questions: [
          { questionText: "How many sides does a hexagon have?", options: ["5", "6", "7", "8"], correctAnswer: 1, marks: 2 },
          { questionText: "Sum of angles in a triangle?", options: ["180°", "90°", "360°", "270°"], correctAnswer: 0, marks: 3 },
        ],
      },
      {
        title: "Fractions Quiz",
        courseId: mathCourse._id,
        teacherId: teacher._id,
        questions: [
          { questionText: "1/2 + 1/4 = ?", options: ["3/4", "1/3", "2/4", "1/2"], correctAnswer: 0, marks: 2 },
          { questionText: "Simplify 6/9", options: ["2/3", "3/6", "1/2", "3/9"], correctAnswer: 0, marks: 3 },
        ],
      },

      // --- 4 Science Quizzes ---
      {
        title: "Physics Quiz 1",
        courseId: scienceCourse._id,
        teacherId: teacher._id,
        questions: [
          { questionText: "Unit of force?", options: ["Newton", "Joule", "Watt", "Pascal"], correctAnswer: 0, marks: 2 },
          { questionText: "Acceleration due to gravity on Earth?", options: ["9.8 m/s²", "10 m/s²", "9 m/s²", "8.9 m/s²"], correctAnswer: 0, marks: 3 },
        ],
      },
      {
        title: "Physics Quiz 2",
        courseId: scienceCourse._id,
        teacherId: teacher._id,
        questions: [
          { questionText: "Speed of light?", options: ["3x10⁸ m/s", "3x10⁶ m/s", "3x10⁷ m/s", "3x10⁵ m/s"], correctAnswer: 0, marks: 2 },
          { questionText: "Unit of energy?", options: ["Joule", "Watt", "Newton", "Pascal"], correctAnswer: 0, marks: 3 },
        ],
      },
      {
        title: "Chemistry Quiz 1",
        courseId: scienceCourse._id,
        teacherId: teacher._id,
        questions: [
          { questionText: "H₂O is the chemical formula for?", options: ["Oxygen", "Hydrogen", "Water", "Hydrogen Peroxide"], correctAnswer: 2, marks: 2 },
          { questionText: "Atomic number of Carbon?", options: ["6", "12", "8", "14"], correctAnswer: 0, marks: 3 },
        ],
      },
      {
        title: "Chemistry Quiz 2",
        courseId: scienceCourse._id,
        teacherId: teacher._id,
        questions: [
          { questionText: "NaCl is common?", options: ["Salt", "Sugar", "Baking Soda", "Vinegar"], correctAnswer: 0, marks: 2 },
          { questionText: "HCl is?", options: ["Hydrochloric acid", "Sulfuric acid", "Acetic acid", "Nitric acid"], correctAnswer: 0, marks: 3 },
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
