class Level3 extends Phaser.Scene {
  constructor() {
    super("level3Scene");
  }

  preload() {
    this.load.audio("level3-music", "assets/level3.mp3");
    this.load.audio("apple-attack", "assets/apple_attack.wav");
    this.load.audio("apple-damage", "assets/apple_damage.wav");
    this.load.audio("apple-death", "assets/apple_death.wav");
    this.load.audio("apple-explode", "assets/apple_explosion.wav");
    this.load.audio("agent-attack", "assets/agent_attack.flac");
    this.load.audio("agent-damage", "assets/agent_damage.wav");
    this.load.audio("agent-death", "assets/agent_death.mp3");
    this.load.audio("game-over", "assets/gameover.mp3");
    this.load.image('map-level3', 'assets/map-level3.png', { frameWidth: 768, frameHeight: 299 });
    this.load.spritesheet('agent-idle', 'assets/agent enedis/agent-idle.png', { frameWidth: 16, frameHeight: 28 });
    this.load.spritesheet('agent-run', 'assets/agent enedis/agent-run.png', { frameWidth: 16, frameHeight: 28 });
    this.load.spritesheet('agent-jump', 'assets/agent enedis/agent-jump.png', { frameWidth: 16, frameHeight: 28 });
    this.load.image('apple-idle', 'assets/apple/apple-idle.png');
    this.load.image('apple-hurt', 'assets/apple/apple-hurt.png');
    this.load.image('apple-moving', 'assets/apple/apple-moving.png');
    this.load.spritesheet('laser-active', 'assets/laser/laser-active.png', { frameWidth: 16, frameHeight: 64 });
    this.load.spritesheet('laser-turn-off', 'assets/laser/laser-turn-off.png', { frameWidth: 16, frameHeight: 64 });
    this.load.spritesheet('laser-turn-on', 'assets/laser/laser-turn-on.png', { frameWidth: 16, frameHeight: 64 });
    this.load.image('smoke-explosion-1', 'assets/smoke_explosion/Explosion_1.png');
    this.load.image('smoke-explosion-2', 'assets/smoke_explosion/Explosion_2.png');
    this.load.image('smoke-explosion-3', 'assets/smoke_explosion/Explosion_3.png');
    this.load.image('smoke-explosion-4', 'assets/smoke_explosion/Explosion_4.png');
    this.load.image('smoke-explosion-5', 'assets/smoke_explosion/Explosion_5.png');
    this.load.image('smoke-explosion-6', 'assets/smoke_explosion/Explosion_6.png');
    this.load.image('smoke-explosion-7', 'assets/smoke_explosion/Explosion_7.png');
    this.load.image('smoke-explosion-8', 'assets/smoke_explosion/Explosion_8.png');
    this.load.image('smoke-explosion-9', 'assets/smoke_explosion/Explosion_9.png');
    this.load.image('smoke-explosion-10', 'assets/smoke_explosion/Explosion_10.png');
    this.load.image('shock-explosion-1', 'assets/shock_explosion/Explosion_1.png');
    this.load.image('shock-explosion-2', 'assets/shock_explosion/Explosion_2.png');
    this.load.image('shock-explosion-3', 'assets/shock_explosion/Explosion_3.png');
    this.load.image('shock-explosion-4', 'assets/shock_explosion/Explosion_4.png');
    this.load.image('shock-explosion-5', 'assets/shock_explosion/Explosion_5.png');
    this.load.image('shock-explosion-6', 'assets/shock_explosion/Explosion_6.png');
    this.load.image('shock-explosion-7', 'assets/shock_explosion/Explosion_7.png');
    this.load.image('shock-explosion-8', 'assets/shock_explosion/Explosion_8.png');
    this.load.image('shock-explosion-9', 'assets/shock_explosion/Explosion_9.png');
    this.load.image('shock-explosion-10', 'assets/shock_explosion/Explosion_10.png');
    this.load.image('red-heart', 'assets/red-heart.png');
    this.load.image('purple-heart', 'assets/purple-heart.png');
  }

