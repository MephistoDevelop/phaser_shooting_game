import SceneMainMenu from './components/SceneMainMenu';
import SceneMain from './components/SceneMain';
import SceneGameOver from './components/SceneGameOver';
import SceneName from './components/SceneName';
import './components/Entities';
import Phaser from 'phaser';

const config = {
  type: Phaser.WEBGL,
  width: 480,
  height: 640,
  backgroundColor: 'none',
  dom: {
    createContainer: true,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
    },
  },
  scene: [SceneMainMenu, SceneName, SceneMain, SceneGameOver],
  pixelArt: true,
  roundPixels: true,
};
const game = new Phaser.Game(config);

export default game;
