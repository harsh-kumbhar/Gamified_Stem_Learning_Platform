import Phaser from 'phaser';
import GameScene from './GameScene';

export const launch = (containerId) => {
    const config = {
        type: Phaser.AUTO,
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: 1920,
            height: 1080,
        },
        parent: containerId,
        // ** NEW: Set the background color for the letterboxing **
        backgroundColor: '#000000',
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0 },
                debug: false,
            },
        },
        scene: [GameScene],
    };

    return new Phaser.Game(config);
};