/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/Entities.js":
/*!************************************!*\
  !*** ./src/components/Entities.js ***!
  \************************************/
/*! exports provided: ScrollingBackground, Player, PlayerLaser, Entity, ChaserShip, GunShip, CarrierShip */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ScrollingBackground\", function() { return ScrollingBackground; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Player\", function() { return Player; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"PlayerLaser\", function() { return PlayerLaser; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Entity\", function() { return Entity; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ChaserShip\", function() { return ChaserShip; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GunShip\", function() { return GunShip; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CarrierShip\", function() { return CarrierShip; });\nclass Entity extends Phaser.GameObjects.Sprite {\n  constructor(scene, x, y, key, type) {\n    super(scene, x, y, key);\n    this.scene = scene;\n    this.scene.add.existing(this);\n    this.scene.physics.world.enableBody(this, 0);\n    this.setData(\"type\", type);\n    this.setData(\"isDead\", false);\n  }\n\n  explode(canDestroy) {\n    if (!this.getData('isDead')) {\n      // Set the texture to the explosion image, then play the animation\n      this.setTexture('sprExplosion'); // this refers to the same animation key we used when we added this.anims.create previously\n      this.play('sprExplosion'); // play the animation\n      // pick a random explosion sound within the array we defined in this.sfx in SceneMain\n      this.scene.sfx.explosions[\n        Phaser.Math.Between(0, this.scene.sfx.explosions.length - 1)\n      ].play();\n      if (this.shootTimer !== undefined) {\n       if (this.shootTimer) {\n          this.shootTimer.remove(false);\n        }\n      }\n      this.setAngle(0);\n      this.body.setVelocity(0, 0);\n      this.on(\n        'animationcomplete',\n        function() {\n          if (canDestroy) {\n            this.destroy();\n          } else {\n            this.setVisible(false);\n          }\n        },\n        this\n      );\n      this.setData('isDead', true);\n    }\n  }\n}\n\n class Player extends Entity{\n  constructor(scene,x,y,type) {\n    super(scene,x,y,type);\n    this.setData(\"speed\", 200);\n    this.play(\"sprPlayer\");\n  }\n  moveUp() {\n    this.body.velocity.y = -this.getData(\"speed\");\n  }\n  moveDown() {\n    this.body.velocity.y = this.getData(\"speed\");\n  }\n  moveLeft() {\n    this.body.velocity.x = -this.getData(\"speed\");\n  }\n  moveRigth(){\n    this.body.velocity.x += 4;\n  }\n\n  onDestroy() {\n    this.scene.time.addEvent({\n      // go to game over scene\n      delay: 1000,\n      callback: function() {\n        this.scene.scene.start('SceneGameOver');\n      },\n      callbackScope: this,\n      loop: false\n    });\n  }\n  update() {\n    this.body.setVelocity(0, 0);\n    this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width);\n    this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height);\n    if (this.getData(\"isShooting\")) {\n      if (this.getData(\"timerShootTick\") < this.getData(\"timerShootDelay\")) {\n        this.setData(\"timerShootTick\", this.getData(\"timerShootTick\") + 1); // every game update, increase timerShootTick by one until we reach the value of timerShootDelay\n      }\n      else { // when the \"manual timer\" is triggered:\n        var laser = new PlayerLaser(this.scene, this.x, this.y);\n        this.scene.playerLasers.add(laser);\n\n        this.scene.sfx.laser.play(); // play the laser sound effect\n        this.setData(\"timerShootTick\", 0);\n      }\n    }\n  }\n}\n\n\nclass PlayerLaser extends Entity {\n  constructor(scene, x, y) {\n    super(scene, x, y, \"sprLaserPlayer\");\n    this.body.velocity.y = -200;\n  }\n}\n\nclass EnemyLaser extends Entity {\n  constructor(scene, x, y) {\n    super(scene, x, y, \"sprLaserEnemy0\");\n    this.body.velocity.y = 200;\n  }\n}\n\nclass ChaserShip extends Entity {\n  constructor(scene, x, y) {\n    super(scene, x, y, \"sprEnemy1\", \"ChaserShip\");\n\n    this.body.velocity.y = Phaser.Math.Between(50, 100);\n\n    this.states = {\n      MOVE_DOWN: \"MOVE_DOWN\",\n      CHASE: \"CHASE\"\n    };\n    this.state = this.states.MOVE_DOWN;\n  }\n\n  update() {\n    if (!this.getData(\"isDead\") && this.scene.player) {\n      if (Phaser.Math.Distance.Between(\n        this.x,\n        this.y,\n        this.scene.player.x,\n        this.scene.player.y\n      ) < 320) {\n\n        this.state = this.states.CHASE;\n      }\n\n      if (this.state == this.states.CHASE) {\n        var dx = this.scene.player.x - this.x;\n        var dy = this.scene.player.y - this.y;\n\n        var angle = Math.atan2(dy, dx);\n\n        var speed = 100;\n        this.body.setVelocity(\n          Math.cos(angle) * speed,\n          Math.sin(angle) * speed\n        );\n\n        if (this.x < this.scene.player.x) {\n          this.angle -= 5;\n        }\n        else {\n          this.angle += 5;\n        }\n      }\n    }\n  }\n}\n\nclass GunShip extends Entity {\n  constructor(scene, x, y) {\n    super(scene, x, y, \"sprEnemy0\", \"GunShip\");\n    this.play(\"sprEnemy0\");\n\n    this.body.velocity.y = Phaser.Math.Between(50, 100);\n\n    this.shootTimer = this.scene.time.addEvent({\n      delay: 1500,\n      callback: function() {\n        var laser = new EnemyLaser(\n          this.scene,\n          this.x,\n          this.y\n        );\n        laser.setScale(this.scaleX);\n        this.scene.enemyLasers.add(laser);\n      },\n      callbackScope: this,\n      loop: true\n    });\n  }\n\n  onDestroy() {\n    if (this.shootTimer !== undefined) {\n      if (this.shootTimer) {\n        this.shootTimer.remove(false);\n      }\n    }\n  }\n}\n\nclass CarrierShip extends Entity {\n  constructor(scene, x, y) {\n    super(scene, x, y, \"sprEnemy2\", \"CarrierShip\");\n    this.play(\"sprEnemy2\");\n\n    this.body.velocity.y = Phaser.Math.Between(50, 100);\n  }\n}\n\n class ScrollingBackground {\n  constructor(scene, key, velocityY) {\n    this.scene = scene;\n    this.key = key;\n    this.velocityY = velocityY;\n\n    this.layers = this.scene.add.group();\n\n    this.createLayers();\n  }\n\n  createLayers() {\n    for (var i = 0; i < 1; i++) {\n      // creating two backgrounds will allow a continuous flow giving the illusion that they are moving.\n      var layer = this.scene.add.sprite(0, 0, this.key);\n      layer.y = (layer.displayHeight * i);\n      var flipX = Phaser.Math.Between(0, 10) >= 1 ? -1 : 1;\n      var flipY = Phaser.Math.Between(0, 10) >= 1 ? -1 : 1;\n      layer.setScale(flipX * 2, flipY * 2);\n      layer.setDepth(-5 - (i - 1));\n      this.scene.physics.world.enableBody(layer, 0);\n      layer.body.velocity.y = this.velocityY;\n\n      this.layers.add(layer);\n    }\n  }\n\n  update() {\n    if (this.layers.getChildren()[0].y > 0) {\n      for (var i = 0; i < this.layers.getChildren().length; i++) {\n        var layer = this.layers.getChildren()[i];\n        layer.y = (-layer.displayHeight) + (layer.displayHeight * i);\n      }\n    }\n  }\n}\n\n\n\n//# sourceURL=webpack:///./src/components/Entities.js?");

