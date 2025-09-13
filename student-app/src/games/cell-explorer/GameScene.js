import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        this.correctPlacements = 0;
        this.totalLabels = 7; // total number of labels
    }

    preload() {
        this.load.image('cellDiagram', 'public/assets/CellExplorerAsset/cell-diagram.png');
        this.load.image('feedbackCorrect', 'public/assets/CellExplorerAsset/feedback-correct.png');
        this.load.image('feedbackWrong', 'public/assets/CellExplorerAsset/feedback-wrong.png');
    }

    create() {
        const gameWidth = this.cameras.main.width;
        const gameHeight = this.cameras.main.height;

        // Heading
        this.add.text(gameWidth / 2, 60, 'Label the Animal Cell', {
            fontSize: '48px',
            fontFamily: '"Arial Black", Gadget, sans-serif',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5);

        // Cell diagram
        this.add.image(gameWidth / 2, gameHeight / 2 + 20, 'cellDiagram').setScale(0.9);

        // Dock for labels
        const dockHeight = 180;
        const dock = this.add.graphics();
        dock.fillStyle(0x000000, 0.6);
        dock.fillRect(0, gameHeight - dockHeight, gameWidth, dockHeight);

        const labelYPosition = gameHeight - dockHeight / 2;
        const leftMargin = 50;   // Left-aligned dock
        const gap = 280;         // Horizontal gap between labels

        const labelStyle = { 
            fontSize: '28px', 
            fontFamily: 'Arial', 
            color: '#ffffff', 
            backgroundColor: '#000000', 
            padding: { x: 8, y: 5 } 
        };

        // Create 7 labels left-aligned
        const labels = [
            { text: 'Nucleus', name: 'labelNucleus' },
            { text: 'Mitochondrion', name: 'labelMitochondrion' },
            { text: 'Cell Membrane', name: 'labelCellMembrane' },
            { text: 'Golgi Apparatus', name: 'labelGolgi' },
            { text: 'Ribosome', name: 'labelRibosome' },
            { text: 'Cytoplasm', name: 'labelCytoplasm' },
            { text: 'Endoplasmic Reticulum', name: 'labelER' },
        ];

        const labelObjects = [];

        labels.forEach((lbl, i) => {
            const x = leftMargin + i * gap;
            const labelObj = this.makeLabel(x, labelYPosition, lbl.text, lbl.name, labelStyle);
            labelObjects.push(labelObj);
        });

        this.input.setDraggable(labelObjects);

        // Draw separators between labels
        
        

        // Create label slots (adjust coordinates to fit diagram)
        this.createLabelSlotAndLine({ name: 'labelNucleus', organelleX: 930, organelleY: 520, slotX: 1400, slotY: 300 });
        this.createLabelSlotAndLine({ name: 'labelGolgi', organelleX: 1110, organelleY: 600, slotX: 1400, slotY: 750 });
        this.createLabelSlotAndLine({ name: 'labelMitochondrion', organelleX: 810, organelleY: 630, slotX: 520, slotY: 750 });
        this.createLabelSlotAndLine({ name: 'labelCellMembrane', organelleX: 700, organelleY: 440, slotX: 520, slotY: 300 });
        this.createLabelSlotAndLine({ name: 'labelRibosome', organelleX: 890, organelleY: 620, slotX: 250, slotY: 500 });
        this.createLabelSlotAndLine({ name: 'labelCytoplasm', organelleX: 1000, organelleY: 650, slotX: 1150, slotY: 900 });
        this.createLabelSlotAndLine({ name: 'labelER', organelleX: 970, organelleY: 420, slotX: 750, slotY: 200 });

        // --- Event Listeners ---
        this.input.on('dragstart', (pointer, gameObject) => {
            gameObject.setData('startPos', { x: gameObject.x, y: gameObject.y });
            this.children.bringToTop(gameObject);
        });

        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.setPosition(dragX, dragY);
        });

        this.input.on('drop', (pointer, gameObject, dropZone) => {
            if (gameObject.name === dropZone.name) {
                gameObject.setPosition(dropZone.x, dropZone.y);
                gameObject.disableInteractive();

                this.tweens.add({
                    targets: gameObject,
                    scaleX: 1.1,
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

    makeLabel(x, y, text, name, style) {
        const label = this.add.text(x, y, text, style).setOrigin(0.5).setInteractive();
        label.name = name;
        return label;
    }

    createLabelSlotAndLine(config) {
        const { name, organelleX, organelleY, slotX, slotY } = config;
        const slotWidth = 220;
        const slotHeight = 60;

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
        if (this.correctPlacements >= this.totalLabels) {
            this.game.events.emit('game-over', { score: 100, passed: true });
        }
    }
}
