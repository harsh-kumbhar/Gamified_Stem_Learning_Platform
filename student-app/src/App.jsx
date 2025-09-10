import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/login";
import Register from "../pages/register";
import PhaserSandbox from "./components/PhaserSandbox"; // <-- 1. ADD THIS IMPORT

function App() {
  return (
    <Router basename="/student">
      <Routes>
        {/* Default route → Register */}
        <Route path="/" element={<Register />} />

        {/* Correct student paths */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Route for your Phaser Game */}
        <Route path="/game" element={<PhaserSandbox />} /> {/* <-- 2. ADD THIS ROUTE */}
      </Routes>
    </Router>
  );
}

export default App;