/***/ }),

/***/ "./src/components/SceneGameOver.js":
/*!*****************************************!*\
  !*** ./src/components/SceneGameOver.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Entities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Entities */ \"./src/components/Entities.js\");\n\nclass SceneGameOver extends Phaser.Scene{\n  constructor(){\n    super({ key: \"SceneGameOver\" });\n  }\n  create(){\n\n    this.backgrounds = [];\n    for (var i = 0; i < 5; i++) {\n      var keys = [\"sprBg0\", \"sprBg1\"];\n      var key = keys[Phaser.Math.Between(0, keys.length - 1)];\n      var bg = new _Entities__WEBPACK_IMPORTED_MODULE_0__[\"ScrollingBackground\"](this, key, i * 10);\n      this.backgrounds.push(bg);\n    }\n  }\n\n  update() {\n    for (var i = 0; i < this.backgrounds.length; i++) {\n      this.backgrounds[i].update();\n    }\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (SceneGameOver);\n\n//# sourceURL=webpack:///./src/components/SceneGameOver.js?");

/***/ }),

/***/ "./src/components/SceneMain.js":
/*!*************************************!*\
  !*** ./src/components/SceneMain.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Entities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Entities */ \"./src/components/Entities.js\");\n\n\nclass SceneMain extends Phaser.Scene {\n  constructor() {\n    super({ key: 'SceneMain' });\n  }\n  init(data){\n    console.log('init', data);\n    this.name = (data.name === '') ? 'Player': data.name;\n    this.life = null;\n    this.life2 = null;\n    this.life3 = null;\n    this.lifeCount = 3;\n    this.points=0;\n}\n\n  preload() {\n    const scoreLabel =document.createElement('div');\n    scoreLabel.innerHTML = `${this.name} <-> Score: ${this.points}`\n    scoreLabel.id = 'score-lbl';\n    document.getElementById('content').appendChild(scoreLabel);\n\n\n    this.load.spritesheet('sprLife', 'img/life.png', {\n      frameWidth: 25,\n      frameHeight: 25\n    });\n    this.load.spritesheet('sprLife1', 'img/life.png', {\n      frameWidth: 25,\n      frameHeight: 25\n    });\n    this.load.spritesheet('sprLife2', 'img/life.png', {\n      frameWidth: 25,\n      frameHeight: 25\n    });\n    this.load.spritesheet('sprExplosion', 'img/sprExplosion.png', {\n      frameWidth: 32,\n      frameHeight: 32\n    });\n    this.load.image(\"sprLaserPlayer\", \"img/sprLaserPlayer2.png\");\n    this.load.image('sprEnemy3', 'img/Enemy4.png');\n    this.load.spritesheet(\"sprPlayer\", \"img/player2.png\", {\n      frameWidth: 38,\n      frameHeight: 38\n    });\n    this.load.spritesheet('sprEnemy0', 'img/Enemy.png', {\n      frameWidth: 30,\n      frameHeight: 30\n    });\n    this.load.spritesheet('sprEnemy1', 'img/ovni.png', {\n      frameWidth: 25,\n      frameHeight: 25\n    });\n    this.load.spritesheet('sprEnemy2', 'img/Enemy3.png', {\n      frameWidth: 22,\n      frameHeight: 22\n    });\n\n    this.load.image(\"sprLaserEnemy0\", \"img/sprLaserEnemy0.png\");\n    this.load.audio(\"sndExplode0\", \"img/sndExplode0.wav\");\n    this.load.audio(\"sndExplode1\", \"img/sndExplode1.wav\");\n    this.load.audio(\"sndLaser\", \"img/sndLaser.wav\");\n  }\n  create() {\n\n    this.life=this.add.sprite(455,30, 'sprLife');\n  this.life2=this.add.sprite(425,30, 'sprLife1');\n    this.life3=this.add.sprite(395,30, 'sprLife2');\n\n    this.anims.create({\n      key: \"sprPlayer\",\n      frames: this.anims.generateFrameNumbers(\"sprPlayer\"),\n      frameRate: 20,\n      repeat: -1\n    });\n\n    this.anims.create({\n      key: \"sprEnemy0\",\n      frames: this.anims.generateFrameNumbers(\"sprEnemy0\"),\n      frameRate: 20,\n      repeat: -1\n    });\n\n    this.anims.create({\n      key: \"sprEnemy2\",\n      frames: this.anims.generateFrameNumbers(\"sprEnemy2\"),\n      frameRate: 20,\n      repeat: -1\n    });\n\n    this.anims.create({\n      key: \"sprExplosion\",\n      frames: this.anims.generateFrameNumbers(\"sprExplosion\"),\n      frameRate: 20,\n      repeat: 0\n    });\n\n    this.sfx = {\n      explosions: [\n        this.sound.add(\"sndExplode0\"),\n        this.sound.add(\"sndExplode1\")\n      ],\n      laser: this.sound.add(\"sndLaser\")\n    };\n    this.sfx.laser.play();\n\n    this.player = new _Entities__WEBPACK_IMPORTED_MODULE_0__[\"Player\"](\n      this,\n      this.game.config.width * 0.5,\n      this.game.config.height * 0.5,\n      \"sprPlayer\"\n    );\n\n\n    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);\n    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);\n    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);\n    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);\n    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);\n    this.enemies = this.add.group();\n    this.enemyLasers = this.add.group();\n    this.playerLasers = this.add.group();\n\n    this.time.addEvent({\n      delay:1000,\n      callback: function() {\n        var enemy = null;\n\n        if (Phaser.Math.Between(0, 10) >= 3) {\n          enemy = new _Entities__WEBPACK_IMPORTED_MODULE_0__[\"GunShip\"](\n            this,\n            Phaser.Math.Between(0, this.game.config.width),\n            0\n          );\n        } else if (Phaser.Math.Between(0, 10) >= 3) {\n          if (this.getEnemiesByType('ChaserShip').length < 5) {\n            enemy = new _Entities__WEBPACK_IMPORTED_MODULE_0__[\"ChaserShip\"](\n              this,\n              Phaser.Math.Between(0, this.game.config.width),\n              0\n            );\n          }\n        } else {\n          enemy = new _Entities__WEBPACK_IMPORTED_MODULE_0__[\"CarrierShip\"](\n            this,\n            Phaser.Math.Between(0, this.game.config.width),\n            0\n          );\n        }\n\n        if (enemy !== null) {\n          enemy.setScale(Phaser.Math.Between(15, 20) * 0.1);\n          this.enemies.add(enemy);\n        }\n      },\n      callbackScope: this,\n      loop: true\n    });\n\n    this.physics.add.collider(this.playerLasers, this.enemies, function(\n      playerLaser,\n      enemy\n    ) {\n      if (enemy) {\n        if (enemy.onDestroy !== undefined) {\n          enemy.onDestroy();\n        }\n        enemy.explode(true);\n        playerLaser.destroy();\n      }\n    });\n\n    console.log(`Soy lifeCount: ${this.lifeCount} --life: ${this.life}`);\n    this.player.setData('count',this.lifeCount);\n    this.physics.add.overlap(this.player, this.enemies, function(\n      player,\n      enemy\n    ) {\n        player.setData('count',player.getData('count')-1);\n        player.explode(false);\n    });\n\n\n    this.backgrounds = [];\n    for (var i = 0; i < 5; i++) {\n      var keys = ['sprBg0', 'sprBg1'];\n      var key = keys[Phaser.Math.Between(0, keys.length - 1)];\n      var bg = new _Entities__WEBPACK_IMPORTED_MODULE_0__[\"ScrollingBackground\"](this, key, i * 10);\n      this.backgrounds.push(bg);\n    }\n  }\n\n  getEnemiesByType(type) {\n    var arr = [];\n    for (var i = 0; i < this.enemies.getChildren().length; i++) {\n      var enemy = this.enemies.getChildren()[i];\n      if (enemy.getData('type') == type) {\n        arr.push(enemy);\n      }\n    }\n    return arr;\n  }\n\n  onDie(){\n\n    if(this.player.getData('count')===2){\n\n      this.life.destroy();\n      this.player = new _Entities__WEBPACK_IMPORTED_MODULE_0__[\"Player\"](\n        this,\n        this.game.config.width * 0.5,\n        this.game.config.height * 0.5,\n        \"sprPlayer\"\n      );\n      this.physics.add.overlap(this.player, this.enemies, function(\n        player,\n        enemy\n      ) {\n          player.setData('count',player.getData('count')-1);\n          player.explode(false);\n          player.setData('count',1);\n      });\n      // this.player.setData('count',2);\n      console.log(`Soy player.Count: : ${this.player.getData('count')} -- ${this.lifeCount}`);\n\n      // this.physics.add.overlap(this.player, this.enemies, function(\n      //   player,\n      //   enemy\n      // ) {\n      //     player.setData('count',player.getData('count')-1);\n      //     player.explode(false);\n      // });\n\n    }\n    if(this.player.getData('count')===1){\n      this.life2.destroy();\n      this.player = new _Entities__WEBPACK_IMPORTED_MODULE_0__[\"Player\"](\n        this,\n        this.game.config.width * 0.5,\n        this.game.config.height * 0.5,\n        \"sprPlayer\"\n      );\n      this.physics.add.overlap(this.player, this.enemies, function(\n        player,\n        enemy\n      ) {\n          player.setData('count',player.getData('count')-1);\n          player.explode(false);\n          player.setData('count',0);\n\n    player.explode(true);\n    player.onDestroy();\n\n      });\n\n    }\n    if(this.player.getData('count')===0){\n      this.life3.destroy();\n    }\n\n  }\n\n  onDestroy() {\n    this.scene.time.addEvent({\n      // go to game over scene\n      delay: 1000,\n      callback: function() {\n        this.scene.scene.start('SceneGameOver');\n      },\n      callbackScope: this,\n      loop: false\n    });\n  }\n\n  update() {\n    this.onDie()\n    if (!this.player.getData(\"isDead\")) {\n      this.player.update();\n      if (this.keyW.isDown) {\n        this.player.moveUp();\n      }\n      else if (this.keyS.isDown) {\n        this.player.moveDown();\n      }\n      if (this.keyA.isDown) {\n        this.player.moveLeft();\n      }\n      else if (this.keyD.isDown) {\n        this.player.x +=4;\n      }\n\n      if (this.keySpace.isDown) {\n        this.points+=300;\n        document.getElementById('score-lbl').innerHTML = `${this.name} <-> Score: ${this.points}`,\n        this.player.setData(\"isShooting\", true);\n      }\n      else {\n        this.player.setData(\"timerShootTick\", this.player.getData(\"timerShootDelay\") +200);\n        this.player.setData(\"isShooting\", false);\n      }\n    }\n\n    for (var i = 0; i < this.enemies.getChildren().length; i++) {\n      var enemy = this.enemies.getChildren()[i];\n      enemy.update();\n      if (\n        enemy.x < -enemy.displayWidth ||\n        enemy.x > this.game.config.width + enemy.displayWidth ||\n        enemy.y < -enemy.displayHeight * 4 ||\n        enemy.y > this.game.config.height + enemy.displayHeight\n      ) {\n        if (enemy) {\n          if (enemy.onDestroy !== undefined) {\n            enemy.onDestroy();\n          }\n          enemy.destroy();\n        }\n      }\n    }\n    for (var i = 0; i < this.enemyLasers.getChildren().length; i++) {\n      var laser = this.enemyLasers.getChildren()[i];\n      laser.update();\n      if (\n        laser.x < -laser.displayWidth ||\n        laser.x > this.game.config.width + laser.displayWidth ||\n        laser.y < -laser.displayHeight * 4 ||\n        laser.y > this.game.config.height + laser.displayHeight\n      ) {\n        if (laser) {\n          laser.destroy();\n        }\n      }\n    }\n    for (var i = 0; i < this.playerLasers.getChildren().length; i++) {\n      var laser = this.playerLasers.getChildren()[i];\n      laser.update();\n      if (\n        laser.x < -laser.displayWidth ||\n        laser.x > this.game.config.width + laser.displayWidth ||\n        laser.y < -laser.displayHeight * 4 ||\n        laser.y > this.game.config.height + laser.displayHeight\n      ) {\n        if (laser) {\n          laser.destroy();\n        }\n      }\n    }\n\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (SceneMain);\n\n\n//# sourceURL=webpack:///./src/components/SceneMain.js?");

