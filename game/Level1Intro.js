class Level1Intro extends Phaser.Scene {
  constructor() {
    super("level1Intro");
  }

  create() {
    this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.add.text(160, 200, "Le courant a été coupé, trouve Sébastien afin qu'il puisse appeler Enedis et rétablir le courant");
    this.add.text(160, 300, "Des étudiants te bloqueront la route.");
    this.add.text(160, 330, "Pour les éviter, appuie sur la touche espace pour leur signaler leur présence et les faire disparaître.");
    this.add.text(450, 600, "Appuie sur Entrée pour continuer...");
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.enter)) {
      this.scene.start('level1Scene');
    }
  }
}
