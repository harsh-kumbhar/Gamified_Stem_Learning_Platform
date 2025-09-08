import Course from "../models/Course.js";

// Create a new course (teacher only)
export const createCourse = async (req, res) => {
  try {
    const { title, description } = req.body;
    const course = await Course.create({
      title,
      description,
      teacherId: req.user._id, // comes from auth middleware
    });
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: "Error creating course", error: error.message });
  }
};

// Get all courses
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("teacherId", "name email");
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses", error: error.message });
  }
};
