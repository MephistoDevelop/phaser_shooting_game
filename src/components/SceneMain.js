import {ScrollingBackground,Player,Enemy,ChaserShip,GunShip,CarrierShip} from './Entities';

class SceneMain extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneMain' });
  }
  preload() {
    this.load.image("sprLaserPlayer", "img/sprLaserPlayer2.png");
    this.load.image('sprEnemy3', 'img/Enemy4.png');
    this.load.spritesheet("sprPlayer", "img/player.png", {
      frameWidth: 45,
      frameHeight: 45
    });
    this.load.spritesheet('sprEnemy0', 'img/Enemy.png', {
      frameWidth: 30,
      frameHeight: 30
    });
    this.load.spritesheet('sprEnemy1', 'img/Enemy2.png', {
      frameWidth: 18,
      frameHeight: 18
    });
    this.load.spritesheet('sprEnemy2', 'img/Enemy3.png', {
      frameWidth: 22,
      frameHeight: 22
    });

    this.load.audio("sndExplode0", "img/sndExplode0.wav");
    this.load.audio("sndExplode1", "img/sndExplode1.wav");
    this.load.audio("sndLaser", "img/sndLaser.wav");
  }
  create() {

    this.anims.create({
      key: "sprEnemy2",
      frames: this.anims.generateFrameNumbers("sprEnemy2"),
      frameRate: 20,
      repeat: -1
    });
    // this.anims.create({
    //   key: "sprExplosion",
    //   frames: this.anims.generateFrameNumbers("sprExplosion"),
    //   frameRate: 20,
    //   repeat: 0
    // });
    this.anims.create({
      key: "sprPlayer",
      frames: this.anims.generateFrameNumbers("sprPlayer"),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "sprEnemy0",
      frames: this.anims.generateFrameNumbers("sprEnemy0"),
      frameRate: 20,
      repeat: -1
    });

    this.sfx = {
      explosions: [
        this.sound.add("sndExplode0"),
        this.sound.add("sndExplode1")
      ],
      laser: this.sound.add("sndLaser")
    };
    this.sfx.laser.play();

    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      "sprPlayer"
    );
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.enemies = this.add.group();
    // this.enemyLasers = this.add.group();
    this.playerLasers = this.add.group();

    this.time.addEvent({
      delay:2500,
      callback: function() {
        var enemy = null;

        if (Phaser.Math.Between(0, 10) >= 3) {
          enemy = new GunShip(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0
          );
        } else if (Phaser.Math.Between(0, 10) >= 5) {
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
          enemy.setScale(Phaser.Math.Between(10, 20) * 0.1);
          this.enemies.add(enemy);
        }
      },
      callbackScope: this,
      loop: true
    });


    this.backgrounds = [];
    for (var i = 0; i < 5; i++) {
      var keys = ['sprBg0', 'sprBg1'];
      var key = keys[Phaser.Math.Between(0, keys.length - 1)];
      var bg = new ScrollingBackground(this, key, i * 10);
      this.backgrounds.push(bg);
    }
    console.log(this.player);
  }

  getEnemiesByType(type) {
    var arr = [];
    for (var i = 0; i < this.enemies.getChildren().length; i++) {
      var enemy = this.enemies.getChildren()[i];
      if (enemy.getData('type') == type) {
        arr.push(enemy);
      }
    }
    return arr;
  }

  update() {
    if (!this.player.getData("isDead")) {
      this.player.update();
      if (this.keyW.isDown) {
        this.player.moveUp();
      }
      else if (this.keyS.isDown) {
        this.player.moveDown();
      }
      if (this.keyA.isDown) {
        this.player.moveLeft();
      }
      else if (this.keyD.isDown) {
        this.player.x +=4;
      }

      if (this.keySpace.isDown) {
        this.player.setData("isShooting", true);
      }
      else {
        this.player.setData("timerShootTick", this.player.getData("timerShootDelay") +200);
        this.player.setData("isShooting", false);
      }
    }
  }
}

export default SceneMain;
