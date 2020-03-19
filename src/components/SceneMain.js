import {ScrollingBackground,Player,Enemy,ChaserShip,GunShip,CarrierShip} from './Entities';

class SceneMain extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneMain' });
  }
  init(data){
    console.log('init', data);
    this.name = (data.name === '') ? 'Player': data.name;
    this.life = null;
    this.life2 = null;
    this.life3 = null;
    this.lifeCount = 3;
    this.points=0;
}

  preload() {
    const scoreLabel =document.createElement('div');
    scoreLabel.innerHTML = `${this.name} <-> Score: ${this.points}`
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
    this.load.image("sprLaserPlayer", "img/sprLaserPlayer2.png");
    this.load.image('sprEnemy3', 'img/Enemy4.png');
    this.load.spritesheet("sprPlayer", "img/player2.png", {
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

    this.load.image("sprLaserEnemy0", "img/sprLaserEnemy0.png");
    this.load.audio("sndExplode0", "img/sndExplode0.wav");
    this.load.audio("sndExplode1", "img/sndExplode1.wav");
    this.load.audio("sndLaser", "img/sndLaser.wav");
  }
  create() {

    this.life=this.add.sprite(455,30, 'sprLife');
  this.life2=this.add.sprite(425,30, 'sprLife1');
    this.life3=this.add.sprite(395,30, 'sprLife2');

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

    this.anims.create({
      key: "sprEnemy2",
      frames: this.anims.generateFrameNumbers("sprEnemy2"),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "sprExplosion",
      frames: this.anims.generateFrameNumbers("sprExplosion"),
      frameRate: 20,
      repeat: 0
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
    this.enemyLasers = this.add.group();
    this.playerLasers = this.add.group();

    this.time.addEvent({
      delay:1000,
      callback: function() {
        var enemy = null;

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

    this.physics.add.collider(this.playerLasers, this.enemies, function(
      playerLaser,
      enemy
    ) {
      if (enemy) {
        if (enemy.onDestroy !== undefined) {
          enemy.onDestroy();
        }
        enemy.explode(true);
        playerLaser.destroy();
      }
    });

    console.log(`Soy lifeCount: ${this.lifeCount} --life: ${this.life}`);
    this.player.setData('count',this.lifeCount);
    this.physics.add.overlap(this.player, this.enemies, function(
      player,
      enemy
    ) {
        player.setData('count',player.getData('count')-1);
        player.explode(false);
    });


    this.backgrounds = [];
    for (var i = 0; i < 5; i++) {
      var keys = ['sprBg0', 'sprBg1'];
      var key = keys[Phaser.Math.Between(0, keys.length - 1)];
      var bg = new ScrollingBackground(this, key, i * 10);
      this.backgrounds.push(bg);
    }
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

  onDie(){

    if(this.player.getData('count')===2){

      this.life.destroy();
      this.player = new Player(
        this,
        this.game.config.width * 0.5,
        this.game.config.height * 0.9,
        "sprPlayer"
      );
      this.physics.add.overlap(this.player, this.enemies, function(
        player,
        enemy
      ) {
          player.setData('count',player.getData('count')-1);
          player.explode(false);
          player.setData('count',1);
      });

    }
    if(this.player.getData('count')===1){
      this.life2.destroy();
      this.player = new Player(
        this,
        this.game.config.width * 0.5,
        this.game.config.height * 0.9,
        "sprPlayer"
      );
      this.physics.add.overlap(this.player, this.enemies, function(
        player,
        enemy
      ) {
          player.setData('count',player.getData('count')-1);
          player.explode(false);
          player.setData('count',0);

    player.explode(true);
    player.onDestroy();

      });

    }
    if(this.player.getData('count')===0){
      this.life3.destroy();

    }

  }

  onDestroy() {
    this.scene.time.addEvent({
      // go to game over scene
      delay: 1000,
      callback: function() {
        this.scene.scene.start('SceneGameOver');
      },
      callbackScope: this,
      loop: false
    });
  }

  update() {
    this.onDie()
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

    for (var i = 0; i < this.enemies.getChildren().length; i++) {
      var enemy = this.enemies.getChildren()[i];
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
    for (var i = 0; i < this.enemyLasers.getChildren().length; i++) {
      var laser = this.enemyLasers.getChildren()[i];
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
    for (var i = 0; i < this.playerLasers.getChildren().length; i++) {
      var laser = this.playerLasers.getChildren()[i];
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
}

export default SceneMain;
