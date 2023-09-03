class Level3Intro extends Phaser.Scene {
  constructor() {
    super("level3Intro");
  }

  create() {
    this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.add.text(160, 200, "Bravo tu as appelé Enedis, c'est maintenant à eux de jouer et de détruire la terrible créature Pomme !");
    this.add.text(160, 300, "Pour sauter appuie sur la touche du haut. Pour tirer appuie sur la touche espace.");
    this.add.text(450, 600, "Appuie sur entrer pour continuer...");
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.enter)) {
      this.scene.start('level3Scene');
    }
  }
}