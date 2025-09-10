import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    // Custom course ID (optional but unique if provided)
    course_id: { type: String, unique: true },

    // Basic details
    title: { type: String, required: true },
    description: { type: String },

    // Grade restriction (optional but if provided must be in this range)
    grade: { type: Number, enum: [6, 7, 8, 9, 10, 11, 12] },

    // Reference to teacher who created the course
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;
