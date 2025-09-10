import React, { useEffect, useRef, useState } from 'react';
import { launch } from '../games/cell-explorer';

const PhaserSandbox = () => {
    const gameContainer = useRef(null);
    const game = useRef(null); 

    const [isGameOver, setIsGameOver] = useState(false);
    const [finalScore, setFinalScore] = useState(0);

    // This function will be called by the event listener from Phaser
    const handleGameOver = (data) => {
        // Ensure we only trigger this once
        if (!game.current) return; 

        console.log("Game over event received in React!", data);
        setIsGameOver(true);
        setFinalScore(data.score);
        
        // Destroy the game instance after a short delay
        setTimeout(() => {
            if (game.current) {
                game.current.destroy(true);
                game.current = null;
            }
        }, 100);
    };

    useEffect(() => {
        // Only create the game if the container exists and the game isn't already running
        if (gameContainer.current && !game.current) {
            game.current = launch(gameContainer.current.id);
            // Set up the event listener
            game.current.events.on('game-over', handleGameOver);
        }

        // The cleanup function for when the component unmounts
        return () => {
            if (game.current) {
                game.current.events.off('game-over', handleGameOver);
                game.current.destroy(true);
                game.current = null;
            }
        };
    }, []);

    return (
        <div className="game-container">
            {isGameOver ? (
                // If the game is over, show the results using React UI
                <div style={{ color: 'white', textAlign: 'center' }}>
                    <h2 style={{ fontFamily: '"Fredoka One", cursive', fontSize: '5rem' }}>You Win!</h2>
                    <h3>Your Final Score: {finalScore}</h3>
                    <button 
                        onClick={() => window.location.reload()} 
                        style={{ padding: '15px 30px', fontSize: '20px', cursor: 'pointer', fontFamily: 'Arial', borderRadius: '10px', border: 'none' }}
                    >
                        Play Again
                    </button>
                </div>
            ) : (
                // If the game is not over, show the Phaser canvas
                <div id="phaser-sandbox-container" ref={gameContainer} />
            )}
        </div>
    );
};

export default PhaserSandbox;