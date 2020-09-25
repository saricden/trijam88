import {Scene} from 'phaser';

class YouWinScene extends Scene {

  constructor() {
    super("scene-youwin");
  }

  create() {

    this.titleText = this.add.text(window.innerWidth / 2, window.innerHeight / 2, 'YOU WIN! :D', {
      color: '#FFF'
    });

    this.titleText.setOrigin(0.5);

    this.tweens.add({
      targets: this.titleText,
      scale: 30,
      duration: 5000,
      repeat: 0,
      ease: 'Linear',
      onComplete: () => {
        this.scene.start('scene-level1');
      }
    })
  }

}

export default YouWinScene;