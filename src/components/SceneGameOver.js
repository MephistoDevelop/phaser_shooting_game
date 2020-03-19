import {ScrollingBackground} from './Entities';
import axios from 'axios';

class SceneGameOver extends Phaser.Scene{
  constructor(){
    super({ key: "SceneGameOver" });
  }
  getDataAxios(url){

    const response = axios.get(
      url,
      { headers: { 'Content-Type': 'application/json' } }
    );
    response.then((result)=>{
      console.log(result.data.result);
      const scoreArray=result.data.result;
      const element = document.createElement('div');
      const itemsContainer = document.createElement('div');
      itemsContainer.id='items-container';
      element.id = 'score-title-container';
      element.innerHTML = '<div class="item-score"><span id="userTitle">User  '+'</span>  <span id="scoreTitle">Score '+'</span></div>';
      document.getElementById('content').appendChild(element);
      document.getElementById('content').appendChild(itemsContainer);
    for(let i = 0; i <= scoreArray.length; i+=1){
      const element = document.createElement('div');
      element.className = 'item-container';
      element.innerHTML = '<span class="userText">'+scoreArray[i].user+'</span>  <span class="scoreText"> '+scoreArray[i].score+'</span>';
      document.getElementById('items-container').appendChild(element);
    }


    });
    // for (const obj in response.data){
    //   console.log(response.data[obj]);
    //   const element = document.createElement('p');
    //   element.innerText=response.data[obj]
    //   document.getElementById('content').appendChild(element);
    // }
  }
  init(){
    const score = document.createElement('div');
    score.id="score-container";
    document.getElementById('score-lbl').remove();
    var url =
    'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/WNZPvrWyhiH0BNFD0WAo/scores/';

  this.getDataAxios(url);
  }
  preload(){
    this.load.image('sprOver', 'img/game-over.png');
    this.load.image('sprBtnRestart', 'img/sprBtnRestart.png');
    this.load.image('sprBtnRestartHover', 'img/sprBtnRestartHover.png');
    this.load.image('sprBtnRestartDown', 'img/sprBtnRestartDown.png');
  }
  create(){
        this.btnRestart = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.7,
      "sprBtnRestart"
    );


    this.sfx = {
      btnOver: this.sound.add("sndBtnOver"),
      btnDown: this.sound.add("sndBtnDown")
    };

    this.logo = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'sprOver');
      this.logo.setOrigin(0.5,3);

      this.btnRestart.setInteractive();

      this.btnRestart.on(
        'pointerover',
        function() {
          this.btnRestart.setTexture('sprBtnRestartHover'); // set the button texture to sprBtnPlayHover
          this.sfx.btnOver.play(); // play the button over sound
        },
        this
      );

      this.btnRestart.on('pointerout', function() {
        this.setTexture('sprBtnRestart');
      });

      this.btnRestart.on("pointerdown", function() {
        this.btnRestart.setTexture("sprBtnRestartDown");
        this.sfx.btnDown.play();
      }, this);

      this.btnRestart.on("pointerup", function() {
        this.btnRestart.setTexture("sprBtnRestart");
        this.scene.start("SceneName");
      }, this);



    this.backgrounds = [];
    for (var i = 0; i < 5; i++) {
      var keys = ["sprBg0", "sprBg1"];
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

export default SceneGameOver;