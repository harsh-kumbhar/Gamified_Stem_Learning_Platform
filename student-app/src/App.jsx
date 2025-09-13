import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/login";
import Register from "../pages/register";
import PhaserSandbox from "./components/PhaserSandbox"; 
import StudentDashboard from "../pages/studentDashboard.jsx";
import QuizAttempt from "../pages/QuizAttempt.jsx";
import ResultPage from "../pages/ResultPage.jsx";
import IdentifierGame from "./components/IdentifierGame.jsx";

import Games from "../pages/Games.jsx";
import TeacherDashboard from "../../teacher-dashboard/pages/TeacherDashboard.jsx";

function App() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Student module */}
      <Route path="/student/dashboard" element={<StudentDashboard />} />

        {/* Quizzes */}
        <Route path="/quiz/:quizId" element={<QuizAttempt />} />
        <Route path="/result/:attemptId" element={<ResultPage />} />

        {/* Games */}
        <Route path="/games" element={<Games />} />
        <Route path="/game" element={<PhaserSandbox />} />
        <Route path="/identifier-game" element={<IdentifierGame />} />
      </Routes>
    </Router>
  );
}

export default App;