  create() {
    var self = this;
    self.background = self.add.image(0, 0, 'map-level3');
    self.background.setOrigin(0, 0);
    self.physics.world.setBounds(0, 0, 768, 299);
    self.player = self.physics.add.sprite(100, 230, 'agent-idle', 0);
    self.player.setSize(16, 28);
    self.player.setOffset(0);
    self.player.setBounce(0.1);
    self.player.setCollideWorldBounds(true);
    self.spacebar = self.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    self.enter = self.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    self.attacks = self.add.group();
    self.appleAttacks = self.add.group();
    self.apple = self.add.group();
    self.hearts = self.add.group();
    self.tookDamage = false;
    if (self.anims) {
      self.anims.remove("left");
      self.anims.remove("right");
      self.anims.remove("forward");
      self.anims.remove("backward");
      self.anims.remove("idle");
      self.anims.remove("jump");
      self.anims.remove("attack_anim");
      self.anims.remove("activate_attack");
      self.anims.remove("deactivate_attack");
      self.anims.remove("apple_idle");
      self.anims.remove("apple_hurt");
      self.anims.remove("apple_moving");
      self.anims.remove("smoke_explosion");
      self.anims.remove("shock_explosion");
      self.anims.remove("apple_attack");
      self.anims.remove("apple_attack_destroy");
    }
    self.animationManager();
    self.createWalls();
    self.cursors = self.input.keyboard.createCursorKeys();
    self.playerWallCollider = self.physics.add.collider(
      self.player,
      self.walls
    );
    self.playerPlatformCollider = self.physics.add.collider(
      self.player,
      self.platforms
    );
    self.physics.add.collider(self.apple, self.walls);
    self.physics.add.collider(self.apple, self.background);
    self.attackPhysics = self.physics.add.collider(self.attacks, self.apple, function (attack, apple) {
      apple.damage();
      self.AppleDamageSound.play();
    }, null, self);
    self.attackPhysics = self.physics.add.collider(self.attacks, self.appleAttacks, function (attack, appleAttack) {
      if (appleAttack.destroyCounter === 0) {
        appleAttack.destroyAttack();
      }
    }, null, self);
    self.physics.add.collider(self.appleAttacks, self.walls, function (appleAttack, wall) {
      if (appleAttack.destroyCounter === 0) {
        appleAttack.destroyAttack();
      }
    }, null, self);
    self.appleAttackPhysics = self.physics.add.collider(self.appleAttacks, self.player, function (appleAttack, player) {
      if (appleAttack.destroyCounter === 0) {
        self.damage();
        self.AgentDamageSound.play();
        appleAttack.destroyAttack();
      }
    }, null, self);
    self.physics.add.collider(self.player, self.background);
    self.cameras.main.setBounds(0, 0, 768, 299);
    self.cameras.main.startFollow(self.player);
    self.cameras.main.setZoom(2.4);
    self.player.setGravityY(300);
    self.bossDefeated = false;
    self.counter = 0;
    self.life = 20;
    new Apple(self);
    this.displayHearts();
    self.Level3Sound = self.sound.add("level3-music", { loop: true });
    self.Level3Sound.volume = 0.5;
    self.Level3Sound.play();
    self.AppleAttackSound = self.sound.add("apple-attack", { loop: false });
    self.AppleDamageSound = self.sound.add("apple-damage", { loop: false });
    self.AppleDeathSound = self.sound.add("apple-death", { loop: false });
    self.AppleExplodeSound = self.sound.add("apple-explode", { loop: false });
    self.AgentAttackSound = self.sound.add("agent-attack", { loop: true });
    self.AgentDamageSound = self.sound.add("agent-damage", { loop: false });
    self.AgentDeathSound = self.sound.add("agent-death", { loop: false });
    self.GameOverSound = self.sound.add("game-over", { loop: false });
  }

  update() {
    this.movePlayerManager();
    if (this.lastDirection === "left") {
      this.player.flipX = true;
    } else {
      this.player.flipX = false;
    }
    if (!this.player.body.touching.down) {
      this.player.anims.play('jump', true);
    }

    if (this.spacebar.isDown) {
      this.attack();
    }

    for (var i = 0; i < this.attacks.getChildren().length; i++) {
      var attack = this.attacks.getChildren()[i];
      attack.update();
    }

    for (var i = 0; i < this.apple.getChildren().length; i++) {
      var apple = this.apple.getChildren()[i];
      apple.update();
    }

    for (var i = 0; i < this.appleAttacks.getChildren().length; i++) {
      var appleAttack = this.appleAttacks.getChildren()[i];
      appleAttack.update();
    }

    for (var i = 0; i< this.hearts.getChildren().length; i++) {
      var heart = this.hearts.getChildren()[i];
      heart.update();
    }

    if (this.bossDefeated && this.counter === 0) {
      this.counter++;
      var self = this;
      this.AppleExplodeSound.stop();
      var timer = setInterval(() => {
        clearInterval(timer);
        self.scene.start('endingScene');
        self.Level3Sound.stop();
      }, 3000);
    }

    if (this.life <= 0 && this.counter === 0) {
      this.counter++;
      this.AgentDeathSound.play();
      for (var i = 0; i < this.apple.getChildren().length; i++) {
        var apple = this.apple.getChildren()[i];
        clearInterval(apple.attackTimer1);
        clearInterval(apple.attackTimer2);
        clearInterval(apple.attackTimer);
        clearInterval(apple.stopDamage);
        clearInterval(apple.justTookDamage);
        apple.destroy();
      }

      for (var i = 0; i < this.appleAttacks.getChildren().length; i++) {
        var appleAttack = this.appleAttacks.getChildren()[i];
        appleAttack.destroy();
      }
      this.Level3Sound.stop();
      this.AgentAttackSound.stop();
      this.GameOverSound.play();
      this.scene.start('gameOverScene');
    }
  }

