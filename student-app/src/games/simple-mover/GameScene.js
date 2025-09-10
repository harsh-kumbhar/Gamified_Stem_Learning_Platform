import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
    constructor() {
        // The 'super' call tells Phaser which scene this is.
        // We can refer to this scene with the key 'GameScene'.
        super('GameScene');
        this.player = null; // A variable to hold our player sprite
        this.cursors = null; // A variable to hold the keyboard controls
    }

    /**
     * This function is called once, before the scene is created.
     * It's used to load all your game assets.
     */
    preload() {
        // The path is relative to the `public` folder.
        this.load.image('player', 'public/assets/sampleimage.png');
    }

    /**
     * This function is called once, after preload is complete.
     * It's where you create your game objects, like sprites and text.
     */
    create() {
        // Create the player sprite.
        // We're placing it at x=400, y=300 on the game canvas.
        // 'player' refers to the key we used in preload().
        this.player = this.physics.add.sprite(400, 300, 'player');

        // Make the player collide with the edges of the game world.
        this.player.setCollideWorldBounds(true);

        // Set up listeners for the arrow keys.
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    /**
     * This function is called about 60 times per second.
     * It's the game loop where you check for input and update the game state.
     */
    update() {
        // First, reset the player's velocity to 0.
        this.player.setVelocity(0);

        // Check which arrow key is pressed and set the velocity accordingly.
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-200);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(200);
        }

        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-200);
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(200);
        }
    }
}