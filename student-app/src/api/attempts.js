import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

// ✅ Start attempt
export const startAttempt = async (quizId, studentId) => {
  const res = await axios.post(`${API_BASE}/api/attempts/start/${quizId}`, {
    studentId,
  });
  return res.data;
};

// ✅ Submit attempt
export const submitAttempt = async (quizId, studentId, answers) => {
  const res = await axios.post(`${API_BASE}/api/attempts/submit/${quizId}`, {
    studentId,
    answers,
  });
  return res.data;
};

// ✅ Get history
export const getAttempts = async (studentId) => {
  const res = await axios.get(`${API_BASE}/api/attempts/${studentId}`);
  return res.data;
};
