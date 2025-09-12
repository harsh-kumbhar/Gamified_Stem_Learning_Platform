import { useNavigate } from "react-router-dom";

function Games() {
  const navigate = useNavigate();

  return (
    <div className="games-page">
      <h2>🎮 Available Games</h2>
      <ul>
        <li>
          <button onClick={() => navigate("/game")}>Cell-Explorer</button>
        </li>
        <li>
          <button onClick={() => navigate("/identifier-game")}>Image Quiz</button>
        </li>
      </ul>
    </div>
  );
}

export default Games;
