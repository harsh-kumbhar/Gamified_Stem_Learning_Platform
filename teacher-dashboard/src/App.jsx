import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
const STUDENT_URL = import.meta.env.VITE_STUDENT_URL || "http://localhost:5173";

function TeacherDashboard() {
  return (
    <div>
      <h1>Teacher Dashboard</h1>
      <p>Welcome, you can manage courses and quizzes here.</p>
    </div>
  );
}

function App() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

   
  if (!token || role !== "teacher") {
  window.location.href = `${STUDENT_URL}student/login`;
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<TeacherDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
