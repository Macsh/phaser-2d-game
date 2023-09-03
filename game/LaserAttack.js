class LaserAttack extends Phaser.GameObjects.Sprite{
  constructor(scene){

    var x;
    if (scene.player.flipX) {
      x = scene.player.x - 24;
    }
    else {
      x = scene.player.x + 24;
    }
    var y = scene.player.y + 5;
    super(scene, x, y, "laser-turn-on");
    scene.physics.world.enableBody(this);
    scene.add.existing(this);
    this.angle = scene.player.flipX ? 90 : -90;
    this.setScale(0.7);
    this.body.setSize(60, 10, false);
    this.body.setOffset(-20, 25) ;
    this.counter = 0;
    this.play("activate_attack");
    scene.attacks.add(this);
  }

  update() {
    this.x = this.scene.player.flipX ? this.scene.player.x - 24 : this.scene.player.x + 24;
    this.y = this.scene.player.y + 5;
    this.angle = this.scene.player.flipX ? 90 : -90;
    if (!this.scene.spacebar.isDown && this.counter === 0) {
      this.counter++;
      this.play("deactivate_attack");
      this.once('animationcomplete', () => {
        this.scene.AgentAttackSound.stop();
        this.destroy();
      })
    }
  }
}
