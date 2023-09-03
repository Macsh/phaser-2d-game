class Level1 extends Phaser.Scene {
  constructor() {
    super("level1Scene");
  }

  preload() {
    this.load.audio("level1-music", "assets/level1.mp3");
    this.load.audio("attack-hugo", "assets/attack-hugo.mp3");
    this.load.audio("open-door", "assets/open-door.mp3");
    this.load.audio("close-door", "assets/close-door.mp3");
    this.load.image('map-level-1', 'assets/map-base-level1.png');
    this.load.spritesheet("map-level1-rooms", "assets/map-level1-rooms.png", {
      frameWidth: 700,
      frameHeight: 600,
      margin: 100,
      spacing: 150,
    });
    this.load.spritesheet('player-hugo', 'assets/hugo.png', { frameWidth: 55, frameHeight: 55, margin: 9, spacing: 9 });
    this.load.spritesheet('seb', 'assets/seb.png', { frameWidth: 55, frameHeight: 55, margin: 9, spacing: 9 });
    this.load.spritesheet('npc-male-1', 'assets/NPC-Male-1.png', { frameWidth: 55, frameHeight: 55, margin: 9, spacing: 9 });
    this.load.spritesheet('npc-male-2', 'assets/NPC-Male-2.png', { frameWidth: 55, frameHeight: 55, margin: 9, spacing: 9 });
    this.load.spritesheet('npc-male-3', 'assets/NPC-Male-3.png', { frameWidth: 55, frameHeight: 55, margin: 9, spacing: 9 });
    this.load.spritesheet('npc-male-4', 'assets/NPC-Male-4.png', { frameWidth: 55, frameHeight: 55, margin: 9, spacing: 9 });
    this.load.spritesheet('npc-female-1', 'assets/NPC-Female-1.png', { frameWidth: 55, frameHeight: 55, margin: 9, spacing: 9 });
    this.load.spritesheet('npc-female-2', 'assets/NPC-Female-2.png', { frameWidth: 55, frameHeight: 55, margin: 9, spacing: 9 });
    this.load.spritesheet('npc-female-3', 'assets/NPC-Female-3.png', { frameWidth: 55, frameHeight: 55, margin: 9, spacing: 9 });
    this.load.spritesheet('npc-female-4', 'assets/NPC-Female-4.png', { frameWidth: 55, frameHeight: 55, margin: 9, spacing: 9 });
    this.load.image('attack', 'assets/qrcode-attack.png');
    this.npcList = ['npc-male-1', 'npc-male-2', 'npc-male-3', 'npc-male-4', 'npc-female-1', 'npc-female-2', 'npc-female-3', 'npc-female-4'];
    this.locationList = ['north-hallway', 'north-corridor', 'center-hallway', 'east-corridor', 'south-hallway', 'cafetaria'];
    this.spawnableCoords = { "north-hallway": [[215.5, 670.5], [194.5, 220.5]], "north-corridor": [[389.5, 495.5], [378.7, 622.5]], "center-hallway": [[59.5, 975.9], [534.5, 560.5]], "east-corridor": [[892.5, 917.5], [605, 1080]], "south-hallway": [[59.5, 765.5], [1101.5, 1126.5]], "cafetaria": [[777.5, 957.5], [1101.5, 1543.5]], 'cafetaria-talkable': [[800, 957], [1470, 1543]], 'room1': [[187, 576], [373, 432]], 'room2': [[137, 218], [177, 232]], 'room3': [[231, 624], [438, 492]], 'room4': [[501, 577], [237, 297]], 'room5': [[137, 218], [177, 232]], 'room6': [[187, 576], [373, 432]] };
    this.spawnedNpcs = { "north-hallway": 0, "north-corridor": 0, "center-hallway": 0, "east-corridor": 0, "south-hallway": 0, "cafetaria": 0 };
    this.numberOfNpcs = 0;
    this.lastDirection = "";
    this.npcVisible = true;
    this.talkableSpawnableList = ['cafetaria-talkable', 'room1', 'room2', 'room3', 'room4', 'room5', 'room6'];
    this.sebLocation = '';
    this.displayTalkable = false;
  }

  create() {
    var self = this;
    self.background = self.add.image(0, 0, 'map-level-1');
    self.background.setOrigin(0, 0);
    self.physics.world.setBounds(0, 0, 998, 1610);
    Utils.generateWalls(self);
    self.player = self.physics.add.sprite(450, 500, 'player-hugo', 1);
    if (self.anims) {
      self.anims.remove("left");
      self.anims.remove("right");
      self.anims.remove("forward");
      self.anims.remove("backward");
      self.anims.remove("idle");
      self.anims.remove("attack_anim");
    }
    self.player.setSize(45, 55);
    self.player.setOffset(0);
    self.player.setCollideWorldBounds(true);
    RoomUtils.generateRoomWalls(self);
    self.nextLevelText = self.add.text(2000, 2000, "Appuyez sur entrer", { backgroundColor: '#000000', fill: '#ffffff' })
    self.spacebar = self.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    self.enter = self.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    self.attacks = self.add.group();
    self.npcs = self.add.group();
    self.talkables = self.add.group();
    Utils.randomNpcManager(self);
    self.randomRoomSpawner();
    self.time = setInterval(function () {
      if (self.numberOfNpcs < 10) {
        Utils.randomNpcManager(self);
      }
    }, 5000);
    Utils.animationManager(self, "player-hugo");

    self.cursors = self.input.keyboard.createCursorKeys();
    self.playerWallCollider = self.physics.add.collider(
      self.player,
      self.walls
    );
    self.physics.add.collider(self.player, self.background);
    self.physics.add.collider(self.npcs, self.walls);
    self.physics.add.collider(self.npcs, self.background);
    self.physics.add.collider(self.player, self.npcs, function (player, npc) {
      if (!npc.body.touching.none) {
        npc.body.moves = false;
      }
    }, null, self);
    self.physics.add.collider(self.attacks, self.walls, function (attack, wall) {
      attack.destroy();
    }, null, self);
    self.physics.add.collider(self.talkables, self[self.sebLocation === "cafetaria-talkable" ? "walls" : self.sebLocation]);
    self.physics.add.collider(self.talkables, self.background);
    self.physics.add.collider(self.player, self.talkables);
    self.physics.add.collider(self.attacks, self.npcs, function (attack, npc) {
      npc.destroy();
      attack.destroy();
      self.numberOfNpcs--;
      self.spawnedNpcs[npc.npcLocation]--;
    }, null, self);
    self.cameras.main.setBounds(0, 0, 998, 1610);
    self.cameras.main.startFollow(self.player);
    self.cameras.main.setZoom(2.5);
    self.Level1Sound = self.sound.add("level1-music", { loop: true });
    self.Level1Sound.volume = 0.5;
    self.Level1Sound.play();
    self.AttackHugoSound = self.sound.add("attack-hugo", { loop: false });
    self.OpenDoorSound = self.sound.add("open-door", { loop: false });
    self.CloseDoorSound = self.sound.add("close-door", { loop: false });
  }

  update() {
    Utils.movePlayerManager(this);
    if (Utils.playerIsCloseTalkable(this, this.talkables.getChildren()[0].x, this.talkables.getChildren()[0].y) && (this.rooms && this.rooms.name === this.sebLocation || !this.rooms && this.sebLocation === "cafetaria-talkable")) {
      this.nextLevelText.x = this.cameras.main._scrollX + 700;
      this.nextLevelText.y = this.cameras.main._scrollY + 450;
      if (Phaser.Input.Keyboard.JustDown(this.enter)) {
        clearInterval(this.time);
        this.sebLastLocation = [this.player.x, this.player.y];
        this.Level1Sound.stop();
        this.scene.start('level2Intro');
      }
    } else {
      this.nextLevelText.x = 2000;
      this.nextLevelText.y = 2000;
    }

    if (!this.rooms) {
      if (this.sebLocation === 'cafetaria-talkable') {
        this.displayTalkable = true;
      }
      this.npcVisible = true;
      RoomUtils.changeRoomConditions(this);
    } else {
      if (this.sebLocation !== this.rooms.name) {
        this.displayTalkable = false;
      } else {
        this.displayTalkable = true;
      }
      this.npcVisible = false;
      RoomUtils.leaveRoomConditions(this);
    }

    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      this.attack();
    }

    for (var i = 0; i < this.npcs.getChildren().length; i++) {
      var npc = this.npcs.getChildren()[i];
      npc.update();
    }

    for (var i = 0; i < this.talkables.getChildren().length; i++) {
      var npc = this.talkables.getChildren()[i];
      npc.update();
    }

    // DEBUG ONLY - REMOVE LATER
    // console.log([
    //   `screen x: ${this.player.x}`,
    //   `screen y: ${this.player.y}`,
    // ]);
  }

  attack() {
    this.AttackHugoSound.play();
    var attack = new Attack(this);
  }

  randomRoomSpawner() {
    var randomLocation = this.talkableSpawnableList[Math.floor(Math.random() * 7)];
    var randomX = Math.floor(Math.random() * (this.spawnableCoords[randomLocation][0][1] - this.spawnableCoords[randomLocation][0][0] + 1) + this.spawnableCoords[randomLocation][0][0]);
    var randomY = Math.floor(Math.random() * (this.spawnableCoords[randomLocation][1][1] - this.spawnableCoords[randomLocation][1][0] + 1) + this.spawnableCoords[randomLocation][1][0]);
    this.sebLocation = randomLocation;
    if (this.sebLocation === 'cafetaria-talkable') {
      this.displayTalkable = true;
    }
    new Npc(this, randomLocation, randomX, randomY, 'seb');
  }
}
