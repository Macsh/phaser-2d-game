class Ending extends Phaser.Scene {
  constructor() {
    super("endingScene");
  }

  create() {
    this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.add.text(160, 200, "Bravo Enedis a triomphé face au vil monstre Pomme ! Le courant est maintenant rétabli !");
    this.add.text(160, 350, "Jeu réalisé par Alexandre Menskoï et Hugo Merrir");
    this.add.text(450, 600, "Appuyez sur entrer si vous souhaitez rejouer.");
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.enter)) {
      this.scene.start('level1Intro');
    }
  }
}