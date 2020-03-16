import SceneMainMenu from './components/SceneMainMenu';
import SceneMain from './components/SceneMain';
import SceneGameOver from './components/SceneGameOver';
import '../src/components/Entities';

var config = {
  type: Phaser.WEBGL,
  width: 480,
  height: 640,
  backgroundColor: 'none',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 }
    }
  },
  scene: [SceneMainMenu, SceneMain, SceneGameOver],
  pixelArt: true,
  roundPixels: true
};
var game = new Phaser.Game(config);
