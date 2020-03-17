import {ScrollingBackground,Player,Enemy} from './Entities';

class SceneMain extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneMain' });
  }
  preload() {

    this.load.image("sprLaserPlayer", "img/sprLaserPlayer2.png");
    this.load.spritesheet("sprPlayer", "img/player.png", {
      frameWidth: 45,
      frameHeight: 45
    });

    this.load.audio("sndExplode0", "img/sndExplode0.wav");
    this.load.audio("sndExplode1", "img/sndExplode1.wav");
    this.load.audio("sndLaser", "img/sndLaser.wav");
  }
  create() {
    // this.anims.create({
    //   key: "sprEnemy0",
    //   frames: this.anims.generateFrameNumbers("sprEnemy0"),
    //   frameRate: 20,
    //   repeat: -1
    // });
    // this.anims.create({
    //   key: "sprEnemy2",
    //   frames: this.anims.generateFrameNumbers("sprEnemy2"),
    //   frameRate: 20,
    //   repeat: -1
    // });
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
    // this.enemies = this.add.group();
    // this.enemyLasers = this.add.group();
    this.playerLasers = this.add.group();
    // this.time.addEvent({
    //   delay: 100,
    //   callback: function() {
    //     var enemy = new GunShip(
    //       this,
    //       Phaser.Math.Between(0, this.game.config.width),
    //       0
    //     );
    //     this.enemies.add(enemy);
    //   },
    //   callbackScope: this,
    //   loop: true
    // });


    this.backgrounds = [];
    for (var i = 0; i < 5; i++) {
      var keys = ['sprBg0', 'sprBg1'];
      var key = keys[Phaser.Math.Between(0, keys.length - 1)];
      var bg = new ScrollingBackground(this, key, i * 10);
      this.backgrounds.push(bg);
    }
    console.log(this.player);
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
        this.player.setData("timerShootTick", this.player.getData("timerShootDelay") - 1);
        this.player.setData("isShooting", false);
      }
    }
  }
}

export default SceneMain;
