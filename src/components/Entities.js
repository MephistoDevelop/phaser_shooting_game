class Entity extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key, type) {
    super(scene, x, y, key);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);
    this.setData("type", type);
    this.setData("isDead", false);
  }

  explode(canDestroy) {
    if (!this.getData('isDead')) {
      // Set the texture to the explosion image, then play the animation
      this.setTexture('sprExplosion'); // this refers to the same animation key we used when we added this.anims.create previously
      this.play('sprExplosion'); // play the animation
      // pick a random explosion sound within the array we defined in this.sfx in SceneMain
      this.scene.sfx.explosions[
        Phaser.Math.Between(0, this.scene.sfx.explosions.length - 1)
      ].play();
      if (this.shootTimer !== undefined) {
        if (this.shootTimer) {
          this.shootTimer.remove(false);
        }
      }
      this.setAngle(0);
      this.body.setVelocity(0, 0);
      this.on(
        'animationcomplete',
        function() {
          if (canDestroy) {
            this.destroy();
          } else {
            this.setVisible(false);
          }
        },
        this
      );
      this.setData('isDead', true);
    }
  }
}

 class Player extends Entity{
  constructor(scene,x,y,type) {
    super(scene,x,y,type);
    this.setData("speed", 200);
    this.play("sprPlayer");
  }
  moveUp() {
    this.body.velocity.y = -this.getData("speed");
  }
  moveDown() {
    this.body.velocity.y = this.getData("speed");
  }
  moveLeft() {
    this.body.velocity.x = -this.getData("speed");
  }
  moveRigth(){
    this.body.velocity.x += 4;
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
    this.body.setVelocity(0, 0);
    this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width);
    this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height);
    if (this.getData("isShooting")) {
      if (this.getData("timerShootTick") < this.getData("timerShootDelay")) {
        this.setData("timerShootTick", this.getData("timerShootTick") + 1); // every game update, increase timerShootTick by one until we reach the value of timerShootDelay
      }
      else { // when the "manual timer" is triggered:
        var laser = new PlayerLaser(this.scene, this.x, this.y);
        this.scene.playerLasers.add(laser);

        this.scene.sfx.laser.play(); // play the laser sound effect
        this.setData("timerShootTick", 0);
      }
    }
  }
}

class ChaserShip extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "sprEnemy1", "ChaserShip");
    this.body.velocity.y = Phaser.Math.Between(50, 100);
  }
}
class GunShip extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "sprEnemy0", "GunShip");
    this.body.velocity.y = Phaser.Math.Between(50, 100);
    this.play("sprEnemy0");
  }
}
class CarrierShip extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "sprEnemy2", "CarrierShip");
    this.body.velocity.y = Phaser.Math.Between(50, 100);
    this.play("sprEnemy2");
  }
}

class PlayerLaser extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "sprLaserPlayer");
    this.body.velocity.y = -200;
  }
}

 class ScrollingBackground {
  constructor(scene, key, velocityY) {
    this.scene = scene;
    this.key = key;
    this.velocityY = velocityY;

    this.layers = this.scene.add.group();

    this.createLayers();
  }

  createLayers() {
    for (var i = 0; i < 2; i++) {
      // creating two backgrounds will allow a continuous flow giving the illusion that they are moving.
      var layer = this.scene.add.sprite(0, 0, this.key);
      layer.y = (layer.displayHeight * i);
      var flipX = Phaser.Math.Between(0, 10) >= 5 ? -1 : 1;
      var flipY = Phaser.Math.Between(0, 10) >= 5 ? -1 : 1;
      layer.setScale(flipX * 2, flipY * 2);
      layer.setDepth(-5 - (i - 1));
      this.scene.physics.world.enableBody(layer, 0);
      layer.body.velocity.y = this.velocityY;

      this.layers.add(layer);
    }
  }

  update() {
    if (this.layers.getChildren()[0].y > 0) {
      for (var i = 0; i < this.layers.getChildren().length; i++) {
        var layer = this.layers.getChildren()[i];
        layer.y = (-layer.displayHeight) + (layer.displayHeight * i);
      }
    }
  }
}

export {ScrollingBackground,Player,PlayerLaser,Entity,ChaserShip,GunShip,CarrierShip};