/***/ }),

/***/ "./src/components/SceneMainMenu.js":
/*!*****************************************!*\
  !*** ./src/components/SceneMainMenu.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Entities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Entities */ \"./src/components/Entities.js\");\n\nclass SceneMainMenu extends Phaser.Scene {\n  constructor() {\n    super({ key: 'SceneMainMenu' });\n  }\n  preload() {\n    this.load.image('sprLogo', 'img/logo2.png');\n    this.load.image('sprBg0', 'img/space.png');\n    this.load.image('sprBg1', 'img/space.png');\n    this.load.image('sprBtnPlay', 'img/sprBtnPlay.png');\n    this.load.image('sprBtnPlayHover', 'img/sprBtnPlayHover.png');\n    this.load.image('sprBtnPlayDown', 'img/sprBtnPlayDown.png');\n    this.load.image('sprBtnRestart', 'img/sprBtnRestart.png');\n    this.load.image('sprBtnRestartHover', 'img/sprBtnRestartHover.png');\n    this.load.image('sprBtnRestartDown', 'img/sprBtnRestartDown.png');\n    this.load.audio('sndBtnOver', 'img/sndBtnOver.wav');\n    this.load.audio('sndBtnDown', 'img/sndBtnDown.wav');\n  }\n\n  create() {\n    this.sfx = {\n      btnOver: this.sound.add('sndBtnOver'),\n      btnDown: this.sound.add('sndBtnDown')\n    };\n    this.logo = this.add.sprite(\n      this.game.config.width * 0.5,\n      this.game.config.height * 0.5,\n      'sprLogo');\n      this.logo.setOrigin(0.5,1.5);\n\n    this.btnPlay = this.add.sprite(\n      this.game.config.width * 0.5,\n      this.game.config.height * 0.5,\n      'sprBtnPlay'\n    );\n    this.btnPlay.setInteractive();\n\n    this.btnPlay.on(\n      'pointerover',\n      function() {\n        this.btnPlay.setTexture('sprBtnPlayHover'); // set the button texture to sprBtnPlayHover\n        this.sfx.btnOver.play(); // play the button over sound\n      },\n      this\n    );\n\n    this.btnPlay.on('pointerout', function() {\n      this.setTexture('sprBtnPlay');\n    });\n\n    this.btnPlay.on(\"pointerdown\", function() {\n      this.btnPlay.setTexture(\"sprBtnPlayDown\");\n      this.sfx.btnDown.play();\n    }, this);\n\n    this.btnPlay.on(\"pointerup\", function() {\n      this.btnPlay.setTexture(\"sprBtnPlay\");\n      this.scene.start(\"SceneName\");\n    }, this);\n\n\n    // this.title = this.add.text(\n    //   this.game.config.width * 0.5,\n    //   128,\n    //   \"MEPHISTO'S ATTACK\",\n    //   {\n    //     fontFamily: 'monospace',\n    //     fontSize: 32,\n    //     fontStyle: 'bold',\n    //     color: 'white',\n    //     align: 'center'\n    //   }\n    // );\n    // this.title.setOrigin(0.5);\n\n    this.backgrounds = [];\n    for (var i = 0; i < 1; i++) {\n      var keys = ['sprBg0', 'sprBg1'];\n      var key = keys[Phaser.Math.Between(0, keys.length - 1)];\n      var bg = new _Entities__WEBPACK_IMPORTED_MODULE_0__[\"ScrollingBackground\"](this, key, i * 10);\n      this.backgrounds.push(bg);\n    }\n  }\n  update() {\n    for (var i = 0; i < this.backgrounds.length; i++) {\n      this.backgrounds[i].update();\n    }\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (SceneMainMenu);\n\n\n//# sourceURL=webpack:///./src/components/SceneMainMenu.js?");

