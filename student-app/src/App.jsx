import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/login";
import Register from "../pages/register";
import PhaserSandbox from "./components/PhaserSandbox"; 
import StudentDashboard from "../pages/StudentDashboard.jsx";
import QuizAttempt from "../pages/QuizAttempt.jsx";
import ResultPage from "../pages/ResultPage.jsx";


function App() {
  return (
    <Router basename="/student">
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/quiz/:quizId" element={<QuizAttempt />} />
        <Route path="/game" element={<PhaserSandbox />} />

        {/* ✅ Add this */}
        <Route path="/result/:attemptId" element={<ResultPage />} />
      </Routes>
    </Router>
  );
}

export default App;