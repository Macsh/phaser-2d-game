class Utils {
  static foundNumbersConditions(scene) {
    if (scene.foundNumbers.length === 10) {
      scene.findPhoneText.x = scene.cameras.main._scrollX + 397;
      scene.findPhoneText.y = scene.cameras.main._scrollY + 240;
    }
    if (scene.foundNumbers.includes(0)) {
      scene.number0.x = scene.cameras.main._scrollX + 400;
      scene.number0.y = scene.cameras.main._scrollY + 230;
    }
    if (scene.foundNumbers.includes(1)) {
      scene.number1.x = scene.cameras.main._scrollX + 407;
      scene.number1.y = scene.cameras.main._scrollY + 230;
    }
    if (scene.foundNumbers.includes(2)) {
      scene.number2.x = scene.cameras.main._scrollX + 414;
      scene.number2.y = scene.cameras.main._scrollY + 230;
    }
    if (scene.foundNumbers.includes(3)) {
      scene.number3.x = scene.cameras.main._scrollX + 421;
      scene.number3.y = scene.cameras.main._scrollY + 230;
    }
    if (scene.foundNumbers.includes(4)) {
      scene.number4.x = scene.cameras.main._scrollX + 428;
      scene.number4.y = scene.cameras.main._scrollY + 230;
    }
    if (scene.foundNumbers.includes(5)) {
      scene.number5.x = scene.cameras.main._scrollX + 435;
      scene.number5.y = scene.cameras.main._scrollY + 230;
    }
    if (scene.foundNumbers.includes(6)) {
      scene.number6.x = scene.cameras.main._scrollX + 442;
      scene.number6.y = scene.cameras.main._scrollY + 230;
    }
    if (scene.foundNumbers.includes(7)) {
      scene.number7.x = scene.cameras.main._scrollX + 449;
      scene.number7.y = scene.cameras.main._scrollY + 230;
    }
    if (scene.foundNumbers.includes(8)) {
      scene.number8.x = scene.cameras.main._scrollX + 456;
      scene.number8.y = scene.cameras.main._scrollY + 230;
    }
    if (scene.foundNumbers.includes(9)) {
      scene.number9.x = scene.cameras.main._scrollX + 463;
      scene.number9.y = scene.cameras.main._scrollY + 230;
    }
  }

  static randomNpcManager(scene) {
    var randomLocation = scene.locationList[Math.floor(Math.random() * 6)];
    var randomX = Math.floor(Math.random() * (scene.spawnableCoords[randomLocation][0][1] - scene.spawnableCoords[randomLocation][0][0] + 1) + scene.spawnableCoords[randomLocation][0][0]);
    var randomY = Math.floor(Math.random() * (scene.spawnableCoords[randomLocation][1][1] - scene.spawnableCoords[randomLocation][1][0] + 1) + scene.spawnableCoords[randomLocation][1][0]);
    if (scene.spawnedNpcs[randomLocation] < 2 && !this.playerIsClose(scene, randomX, randomY)) {
      new Npc(scene, randomLocation, randomX, randomY);
      scene.spawnedNpcs[randomLocation]++;
      scene.numberOfNpcs++;
    } else {
      return;
    }
  }

  static playerIsCloseTalkable(scene, x, y) {
    var distanceX = scene.player.x - x;
    var distanceY = scene.player.y - y;

    if ((distanceX <= 80 && distanceX >= -80) && (distanceY <= 80 && distanceY >= -80)) {
      return true;
    } else {
      return false;
    }
  }

  static playerIsClose(scene, x, y) {
    var distanceX = scene.player.x - x;
    var distanceY = scene.player.y - y;

    if ((distanceX <= 200 && distanceX >= -200) && (distanceY <= 200 && distanceY >= -200)) {
      return true;
    } else {
      return false;
    }
  }

  static animationManager(scene, sprite) {
    scene.anims.create({
      key: "left",
      frames: scene.anims.generateFrameNumbers(sprite, {
        start: 117,
        end: 125,
      }),
      frameRate: 10,
      repeat: -1,
    });
    scene.anims.create({
      key: "forward",
      frames: scene.anims.generateFrameNumbers(sprite, {
        start: 104,
        end: 112,
      }),
      frameRate: 10,
      repeat: -1,
    });
    scene.anims.create({
      key: "idle",
      frames: [{ key: sprite, frame: 130 }],
      frameRate: 0,
    });
    scene.anims.create({
      key: "right",
      frames: scene.anims.generateFrameNumbers(sprite, {
        start: 143,
        end: 151,
      }),
      frameRate: 10,
      repeat: -1,
    });
    scene.anims.create({
      key: "backward",
      frames: scene.anims.generateFrameNumbers(sprite, {
        start: 130,
        end: 138,
      }),
      frameRate: 10,
      repeat: -1,
    });
    scene.anims.create({
      key: 'attack_anim',
      frames: [{ key: 'attack' }],
      frameRate: 0,
      repeat: -1
    });
  }

  static movePlayerManager(scene) {
    scene.player.setVelocityX(0);
    scene.player.setVelocityY(0);

    if (scene.cursors.left.isDown) {
      scene.player.setVelocity(-160, 0);
      if (scene.cursors.up.isDown) {
        scene.player.setVelocity(-160, -160);
      }
      else if (scene.cursors.down.isDown) {
        scene.player.setVelocity(-160, 160);
      }
      scene.player.anims.play('left', true);
      scene.lastDirection = "left";
    }
    else if (scene.cursors.right.isDown) {
      scene.player.setVelocity(160, 0);
      if (scene.cursors.up.isDown) {
        scene.player.setVelocity(160, -160);
      }
      else if (scene.cursors.down.isDown) {
        scene.player.setVelocity(160, 160);
      }
      scene.player.anims.play('right', true);
      scene.lastDirection = "right";
    }
    else if (scene.cursors.up.isDown) {
      scene.player.setVelocity(0, -160);
      scene.player.anims.play('forward', true);
      scene.lastDirection = "forward";
    }
    else if (scene.cursors.down.isDown) {
      scene.player.setVelocity(0, 160);
      scene.player.anims.play('backward', true);
      scene.lastDirection = "backward";
    }
    else {
      scene.player.setVelocity(0, 0);
      scene.player.anims.play('idle', true);
    }
  }

  static generateWalls(scene) {
    var walls = scene.physics.add.staticGroup();
    walls.create(430, 135, 'north-wall').setScale(20, 2).setVisible(false).refreshBody();
    walls.create(720, 210, 'north-hallway-east-wall').setScale(2, 3).setVisible(false).refreshBody();
    walls.create(634, 280, 'north-hallway-south-east-wall').setScale(10, 2).setVisible(false).refreshBody();
    walls.create(156, 210, 'north-hallway-west-wall').setScale(2, 3).setVisible(false).refreshBody();
    walls.create(242, 280, 'north-hallway-south-west-wall').setScale(10, 2).setVisible(false).refreshBody();
    walls.create(330, 400, 'north-corridor-west-wall').setScale(2, 3.2).setVisible(false).refreshBody();
    walls.create(370, 300, 'north-corridor-west-wall-2').setScale(2, 3.2).setVisible(false).refreshBody();
    walls.create(545, 400, 'north-corridor-east-wall').setScale(2, 3.2).setVisible(false).refreshBody();
    walls.create(505, 300, 'north-corridor-east-wall-2').setScale(2, 3.2).setVisible(false).refreshBody();

    walls.create(-0, 550, 'center-hallway-west-wall').setScale(2, 3).setVisible(false).refreshBody();
    walls.create(170, 475, 'center-hallway-north-west-wall').setScale(12, 2).setVisible(false).refreshBody();
    walls.create(138, 620, 'center-hallway-south-west-wall').setScale(14, 2).setVisible(false).refreshBody();
    walls.create(995, 540, 'center-hallway-east-wall').setScale(0.1, 3).setVisible(false).refreshBody();
    walls.create(769, 475, 'center-hallway-north-east-wall').setScale(16, 2).setVisible(false).refreshBody();
    walls.create(689, 620, 'center-hallway-south-east-wall').setScale(11, 2).setVisible(false).refreshBody();

    walls.create(370, 850, 'center-corridor-west-wall').setScale(2, 12.5).setVisible(false).refreshBody();
    walls.create(506, 850, 'center-corridor-east-wall').setScale(2, 12.5).setVisible(false).refreshBody();
    walls.create(833, 850, 'east-corridor-west-wall').setScale(2, 13).setVisible(false).refreshBody();
    walls.create(967, 831, 'east-corridor-east-wall').setScale(2, 15.1875).setVisible(false).refreshBody();

    walls.create(-0, 1106, 'south-hallway-west-wall').setScale(2, 3).setVisible(false).refreshBody();
    walls.create(170, 1042, 'south-hallway-north-west-wall').setScale(12, 2).setVisible(false).refreshBody();
    walls.create(259, 1186, 'south-hallway-south-west-wall').setScale(18, 2).setVisible(false).refreshBody();
    walls.create(687, 1042, 'south-hallway-north-east-wall').setScale(11.1, 2).setVisible(false).refreshBody();
    walls.create(515, 1365, 'cafeteria-west-wall').setScale(2, 13).setVisible(false).refreshBody();
    walls.create(1007, 1320, 'cafeteria-east-wall').setScale(2, 16).setVisible(false).refreshBody();
    walls.create(760, 1603, 'cafeteria-south-wall').setScale(14, 2).setVisible(false).refreshBody();

    walls.create(603, 1180, 'cafeteria-table-set-1').setScale(0.5, 1.3).setVisible(false).refreshBody();
    walls.create(673, 1180, 'cafeteria-table-set-2').setScale(0.5, 1.3).setVisible(false).refreshBody();
    walls.create(742, 1180, 'cafeteria-table-set-3').setScale(0.5, 1.3).setVisible(false).refreshBody();
    walls.create(603, 1284, 'cafeteria-table-set-4').setScale(0.5, 1.3).setVisible(false).refreshBody();
    walls.create(673, 1284, 'cafeteria-table-set-5').setScale(0.5, 1.3).setVisible(false).refreshBody();
    walls.create(742, 1284, 'cafeteria-table-set-6').setScale(0.5, 1.3).setVisible(false).refreshBody();
    walls.create(603, 1388, 'cafeteria-table-set-7').setScale(0.5, 1.3).setVisible(false).refreshBody();
    walls.create(673, 1388, 'cafeteria-table-set-8').setScale(0.5, 1.3).setVisible(false).refreshBody();
    walls.create(742, 1388, 'cafeteria-table-set-9').setScale(0.5, 1.3).setVisible(false).refreshBody();
    walls.create(603, 1492, 'cafeteria-table-set-10').setScale(0.5, 1.3).setVisible(false).refreshBody();
    walls.create(673, 1492, 'cafeteria-table-set-11').setScale(0.5, 1.3).setVisible(false).refreshBody();
    walls.create(742, 1492, 'cafeteria-table-set-12').setScale(0.5, 1.3).setVisible(false).refreshBody();

    scene.walls = walls;
  }
}