class Npc extends Phaser.GameObjects.Sprite {

  target;

  constructor(scene, randomLocation, randomX, randomY, talkable = undefined) {
    var randomNpc;
    var npcSprite;
    if (talkable) {
      npcSprite = talkable;
    } else {
      randomNpc = Math.floor(Math.random() * 8);
      npcSprite = scene.npcList[randomNpc];
    }

    super(scene, randomX, randomY, npcSprite, 1);
    this.talkable = Boolean(talkable);
    scene.add.existing(this);
    scene.physics.world.enableBody(this);
    this.npcLocation = randomLocation;
    this.body.setSize(45, 55);
    this.body.setOffset(0);
    this.body.setVelocityX(0);
    this.body.setVelocityY(0);
    if (this.talkable && randomLocation !== 'cafetaria-talkable') {
      this.setScale(1.5);
    }
    this.body.setCollideWorldBounds(true);
    this.animationManager(npcSprite);
    this.heading = {
      x: 0,
      y: 0
    }
    this.movementStack = new Array();
    this.isVisible = true;
    this.target = scene.player;
    this.updatePositon();
    if (!this.talkable) {
      scene.npcs.add(this);
    } else {
      scene.talkables.add(this);
    }
  }

  update() {
    var coords;
    if (!this.scene.npcVisible && !this.talkable) {
      this.setVisible(false);
      this.body.enable = false;
      return;
    } else if (!this.talkable) {
      this.setVisible(true);
      this.body.enable = true;
    }
    if (this.talkable && this.scene.displayTalkable) {
      this.setVisible(true);
      this.body.enable = true;
    } else if (this.talkable) {
      this.setVisible(false);
      this.body.enable = false;
    }
    if (coords = this.movementStack.pop()) {
      this.scene.physics.moveTo(this, coords.x, coords.y, 60);
      this.anims.play(this.checkDirection(), true);
    } else if (this.heading.x != this.x || this.heading.y != this.y) {
      this.scene.physics.moveTo(this, this.heading.x, this.heading.y, 60);
      this.anims.play(this.checkDirection(), true);
    }

    if (this.scene.isInvisible && this.body.touching.none) {
      this.body.moves = true;
    }

    if (this.checkIfArrived()) {
      this.body.setVelocityX(0);
      this.body.setVelocityY(0);
      this.anims.play("idle", true);
    }

    if (this.isNotOnLocation() && this.targetIsTooFar() && !this.talkable) {
      this.body.moves = true;
      this.body.reset(this.heading.x, this.heading.y);
      this.updatePositon();
    }

    if (this.targetIsClose() && !this.talkable && !this.scene.isInvisible) {
      this.scene.physics.moveTo(this, this.target.x, this.target.y, 130);
      if (this.body.touching.none) {
        this.body.moves = true;
      }
      this.heading = {
        x: this.target.x,
        y: this.target.y,
      }
      this.anims.play(this.checkDirection(), true);
    } else if (Math.floor(Math.random() * 100) == 0) {
      this.updatePositon();
    }
  }

  updatePositon() {
    var randomX = Math.floor(Math.random() * (this.scene.spawnableCoords[this.npcLocation][0][1] - this.scene.spawnableCoords[this.npcLocation][0][0] + 1) + this.scene.spawnableCoords[this.npcLocation][0][0]);
    var randomY = Math.floor(Math.random() * (this.scene.spawnableCoords[this.npcLocation][1][1] - this.scene.spawnableCoords[this.npcLocation][1][0] + 1) + this.scene.spawnableCoords[this.npcLocation][1][0]);

    this.heading = {
      x: randomX,
      y: randomY,
    }

    this.movementStack.push({
      x: randomX,
      y: randomY,
    });
  }

  checkIfArrived() {
    var distanceX = this.x - this.heading.x;
    var distanceY = this.y - this.heading.y;
    if ((distanceX <= 2 && distanceX >= -2) && (distanceY <= 2 && distanceY >= -2)) {
      return true;
    } else {
      return false;
    }
  }

  checkDirection() {
    var distanceX = this.x - this.heading.x;
    var distanceY = this.y - this.heading.y;
    if (distanceX > 0 && distanceX > distanceY) {
      return "left";
    } else if (distanceX < 0 && distanceX < distanceY) {
      return "right";
    } else if (distanceY > 0 && distanceY > distanceX) {
      return "forward";
    } else {
      return "backward";
    }
  }

  targetIsClose() {
    var distanceX = this.x - this.target.x;
    var distanceY = this.y - this.target.y;
    if ((distanceX <= 100 && distanceX >= -100) && (distanceY <= 100 && distanceY >= -100)) {
      return true;
    } else {
      return false;
    }
  }

  targetIsTooFar() {
    var distanceX = this.x - this.target.x;
    var distanceY = this.y - this.target.y;
    if ((distanceX >= 400 || distanceX <= -400) || (distanceY >= 400 || distanceY <= -400)) {
      return true;
    } else {
      return false;
    }
  }

  isNotOnLocation() {
    if (this.x >= this.scene.spawnableCoords[this.npcLocation][0][0] && this.x <= this.scene.spawnableCoords[this.npcLocation][0][1] && this.y >= this.scene.spawnableCoords[this.npcLocation][1][0] && this.y <= this.scene.spawnableCoords[this.npcLocation][1][1]) {
      return false;
    } else {
      return true;
    }
  }

  animationManager(npc) {
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers(npc, { start: 117, end: 125 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'forward',
      frames: this.anims.generateFrameNumbers(npc, { start: 104, end: 112 }),
      frameRate: 10,
      repeat: -1

    });
    this.anims.create({
      key: 'idle',
      frames: [{ key: npc, frame: 130 }],
      frameRate: 0
    });
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers(npc, { start: 143, end: 151 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'backward',
      frames: this.anims.generateFrameNumbers(npc, { start: 130, end: 138 }),
      frameRate: 10,
      repeat: -1
    });
  }
}