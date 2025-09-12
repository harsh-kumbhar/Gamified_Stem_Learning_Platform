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

  // Fetch result from backend if not passed via state
  useEffect(() => {
    const fetchResult = async () => {
      if (!result && attemptId) {
        try {
          const res = await axios.get(`${API_BASE}/api/attempts/${attemptId}`);
          setResult(res.data);
        } catch (err) {
          console.error("Error fetching result:", err);
        }
      }
    };
    fetchResult();
  }, [attemptId, result]);

  if (!result) return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading result...</p>;

  const performance =
    result.percent >= 90
      ? "Excellent! 🏆"
      : result.percent >= 70
      ? "Good Job! 🎉"
      : result.percent >= 50
      ? "Average 😐"
      : "Needs Improvement 😞";

  return (
    <div style={{ maxWidth: "900px", margin: "20px auto", padding: "20px", fontFamily: "Arial, sans-serif", backgroundColor: "#f0f2f5", color: "#000" }}>
      
      {/* Title */}
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>📊 Quiz Result</h1>

      {/* Summary Card */}
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "25px",
          borderRadius: "12px",
          marginBottom: "30px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
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
              <div
                key={idx}
                style={{
                  border: `2px solid ${isCorrect ? "#4caf50" : "#f44336"}`,
                  borderRadius: "10px",
                  padding: "15px",
                  marginBottom: "15px",
                  backgroundColor: isCorrect ? "#e8f5e9" : "#ffebee",
                  color: "#000",
                }}
              >
                <p><strong>Q{idx + 1}:</strong> {q.questionText}</p>
                <p>
                  <strong>Your Answer:</strong>{" "}
                  {q.yourAnswerIndex !== null ? q.options[q.yourAnswerIndex] : "Not answered"}
                </p>
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
            borderRadius: "6px",
            border: "none",
            backgroundColor: "#1976d2",
            color: "#fff",
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#1565c0")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#1976d2")}
        >
          ⬅ Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default ResultPage;
