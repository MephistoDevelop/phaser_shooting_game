/* eslint-disable no-undef */
/* eslint-disable comma-dangle */
import axios from 'axios';
import { ScrollingBackground } from './Entities';


class SceneGameOver extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneGameOver' });
  }

  getDataAxios(url) {
    const response = axios.get(url, {
      headers: { 'Content-Type': 'application/json' }
    });
    response.then((result) => {
      const scoreArray = result.data.result;
      const element = document.createElement('div');
      const itemsContainer = document.createElement('div');
      itemsContainer.id = 'items-container';
      element.id = 'score-title-container';
      element.innerHTML = '<div class="item-score"><span id="userTitle">User  '
        + '</span>  <span id="scoreTitle">Score '
        + '</span></div>';
      document.getElementById('content').appendChild(element);
      document.getElementById('content').appendChild(itemsContainer);
      for (let i = 0; i <= scoreArray.length; i += 1) {
        const element = document.createElement('div');
        element.className = 'item-container';
        element.innerHTML = `<span class="userText">
          ${scoreArray[i].user}
          </span>  <span class="scoreText">
          ${scoreArray[i].score}
          </span>`;
        document.getElementById('items-container').appendChild(element);
      }
    });
  }

  getScore() {
    const score = document.createElement('div');
    score.id = 'score-container';
    document.getElementById('score-lbl').remove();
    const url ='https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/7FyLZxJetCb8JHJ8nmn2/scores/';
    this.getDataAxios(url);
  }

  setBackground() {
    this.backgrounds = [];
    for (let i = 0; i < 5; i += 1) {
      const keys = ['sprBg0', 'sprBg1'];
      const key = keys[Phaser.Math.Between(0, keys.length - 1)];
      const bg = new ScrollingBackground(this, key, i * 10);
      this.backgrounds.push(bg);
    }
  }

  setButton() {
    this.btnRestart = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.8,
      'sprBtnRestart'
    );

    this.btnRestart.setInteractive();

    this.btnRestart.on(
      'pointerover',
      () => {
        this.btnRestart.setTexture('sprBtnRestartHover');
        this.sfx.btnOver.play();
      },
      this
    );

    this.btnRestart.on('pointerout', () => {
      this.setTexture('sprBtnRestart');
    });

    this.btnRestart.on(
      'pointerdown',
      () => {
        this.btnRestart.setTexture('sprBtnRestartDown');
        this.sfx.btnDown.play();
      },
      this
    );

    this.btnRestart.on(
      'pointerup',
      () => {
        this.btnRestart.setTexture('sprBtnRestart');
        this.scene.start('SceneName');
        document.getElementById('score-title-container').remove();
        document.getElementById('items-container').remove();
      },
      this
    );
  }

  init() {
    this.getScore();
  }

  preload() {
    this.load.image('sprOver', 'img/game-over.png');
    this.load.image('sprBtnRestart', 'img/sprBtnRestart.png');
    this.load.image('sprBtnRestartHover', 'img/sprBtnRestartHover.png');
    this.load.image('sprBtnRestartDown', 'img/sprBtnRestartDown.png');
  }

  create() {
    this.sfx = {
      btnOver: this.sound.add('sndBtnOver'),
      btnDown: this.sound.add('sndBtnDown')
    };

    this.logo = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'sprOver'
    );

    this.logo.setOrigin(0.5, 3);
    this.setButton();
    this.setBackground();
  }

  update() {
    for (let i = 0; i < this.backgrounds.length; i+=1) {
      this.backgrounds[i].update();
    }
  }
}

export default SceneGameOver;
