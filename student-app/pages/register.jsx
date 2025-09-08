import { Link } from "react-router-dom";
import { useState } from "react";
import { register } from "../src/api/auth.jsx";
import "../pages/auth.css"; // import CSS

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await register(name, email, password, role);
      console.log("Register success:", data);
    } catch (err) {
      console.error("Register error:", err);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Register</h2>

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="auth-input"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="auth-input"
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
          <button type="submit" className="auth-button">
            Register
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/login" className="auth-link">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
