import {GameObjects} from 'phaser';

const {Sprite} = GameObjects;

class npc extends Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'npc', 0);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.isFlipped = (Math.random() > 0.5);
    this.isDead = false;
  }

  update() {
    const hitLeft = this.body.blocked.left;
    const hitRight = this.body.blocked.right;

    this.setFlipX(this.isFlipped);

    if (!this.isDead) {
      if (this.isFlipped) {
        this.body.setVelocityX(-50);
      }
      else {
        this.body.setVelocityX(50);
      }
    }
    else {
      this.body.setVelocityX(0);
    }

    if (hitLeft) {
      this.isFlipped = false;
    }
    else if (hitRight) {
      this.isFlipped = true;
    }

    // Animations
    if (!this.isDead) {
      this.anims.play('npc-run', true);
    }
    else {
      this.anims.play('npc-roasted', true);
    }
  }
}

export default npc;