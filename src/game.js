import style from './main.css';
import Phaser, {Game} from 'phaser';
import BootScene from './scenes/BootScene';
import Level1 from './scenes/Level1';
import Level2 from './scenes/Level2';
import Level3 from './scenes/Level3';
import GameOverScene from './scenes/GameOverScene';
import YouWinScene from './scenes/YouWinScene';

const canvas = document.getElementById('game-canvas');
const config = {
  type: Phaser.WEB_GL,
  width: window.innerWidth,
  height: window.innerHeight,
  canvas,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 400 },
      debug: false
    }
  },
  pixelArt: true,
  scene: [
    BootScene,
    Level1,
    Level2,
    Level3,
    GameOverScene,
    YouWinScene
  ]
};

const game = new Game(config);