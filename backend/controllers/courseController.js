// controllers/courseController.js
import Course from "../models/course.js";
import User from "../models/User.js";

// Create Course (Teacher only)
export const createCourse = async (req, res) => {
  try {
    const { course_id, title, description, grade } = req.body;

    // Ensure teacher is valid
    const teacher = await User.findById(req.user.id);
    if (!teacher || teacher.role !== "teacher") {
      return res.status(403).json({ message: "Only teachers can create courses" });
    }

    // Check duplicate course_id
    const exists = await Course.findOne({ course_id });
    if (exists) {
      return res.status(400).json({ message: "Course ID already exists" });
    }

    const course = await Course.create({
      course_id,
      title,
      description,
      grade,
      teacherId: req.user.id,
    });

    res.status(201).json({ message: "Course created successfully", course });
  } catch (err) {
    res.status(500).json({ message: "Error creating course", error: err.message });
  }
};

// Get all courses (Public)
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("teacherId", "name email role");
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: "Error fetching courses", error: err.message });
  }
};
