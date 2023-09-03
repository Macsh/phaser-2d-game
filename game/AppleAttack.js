class AppleAttack extends Phaser.GameObjects.Sprite {
  constructor(scene, xTarget, yTarget) {

    var x = scene.apple.getChildren()[0].x;
    var y = scene.apple.getChildren()[0].y;
    super(scene, x, y, "shock-explosion-3");
    scene.physics.world.enableBody(this);
    this.xTarget = xTarget;
    this.yTarget = yTarget;
    scene.add.existing(this);
    this.displayWidth = 60;
    this.displayHeight = 60;
    this.body.setSize(200, 200, false).setOffset(200, 200);
    this.counter = 0;
    this.destroyCounter = 0;
    this.play("apple_attack");
    scene.appleAttacks.add(this);
  }

  update() {
    this.scene.physics.moveTo(this, this.xTarget, this.yTarget, 230);
    if (this.checkIfArrived() && this.destroyCounter === 0) {
      this.destroyAttack();
    }
  }

  checkIfArrived() {
    var distanceX = this.x - this.xTarget;
    var distanceY = this.y - this.yTarget;
    if ((distanceX <= 2 && distanceX >= -2) && (distanceY <= 2 && distanceY >= -2)) {
      return true;
    } else {
      return false;
    }
  }

  destroyAttack() {
    this.destroyCounter++;
    this.play("apple_attack_destroy");
    this.once('animationcomplete', () => {
      this.destroy();
    })
  }
}
