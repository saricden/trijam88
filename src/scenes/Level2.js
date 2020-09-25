import {Scene} from 'phaser';
import mcTater from '../sprites/mcTater';
import npc from '../sprites/npc';

class Level2 extends Scene {

  constructor() {
    super("scene-level2");
  }

  create() {
    // Add, scale, and make up a speed for our creature
    // this.cat = this.physics.add.sprite(10, 10, 'cat-like');
    // this.cat.body.setAllowGravity(false);
    // this.cat.setScale(0.5);
    // this.catSpeed = 300;
    // // Create a helper object for our arrow keys
    // this.cursors = this.input.keyboard.createCursorKeys();

    this.cameras.main.setBackgroundColor(0x3399CC);

    this.map = this.make.tilemap({ key: 'map2' });
    const tileset = this.map.addTilesetImage('tileset');
    const layer = this.map.createDynamicLayer('solid', tileset);

    const spawnLayer = this.map.getObjectLayer('spawn_points');
    const spawnPoints = spawnLayer.objects;

    layer.setCollisionByProperty({ collides: true });

    this.npcs = [];

    const flameHit = {
      contains: (x, y) => {
        for (let n in this.npcs) {
          if (this.npcs[n].body.hitTest(x, y) && !this.npcs[n].isDead) {
            this.npcs[n].isDead = true;
            this.killCount++;

            if (this.killCount >= this.maxKills) {
              this.scene.start('scene-level3');
            }
            // return true;
          }
        }

        return false;
      }
    }

    for (let i in spawnPoints) {
      const point = spawnPoints[i];

      if (point.name === 'mc') {
        this.flameParticle = this.add.particles('fire');
        this.flamethrower = this.flameParticle.createEmitter({
          x: point.x,
          y: point.y,
          lifespan: 4000,
          speed: { min: 10, max: 50 },
          angle: 0,
          gravityY: -50,
          scale: { start: 0.4, end: 1 },
          quantity: 2,
          deathZone: { type: 'onEnter', source: flameHit }
        });

        this.flameParticle.setDepth(10);

        this.mc = new mcTater(this, point.x, point.y, this.flamethrower);

        this.mc.setDepth(1);

        this.cameras.main.startFollow(this.mc);
        this.cameras.main.setZoom(4);

        this.timerText = this.add.text(point.x, (point.y - 15), '', {
          color: '#000',
          fontSize: 10
        });
        this.timerText.setOrigin(0.5);
        
        this.physics.add.collider(this.mc, layer);
      }
      else if (point.type === 'npc') {
        this.npcs.push(new npc(this, point.x, point.y));

        this.physics.add.collider(this.npcs, layer);
      }
    }

    this.killCount = 0;
    this.maxKills = this.npcs.length;
    this.secondsRemaining = 20;

    this.timer = this.time.addEvent({
      delay: 1000,
      callback: this.updateTimer,
      callbackScope: this,
      loop: true
    });
  }

  updateTimer() {
    this.secondsRemaining--;
    this.timerText.setText(this.secondsRemaining);

    if (this.secondsRemaining === 0) {
      this.timer.remove();
      this.scene.start('scene-gameover');
    }
  }

  update() {
    if (this.mc) {
      this.mc.update();
      this.timerText.setPosition(this.mc.x, this.mc.y - 15);

      if (this.mc.isFlipped) {
        this.flamethrower.setPosition(this.mc.x - 2, this.mc.y);
        this.flamethrower.setAngle(180);
      }
      else {
        this.flamethrower.setPosition(this.mc.x + 2, this.mc.y);
        this.flamethrower.setAngle(0);
      }
    }

    if (this.npcs.length) {
      for (let n in this.npcs) {
        this.npcs[n].update();
      }
    }
  }

}
export default Level2;