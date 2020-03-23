/* eslint-disable no-undef */
/* eslint-disable comma-dangle */
/* eslint-disable class-methods-use-this */
// eslint-disable import/no-unresolved, import/no-extraneous-dependencies.
import axios from 'axios'
import { ScrollingBackground } from './Entities';

class SceneName extends Phaser.Scene {
  constructor() {
    super('SceneName');
  }

  preload() {
    const nameBox = document.createElement('input');
    nameBox.id = 'nameBox';
    nameBox.type = 'input';
    nameBox.placeholder = 'Player Name';
    document.getElementById('content').appendChild(nameBox);

    this.load.image('sprBtnPlay', 'img/sprBtnPlay.png');
    this.load.image('sprBtnPlayHover', 'img/sprBtnPlayHover.png');
    this.load.image('sprBtnPlayDown', 'img/sprBtnPlayDown.png');
    this.load.image('sprBg0', 'img/space.png');
    this.load.image('sprBg1', 'img/space.png');
  }

  create() {
    this.sfx = {
      btnOver: this.sound.add('sndBtnOver'),
      btnDown: this.sound.add('sndBtnDown')
    };
    this.btnPlay = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'sprBtnPlay'
    );
    this.btnPlay.setInteractive();

    this.btnPlay.on(
      'pointerover',
      () => {
        this.btnPlay.setTexture('sprBtnPlayHover'); // set the button texture to sprBtnPlayHover
        this.sfx.btnOver.play(); // play the button over sound
      },
      this
    );

    this.btnPlay.on('pointerout', () => {
      this.setTexture('sprBtnPlay');
    });

    this.btnPlay.on(
      'pointerdown',
      () => {
        this.btnPlay.setTexture('sprBtnPlayDown');
        this.sfx.btnDown.play();
      },
      this
    );

    this.btnPlay.on(
      'pointerup',
      () => {
        this.btnPlay.setTexture('sprBtnPlay');
        const playerName = document.getElementById('nameBox').value;
        this.scene.start('SceneMain', { name: playerName });
        document.getElementById('nameBox').outerHTML = '';
      },
      this
    );

    this.backgrounds = [];
    for (let i = 0; i < 1; i += 1) {
      const keys = ['sprBg0', 'sprBg1'];
      const key = keys[Phaser.Math.Between(0, keys.length - 1)];
      const bg = new ScrollingBackground(this, key, i * 10);
      this.backgrounds.push(bg);
    }
  }

  update() {
    for (let i = 0; i < this.backgrounds.length; i += 1) {
      this.backgrounds[i].update();
    }
  }

  getDataAxios(url) {
    axios.post(url, {
      user: 'Robert',
      score: 34500
    });
  }
}

export default SceneName;
