export default class IdentifierScene extends Phaser.Scene {
  constructor() {
    super('IdentifierScene');
  }

  init(data) {
    // Receive question data from React
    this.questionTextData = data.questionText;
    this.assets = data.assets;
    this.correctElements = data.correctAnswers;

    this.score = data.score || 0; // carry forward score
    this.gameTime = 15;
    this.correctClicks = 0;
    this.lives = 4;
    this.clicksMade = 0;
    this.lifeIcons = [];
  }

  preload() {
    const { width, height } = this.cameras.main;

    const loadingText = this.add.text(width / 2, height / 2, 'Loading...', {
      fontSize: '42px',
      fontFamily: 'Arial, sans-serif',
      color: '#ffffff',
    }).setOrigin(0.5);

    this.load.on('complete', () => {
      loadingText.destroy();
    });

    // Load all assets for this question
    this.load.image('background', 'public/assets/IdentifierAssets/background-image.png');
    this.load.image('feedbackCorrect', 'public/assets/IdentifierAssets/feedback-correct.png');
    this.load.image('feedbackWrong', 'public/assets/IdentifierAssets/feedback-wrong.png');
    this.load.image('lifeIcon', 'public/assets/IdentifierAssets/heart.png');

    this.assets.forEach(el => {
      this.load.image(el, `public/assets/IdentifierAssets/${el}.png`);
    });
  }

  create() {
    const gameWidth = this.cameras.main.width;
    const gameHeight = this.cameras.main.height;

    // Background
    const background = this.add.image(0, 0, 'background').setOrigin(0, 0);
    background.displayWidth = gameWidth;
    background.displayHeight = gameHeight;

    // Question prompt
    this.promptText = this.add.text(gameWidth / 2, 60, this.questionTextData, {
      fontSize: '56px',
      fontFamily: 'Arial, sans-serif',
      color: '#000000',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    // Score display
    this.scoreText = this.add.text(200, 60, `Score: ${this.score}`, {
      fontSize: '48px',
      fontFamily: 'Arial',
      color: '#000000',
    }).setOrigin(0.5);

    // Timer
    this.timerText = this.add.text(gameWidth - 160, 60, `Time: ${this.gameTime}`, {
      fontSize: '48px',
      fontFamily: 'Arial',
      color: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 15, y: 5 },
    }).setOrigin(0.5);

    // Lives
    for (let i = 0; i < this.lives; i++) {
      const heart = this.add
        .image((gameWidth / 2 - 150) + (i * 100), 140, 'lifeIcon')
        .setScale(0.15);
      this.lifeIcons.push(heart);
    }

    // Random placement of elements
    const positions = [
      { x: gameWidth * 0.25, y: gameHeight * 0.4 },
      { x: gameWidth * 0.5, y: gameHeight * 0.4 },
      { x: gameWidth * 0.75, y: gameHeight * 0.4 },
      { x: gameWidth * 0.25, y: gameHeight * 0.7 },
      { x: gameWidth * 0.5, y: gameHeight * 0.7 },
      { x: gameWidth * 0.75, y: gameHeight * 0.7 },
    ];

    Phaser.Utils.Array.Shuffle(this.assets);

    this.assets.forEach((key, index) => {
      const pos = positions[index];
      let scaleValue = 0.34; // default scale for noble gases
if (['html', 'css', 'reactjs', 'nodejs', 'python', 'oracle'].includes(key)) {
  scaleValue = 0.2; // smaller for logo images
}

const elementSprite = this.add
  .sprite(pos.x, pos.y, key)
  .setInteractive({ pixelPerfect: true, useHandCursor: true })
  .setScale(scaleValue);

      elementSprite.setData('isCorrect', this.correctElements.includes(key));
      elementSprite.on('pointerdown', () => this.elementClicked(elementSprite));
    });

    // Timer countdown
    this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.gameTime--;
        this.timerText.setText(`Time: ${this.gameTime}`);
        if (this.gameTime <= 0) this.gameOver('lose_time');
      },
      loop: true,
    });
  }

  elementClicked(element) {
    if (this.clicksMade >= 4) return;

    element.removeInteractive();
    this.clicksMade++;
    this.lives--;

    if (this.lifeIcons.length > 0) {
      const heartToRemove = this.lifeIcons.pop();
      heartToRemove.destroy();
    }

    if (element.getData('isCorrect')) {
      this.score += 10;
      this.correctClicks++;
      this.add.image(element.x, element.y, 'feedbackCorrect')
        .setScale(0.2)
        .setAlpha(0.6);
    } else {
      this.score -= 5;
      this.add.image(element.x, element.y, 'feedbackWrong')
        .setScale(0.3)
        .setAlpha(0.6);
    }

    this.scoreText.setText(`Score: ${this.score}`);

    // End if all correct found
    if (this.correctClicks === this.correctElements.length) {
      this.time.delayedCall(1000, () => {
        this.gameOver('win');
      });
      return;
    }

    // End if all clicks used
    if (this.clicksMade === 4) {
      this.time.delayedCall(1000, () => {
        const isWin = (this.correctClicks === this.correctElements.length);
        this.gameOver(isWin ? 'win' : 'lose_lives');
      });
    }
  }

  gameOver(status) {
    if (!this.scene.isActive()) return;
    this.time.removeAllEvents();
    this.game.events.emit('game-over', {
      score: this.score,
      status: status,
    });
    this.scene.pause();
  }
}
