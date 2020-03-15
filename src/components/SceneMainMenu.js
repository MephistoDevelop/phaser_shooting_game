class SceneMainMenu extends Phaser.Scene{
  constructor(){
    super({key: "SceneMain"});
  }

  create(){
    this.scene.start("SceneMain");
  }
}