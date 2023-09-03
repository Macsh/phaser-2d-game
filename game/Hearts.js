class Hearts extends Phaser.GameObjects.Sprite {
  constructor(scene, xTarget, yTarget, index, type) {

    super(scene, xTarget, yTarget, type);
    scene.physics.world.enableBody(this);
    scene.add.existing(this);
    this.body.setCollideWorldBounds(true);
    this.type = type;
    this.index = index;
    this.xPosition = xTarget;
    if (type === "purple-heart") {
      this.setScale(0.03);
    } else {
      this.setScale(0.7);
    }
    scene.hearts.add(this);
  }

  update() {
    if (this.type === "purple-heart") {
      this.x = this.xPosition + this.scene.cameras.main._scrollX + 360;
      if (this.scene.apple.getChildren()[0].life < this.index + 1) {
        this.destroy();
      }
    } else {
      this.x = this.xPosition + this.scene.cameras.main._scrollX + 380;
      if (this.scene.life < this.index + 1) {
        this.destroy();
      }
    }
  }
}
