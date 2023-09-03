class Level2 extends Phaser.Scene {
  constructor() {
    super("level2Scene");
  }

  preload() {
    this.load.image('map-level-1', 'assets/map-base-level1.png');
    this.load.audio("level2-music", "assets/level2.mp3");
    this.load.audio("open-door", "assets/open-door.mp3");
    this.load.audio("close-door", "assets/close-door.mp3");
    this.load.audio("invisibility_spell", "assets/invisibility_spell.wav")
    this.load.audio("invisibility_available", "assets/invisibility_available.wav")
    this.load.audio("numbers_collect", "assets/numbers_collect.wav")
    this.load.spritesheet("map-level1-rooms", "assets/map-level1-rooms.png", {
      frameWidth: 700,
      frameHeight: 600,
      margin: 100,
      spacing: 150,
    });
    this.load.spritesheet('numbers', 'assets/numbers.png', { frameWidth: 7, frameHeight: 10, margin: 0, spacing: 0 })
    this.load.spritesheet('player-seb', 'assets/seb.png', { frameWidth: 55, frameHeight: 55, margin: 9, spacing: 9 });
    this.load.spritesheet('npc-male-1', 'assets/NPC-Male-1.png', { frameWidth: 55, frameHeight: 55, margin: 9, spacing: 9 });
    this.load.spritesheet('npc-male-2', 'assets/NPC-Male-2.png', { frameWidth: 55, frameHeight: 55, margin: 9, spacing: 9 });
    this.load.spritesheet('npc-male-3', 'assets/NPC-Male-3.png', { frameWidth: 55, frameHeight: 55, margin: 9, spacing: 9 });
    this.load.spritesheet('npc-male-4', 'assets/NPC-Male-4.png', { frameWidth: 55, frameHeight: 55, margin: 9, spacing: 9 });
    this.load.spritesheet('npc-female-1', 'assets/NPC-Female-1.png', { frameWidth: 55, frameHeight: 55, margin: 9, spacing: 9 });
    this.load.spritesheet('npc-female-2', 'assets/NPC-Female-2.png', { frameWidth: 55, frameHeight: 55, margin: 9, spacing: 9 });
    this.load.spritesheet('npc-female-3', 'assets/NPC-Female-3.png', { frameWidth: 55, frameHeight: 55, margin: 9, spacing: 9 });
    this.load.spritesheet('npc-female-4', 'assets/NPC-Female-4.png', { frameWidth: 55, frameHeight: 55, margin: 9, spacing: 9 });
    this.load.image('attack', 'assets/qrcode-attack.png');
    this.load.image('phone', 'assets/phone.png');
    this.npcList = ['npc-male-1', 'npc-male-2', 'npc-male-3', 'npc-male-4', 'npc-female-1', 'npc-female-2', 'npc-female-3', 'npc-female-4'];
    this.locationList = ['north-hallway', 'north-corridor', 'center-hallway', 'east-corridor', 'south-hallway', 'cafetaria'];
    this.spawnableCoords = { "north-hallway": [[215.5, 670.5], [194.5, 220.5]], "north-corridor": [[389.5, 495.5], [378.7, 622.5]], "center-hallway": [[59.5, 975.9], [534.5, 560.5]], "east-corridor": [[892.5, 917.5], [605, 1080]], "south-hallway": [[59.5, 765.5], [1101.5, 1126.5]], "cafetaria": [[777.5, 957.5], [1101.5, 1543.5]], 'cafetaria-talkable': [[888, 1483], [675, 1430]], 'room1': [[430, 410], [494, 200]], 'room2': [[168, 208], [275, 195]], 'room3': [[370, 470], [308, 260]], 'room4': [[545, 268], [433, 260]], 'room5': [[168, 208], [275, 195]], 'room6': [[430, 410], [494, 200]] };
    this.spawnedNpcs = { "north-hallway": 0, "north-corridor": 0, "center-hallway": 0, "east-corridor": 0, "south-hallway": 0, "cafetaria": 0 };
    this.numberOfNpcs = 0;
    this.lastDirection = "";
    this.npcVisible = true;
    this.playerLocation = "";
    this.displayTalkable = false;
    this.numberSpawnableList = ['cafetaria-talkable', 'room1', 'room2', 'room3', 'room4', 'room5', 'room6'];
    this.phoneLocation = '';
    this.displayPhone = false;
    this.numbersToSpawn = ["0", "9", "7", "2", "6", "7", "5", "0", "5", "9"];
    this.foundNumbers = [];
    this.invisibleTimer = 0;
    this.isInvisible = false;
  }

  create() {
    var self = this;
    self.background = self.add.image(0, 0, 'map-level-1');
    self.background.setOrigin(0, 0);
    self.physics.world.setBounds(0, 0, 998, 1610);
    Utils.generateWalls(self);
    self.number0 = self.add.sprite(2000, 2000, 'numbers', 0);
    self.number1 = self.add.sprite(2000, 2000, 'numbers', 9);
    self.number2 = self.add.sprite(2000, 2000, 'numbers', 7);
    self.number3 = self.add.sprite(2000, 2000, 'numbers', 2);
    self.number4 = self.add.sprite(2000, 2000, 'numbers', 6);
    self.number5 = self.add.sprite(2000, 2000, 'numbers', 7);
    self.number6 = self.add.sprite(2000, 2000, 'numbers', 5);
    self.number7 = self.add.sprite(2000, 2000, 'numbers', 0);
    self.number8 = self.add.sprite(2000, 2000, 'numbers', 5);
    self.number9 = self.add.sprite(2000, 2000, 'numbers', 9);
    self.numbers = self.add.group();
    self.phone = self.add.group();
    self.NumbersCollectSound = self.sound.add("numbers_collect", { loop: false });
    self.spawnNumbers();
    if (self.anims) {
      self.anims.remove("left");
      self.anims.remove("right");
      self.anims.remove("forward");
      self.anims.remove("backward");
      self.anims.remove("idle");
      self.anims.remove("attack_anim");
    }
    if (self.scene.get('level1Scene').sebLastLocation && self.scene.get('level1Scene').sebLocation === 'cafetaria-talkable') {
      self.player = self.physics.add.sprite(self.scene.get('level1Scene').sebLastLocation[0], self.scene.get('level1Scene').sebLastLocation[1], 'player-seb', 1);
    } else {
      self.player = self.physics.add.sprite(450, 500, 'player-seb', 1);
    }
    self.player.setSize(45, 55);
    self.player.setOffset(0);
    self.player.setCollideWorldBounds(true);
    RoomUtils.generateRoomWalls(self);
    self.transparentText = self.add.text(2000, 2000, "", { fontSize: '10px', backgroundColor: '#000000', fill: '#ffffff' });
    self.nextLevelText = self.add.text(2000, 2000, "Appuyez sur entrer", {backgroundColor: '#000000', fill: '#ffffff'});
    self.findPhoneText = self.add.text(2000, 2000, "Trouvez le téléphone", { fontSize: '12px', backgroundColor: '#000000', fill: '#ffffff' })
    self.spacebar = self.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    self.enter = self.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    self.attacks = self.add.group();
    self.npcs = self.add.group();
    self.talkables = self.add.group();
    Utils.randomNpcManager(self);
    self.time = setInterval(function () {
      if (self.numberOfNpcs < 10) {
        Utils.randomNpcManager(self);
      }
    }, 5000);
    Utils.animationManager(self, "player-seb");

    self.cursors = self.input.keyboard.createCursorKeys();
    self.playerWallCollider = self.physics.add.collider(
      self.player,
      self.walls
    );
    self.physics.add.collider(self.player, self.background);
    self.physics.add.collider(self.npcs, self.walls);
    self.physics.add.collider(self.npcs, self.background);
    self.playerNpcsCollider = self.physics.add.collider(self.player, self.npcs, function (player, npc) {
      if (!npc.body.touching.none) {
        npc.body.moves = false;
      }
    }, null, self);
    self.physics.add.collider(self.player, self.numbers, function (player, number) {
      self.foundNumbers.push(number.index);
      self.NumbersCollectSound.play();
      number.destroy();
    }, null, self);
    self.cameras.main.setBounds(0, 0, 998, 1610);
    self.cameras.main.startFollow(self.player);
    self.cameras.main.setZoom(2.5);
    if (self.scene.get('level1Scene').sebLocation && self.scene.get('level1Scene').sebLocation !== 'cafetaria-talkable') {
      RoomUtils.changeRoom(self, parseInt(self.scene.get('level1Scene').sebLocation.at(-1)), self.scene.get('level1Scene').sebLastLocation[0], self.scene.get('level1Scene').sebLastLocation[1]);
    }
    self.Level2Sound = self.sound.add("level2-music", { loop: true });
    self.Level2Sound.play();
    self.OpenDoorSound = self.sound.add("open-door", { loop: false });
    self.CloseDoorSound = self.sound.add("close-door", { loop: false });
    self.InvisibilitySpellSound = self.sound.add("invisibility_spell", { loop: false });
    self.InvisibilityAvailableSound = self.sound.add("invisibility_available", { loop: false });
  }

  update() {
    this.playerLocation = this.rooms ? this.rooms.name : "cafetaria-talkable";
    Utils.movePlayerManager(this);
    Utils.foundNumbersConditions(this);
    this.transparentText.x = this.cameras.main._scrollX + 714;
    this.transparentText.y = this.cameras.main._scrollY + 230;

    if (Utils.playerIsCloseTalkable(this, this.phone.getChildren()[0].x, this.phone.getChildren()[0].y) && (this.rooms && this.rooms.name === this.phoneLocation || !this.rooms && this.phoneLocation === "cafetaria-talkable") && this.foundNumbers.length === 10) {
      // this.nextLevelText.x = this.player.x - 90;
      // this.nextLevelText.y = this.player.y - 60;
      this.nextLevelText.x = this.cameras.main._scrollX + 700;
      this.nextLevelText.y = this.cameras.main._scrollY + 450;
      if (Phaser.Input.Keyboard.JustDown(this.enter)) {
        clearInterval(this.time);
        this.Level2Sound.stop();
        this.scene.start('level3Intro');
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
      this.becomeTransparent();
    }

    for (var i = 0; i < this.npcs.getChildren().length; i++) {
      var npc = this.npcs.getChildren()[i];
      npc.update();
    }

    for (var i = 0; i < this.numbers.getChildren().length; i++) {
      var number = this.numbers.getChildren()[i];
      number.update();
    }

    for (var i = 0; i < this.phone.getChildren().length; i++) {
      var number = this.phone.getChildren()[i];
      number.update();
    }

    // console.log([
    //   `screen x: ${this.player.x}`,
    //   `screen y: ${this.player.y}`,
    // ]);
  }

  spawnNumbers() {
    var randomPhoneLocation = this.numberSpawnableList[(Math.floor(Math.random() * this.numberSpawnableList.length))];
    for (var i = 0; i < this.numbersToSpawn.length; i++) {
      var index = Math.floor(Math.random() * this.numberSpawnableList.length)
      var randomLocation = this.numberSpawnableList.splice(index, 1)[0];
      var x = this.spawnableCoords[randomLocation][0][0];
      var y = this.spawnableCoords[randomLocation][0][1];
      if (i === 0 || i === 7) {
        new NumberSprite(this, randomLocation, x, y, this.numbersToSpawn[i], i);
      } else {
        new NumberSprite(this, randomLocation, x, y, this.numbersToSpawn[i], i);
        new NumberSprite(this, randomLocation, x + 10, y, this.numbersToSpawn[i + 1], i + 1);
        i++;
      }
    }
    this.phoneLocation = randomPhoneLocation;
    new Phone(this, randomPhoneLocation, this.spawnableCoords[randomPhoneLocation][1][0], this.spawnableCoords[randomPhoneLocation][1][1]);
  }

  becomeTransparent() {
    if (!this.isInvisible && this.invisibleTimer === 0) {
      var self = this;
      self.InvisibilitySpellSound.play();
      var becomeVisible = setInterval(function () {
        self.player.alpha = 1;
        self.isInvisible = false;
        self.playerNpcsCollider = self.physics.add.collider(self.player, self.npcs, function (player, npc) {
          if (!npc.body.touching.none) {
            npc.body.moves = false;
          }
        }, null, self);
      }, 5000);
      if (self.invisibleTimer === 0) {
        self.player.alpha = 0.5;
        self.isInvisible = true;
        self.transparentText.text = "";
        self.playerNpcsCollider.destroy();
      }

      self.invisibleTime = setInterval(function () {
        self.invisibleTimer++;
        if (self.invisibleTimer >= 5 && self.invisibleTimer < 10) {
          clearInterval(becomeVisible);
          self.transparentText.text = "Recharge invisibilité... " + (10 - self.invisibleTimer);
        } else if (self.invisibleTimer === 10) {
          clearInterval(self.invisibleTime);
          self.InvisibilityAvailableSound.play();
          self.transparentText.text = "";
          self.invisibleTimer = 0;
        }
      }, 1000);
    }
  }
}