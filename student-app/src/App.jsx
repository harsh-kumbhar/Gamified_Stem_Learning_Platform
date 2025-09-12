import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/login";
import Register from "../pages/register";
import PhaserSandbox from "./components/PhaserSandbox"; 
import StudentDashboard from "../pages/studentDashboard.jsx";
import QuizAttempt from "../pages/QuizAttempt.jsx";
import ResultPage from "../pages/ResultPage.jsx";
import IdentifierGame from "./components/IdentifierGame.jsx"

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
        {/* Route for your Phaser Game */}
        <Route path="/game" element={<PhaserSandbox />} /> {/* <-- 2. ADD THIS ROUTE */}
        <Route path="/identifier-game" element={<IdentifierGame />} />
      </Routes>
    </Router>
  );
}

export default App;