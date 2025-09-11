import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/login";
import Register from "../pages/register";
import PhaserSandbox from "./components/PhaserSandbox"; 
import StudentDashboard from "../pages/studentDashboard";
import QuizAttempt from "../pages/QuizAttempt.jsx";
function App() {
  return (
    <Router basename="/student">
      <Routes>
        {/* Default route → Register */}
        <Route path="/" element={<Register />} />

        {/* Correct student paths */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<StudentDashboard />} />

        <Route path="/quiz/:quizId" element={<QuizAttempt />} />

        {/* Route for your Phaser Game */}
        <Route path="/game" element={<PhaserSandbox />} /> 
      </Routes>
    </Router>
  );
}

export default App;