class NumberSprite extends Phaser.GameObjects.Sprite {
  constructor(scene, randomLocation, randomX, randomY, sprite, index) {
    super(scene, randomX, randomY, 'numbers', sprite);
    scene.add.existing(this);
    scene.physics.world.enableBody(this);
    this.index = index;
    this.numberLocation = randomLocation;
    this.xPosition = randomX;
    this.body.setSize(7, 10);
    this.body.setOffset(0);
    this.body.setVelocityX(0);
    this.body.setVelocityY(0);
    this.setScale(1.5);
    this.body.setCollideWorldBounds(true);
    this.heading = {
      x: 0,
      y: 0
    }
    this.movementStack = new Array();
    this.isVisible = true;
    this.updatePositon();
    scene.numbers.add(this);
  }

  update() {
    var coords;
    this.isVisible = this.scene.playerLocation === this.numberLocation;
    if (!this.isVisible) {
      this.setVisible(false);
      this.body.enable = false;
      return;
    } else {
      this.setVisible(true);
      this.body.enable = true;
    }
    
    if (coords = this.movementStack.pop()) {
      this.scene.physics.moveTo(this, coords.x, coords.y, 20);
    } else if (this.heading.x != this.x || this.heading.y != this.y) {
      this.scene.physics.moveTo(this, this.heading.x, this.heading.y, 20);
    }

    if (this.checkIfArrived()) {
      this.body.setVelocityX(0);
      this.body.setVelocityY(0);
      this.updatePositon();
    }
  }

  updatePositon() {
    var x = this.xPosition;
    var y = this.body.y > this.scene.spawnableCoords[this.numberLocation][0][1] ? this.scene.spawnableCoords[this.numberLocation][0][1] - 10 : this.scene.spawnableCoords[this.numberLocation][0][1] + 10;
    this.heading = {
      x,
      y,
    }

    this.movementStack.push({
      x,
      y,
    });
  }

  checkIfArrived() {
    var distanceX = this.x - this.heading.x;
    var distanceY = this.y - this.heading.y;
    if ((distanceX <= 1 && distanceX >= -1) && (distanceY <= 1 && distanceY >= -1)) {
      return true;
    } else {
      return false;
    }
  }
}