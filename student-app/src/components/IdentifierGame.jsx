import React, { useEffect, useRef, useState } from 'react';
import { launch } from '../games/Identifier-game';

// Questions config
const QUESTIONS = [
  {
    questionText: 'Click on the 3 Noble Gases!',
    assets: ['He', 'Ne', 'Ar', 'Li', 'O', 'Fe'],
    correctAnswers: ['He', 'Ne', 'Ar'],
  },
  {
    questionText: 'Which of these is frontend technology?',
    assets: ['html', 'css', 'reactjs', 'nodejs', 'python', 'oracle'],
    correctAnswers: ['html', 'css', 'reactjs'],
  },
];

const IdentifierGame = () => {
  const gameContainer = useRef(null);
  const game = useRef(null);

  const [isGameOver, setIsGameOver] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [gameOverMessage, setGameOverMessage] = useState("Time's Up!");
  const [questionIndex, setQuestionIndex] = useState(0);

  const handleGameOver = (data) => {
    if (!game.current) return;

    switch (data.status) {
      case 'win':
        setGameOverMessage("Well done!");
        break;
      case 'lose_lives':
        setGameOverMessage("Out of Clicks!");
        break;
      case 'lose_time':
      default:
        setGameOverMessage("Time's Up!");
        break;
    }

    setIsGameOver(true);
    setFinalScore(data.score); // keep cumulative score
  };

  const resetGame = () => {
    if (game.current) {
      game.current.destroy(true);
      game.current = null;
    }
    setIsGameOver(false);
    setFinalScore(0);
    setQuestionIndex(0);
  };

  const nextQuestion = () => {
    if (game.current) {
      game.current.destroy(true);
      game.current = null;
    }
    setIsGameOver(false);
    setQuestionIndex(prev => prev + 1);
  };

  useEffect(() => {
    if (!isGameOver && gameContainer.current && !game.current) {
      const questionData = QUESTIONS[questionIndex];

      game.current = launch(gameContainer.current.id);
      game.current.scene.start('IdentifierScene', {
        ...questionData,
        score: finalScore, // carry forward score
      });

      game.current.events.on('game-over', handleGameOver);
    }

    return () => {
      if (game.current) {
        game.current.destroy(true);
        game.current = null;
      }
    };
  }, [isGameOver, questionIndex]);

  return (
    <div className="phaser-game-wrapper">
      {isGameOver ? (
        <div style={{
          textAlign: 'center',
          color: 'black',
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '20px',
        }}>
          <h2 style={{
            fontFamily: 'Arial, sans-serif',
            fontSize: '5rem',
            fontWeight: 'bold',
            margin: '0 0 20px 0',
          }}>
            {gameOverMessage}
          </h2>

          {questionIndex < QUESTIONS.length - 1 ? (
            <>
              <h3 style={{ fontSize: '2rem', margin: '0 0 30px 0' }}>
                Score so far: {finalScore}
              </h3>
              <button
                onClick={nextQuestion}
                style={{
                  padding: '15px 30px',
                  fontSize: '20px',
                  cursor: 'pointer',
                  fontFamily: 'Arial',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: '#5cb85c',
                  color: 'white',
                  marginRight: '15px',
                }}
              >
                Next Question
              </button>
              <button
                onClick={resetGame}
                style={{
                  padding: '15px 30px',
                  fontSize: '20px',
                  cursor: 'pointer',
                  fontFamily: 'Arial',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: '#f0ad4e',
                  color: 'white',
                }}
              >
                Play Again
              </button>
            </>
          ) : (
            <>
              <h3 style={{ fontSize: '2rem', margin: '0 0 30px 0' }}>
                🎉 Final Score: {finalScore}
              </h3>
              <button
                onClick={resetGame}
                style={{
                  padding: '15px 30px',
                  fontSize: '20px',
                  cursor: 'pointer',
                  fontFamily: 'Arial',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: '#337ab7',
                  color: 'white',
                }}
              >
                Play Again
              </button>
            </>
          )}
        </div>
      ) : (
        <div id="identifier-game-container" ref={gameContainer} />
      )}
    </div>
  );
};

export default IdentifierGame;
