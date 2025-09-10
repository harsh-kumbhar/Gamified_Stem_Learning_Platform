import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        this.correctPlacements = 0;
    }

    preload() {
        // ** CHANGED: No longer need to load label images **
        this.load.image('cellDiagram', 'public/assets/CellExplorerAsset/cell-diagram.png');
        this.load.image('feedbackCorrect', 'public/assets/CellExplorerAsset/feedback-correct.png');
        this.load.image('feedbackWrong', 'public/assets/CellExplorerAsset/feedback-wrong.png');
    }

    create() {
        const gameWidth = this.cameras.main.width;
        const gameHeight = this.cameras.main.height;

        this.add.text(gameWidth / 2, 60, 'Label the Animal Cell', {
            fontSize: '48px',
            fontFamily: '"Arial Black", Gadget, sans-serif',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5);

        this.add.image(gameWidth / 2, gameHeight / 2 + 20, 'cellDiagram').setScale(0.9);

        const dockHeight = 150;
        const dock = this.add.graphics();
        dock.fillStyle(0x000000, 0.6);
        dock.fillRect(0, gameHeight - dockHeight, gameWidth, dockHeight);

        // --- ** CHANGED: Create Draggable Text instead of Sprites ** ---
        const labelYPosition = gameHeight - dockHeight / 2;
        const positions = [gameWidth * 0.2, gameWidth * 0.4, gameWidth * 0.6, gameWidth * 0.8];
        const labelStyle = { fontSize: '32px', fontFamily: 'Arial', color: '#ffffff', backgroundColor: '#000000', padding: { x: 10, y: 5 } };

        // Create the text objects, make them interactive, and set their origin to the center
        const labelNucleus = this.add.text(positions[0], labelYPosition, 'Nucleus', labelStyle).setOrigin(0.5).setInteractive();
        const labelMito = this.add.text(positions[1], labelYPosition, 'Mitochondrion', labelStyle).setOrigin(0.5).setInteractive();
        const labelMembrane = this.add.text(positions[2], labelYPosition, 'Cell Membrane', labelStyle).setOrigin(0.5).setInteractive();
        const labelGolgi = this.add.text(positions[3], labelYPosition, 'Golgi Apparatus', labelStyle).setOrigin(0.5).setInteractive();

        // ** NEW: Assign a name to each text object for matching **
        labelNucleus.name = 'labelNucleus';
        labelMito.name = 'labelMitochondrion';
        labelMembrane.name = 'labelCellMembrane';
        labelGolgi.name = 'labelGolgi';

        this.input.setDraggable([labelNucleus, labelMito, labelMembrane, labelGolgi]);
        
        // Add separator lines (unchanged)
        const lineGraphics = this.add.graphics();
        lineGraphics.lineStyle(2, 0xffffff, 0.3);
        for (let i = 0; i < positions.length -1; i++) {
             const separatorX = (positions[i] + positions[i+1]) / 2;
             lineGraphics.moveTo(separatorX, gameHeight - dockHeight + 20);
             lineGraphics.lineTo(separatorX, gameHeight - 20);
             lineGraphics.strokePath();
        }

        // --- Slot/Line creation is unchanged ---
        this.createLabelSlotAndLine({ name: 'labelNucleus', organelleX: 930, organelleY: 520, slotX: 1400, slotY: 300 });
        this.createLabelSlotAndLine({ name: 'labelGolgi', organelleX: 1110, organelleY: 600, slotX: 1400, slotY: 750 });
        this.createLabelSlotAndLine({ name: 'labelMitochondrion', organelleX: 810, organelleY: 630, slotX: 520, slotY: 750 });
        this.createLabelSlotAndLine({ name: 'labelCellMembrane', organelleX: 700, organelleY: 440, slotX: 520, slotY: 300 });

        // --- Event Listeners with updated logic ---
        this.input.on('dragstart', (pointer, gameObject) => {
            gameObject.setData('startPos', { x: gameObject.x, y: gameObject.y });
            this.children.bringToTop(gameObject);
        });

        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.setPosition(dragX, dragY);
        });

        this.input.on('drop', (pointer, gameObject, dropZone) => {
            // ** CHANGED: Check the object's 'name' property instead of 'texture.key' **
            if (gameObject.name === dropZone.name) {
                // Correct drop
                gameObject.setPosition(dropZone.x, dropZone.y);
                gameObject.disableInteractive();
                
                this.tweens.add({
                    targets: gameObject,
                    scaleX: 1.1, // Scale text directly
                    scaleY: 1.1,
                    duration: 100,
                    yoyo: true,
                    ease: 'Sine.easeInOut'
                });
                
                const correctFeedback = this.add.image(dropZone.x, dropZone.y, 'feedbackCorrect').setScale(0.5);
                this.tweens.add({ targets: correctFeedback, alpha: 0, duration: 1000, ease: 'Power2' });

                this.correctPlacements++;
                this.checkWinCondition();
            } else {
                // Wrong drop
                const startPos = gameObject.getData('startPos');
                gameObject.setPosition(startPos.x, startPos.y);

                const wrongFeedback = this.add.image(pointer.x, pointer.y, 'feedbackWrong').setScale(0.5);
                this.tweens.add({ targets: wrongFeedback, alpha: 0, duration: 1000, ease: 'Power2' });
            }
        });

        this.input.on('dragend', (pointer, gameObject, dropped) => {
            if (!dropped) {
                const startPos = gameObject.getData('startPos');
                gameObject.setPosition(startPos.x, startPos.y);
            }
        });
    }

    createLabelSlotAndLine(config) {
        // This function is unchanged
        const { name, organelleX, organelleY, slotX, slotY } = config;
        const slotWidth = 250;
        const slotHeight = 70;
        
        const graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 0.5);
        graphics.lineStyle(3, 0xffffff, 0.7);
        graphics.strokeRect(slotX - slotWidth / 2, slotY - slotHeight / 2, slotWidth, slotHeight);
        graphics.fillRect(slotX - slotWidth / 2, slotY - slotHeight / 2, slotWidth, slotHeight);
        
        const line = this.add.graphics();
        line.lineStyle(3, 0xffffff, 0.9);
        line.moveTo(organelleX, organelleY);
        line.lineTo(slotX, slotY);
        line.strokePath();

        const zone = this.add.zone(slotX, slotY, slotWidth, slotHeight).setRectangleDropZone(slotWidth, slotHeight);
        zone.name = name;
    }

    checkWinCondition() {
        if (this.correctPlacements >= 4) {
             this.game.events.emit('game-over', { score: 100, passed: true });
        }
    }
}