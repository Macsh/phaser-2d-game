class Menu extends Phaser.Scene {
  constructor() {
    super("menuScene");
  }

  create() {
    this.add.text(20, 20, "Ce sera le menu");
    this.scene.start("level1Intro");
  }
}