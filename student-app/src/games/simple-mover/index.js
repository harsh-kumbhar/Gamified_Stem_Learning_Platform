import Phaser from 'phaser';
import GameScene from './GameScene';

/**
 * This function launches the Phaser game.
 * It takes a 'parent' DOM element ID to know where to render the game.
 */
export const launch = (containerId) => {
    const config = {
        type: Phaser.AUTO, // Automatically choose WebGL or Canvas
        width: 800,
        height: 600,
        parent: containerId, // The ID of the div to render the game in
        physics: {
            // We're using Arcade Physics, which is simple and fast.
            default: 'arcade',
            arcade: {
                gravity: { y: 0 }, // No gravity for this top-down game
                debug: false,
            },
        },
        // An array of all the scenes in our game. We only have one for now.
        scene: [GameScene],
    };

    return new Phaser.Game(config);
};