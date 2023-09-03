class Level2Intro extends Phaser.Scene {
  constructor() {
    super("level2Intro");
  }

  create() {
    this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.add.text(160, 200, "Tu as trouvé Sébastien, maintenant trouve les numéros éparpillés pour former le numéro d'Enedis.");
    this.add.text(160, 230, "Une fois les numéros trouvés, trouve le téléphone pour appeler Enedis.");
    this.add.text(160, 300, "Pour éviter les pédagos et étudiants, appuie sur la touche espace pour devenir invisible.");
    this.add.text(450, 600, "Appuie sur entrer pour continuer...");
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.enter)) {
      this.scene.start('level2Scene');
    }
  }
}