  attack() {
    this.AgentAttackSound.play();
    var attack = new LaserAttack(this);
  }

  displayHearts() {
    var self = this;
    var heartX = 20;
    for (var i = 0; i < self.life; i++) {
      if (i === 10) {
        heartX = 20;
      }
      if (i >= 10) {
        new Hearts(self, heartX, 35, i, 'red-heart');
        heartX += 12;
      } else {
        new Hearts(self, heartX, 20, i, 'red-heart');
        heartX += 12;
      }
    }
    heartX = 380;
    for (var i = 0; i < self.apple.getChildren()[0].life; i++) {
      if (i === 10) {
        heartX = 380;
      }
      if (i >= 10) {
        new Hearts(self, heartX, 35, i, 'purple-heart');
        heartX += 15;
      } else {
        new Hearts(self, heartX, 20, i, 'purple-heart');
        heartX += 15;
      }
    }
  }

  movePlayerManager() {
    this.player.setVelocityX(0);
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play('left', true);
      this.lastDirection = "left";
      if (this.cursors.up.isDown && this.player.body.touching.down) {
        this.player.setVelocity(-160, -220);
        this.player.anims.play('jump', true);
        this.lastDirection = "jump";
      }
    }
    else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play('right', true);
      this.lastDirection = "right";
      if (this.cursors.up.isDown && this.player.body.touching.down) {
        this.player.setVelocity(160, -220);
        this.player.anims.play('jump', true);
      }
    }
    else if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-220);
      this.player.anims.play('jump', true);
      this.lastDirection = "jump";
    }
    else {
      this.player.setVelocityX(0);
      this.player.anims.play('idle', true);
    }
  }

  damage() {
    if (!this.tookDamage) {
      var self = this;
      var invincibleBool = false;
      var justTookDamage = setInterval(function () {
        if (self.player.alpha === 1) {
          self.player.alpha = 0.5;
        } else {
          self.player.alpha = 1;
        }
      }, 50);
      var stopDamage = setInterval(function () {
        invincibleBool = true;
        clearInterval(stopDamage);
        clearInterval(justTookDamage);
      }, 500);

      var invincibleBlink = setInterval(function () {
        if (invincibleBool) {
          if (self.player.alpha === 1) {
            self.player.alpha = 0.50;
          } else {
            self.player.alpha = 1;
          }
        }
      }, 20);
      var invincible = setInterval(function () {
        self.player.alpha = 1;
        self.tookDamage = false;
        if (self.life > 0) {
          self.appleAttackPhysics = self.physics.add.collider(self.appleAttacks, self.player, function (appleAttack, player) {
            if (appleAttack.destroyCounter === 0) {
              self.damage();
              appleAttack.destroyAttack();
            }
          }, null, self);
        }
        clearInterval(invincibleBlink);
        clearInterval(invincible);
      }, 3500);
      self.tookDamage = true;
      self.appleAttackPhysics.destroy();
      self.life--;
    }
  }

  animationManager() {
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers('agent-run', {
        start: 0,
        end: 7,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers('agent-idle', {
        start: 0,
        end: 8,
        flipX: true,
      }),
      frameRate: 20,
    });
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers('agent-run', {
        start: 0,
        end: 7,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "jump",
      frames: this.anims.generateFrameNumbers('agent-jump', {
        start: 0,
        end: 1,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'attack_anim',
      frames: this.anims.generateFrameNumbers('laser-active', {
        start: 0,
        end: 1,
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'activate_attack',
      frames: this.anims.generateFrameNumbers('laser-turn-on', {
        start: 0,
        end: 6,
      }),
      frameRate: 30,
      repeat: 0
    });
    this.anims.create({
      key: 'deactivate_attack',
      frames: this.anims.generateFrameNumbers('laser-turn-off', {
        start: 0,
        end: 6,
      }),
      frameRate: 30,
      repeat: 0
    });
    this.anims.create({
      key: 'apple_idle',
      frames: [{ key: 'apple-idle' }],
      frameRate: 0,
      repeat: -1
    });
    this.anims.create({
      key: 'apple_hurt',
      frames: [{ key: 'apple-hurt' }],
      frameRate: 0,
      repeat: -1
    });
    this.anims.create({
      key: 'apple_moving',
      frames: [{ key: 'apple-moving' }],
      frameRate: 0,
      repeat: -1
    });
    this.anims.create({
      key: 'smoke_explosion',
      frames: [
        { key: 'smoke-explosion-1' },
        { key: 'smoke-explosion-2' },
        { key: 'smoke-explosion-3' },
        { key: 'smoke-explosion-4' },
        { key: 'smoke-explosion-5' },
        { key: 'smoke-explosion-6' },
        { key: 'smoke-explosion-7' },
        { key: 'smoke-explosion-8' },
        { key: 'smoke-explosion-9' },
        { key: 'smoke-explosion-10' },
      ],
      frameRate: 10,
      repeat: 0
    });
    this.anims.create({
      key: 'shock_explosion',
      frames: [
        { key: 'shock-explosion-1' },
        { key: 'shock-explosion-2' },
        { key: 'shock-explosion-3' },
        { key: 'shock-explosion-4' },
        { key: 'shock-explosion-5' },
        { key: 'shock-explosion-6' },
        { key: 'shock-explosion-7' },
        { key: 'shock-explosion-8' },
        { key: 'shock-explosion-9' },
        { key: 'shock-explosion-10' },
      ],
      frameRate: 10,
      repeat: 0
    });
    this.anims.create({
      key: 'apple_attack',
      frames: [
        { key: 'shock-explosion-3' },
        { key: 'shock-explosion-4' },
      ],
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key: 'apple_attack_destroy',
      frames: [
        { key: 'shock-explosion-5' },
        { key: 'shock-explosion-6' },
        { key: 'shock-explosion-7' },
        { key: 'shock-explosion-8' },
        { key: 'shock-explosion-9' },
        { key: 'shock-explosion-10' },
      ],
      frameRate: 60,
      repeat: 0
    })
  }

  createWalls() {
    this.walls = this.physics.add.staticGroup();
    this.walls.create(0, 0, 'north-wall').setScale(50, 1.7).setVisible(false).refreshBody();
    this.walls.create(0, 278, 'south-wall').setScale(50, 1.7).setVisible(false).refreshBody();
    this.walls.create(0, 0, 'west-wall').setScale(2.8, 20).setVisible(false).refreshBody();
    this.walls.create(767, 0, 'east-wall').setScale(2.8, 20).setVisible(false).refreshBody();

    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(153, 107, 'first-platform-1').setScale(0.9, 1.9).setVisible(false).refreshBody();
    this.platforms.create(153, 107, 'first-platform-2').setScale(1.9, 0.9).setVisible(false).refreshBody();
    this.platforms.create(240, 203, 'second-platform-1').setScale(0.9, 0.9).setVisible(false).refreshBody();
    this.platforms.create(256, 187, 'second-platform-2').setScale(0.9, 0.9).setVisible(false).refreshBody();
    this.platforms.create(301, 85, 'third-platform').setScale(2, 0.5).setVisible(false).refreshBody();
    this.platforms.create(385, 150, 'fourth-platform-1').setScale(2.4, 0.4).setVisible(false).refreshBody();
    this.platforms.create(384, 168, 'fourth-platform-2').setScale(1.4, 1.4).setVisible(false).refreshBody();
    this.platforms.create(385, 183, 'fourth-platform-3').setScale(2.4, 0.4).setVisible(false).refreshBody();
    this.platforms.create(466, 85, 'fifth-platform').setScale(2, 0.5).setVisible(false).refreshBody();
    this.platforms.create(530, 203, 'sixth-platform-1').setScale(0.9, 0.9).setVisible(false).refreshBody();
    this.platforms.create(513, 187, 'sixth-platform-2').setScale(0.9, 0.9).setVisible(false).refreshBody();
    this.platforms.create(613, 107, 'seventh-platform-1').setScale(0.9, 1.9).setVisible(false).refreshBody();
    this.platforms.create(613, 107, 'seventh-platform-2').setScale(1.9, 0.9).setVisible(false).refreshBody();
  }
}