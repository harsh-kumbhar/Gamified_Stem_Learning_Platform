import { useNavigate } from "react-router-dom";

function Games() {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto", padding: "20px", backgroundColor: "#0f172a", color: "white", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>🎮 Available Games</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li style={{ marginBottom: "15px" }}>
          <button
            onClick={() => navigate("/game")}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              background: "linear-gradient(to right, #3b82f6, #10b981)",
              color: "white",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "linear-gradient(to right, #2563eb, #059669)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "linear-gradient(to right, #3b82f6, #10b981)")}
          >
            Cell-Explorer
          </button>
        </li>
        <li>
          <button
            onClick={() => navigate("/identifier-game")}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              background: "linear-gradient(to right, #3b82f6, #10b981)",
              color: "white",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "linear-gradient(to right, #2563eb, #059669)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "linear-gradient(to right, #3b82f6, #10b981)")}
          >
            Image Quiz
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Games;
