window.onload = function () {
  var config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    physics: {
      default: 'arcade',
      arcade: {
        debug: false
      }
    },
    scene: [Menu, Level1Intro, Level1, Level2Intro, Level2, Level3Intro, Level3, Ending, GameOver]
  };
  var game = new Phaser.Game(config);
};