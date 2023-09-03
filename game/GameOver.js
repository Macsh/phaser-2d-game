class GameOver extends Phaser.Scene {
  constructor() {
    super("gameOverScene");
  }

  create() {
    this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.add.text(160, 200, "Vous avez échoué devant la terrible créature Pomme !");
    this.add.text(160, 300, "Souhaitez-vous recommencer ?");
    this.add.text(450, 600, "Appuie sur entrer pour continuer...");
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.enter)) {
      this.scene.start('level3Scene');
    }
  }
}