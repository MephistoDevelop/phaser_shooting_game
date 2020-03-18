import{ ScrollingBackground} from './Entities';
class SceneMainMenu extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneMainMenu' });
  }
  preload() {
    this.load.image('sprLogo', 'img/logo2.png');
    this.load.image('sprBg0', 'img/space.png');
    this.load.image('sprBg1', 'img/space.png');
    this.load.image('sprBtnPlay', 'img/sprBtnPlay.png');
    this.load.image('sprBtnPlayHover', 'img/sprBtnPlayHover.png');
    this.load.image('sprBtnPlayDown', 'img/sprBtnPlayDown.png');
    this.load.image('sprBtnRestart', 'img/sprBtnRestart.png');
    this.load.image('sprBtnRestartHover', 'img/sprBtnRestartHover.png');
    this.load.image('sprBtnRestartDown', 'img/sprBtnRestartDown.png');
    this.load.audio('sndBtnOver', 'img/sndBtnOver.wav');
    this.load.audio('sndBtnDown', 'img/sndBtnDown.wav');
  }

  create() {
    this.sfx = {
      btnOver: this.sound.add('sndBtnOver'),
      btnDown: this.sound.add('sndBtnDown')
    };
    this.logo = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'sprLogo');
      this.logo.setOrigin(0.5,1.5);

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

    this.btnPlay.on("pointerdown", function() {
      this.btnPlay.setTexture("sprBtnPlayDown");
      this.sfx.btnDown.play();
    }, this);

    this.btnPlay.on("pointerup", function() {
      this.btnPlay.setTexture("sprBtnPlay");
      this.scene.start("SceneMain");
    }, this);


    // this.title = this.add.text(
    //   this.game.config.width * 0.5,
    //   128,
    //   "MEPHISTO'S ATTACK",
    //   {
    //     fontFamily: 'monospace',
    //     fontSize: 32,
    //     fontStyle: 'bold',
    //     color: 'white',
    //     align: 'center'
    //   }
    // );
    // this.title.setOrigin(0.5);

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
}

export default SceneMainMenu;