/***/ }),

/***/ "./src/components/SceneName.js":
/*!*************************************!*\
  !*** ./src/components/SceneName.js ***!
  \*************************************/
/*! exports provided: playerName, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"playerName\", function() { return playerName; });\n/* harmony import */ var _Entities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Entities */ \"./src/components/Entities.js\");\n\nlet playerName='';\nclass SceneName extends Phaser.Scene {\n  constructor() {\n      super('SceneName');\n  }\n  preload() {\n      const nameBox = document.createElement('input');\n      nameBox.id = 'nameBox';\n      nameBox.type = 'input'\n      nameBox.placeholder = 'Player Name'\n      document.getElementById('content').appendChild(nameBox);\n\n      this.load.image('sprBtnPlay', 'img/sprBtnPlay.png');\n      this.load.image('sprBtnPlayHover', 'img/sprBtnPlayHover.png');\n      this.load.image('sprBtnPlayDown', 'img/sprBtnPlayDown.png');\n      this.load.image('sprBg0', 'img/space.png');\n      this.load.image('sprBg1', 'img/space.png');\n  }\n\n  create ()\n  {\n    this.sfx = {\n        btnOver: this.sound.add('sndBtnOver'),\n        btnDown: this.sound.add('sndBtnDown')\n      };\n    this.btnPlay = this.add.sprite(\n        this.game.config.width * 0.5,\n        this.game.config.height * 0.5,\n        'sprBtnPlay'\n      );\n      this.btnPlay.setInteractive();\n\n      this.btnPlay.on(\n        'pointerover',\n        function() {\n          this.btnPlay.setTexture('sprBtnPlayHover'); // set the button texture to sprBtnPlayHover\n          this.sfx.btnOver.play(); // play the button over sound\n        },\n        this\n      );\n\n      this.btnPlay.on('pointerout', function() {\n        this.setTexture('sprBtnPlay');\n      });\n\n      this.btnPlay.on(\"pointerdown\", function() {\n        this.btnPlay.setTexture(\"sprBtnPlayDown\");\n        this.sfx.btnDown.play();\n      }, this);\n\n      this.btnPlay.on(\"pointerup\", function() {\n        this.btnPlay.setTexture(\"sprBtnPlay\");\n        playerName = document.getElementById('nameBox').value;\n        console.log(playerName);\n        this.scene.start(\"SceneMain\",{name: playerName});\n        document.getElementById('nameBox').outerHTML = \"\";\n\n      }, this);\n\n\n\n    this.backgrounds = [];\n    for (var i = 0; i < 1; i++) {\n      var keys = ['sprBg0', 'sprBg1'];\n      var key = keys[Phaser.Math.Between(0, keys.length - 1)];\n      var bg = new _Entities__WEBPACK_IMPORTED_MODULE_0__[\"ScrollingBackground\"](this, key, i * 10);\n      this.backgrounds.push(bg);\n    }\n  }\n\n update() {\n    for (var i = 0; i < this.backgrounds.length; i++) {\n        this.backgrounds[i].update();\n      }\n }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (SceneName);\n\n//# sourceURL=webpack:///./src/components/SceneName.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_SceneMainMenu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/SceneMainMenu */ \"./src/components/SceneMainMenu.js\");\n/* harmony import */ var _components_SceneMain__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/SceneMain */ \"./src/components/SceneMain.js\");\n/* harmony import */ var _components_SceneGameOver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/SceneGameOver */ \"./src/components/SceneGameOver.js\");\n/* harmony import */ var _components_SceneName__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/SceneName */ \"./src/components/SceneName.js\");\n/* harmony import */ var _src_components_Entities__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../src/components/Entities */ \"./src/components/Entities.js\");\n\n\n\n\n\n\nvar config = {\n  type: Phaser.WEBGL,\n  width: 480,\n  height: 640,\n  backgroundColor: 'none',\n  dom: {\n    createContainer: true\n},\n  physics: {\n    default: 'arcade',\n    arcade: {\n      gravity: { x: 0, y: 0 }\n    }\n  },\n  scene: [_components_SceneMainMenu__WEBPACK_IMPORTED_MODULE_0__[\"default\"],_components_SceneName__WEBPACK_IMPORTED_MODULE_3__[\"default\"], _components_SceneMain__WEBPACK_IMPORTED_MODULE_1__[\"default\"], _components_SceneGameOver__WEBPACK_IMPORTED_MODULE_2__[\"default\"]],\n  pixelArt: true,\n  roundPixels: true\n};\nvar game = new Phaser.Game(config);\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });