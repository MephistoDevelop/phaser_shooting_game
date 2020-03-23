/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
/* eslint-disable no-use-before-define */
// eslint-disable import/no-unresolved, import/no-extraneous-dependencies.
import axios from 'axios';
import {
  ScrollingBackground,
  Player,
  ChaserShip,
  GunShip,
  CarrierShip
} from './Entities';

class SceneMain extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneMain' });
  }

  init(data) {
    this.name = data.name === '' ? 'Player' : data.name;
    this.life = null;
    this.life2 = null;
    this.life3 = null;
    this.lifeCount = 3;
    this.points = 0;
  }

  preload() {
    const scoreLabel = document.createElement('div');
    scoreLabel.innerHTML = `${this.name} <-> Score: ${this.points}`;
    scoreLabel.id = 'score-lbl';
    document.getElementById('content').appendChild(scoreLabel);

    this.load.spritesheet('sprLife', 'img/life.png', {
      frameWidth: 25,
      frameHeight: 25
    });

    this.load.spritesheet('sprLife1', 'img/life.png', {
      frameWidth: 25,
      frameHeight: 25
    });

    this.load.spritesheet('sprLife2', 'img/life.png', {
      frameWidth: 25,
      frameHeight: 25
    });

    this.load.spritesheet('sprExplosion', 'img/sprExplosion.png', {
      frameWidth: 32,
      frameHeight: 32
    });

    this.load.image('sprLaserPlayer', 'img/sprLaserPlayer2.png');
    this.load.image('sprEnemy3', 'img/Enemy4.png');
    this.load.spritesheet('sprPlayer', 'img/player2.png', {
      frameWidth: 38,
      frameHeight: 38
    });

    this.load.spritesheet('sprEnemy0', 'img/Enemy.png', {
      frameWidth: 30,
      frameHeight: 30
    });

    this.load.spritesheet('sprEnemy1', 'img/ovni.png', {
      frameWidth: 25,
      frameHeight: 25
    });

    this.load.spritesheet('sprEnemy2', 'img/Enemy3.png', {
      frameWidth: 22,
      frameHeight: 22
    });

    this.load.image('sprLaserEnemy0', 'img/sprLaserEnemy0.png');
    this.load.audio('sndExplode0', 'img/sndExplode0.wav');
    this.load.audio('sndExplode1', 'img/sndExplode1.wav');
    this.load.audio('sndLaser', 'img/sndLaser.wav');
  }

  create() {
    this.life = this.add.sprite(455, 30, 'sprLife');
    this.life2 = this.add.sprite(425, 30, 'sprLife1');
    this.life3 = this.add.sprite(395, 30, 'sprLife2');

    this.anims.create({
      key: 'sprPlayer',
      frames: this.anims.generateFrameNumbers('sprPlayer'),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: 'sprEnemy0',
      frames: this.anims.generateFrameNumbers('sprEnemy0'),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: 'sprEnemy2',
      frames: this.anims.generateFrameNumbers('sprEnemy2'),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: 'sprExplosion',
      frames: this.anims.generateFrameNumbers('sprExplosion'),
      frameRate: 20,
      repeat: 0
    });

    this.sfx = {
      explosions: [
        this.sound.add('sndExplode0'),
        this.sound.add('sndExplode1')
      ],
      laser: this.sound.add('sndLaser')
    };
    this.sfx.laser.play();

    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'sprPlayer'
    );

    this.keyUp = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.keyUp
    );
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keySpace = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.enemies = this.add.group();
    this.enemyLasers = this.add.group();
    this.playerLasers = this.add.group();

    this.time.addEvent({
      delay: 1000,
      callback: () => {
        let enemy = null;

        if (Phaser.Math.Between(0, 10) >= 3) {
          enemy = new GunShip(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0
          );
        } else if (Phaser.Math.Between(0, 10) >= 3) {
          if (this.getEnemiesByType('ChaserShip').length < 5) {
            enemy = new ChaserShip(
              this,
              Phaser.Math.Between(0, this.game.config.width),
              0
            );
          }
        } else {
          enemy = new CarrierShip(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0
          );
        }

        if (enemy !== null) {
          enemy.setScale(Phaser.Math.Between(15, 20) * 0.1);
          this.enemies.add(enemy);
        }
      },
      callbackScope: this,
      loop: true
    });

    this.physics.add.collider(
      this.playerLasers,
      this.enemies,
      (playerLaser, enemy) => {
        if (enemy) {
          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
          }
          enemy.explode(false);
          playerLaser.destroy();
          this.upScore();
        }
      }
    );

    this.physics.add.overlap(this.player, this.enemyLasers, (player, laser) => {
      player.setData('count', player.getData('count') - 1);
      player.explode(false);
    });

    this.player.setData('count', this.lifeCount);
    this.physics.add.overlap(this.player, this.enemies, (player, enemy) => {
      player.setData('count', player.getData('count') - 1);
      player.explode(false);
    });

    this.backgrounds = [];
    for (let i = 0; i < 5; i += 1) {
      const keys = ['sprBg0', 'sprBg1'];
      const key = keys[Phaser.Math.Between(0, keys.length - 1)];
      const bg = new ScrollingBackground(this, key, i * 10);
      this.backgrounds.push(bg);
    }
  }

  update() {
    this.onDie();
    if (!this.player.getData('isDead')) {
      this.player.update();
      if (this.keyW.isDown) {
        this.player.moveUp();
      } else if (this.keyS.isDown) {
        this.player.moveDown();
      }
      if (this.keyA.isDown) {
        this.player.moveLeft();
      } else if (this.keyD.isDown) {
        this.player.x += 4;
      }

      if (this.keySpace.isDown) {
        this.player.setData('isShooting', true);
      } else {
        this.player.setData(
          'timerShootTick',
          this.player.getData('timerShootDelay') + 200
        );
        this.player.setData('isShooting', false);
      }
    }

    for (let i = 0; i < this.enemies.getChildren().length; i += 1) {
      const enemy = this.enemies.getChildren()[i];
      enemy.update();
      if (
        enemy.x < -enemy.displayWidth ||
        enemy.x > this.game.config.width + enemy.displayWidth ||
        enemy.y < -enemy.displayHeight * 4 ||
        enemy.y > this.game.config.height + enemy.displayHeight
      ) {
        if (enemy) {
          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
          }
          enemy.destroy();
        }
      }
    }
    for (let i = 0; i < this.enemyLasers.getChildren().length; i += 1) {
      const laser = this.enemyLasers.getChildren()[i];
      laser.update();
      if (
        laser.x < -laser.displayWidth ||
        laser.x > this.game.config.width + laser.displayWidth ||
        laser.y < -laser.displayHeight * 4 ||
        laser.y > this.game.config.height + laser.displayHeight
      ) {
        if (laser) {
          laser.destroy();
        }
      }
    }
    for (let i = 0; i < this.playerLasers.getChildren().length; i += 1) {
      const laser = this.playerLasers.getChildren()[i];
      laser.update();
      if (
        laser.x < -laser.displayWidth ||
        laser.x > this.game.config.width + laser.displayWidth ||
        laser.y < -laser.displayHeight * 4 ||
        laser.y > this.game.config.height + laser.displayHeight
      ) {
        if (laser) {
          laser.destroy();
        }
      }
    }
  }

  getEnemiesByType(type) {
    const arr = [];
    for (let i = 0; i < this.enemies.getChildren().length; i += 1) {
      const enemy = this.enemies.getChildren()[i];
      if (enemy.getData('type') === type) {
        arr.push(enemy);
      }
    }
    return arr;
  }

  onDie() {
    if (this.player.getData('count') === 2) {
      this.life.destroy();
      this.player = new Player(
        this,
        this.game.config.width * 0.5,
        this.game.config.height * 0.9,
        'sprPlayer'
      );
      this.physics.add.overlap(this.player, this.enemies, (player, enemy) => {
        player.setData('count', player.getData('count') - 1);
        player.explode(false);
        player.setData('count', 1);
      });

      this.physics.add.overlap(
        this.player,
        this.enemyLasers,
        (player, laser) => {
          player.setData('count', player.getData('count') - 1);
          player.explode(false);
          player.setData('count', 1);
        }
      );
    }
    if (this.player.getData('count') === 1) {
      this.life2.destroy();
      this.player = new Player(
        this,
        this.game.config.width * 0.5,
        this.game.config.height * 0.9,
        'sprPlayer'
      );
      this.physics.add.overlap(this.player, this.enemies, (player, enemy) => {
        player.setData('count', player.getData('count') - 1);
        player.explode(false);
        player.setData('count', 0);
        if (this.points > 0)
          sendScore(
            'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/7FyLZxJetCb8JHJ8nmn2/scores/',
            this.name,
            this.points
          );
        this.points = 0;
        player.explode(true);
        player.onDestroy();
      });

      this.physics.add.overlap(
        this.player,
        this.enemyLasers,
        (player, laser) => {
          player.setData('count', player.getData('count') - 1);
          player.explode(false);
          player.setData('count', 0);
          if (this.points > 0)
            sendScore(
              'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/7FyLZxJetCb8JHJ8nmn2/scores/',
              this.name,
              this.points
            );
          this.points = 0;
          player.explode(true);
          player.onDestroy();
        }
      );
    }
    if (this.player.getData('count') === 0) {
      this.life3.destroy();

      this.keyW = this.input.keyboard.clearCaptures();
      this.keyS = this.input.keyboard.clearCaptures();
      this.keyA = this.input.keyboard.clearCaptures();
      this.keyD = this.input.keyboard.clearCaptures();
      this.keySpace = this.input.keyboard.clearCaptures();
    }
  }

  onDestroy() {
    this.scene.time.addEvent({
      delay: 1000,
      callback: () => {
        this.scene.scene.start('SceneGameOver');
      },
      callbackScope: this,
      loop: false
    });
  }

  upScore() {
    const scoreLabel = document.getElementById('score-lbl');
    scoreLabel.innerHTML = `${this.name} <-> Score: ${this.points}`;
    this.points += 350;
  }
}
const sendScore = (url, name = 'Player', points) => {
  const response = axios.post(url, {
    user: name,
    score: points
  });
};
export default SceneMain;
