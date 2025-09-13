// src/pages/ResultPage.jsx
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

function ResultPage() {
  const { attemptId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [result, setResult] = useState(location.state?.result || null);

  useEffect(() => {
    const fetchResult = async () => {
      if (!result && attemptId) {
        try {
          const res = await axios.get(`${API_BASE}/api/attempts/${attemptId}`);
          setResult(res.data);
        } catch (err) {
          console.error("❌ Error fetching result:", err);
        }
      }
    };
    fetchResult();
  }, [attemptId, result]);

  if (!result)
    return (
      <p style={{ textAlign: "center", marginTop: "50px", color: "#9ca3af" }}>
        Loading result...
      </p>
    );

  const performance =
    result.percent >= 90
      ? "Excellent! 🏆"
      : result.percent >= 70
      ? "Good Job! 🎉"
      : result.percent >= 50
      ? "Average 😐"
      : "Needs Improvement 😞";

  return (
    <div style={{ maxWidth: "900px", margin: "20px auto", padding: "20px", backgroundColor: "#0f172a", color: "white", fontFamily: "Arial, sans-serif" }}>
      
      {/* Title */}
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>📊 Quiz Result</h1>

      {/* Summary Card */}
      <div style={{
        backgroundColor: "#1e293b",
        padding: "25px",
        borderRadius: "12px",
        marginBottom: "30px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
        textAlign: "center",
      }}>
        <h2>{performance}</h2>
        <p><strong>Score:</strong> {result.score} / {result.totalMarks}</p>
        <p><strong>Percentage:</strong> {result.percent}%</p>
        <p><strong>Attempted on:</strong> {new Date(result.attempt.createdAt).toLocaleString()}</p>
      </div>

      {/* Questions Breakdown */}
      {result.details?.length > 0 && (
        <div>
          <h2 style={{ marginBottom: "15px" }}>📝 Question Breakdown</h2>
          {result.details.map((q, idx) => {
            const isCorrect = q.obtained === q.marks;
            return (
              <div key={idx} style={{
                border: `2px solid ${isCorrect ? "#4caf50" : "#f87171"}`,
                borderRadius: "10px",
                padding: "15px",
                marginBottom: "15px",
                backgroundColor: isCorrect ? "#1f2a36" : "#2b1f26",
              }}>
                <p><strong>Q{idx + 1}:</strong> {q.questionText}</p>
                <p><strong>Your Answer:</strong> {q.yourAnswerIndex !== null ? q.options[q.yourAnswerIndex] : "Not answered"}</p>
                <p><strong>Correct Answer:</strong> {q.options[q.correctAnswerIndex]}</p>
                <p><strong>Marks:</strong> {q.obtained} / {q.marks}</p>
              </div>
            );
          })}
        </div>
      )}

      {/* Back Button */}
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <button
          onClick={() => navigate("/dashboard")}
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
          ⬅ Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default ResultPage;
