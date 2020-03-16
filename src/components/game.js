
  var config = {
    type: Phaser.WEBGL,
    width: 480,
    heigth: 640,
    backgroundColor: 'black',
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { x: 0, y: 0 }
      }
    },
    scene: [sceneMainMenu, SceneMain, SceneGameOver],
    pixelArt: true,
    roundPixels: true
  };

  var game = new Phaser.Game(config);

export default game;