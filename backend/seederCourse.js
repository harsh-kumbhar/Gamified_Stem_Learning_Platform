import mongoose from "mongoose";
import dotenv from "dotenv";
import Course from "./models/course.js";
import User from "./models/User.js";

dotenv.config();

const seedCourses = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // ✅ Find a teacher (must exist in your DB first)
    const teacher = await User.findOne({ role: "teacher" });
    if (!teacher) {
      console.log("⚠️ No teacher found. Please create a teacher first.");
      process.exit(1);
    }

    const courses = [
      {
        course_id: "MATH101",
        title: "Mathematics Basics",
        description: "Introduction to Algebra and Geometry",
        grade: 8,
        teacherId: teacher._id,
      },
      {
        course_id: "SCI201",
        title: "Science Fundamentals",
        description: "Physics and Chemistry Basics",
        grade: 9,
        teacherId: teacher._id,
      },
    ];

    await Course.insertMany(courses);
    console.log("✅ Courses seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding courses:", err);
    process.exit(1);
  }
};

seedCourses();
