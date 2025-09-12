import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

function StudentDashboard() {
  const [courses, setCourses] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch courses on load
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/courses`);
        setCourses(res.data);
      } catch (err) {
        console.error("❌ Error fetching courses:", err);
        setError("Failed to fetch courses. Please try again.");
      }
    };
    fetchCourses();
  }, []);

  // Fetch quizzes for selected course
  const handleCourseClick = async (courseId) => {
    setLoading(true);
    setSelectedCourse(courseId);
    setQuizzes([]); // reset quizzes when switching course
    setError("");

    try {
      const res = await axios.get(`${API_BASE}/api/quizzes/${courseId}`);
      setQuizzes(res.data);
    } catch (err) {
      console.error("❌ Error fetching quizzes:", err);
      setError("Failed to fetch quizzes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="student-dashboard">
      <h2>🎓 Student Dashboard</h2>

      {/* Error message */}
      {error && <p className="error">{error}</p>}

      {/* Courses */}
      <div className="course-list">
        <h3>📚 Available Courses</h3>
        {courses.length === 0 ? (
          <p>No courses available.</p>
        ) : (
          <ul>
            {courses.map((c) => (
              <li key={c._id}>
                <button onClick={() => handleCourseClick(c._id)}>
                  {c.title} ({c.grade})
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Quizzes */}
      {selectedCourse && (
        <div className="quiz-list">
          <h3>📝 Quizzes for this course</h3>
          {loading ? (
            <p>Loading quizzes...</p>
          ) : quizzes.length === 0 ? (
            <p>No quizzes available for this course yet.</p>
          ) : (
            <ul>
              {quizzes.map((q) => (
                <li key={q._id}>
                <button onClick={() => window.location.href = `/student/quiz/${q._id}`}>
                  {q.title}
                </button>
              </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default StudentDashboard;
