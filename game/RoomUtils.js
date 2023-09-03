class RoomUtils {
  static isPlayerAtDoor(scene, doorX, doorY) {
    const distanceThreshold = 7; // Ajustez la distance seuil selon votre jeu

    const distanceX = Math.abs(scene.player.x - doorX);
    const distanceY = Math.abs(scene.player.y - doorY);

    return distanceX < distanceThreshold && distanceY < distanceThreshold;
  }

  static changeRoomConditions(scene) {
    if (this.isPlayerAtDoor(scene, 232.16, 194.5)) {
      this.changeRoom(scene, 1);
    } else if (this.isPlayerAtDoor(scene, 650.83, 194.5)) {
      this.changeRoom(scene, 2);
    } else if (this.isPlayerAtDoor(scene, 86.16, 534.5)) {
      this.changeRoom(scene, 3);
    } else if (this.isPlayerAtDoor(scene, 811.5, 534.5)) {
      this.changeRoom(scene, 4);
    } else if (this.isPlayerAtDoor(scene, 91.5, 1101.5)) {
      this.changeRoom(scene, 5);
    } else if (this.isPlayerAtDoor(scene, 811.5, 1101.5)) {
      this.changeRoom(scene, 6);
    }
  }

  static leaveRoomConditions(scene) {
    if (
      this.isPlayerAtDoor(scene, 220, 187) &&
      scene.rooms.name === "room1"
    ) {
      this.changeRoom(scene, 7, 232.16, 194.5);
    } else if (
      this.isPlayerAtDoor(scene, 540, 177) &&
      scene.rooms.name === "room2"
    ) {
      this.changeRoom(scene, 7, 650.83, 194.5);
    } else if (
      this.isPlayerAtDoor(scene, 586, 247) &&
      scene.rooms.name === "room3"
    ) {
      this.changeRoom(scene, 7, 86.16, 534.5);
    } else if (
      this.isPlayerAtDoor(scene, 175, 237) &&
      scene.rooms.name === "room4"
    ) {
      this.changeRoom(scene, 7, 811.5, 534.5);
    } else if (
      this.isPlayerAtDoor(scene, 540, 177) &&
      scene.rooms.name === "room5"
    ) {
      this.changeRoom(scene, 7, 91.5, 1101.5);
    } else if (
      this.isPlayerAtDoor(scene, 220, 187) &&
      scene.rooms.name === "room6"
    ) {
      this.changeRoom(scene, 7, 811.5, 1101.5);
    }
  }

  static changeRoom(scene, roomNumber, mapX, mapY) {
    // Animation de fondu noir
    scene.cameras.main.fadeOut(500);
    scene.background.setVisible(false);

    // Code pour changer de salle
    scene.player.setScale(1.5);
    switch (roomNumber) {
      case 1:
        scene.playerWallCollider.active = false;
        scene.playerRoom1Collider.active = true;
        scene.playerRoom2Collider.active = false;
        scene.playerRoom3Collider.active = false;
        scene.playerRoom4Collider.active = false;
        scene.playerRoom5Collider.active = false;
        scene.playerRoom6Collider.active = false;
        scene.rooms = scene.add.sprite(0, 0, "map-level1-rooms", 0);
        scene.rooms.setFrame(4);
        scene.rooms.setDepth(-1);
        scene.rooms.setOrigin(0, 0);
        scene.rooms.name = "room1";
        if (mapX && mapY) {
          scene.player.setPosition(mapX, mapY);
        } else {
          scene.player.setPosition(220, 210);
        }
        break;
      case 2:
        scene.playerWallCollider.active = false;
        scene.playerRoom1Collider.active = false;
        scene.playerRoom2Collider.active = true;
        scene.playerRoom3Collider.active = false;
        scene.playerRoom4Collider.active = false;
        scene.playerRoom5Collider.active = false;
        scene.playerRoom6Collider.active = false;
        scene.rooms = scene.add.sprite(0, 0, "map-level1-rooms", 0);
        scene.rooms.setFrame(3);
        scene.rooms.setDepth(-1);
        scene.rooms.setOrigin(0, 0);
        scene.rooms.name = "room2";
        if (mapX && mapY) {
          scene.player.setPosition(mapX, mapY);
        } else {
          scene.player.setPosition(540, 210);
        }
        break;
      case 3:
        scene.playerWallCollider.active = false;
        scene.playerRoom1Collider.active = false;
        scene.playerRoom2Collider.active = false;
        scene.playerRoom3Collider.active = true;
        scene.playerRoom4Collider.active = false;
        scene.playerRoom5Collider.active = false;
        scene.playerRoom6Collider.active = false;
        scene.rooms = scene.add.sprite(0, 0, "map-level1-rooms", 0);
        scene.rooms.setFrame(10);
        scene.rooms.setDepth(-1);
        scene.rooms.setOrigin(0, 0);

        scene.rooms.name = "room3";
        if (mapX && mapY) {
          scene.player.setPosition(mapX, mapY);
        } else {
          scene.player.setPosition(586, 276);
        }
        break;
      case 4:
        scene.playerWallCollider.active = false;
        scene.playerRoom1Collider.active = false;
        scene.playerRoom2Collider.active = false;
        scene.playerRoom3Collider.active = false;
        scene.playerRoom4Collider.active = true;
        scene.playerRoom5Collider.active = false;
        scene.playerRoom6Collider.active = false;
        scene.rooms = scene.add.sprite(0, 0, "map-level1-rooms", 0);
        scene.rooms.setFrame(9);
        scene.rooms.setDepth(-1);
        scene.rooms.setOrigin(0, 0);
        scene.rooms.name = "room4";
        if (mapX && mapY) {
          scene.player.setPosition(mapX, mapY);
        } else {
          scene.player.setPosition(175, 261);
        }
        break;
      case 5:
        scene.playerWallCollider.active = false;
        scene.playerRoom1Collider.active = false;
        scene.playerRoom2Collider.active = false;
        scene.playerRoom3Collider.active = false;
        scene.playerRoom4Collider.active = false;
        scene.playerRoom5Collider.active = true;
        scene.playerRoom6Collider.active = false;
        scene.rooms = scene.add.sprite(0, 0, "map-level1-rooms", 0);
        scene.rooms.setFrame(3);
        scene.rooms.setDepth(-1);
        scene.rooms.setOrigin(0, 0);
        scene.rooms.name = "room5";
        if (mapX && mapY) {
          scene.player.setPosition(mapX, mapY);
        } else {
          scene.player.setPosition(540, 210);
        }
        break;
      case 6:
        scene.playerWallCollider.active = false;
        scene.playerRoom1Collider.active = false;
        scene.playerRoom2Collider.active = false;
        scene.playerRoom3Collider.active = false;
        scene.playerRoom4Collider.active = false;
        scene.playerRoom5Collider.active = false;
        scene.playerRoom6Collider.active = true;
        scene.rooms = scene.add.sprite(0, 0, "map-level1-rooms", 0);
        scene.rooms.setFrame(4);
        scene.rooms.setDepth(-1);
        scene.rooms.setOrigin(0, 0);
        scene.rooms.name = "room6";
        if (mapX && mapY) {
          scene.player.setPosition(mapX, mapY);
        } else {
          scene.player.setPosition(220, 210);
        }
        break;
      case 7:
        scene.player.setScale(1);
        scene.rooms = undefined;
        scene.playerRoom1Collider.active = false;
        scene.playerRoom2Collider.active = false;
        scene.playerRoom3Collider.active = false;
        scene.playerRoom4Collider.active = false;
        scene.playerRoom5Collider.active = false;
        scene.playerRoom6Collider.active = false;
        scene.playerWallCollider.active = true;
        scene.background.setVisible(true);
        scene.player.setPosition(mapX, mapY + 25);
    }

    // Animation de fondu de retour
    scene.cameras.main.fadeIn(500);
  }

  static generateRoomWalls(scene) {
    scene.room1 = scene.physics.add.staticGroup();
    scene.room1
      .create(130, 400, "room1-west-wall")
      .setScale(1, 20)
      .setVisible(false)
      .refreshBody();
    scene.room1
      .create(400, 490, "room1-south-wall")
      .setScale(20, 1)
      .setVisible(false)
      .refreshBody();
    scene.room1
      .create(667, 400, "room1-east-wall")
      .setScale(1, 20)
      .setVisible(false)
      .refreshBody();
    scene.room1
      .create(400, 130, "room1-north-wall")
      .setScale(20, 1)
      .setVisible(false)
      .refreshBody();
    scene.room1
      .create(425, 185, "room1-main-desk")
      .setScale(5, 0.1)
      .setVisible(false)
      .refreshBody();
    scene.room1
      .create(330, 300, "room1-desks-set-1")
      .setScale(0.5, 1.5)
      .setVisible(false)
      .refreshBody();
    scene.room1
      .create(430, 300, "room1-desks-set-2")
      .setScale(0.5, 1.5)
      .setVisible(false)
      .refreshBody();
    scene.room1
      .create(530, 300, "room1-desks-set-3")
      .setScale(0.5, 1.5)
      .setVisible(false)
      .refreshBody();
    scene.room1
      .create(620, 440, "room1-chairs")
      .setScale(0.5, 1.5)
      .setVisible(false)
      .refreshBody();

    scene.playerRoom1Collider = scene.physics.add.collider(
      scene.player,
      scene.room1
    );

    scene.playerRoom1Collider.active = false;

    scene.room2 = scene.physics.add.staticGroup();

    scene.room2
      .create(80, 260, "room2-east-wall")
      .setScale(1, 20)
      .setVisible(false)
      .refreshBody();
    scene.room2
      .create(350, 120, "room2-north-wall")
      .setScale(20, 1)
      .setVisible(false)
      .refreshBody();
    scene.room2
      .create(350, 490, "room2-south-wall")
      .setScale(20, 1)
      .setVisible(false)
      .refreshBody();
    scene.room2
      .create(620, 260, "room2-west-wall")
      .setScale(1, 20)
      .setVisible(false)
      .refreshBody();
    scene.room2
      .create(325, 180, "room2-main-desk")
      .setScale(5, 0.1)
      .setVisible(false)
      .refreshBody();
    scene.room2
      .create(480, 330, "room2-desks-set-1")
      .setScale(1, 3.5)
      .setVisible(false)
      .refreshBody();
    scene.room2
      .create(340, 330, "room2-desks-set-2")
      .setScale(1, 3.5)
      .setVisible(false)
      .refreshBody();
    scene.room2
      .create(200, 330, "room2-desks-set-3")
      .setScale(1, 3.5)
      .setVisible(false)
      .refreshBody();

    scene.playerRoom2Collider = scene.physics.add.collider(
      scene.player,
      scene.room2
    );

    scene.playerRoom2Collider.active = false;

    scene.room3 = scene.physics.add.staticGroup();

    scene.room3
      .create(130, 400, "room3-west-wall")
      .setScale(1, 20)
      .setVisible(false)
      .refreshBody();
    scene.room3
      .create(400, 550, "room3-south-wall")
      .setScale(20, 1)
      .setVisible(false)
      .refreshBody();
    scene.room3
      .create(667, 400, "room3-east-wall")
      .setScale(1, 20)
      .setVisible(false)
      .refreshBody();
    scene.room3
      .create(400, 190, "room3-north-wall")
      .setScale(20, 1)
      .setVisible(false)
      .refreshBody();
    scene.room3
      .create(370, 255, "room3-main-desk")
      .setScale(5, 0.1)
      .setVisible(false)
      .refreshBody();
    scene.room3
      .create(265, 365, "room3-desks-set-1")
      .setScale(0.5, 1.5)
      .setVisible(false)
      .refreshBody();
    scene.room3
      .create(365, 365, "room3-desks-set-2")
      .setScale(0.5, 1.5)
      .setVisible(false)
      .refreshBody();
    scene.room3
      .create(465, 365, "room3-desks-set-3")
      .setScale(0.5, 1.5)
      .setVisible(false)
      .refreshBody();
    scene.room3
      .create(180, 500, "room3-chairs")
      .setScale(0.5, 1.5)
      .setVisible(false)
      .refreshBody();

    scene.playerRoom3Collider = scene.physics.add.collider(
      scene.player,
      scene.room3
    );

    scene.playerRoom3Collider.active = false;

    scene.room4 = scene.physics.add.staticGroup();

    scene.room4
      .create(80, 260, "room4-east-wall")
      .setScale(1, 20)
      .setVisible(false)
      .refreshBody();
    scene.room4
      .create(350, 180, "room4-north-wall")
      .setScale(20, 1)
      .setVisible(false)
      .refreshBody();
    scene.room4
      .create(350, 560, "room4-south-wall")
      .setScale(20, 1)
      .setVisible(false)
      .refreshBody();
    scene.room4
      .create(620, 260, "room4-west-wall")
      .setScale(1, 20)
      .setVisible(false)
      .refreshBody();
    scene.room4
      .create(380, 250, "room4-main-desk")
      .setScale(5, 0.1)
      .setVisible(false)
      .refreshBody();
    scene.room4
      .create(500, 395, "room4-desks-set-1")
      .setScale(1, 3.5)
      .setVisible(false)
      .refreshBody();
    scene.room4
      .create(360, 395, "room4-desks-set-2")
      .setScale(1, 3.5)
      .setVisible(false)
      .refreshBody();
    scene.room4
      .create(220, 395, "room4-desks-set-3")
      .setScale(1, 3.5)
      .setVisible(false)
      .refreshBody();

    scene.playerRoom4Collider = scene.physics.add.collider(
      scene.player,
      scene.room4
    );

    scene.playerRoom4Collider.active = false;

    scene.room5 = scene.physics.add.staticGroup();

    scene.room5
      .create(80, 260, "room5-east-wall")
      .setScale(1, 20)
      .setVisible(false)
      .refreshBody();
    scene.room5
      .create(350, 120, "room5-north-wall")
      .setScale(20, 1)
      .setVisible(false)
      .refreshBody();
    scene.room5
      .create(350, 490, "room5-south-wall")
      .setScale(20, 1)
      .setVisible(false)
      .refreshBody();
    scene.room5
      .create(620, 260, "room5-west-wall")
      .setScale(1, 20)
      .setVisible(false)
      .refreshBody();
    scene.room5
      .create(325, 180, "room5-main-desk")
      .setScale(5, 0.1)
      .setVisible(false)
      .refreshBody();
    scene.room5
      .create(480, 330, "room5-desks-set-1")
      .setScale(1, 3.5)
      .setVisible(false)
      .refreshBody();
    scene.room5
      .create(340, 330, "room5-desks-set-2")
      .setScale(1, 3.5)
      .setVisible(false)
      .refreshBody();
    scene.room5
      .create(200, 330, "room5-desks-set-3")
      .setScale(1, 3.5)
      .setVisible(false)
      .refreshBody();

    scene.playerRoom5Collider = scene.physics.add.collider(
      scene.player,
      scene.room5
    );

    scene.playerRoom5Collider.active = false;

    scene.room6 = scene.physics.add.staticGroup();

    scene.room6
      .create(130, 400, "room6-west-wall")
      .setScale(1, 20)
      .setVisible(false)
      .refreshBody();
    scene.room6
      .create(400, 490, "room6-south-wall")
      .setScale(20, 1)
      .setVisible(false)
      .refreshBody();
    scene.room6
      .create(667, 400, "room6-east-wall")
      .setScale(1, 20)
      .setVisible(false)
      .refreshBody();
    scene.room6
      .create(400, 130, "room6-north-wall")
      .setScale(20, 1)
      .setVisible(false)
      .refreshBody();
    scene.room6
      .create(425, 185, "room6-main-desk")
      .setScale(5, 0.1)
      .setVisible(false)
      .refreshBody();
    scene.room6
      .create(330, 300, "room6-desks-set-1")
      .setScale(0.5, 1.5)
      .setVisible(false)
      .refreshBody();
    scene.room6
      .create(430, 300, "room6-desks-set-2")
      .setScale(0.5, 1.5)
      .setVisible(false)
      .refreshBody();
    scene.room6
      .create(530, 300, "room6-desks-set-3")
      .setScale(0.5, 1.5)
      .setVisible(false)
      .refreshBody();
    scene.room6
      .create(620, 440, "room6-chairs")
      .setScale(0.5, 1.5)
      .setVisible(false)
      .refreshBody();


    scene.playerRoom6Collider = scene.physics.add.collider(
      scene.player,
      scene.room6
    );

    scene.playerRoom6Collider.active = false;
  }
}