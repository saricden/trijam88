import {Scene} from 'phaser';

class BootScene extends Scene {
  constructor() {
    super("scene-boot");
  }
  
  preload() {
    // Load any assets here from your assets directory
    this.load.spritesheet('mc-top', 'assets/mc-tater-top.png', {
      frameWidth: 16,
      frameHeight: 8
    });

    this.load.spritesheet('mc-bottom', 'assets/mc-tater-bottom.png', {
      frameWidth: 16,
      frameHeight: 8
    });

    this.load.spritesheet('npc', 'assets/npc-tater.png', {
      frameWidth: 16,
      frameHeight: 16
    });

    this.load.image('tileset', 'assets/tileset.png');
    this.load.tilemapTiledJSON('map1', 'assets/map1.json');
    this.load.tilemapTiledJSON('map2', 'assets/map2.json');
    this.load.tilemapTiledJSON('map3', 'assets/map3.json');

    this.load.image('fire', 'assets/fire.png');
  }

  create() {
    this.scene.start('scene-level1');

    this.anims.create({
      key: 'mc-run',
      repeat: -1,
      frameRate: 10,
      frames: this.anims.generateFrameNumbers('mc-bottom', { start: 0, end: 2 })
    });

    this.anims.create({
      key: 'mc-idle',
      repeat: -1,
      frameRate: 5,
      frames: this.anims.generateFrameNumbers('mc-bottom', { start: 0, end: 0 })
    });

    this.anims.create({
      key: 'mc-jump',
      repeat: -1,
      frameRate: 5,
      frames: this.anims.generateFrameNumbers('mc-bottom', { start: 4, end: 4 })
    });

    this.anims.create({
      key: 'mc-fall',
      repeat: -1,
      frameRate: 5,
      frames: this.anims.generateFrameNumbers('mc-bottom', { start: 3, end: 3 })
    });

    this.anims.create({
      key: 'npc-run',
      repeat: -1,
      frameRate: 10,
      frames: this.anims.generateFrameNumbers('npc', { start: 0, end: 2 })
    });

    this.anims.create({
      key: 'npc-roasted',
      repeat: -1,
      frameRate: 5,
      frames: this.anims.generateFrameNumbers('npc', { start: 3, end: 3 })
    });
  }
}

export default BootScene;