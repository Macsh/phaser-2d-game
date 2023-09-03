class Attack extends Phaser.GameObjects.Sprite{
  constructor(scene){

    var x = scene.player.x;
    var y = scene.player.y - 16;
    super(scene, x, y, "attack");
    scene.add.existing(this);
    this.setScale(0.1);
    this.play("attack_anim");
    scene.physics.world.enableBody(this);
    if (scene.cursors.up.isDown || scene.lastDirection == "forward") {
      this.body.setVelocity(0, -260);
    } else if (scene.cursors.down.isDown || scene.lastDirection == "backward") {
      this.body.setVelocity(0, 260);
    } else if (scene.cursors.left.isDown || scene.lastDirection == "left") {
      this.body.setVelocity(-260, 0);
    } else if (scene.cursors.right.isDown || scene.lastDirection == "right") {
      this.body.setVelocity(260, 0);
    } else {
      this.body.setVelocity(0, 260);
    }
    scene.attacks.add(this);
  }
}
