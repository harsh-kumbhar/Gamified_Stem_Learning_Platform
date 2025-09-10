import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/login";
import Register from "../pages/register";

function App() {
  return (
    <Router basename="/student">
      <Routes>
        {/* Default route → Register */}
        <Route path="/" element={<Register />} />
        {/* Correct student paths */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
