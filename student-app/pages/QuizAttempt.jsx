// src/pages/QuizAttempt.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

function QuizAttempt() {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [studentId, setStudentId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/quizzes/${quizId}`);
        setQuiz(res.data);
        setLoading(false);

        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
          setStudentId(storedUser._id || storedUser.id);
        }
      } catch (err) {
        console.error("❌ Error fetching quiz:", err);
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [quizId]);

  const handleOptionChange = (qId, optionIdx) => {
    setAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const handleSubmit = async () => {
    try {
      if (!studentId) {
        alert("⚠️ No student ID found. Please log in again.");
        return;
      }

      const formattedAnswers = Object.entries(answers).map(([qId, optionIdx]) => ({
        questionId: qId,
        selectedOption: optionIdx,
      }));

      const res = await axios.post(`${API_BASE}/api/quizzes/${quizId}/attempt`, {
        studentId,
        answers: formattedAnswers,
      });

      navigate(`/result/${res.data.attempt._id}`, { state: { result: res.data } });
    } catch (err) {
      console.error("❌ Error submitting quiz:", err.response?.data || err.message);
      alert("Failed to submit quiz. Please try again.");
    }
  };

  if (loading)
    return <p style={{ textAlign: "center", marginTop: "50px", color: "#9ca3af" }}>Loading quiz...</p>;
  if (!quiz)
    return <p style={{ textAlign: "center", marginTop: "50px", color: "#f87171" }}>Quiz not found</p>;

  return (
    <div style={{ maxWidth: "800px", margin: "20px auto", padding: "20px", backgroundColor: "#0f172a", color: "white", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>{quiz.title}</h2>
      <p style={{ textAlign: "center", marginBottom: "20px", color: "#9ca3af" }}>Total Marks: {quiz.totalMarks}</p>

      {quiz.questions && quiz.questions.length > 0 ? (
        quiz.questions.map((q, idx) => (
          <div key={q._id} style={{ backgroundColor: "#1e293b", borderRadius: "12px", padding: "15px", marginBottom: "20px", boxShadow: "0 4px 8px rgba(0,0,0,0.3)" }}>
            <p><strong>Q{idx + 1}:</strong> {q.questionText}</p>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {q.options.map((opt, i) => (
                <li key={i} style={{ marginBottom: "10px" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                    <input
                      type="radio"
                      name={q._id}
                      value={i}
                      checked={answers[q._id] === i}
                      onChange={() => handleOptionChange(q._id, i)}
                      style={{
                        accentColor: "#3b82f6",
                      }}
                    />
                    <span>{opt}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p style={{ textAlign: "center", color: "#9ca3af" }}>No questions found for this quiz.</p>
      )}

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={handleSubmit}
          style={{
            padding: "12px 25px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "none",
            background: "linear-gradient(to right, #3b82f6, #10b981)",
            color: "white",
            cursor: "pointer",
            transition: "background 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "linear-gradient(to right, #2563eb, #059669)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "linear-gradient(to right, #3b82f6, #10b981)")}
        >
          Submit Quiz
        </button>
      </div>
    </div>
  );
}

export default QuizAttempt;
