import {GameObjects} from 'phaser';

const {Container} = GameObjects;

class mcTater extends Container {
  constructor(scene, x, y, flamethrower) {

    const children = [
      scene.add.sprite(0, -4, 'mc-top'),
      scene.add.sprite(0, 4, 'mc-bottom')
    ];

    super(scene, x, y, children);

    this.setSize(16, 16);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.cursors = scene.input.keyboard.createCursorKeys();
    this.topSprite = children[0];
    this.bottomSprite = children[1];
    this.flamethrower = flamethrower;
  }

  setFlipX(flip) {
    this.isFlipped = flip;
    this.list.forEach((child) => {
      child.setFlipX(flip);
    })
  }

  update() {
    const {left, right, up, space} = this.cursors;
    const grounded = this.body.blocked.down;

    if (left.isDown) {
      this.body.setVelocityX(-100);
      this.setFlipX(true);
    }
    else if (right.isDown) {
      this.body.setVelocityX(100);
      this.setFlipX(false);
    }
    else {
      this.body.setVelocityX(0);
    }

    if (grounded && up.isDown) {
      this.body.setVelocityY(-200);
    }

    if (space.isDown) {
      this.flamethrower.start();
    }
    else {
      this.flamethrower.stop();
    }

    // Animations
    if (grounded && this.body.velocity.x !== 0) {
      this.bottomSprite.anims.play('mc-run', true);
    }
    else if (grounded) {
      this.bottomSprite.anims.play('mc-idle', true);
    }
    else if (this.body.velocity.y < 0) {
      this.bottomSprite.anims.play('mc-jump', true);
    }
    else if (this.body.velocity.y >= 0) {
      this.bottomSprite.anims.play('mc-fall', true);
    }
  }
}

export default mcTater;