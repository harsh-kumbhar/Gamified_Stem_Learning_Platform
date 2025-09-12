import Phaser from 'phaser';
import IdentifierScene from './IdentifierScene';

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
    backgroundColor: '#000000', // Black background from the start
    scene: [IdentifierScene],
  };

  return new Phaser.Game(config);
};
