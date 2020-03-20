/* eslint-disable no-undef */
/* eslint-disable comma-dangle */
import { ScrollingBackground } from './Entities';
import axios from 'axios';

export let playerName = '';
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
      function() {
        this.btnPlay.setTexture('sprBtnPlayHover'); // set the button texture to sprBtnPlayHover
        this.sfx.btnOver.play(); // play the button over sound
      },
      this
    );

    this.btnPlay.on('pointerout', function() {
      this.setTexture('sprBtnPlay');
    });

    this.btnPlay.on(
      'pointerdown',
      function() {
        this.btnPlay.setTexture('sprBtnPlayDown');
        this.sfx.btnDown.play();
      },
      this
    );

    this.btnPlay.on(
      'pointerup',
      function() {
        this.btnPlay.setTexture('sprBtnPlay');
        playerName = document.getElementById('nameBox').value;
        this.scene.start('SceneMain', { name: playerName });
        document.getElementById('nameBox').outerHTML = '';
      },
      this
    );

    this.backgrounds = [];
    for (var i = 0; i < 1; i++) {
      var keys = ['sprBg0', 'sprBg1'];
      var key = keys[Phaser.Math.Between(0, keys.length - 1)];
      var bg = new ScrollingBackground(this, key, i * 10);
      this.backgrounds.push(bg);
    }
  }

  update() {
    for (var i = 0; i < this.backgrounds.length; i++) {
      this.backgrounds[i].update();
    }
  }

  getDataAxios(url) {
    const response = axios.post(url, {
      user: 'Robert',
      score: 34500
    });
  }
}

export default SceneName;
