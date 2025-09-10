import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../pages/auth.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [schoolId, setSchoolId] = useState(""); 
  const [schools, setSchools] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch schools from backend
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/schools");
        setSchools(res.data);
      } catch (err) {
        console.error("Error fetching schools:", err);
        setError("Failed to load schools. Try again later.");
      }
    };
    fetchSchools();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await axios.post("http://localhost:5000/api/users/register", {
        name,
        email,
        password,
        role,
        schoolId,
      });

      console.log("Register success:", res.data);
      setSuccess("Registered successfully ✅");
      setName("");
      setEmail("");
      setPassword("");
      setRole("student");
      setSchoolId("");
    } catch (err) {
      console.error("Register error:", err);
      setError(err.response?.data?.message || "Registration failed ❌");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Register</h2>

        {error && <p className="auth-error">{error}</p>}
        {success && <p className="auth-success">{success}</p>}

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="auth-input"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
            required
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="auth-input"
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>

          {/* School dropdown */}
          <select
            value={schoolId}
            onChange={(e) => setSchoolId(e.target.value)}
            className="auth-input"
            required
          >
            <option value="">Select your school</option>
            {schools.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name} ({s.district})
              </option>
            ))}
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
