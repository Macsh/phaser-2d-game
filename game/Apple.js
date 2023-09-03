class Apple extends Phaser.GameObjects.Sprite {
  constructor(scene) {
    super(scene, 400, 150, "apple-idle");
    scene.add.existing(this);
    scene.physics.world.enableBody(this);
    this.displayWidth = 120;
    this.displayHeight = 120;
    this.body.setSize(500, 500, false).setOffset(50, 50);
    // this.body.setOffset(0);
    this.body.setCollideWorldBounds(true);
    this.target = scene.player;
    this.tookDamage = false;
    this.counter = 0;
    this.attackCounter = 0;
    this.firstReset = false;
    this.secondReset = false;
    this.explosionCounter = 10;
    this.life = 20;
    scene.apple.add(this);
  }

  update() {
    var self = this;
    var direction = this.checkDirection();
    if (direction === "left" || direction === 'left-up' || direction === 'left-down' && !this.tookDamage) {
      var valueX = this.target.x + 50;
      var valueY = this.target.y - 50;
      this.flipX = true;
      this.anims.play("apple_moving", true);
      this.scene.physics.moveTo(this, valueX, valueY, 60);
    } else if (!this.tookDamage) {
      var valueX = this.target.x - 50;
      var valueY = this.target.y - 50;
      this.flipX = false;
      this.anims.play("apple_moving", true);
      this.scene.physics.moveTo(this, valueX, valueY, 60);
    }
    if (this.life < 16 && !this.firstReset) {
      this.firstReset = true;
      this.attackCounter = 0;
    } else if (this.life < 11 && !this.secondReset) {
      this.secondReset = true;
      this.attackCounter = 0;
    }
    if (this.attackCounter === 0) {
      this.attackCounter++;
      if (self.life > 15) {
        self.attackTimer1 = setInterval(() => {
          self.attack();
        }, 3000);
      } else if (self.life > 10) {
        self.attackTimer2 = setInterval(() => {
          self.attack();
          clearInterval(self.attackTimer1);
        }, 2000);
      }
      else {
        self.attackTimer = setInterval(() => {
          self.attack();
          clearInterval(self.attackTimer2);
        }, 1000);
      }
    }

    if (this.checkIfArrived()) {
      this.body.setVelocityX(0);
      this.body.setVelocityY(0);
      this.anims.play("apple_idle", true);
    }

    if (this.tookDamage) {
      this.anims.play("apple_hurt", true);
    }
    if (this.life <= 0) {
      this.anims.play("apple_idle", true);
    }
    if (this.life <= 0 && this.counter === 0) {
      this.counter++;
      clearInterval(self.attackTimer);
      this.scene.physics.world.disableBody(this.body);

      var timer = setInterval(() => {
        const min = -20;
        const max = 20;
        const randomValue = Math.random();
        const explosionSprite = randomValue > 0.5 ? "smoke-explosion" : "shock-explosion";
        const explosionAnimation = randomValue > 0.5 ? "smoke_explosion" : "shock_explosion";
        var explosion = this.scene.add.sprite(this.x + Math.floor(Math.random() * (max - min + 1)) + min, this.y + Math.floor(Math.random() * (max - min + 1)) + min, explosionSprite + "-1");
        explosion.setScale(0.5);
        explosion.play(explosionAnimation);
        explosion.once('animationcomplete', () => {
          explosion.destroy();
        })
        this.explosionCounter--;
        if (this.explosionCounter === 0) {
          clearInterval(timer);
          this.scene.bossDefeated = true;
          this.destroy();
        }
      }, 300);
    }
  }

  checkIfArrived() {
    var distanceX = this.x - this.target.x;
    var distanceY = this.y - this.target.y;
    if ((distanceX <= 100 && distanceX >= -100) && (distanceY <= 100 && distanceY >= -100)) {
      return true;
    } else {
      return false;
    }
  }

  checkDirection() {
    var distanceX = this.x - this.target.x;
    var distanceY = this.y - this.target.y;
    if (distanceX > 224 || (distanceY > - 50 && distanceY < 50) && distanceX > distanceY) {
      return "left";
    } else if (distanceX < -191 || (distanceY > - 50 && distanceY < 50) && distanceX < distanceY) {
      return "right";
    } else if (distanceY > 0) {
      if (distanceX > 0) {
        return "left-up";
      } else if (distanceX < 0) {
        return "right-up";
      }
      return "up";
    } else {
      if (distanceX > 0) {
        return "left-down";
      } else if (distanceX < 0) {
        return "right-down";
      }
      return "down";
    }
  }

  attack() {
    var self = this;
    var direction = self.checkDirection();
    var valueX;
    var valueY;
    if (direction === "left") {
      valueX = self.target.x - 100;
      valueY = self.target.y;
    } else if (direction === "left-up") {
      valueX = self.target.x - 100;
      valueY = self.target.y - 60;
    } else if (direction === "left-down") {
      valueX = self.target.x - 100;
      valueY = self.target.y + 60;
    } else if (direction === "right") {
      valueX = self.target.x + 100;
      valueY = self.target.y;
    } else if (direction === "right-up") {
      valueX = self.target.x + 100;
      valueY = self.target.y - 60;
    } else if (direction === "right-down") {
      valueX = self.target.x + 100;
      valueY = self.target.y + 60;
    } else if (direction === "up") {
      valueX = self.target.x;
      valueY = self.target.y - 60;
    } else if (direction === "down") {
      valueX = self.target.x;
      valueY = self.target.y + 60;
    }
    if (self.life > 15) {
      var attack = new AppleAttack(self.scene, valueX, valueY);
      var attack2 = new AppleAttack(this.scene, valueX, valueY - 120);
      var attack3 = new AppleAttack(this.scene, valueX, valueY + 120);
    } else if (self.life > 10) {
      var attack = new AppleAttack(self.scene, valueX, valueY);
      var attack2 = new AppleAttack(this.scene, valueX, valueY - 120);
      var attack3 = new AppleAttack(this.scene, valueX, valueY + 120);
      var attack4 = new AppleAttack(this.scene, valueX, valueY - 60);
      var attack5 = new AppleAttack(this.scene, valueX, valueY + 60);
    }
    else {
      var attack = new AppleAttack(self.scene, valueX, valueY);
      var attack2 = new AppleAttack(this.scene, valueX, valueY - 120);
      var attack3 = new AppleAttack(this.scene, valueX, valueY + 120);
      var attack4 = new AppleAttack(this.scene, valueX, valueY - 60);
      var attack5 = new AppleAttack(this.scene, valueX, valueY + 60);
      var attack6 = new AppleAttack(this.scene, valueX, valueY - 180);
      var attack7 = new AppleAttack(this.scene, valueX, valueY + 180);
    }
  }

  damage() {
    if (!this.tookDamage) {
      console.log('damage');
      var self = this;
      self.justTookDamage = setInterval(function () {
        if (self.alpha === 1) {
          self.alpha = 0.5;
        } else {
          self.alpha = 1;
        }
      }, 50);
      self.stopDamage = setInterval(function () {
        self.alpha = 1;
        self.tookDamage = false;
        if (self.life > 0) {
          self.scene.attackPhysics = self.scene.physics.add.collider(self.scene.attacks, self.scene.apple, function (attack, apple) {
            apple.damage();
            attack.destroy();
          }, null, self);
        }
        clearInterval(self.stopDamage);
        clearInterval(self.justTookDamage);
      }, 500);
      self.tookDamage = true;
      self.scene.attackPhysics.destroy();
      self.life--;
    }
  }
}
