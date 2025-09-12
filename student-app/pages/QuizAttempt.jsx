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

  // ✅ Fetch quiz details
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/quizzes/${quizId}`);
        setQuiz(res.data);
        setLoading(false);

        // Get student info from localStorage
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
          setStudentId(storedUser._id || storedUser.id); // ✅ handle both keys
        }
      } catch (err) {
        console.error("❌ Error fetching quiz:", err);
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [quizId]);

  // ✅ Handle option select
  const handleOptionChange = (qId, optionIdx) => {
    setAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  // ✅ Submit answers
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

    // ✅ Navigate to result page with result data
    navigate(`/result/${res.data.attempt._id}`, { state: { result: res.data } });
  } catch (err) {
    console.error("❌ Error submitting quiz:", err.response?.data || err.message);
    alert("Failed to submit quiz. Please try again.");
  }
};


  if (loading) return <p>Loading quiz...</p>;
  if (!quiz) return <p>Quiz not found</p>;

  return (
    <div className="quiz-attempt">
      <h2>{quiz.title}</h2>
      <p>Total Marks: {quiz.totalMarks}</p>

      {quiz?.questions && quiz.questions.length > 0 ? (
        quiz.questions.map((q, idx) => (
          <div key={q._id} className="quiz-question">
            <p>
              <b>Q{idx + 1}:</b> {q.questionText}
            </p>
            <ul>
              {q.options.map((opt, i) => (
                <li key={i}>
                  <label>
                    <input
                      type="radio"
                      name={q._id}
                      value={i}
                      checked={answers[q._id] === i}
                      onChange={() => handleOptionChange(q._id, i)}
                    />
                    {opt}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No questions found for this quiz.</p>
      )}

      <button onClick={handleSubmit} className="submit-btn">
        Submit Quiz
      </button>
    </div>
  );
}

export default QuizAttempt;
