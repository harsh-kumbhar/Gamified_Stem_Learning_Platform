import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

function StudentDashboard() {
  const [courses, setCourses] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

  const handleCourseClick = async (courseId) => {
    setLoading(true);
    setSelectedCourse(courseId);
    setQuizzes([]);
    setError("");

    try {
      const res = await axios.get(`${API_BASE}/api/quizzes/course/${courseId}`);
      setQuizzes(res.data);
    } catch (err) {
      console.error("❌ Error fetching quizzes:", err);
      setError("Failed to fetch quizzes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="student-dashboard" style={{ padding: "1rem", maxWidth: "800px", margin: "auto", color: "white", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>🎓 Student Dashboard</h2>

      {/* Error message */}
      {error && (
        <div style={{ background: "#1e293b", padding: "0.75rem 1rem", borderRadius: "8px", color: "#f87171", marginBottom: "1rem", textAlign: "center" }}>
          {error}
        </div>
      )}

      {/* Courses */}
      <div style={{ background: "#1e293b", padding: "1rem", borderRadius: "16px", marginBottom: "1rem", boxShadow: "0 4px 12px rgba(0,0,0,0.3)" }}>
        <h3 style={{ marginBottom: "1rem" }}>📚 Available Courses</h3>
        {courses.length === 0 ? (
          <p>No courses available.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {courses.map((c) => (
              <li key={c._id} style={{ marginBottom: "0.5rem" }}>
                <button
                  onClick={() => handleCourseClick(c._id)}
                  style={{
                    width: "100%",
                    background: "#0f172a",
                    border: "1px solid #334155",
                    borderRadius: "8px",
                    color: "white",
                    padding: "0.75rem 1rem",
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "background 0.3s ease, border-color 0.3s ease",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = "#3b82f6"}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = "#334155"}
                >
                  {c.title} ({c.grade})
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Quizzes */}
      {selectedCourse && (
        <div style={{ background: "#1e293b", padding: "1rem", borderRadius: "16px", marginBottom: "1rem", boxShadow: "0 4px 12px rgba(0,0,0,0.3)" }}>
          <h3 style={{ marginBottom: "1rem" }}>📝 Quizzes for this course</h3>
          {loading ? (
            <p>Loading quizzes...</p>
          ) : quizzes.length === 0 ? (
            <p>No quizzes available for this course yet.</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {quizzes.map((q) => (
                <li key={q._id} style={{ marginBottom: "0.5rem" }}>
                  <button
                    onClick={() => navigate(`/quiz/${q._id}`)}
                    style={{
                      width: "100%",
                      background: "#0f172a",
                      border: "1px solid #334155",
                      borderRadius: "8px",
                      color: "white",
                      padding: "0.75rem 1rem",
                      textAlign: "left",
                      cursor: "pointer",
                      transition: "background 0.3s ease, border-color 0.3s ease",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = "#3b82f6"}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = "#334155"}
                  >
                    {q.title}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Games Section */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h3 style={{ marginBottom: "1rem" }}>🎮 Games</h3>
        <button
          onClick={() => navigate("/games")}
          style={{
            background: "linear-gradient(to right, #3b82f6, #10b981)",
            border: "none",
            borderRadius: "8px",
            color: "white",
            padding: "0.75rem 1.5rem",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "background 0.3s ease",
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = "linear-gradient(to right, #2563eb, #059669)"}
          onMouseLeave={(e) => e.currentTarget.style.background = "linear-gradient(to right, #3b82f6, #10b981)"}
        >
          Go to Games
        </button>
      </div>
    </div>
  );
}

export default StudentDashboard;
