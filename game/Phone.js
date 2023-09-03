class Phone extends Phaser.GameObjects.Sprite {
  constructor(scene, randomLocation, randomX, randomY) {
    super(scene, randomX, randomY, 'phone', 0);
    scene.add.existing(this);
    scene.physics.world.enableBody(this);
    this.phoneLocation = randomLocation;
    this.xPosition = randomX;
    this.body.setSize(10, 10);
    if (this.phoneLocation === 'cafetaria-talkable') {
      this.setScale(0.05);
    } else {
      this.setScale(0.07);
    }
    this.body.setOffset(0);
    this.body.setVelocityX(0);
    this.body.setVelocityY(0);
    this.body.setCollideWorldBounds(true);
    this.isVisible = true;
    scene.phone.add(this);
  }

  update() {
    this.isVisible = this.scene.playerLocation === this.phoneLocation;
    if (!this.isVisible) {
      this.setVisible(false);
      this.body.enable = false;
      return;
    } else {
      this.setVisible(true);
      this.body.enable = true;
    }
  }
}