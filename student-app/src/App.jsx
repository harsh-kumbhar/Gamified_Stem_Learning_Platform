// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/login.jsx";
import Register from "../pages/register.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} /> {/* Register first */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
