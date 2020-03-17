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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ScrollingBackground\", function() { return ScrollingBackground; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Player\", function() { return Player; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"PlayerLaser\", function() { return PlayerLaser; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Entity\", function() { return Entity; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ChaserShip\", function() { return ChaserShip; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GunShip\", function() { return GunShip; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CarrierShip\", function() { return CarrierShip; });\nclass Entity extends Phaser.GameObjects.Sprite {\n  constructor(scene, x, y, key, type) {\n    super(scene, x, y, key);\n    this.scene = scene;\n    this.scene.add.existing(this);\n    this.scene.physics.world.enableBody(this, 0);\n    this.setData(\"type\", type);\n    this.setData(\"isDead\", false);\n  }\n\n}\n\n class Player extends Entity{\n  constructor(scene,x,y,type) {\n    super(scene,x,y,type);\n    this.setData(\"speed\", 200);\n    this.play(\"sprPlayer\");\n  }\n  moveUp() {\n    this.body.velocity.y = -this.getData(\"speed\");\n  }\n  moveDown() {\n    this.body.velocity.y = this.getData(\"speed\");\n  }\n  moveLeft() {\n    this.body.velocity.x = -this.getData(\"speed\");\n  }\n  moveRigth(){\n    this.body.velocity.x += 4;\n  }\n  update() {\n    this.body.setVelocity(0, 0);\n    this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width);\n    this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height);\n    if (this.getData(\"isShooting\")) {\n      if (this.getData(\"timerShootTick\") < this.getData(\"timerShootDelay\")) {\n        this.setData(\"timerShootTick\", this.getData(\"timerShootTick\") + 1); // every game update, increase timerShootTick by one until we reach the value of timerShootDelay\n      }\n      else { // when the \"manual timer\" is triggered:\n        var laser = new PlayerLaser(this.scene, this.x, this.y);\n        this.scene.playerLasers.add(laser);\n\n        this.scene.sfx.laser.play(); // play the laser sound effect\n        this.setData(\"timerShootTick\", 0);\n      }\n    }\n  }\n}\n\nclass ChaserShip extends Entity {\n  constructor(scene, x, y) {\n    super(scene, x, y, \"sprEnemy1\", \"ChaserShip\");\n    this.body.velocity.y = Phaser.Math.Between(50, 100);\n  }\n}\nclass GunShip extends Entity {\n  constructor(scene, x, y) {\n    super(scene, x, y, \"sprEnemy0\", \"GunShip\");\n    this.body.velocity.y = Phaser.Math.Between(50, 100);\n    this.play(\"sprEnemy0\");\n  }\n}\nclass CarrierShip extends Entity {\n  constructor(scene, x, y) {\n    super(scene, x, y, \"sprEnemy2\", \"CarrierShip\");\n    this.body.velocity.y = Phaser.Math.Between(50, 100);\n    this.play(\"sprEnemy2\");\n  }\n}\n\nclass PlayerLaser extends Entity {\n  constructor(scene, x, y) {\n    super(scene, x, y, \"sprLaserPlayer\");\n    this.body.velocity.y = -200;\n  }\n}\n\n class ScrollingBackground {\n  constructor(scene, key, velocityY) {\n    this.scene = scene;\n    this.key = key;\n    this.velocityY = velocityY;\n\n    this.layers = this.scene.add.group();\n\n    this.createLayers();\n  }\n\n  createLayers() {\n    for (var i = 0; i < 2; i++) {\n      // creating two backgrounds will allow a continuous flow giving the illusion that they are moving.\n      var layer = this.scene.add.sprite(0, 0, this.key);\n      layer.y = (layer.displayHeight * i);\n      var flipX = Phaser.Math.Between(0, 10) >= 5 ? -1 : 1;\n      var flipY = Phaser.Math.Between(0, 10) >= 5 ? -1 : 1;\n      layer.setScale(flipX * 2, flipY * 2);\n      layer.setDepth(-5 - (i - 1));\n      this.scene.physics.world.enableBody(layer, 0);\n      layer.body.velocity.y = this.velocityY;\n\n      this.layers.add(layer);\n    }\n  }\n\n  update() {\n    if (this.layers.getChildren()[0].y > 0) {\n      for (var i = 0; i < this.layers.getChildren().length; i++) {\n        var layer = this.layers.getChildren()[i];\n        layer.y = (-layer.displayHeight) + (layer.displayHeight * i);\n      }\n    }\n  }\n}\n\n\n\n//# sourceURL=webpack:///./src/components/Entities.js?");

/***/ }),

/***/ "./src/components/SceneGameOver.js":
/*!*****************************************!*\
  !*** ./src/components/SceneGameOver.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass SceneGameOver extends Phaser.Scene{\n  constructor(){\n    super({ key: \"SceneGameOver\" });\n  }\n  create(){\n\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (SceneGameOver);\n\n//# sourceURL=webpack:///./src/components/SceneGameOver.js?");

/***/ }),

/***/ "./src/components/SceneMain.js":
/*!*************************************!*\
  !*** ./src/components/SceneMain.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Entities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Entities */ \"./src/components/Entities.js\");\n\n\nclass SceneMain extends Phaser.Scene {\n  constructor() {\n    super({ key: 'SceneMain' });\n  }\n  preload() {\n\n    this.load.image(\"sprLaserPlayer\", \"img/sprLaserPlayer2.png\");\n    this.load.spritesheet(\"sprPlayer\", \"img/player.png\", {\n      frameWidth: 45,\n      frameHeight: 45\n    });\n\n    this.load.audio(\"sndExplode0\", \"img/sndExplode0.wav\");\n    this.load.audio(\"sndExplode1\", \"img/sndExplode1.wav\");\n    this.load.audio(\"sndLaser\", \"img/sndLaser.wav\");\n  }\n  create() {\n    // this.anims.create({\n    //   key: \"sprEnemy0\",\n    //   frames: this.anims.generateFrameNumbers(\"sprEnemy0\"),\n    //   frameRate: 20,\n    //   repeat: -1\n    // });\n    // this.anims.create({\n    //   key: \"sprEnemy2\",\n    //   frames: this.anims.generateFrameNumbers(\"sprEnemy2\"),\n    //   frameRate: 20,\n    //   repeat: -1\n    // });\n    // this.anims.create({\n    //   key: \"sprExplosion\",\n    //   frames: this.anims.generateFrameNumbers(\"sprExplosion\"),\n    //   frameRate: 20,\n    //   repeat: 0\n    // });\n    this.anims.create({\n      key: \"sprPlayer\",\n      frames: this.anims.generateFrameNumbers(\"sprPlayer\"),\n      frameRate: 20,\n      repeat: -1\n    });\n    this.sfx = {\n      explosions: [\n        this.sound.add(\"sndExplode0\"),\n        this.sound.add(\"sndExplode1\")\n      ],\n      laser: this.sound.add(\"sndLaser\")\n    };\n    this.sfx.laser.play();\n    this.player = new _Entities__WEBPACK_IMPORTED_MODULE_0__[\"Player\"](\n      this,\n      this.game.config.width * 0.5,\n      this.game.config.height * 0.5,\n      \"sprPlayer\"\n    );\n    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);\n    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);\n    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);\n    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);\n    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);\n    // this.enemies = this.add.group();\n    // this.enemyLasers = this.add.group();\n    this.playerLasers = this.add.group();\n    // this.time.addEvent({\n    //   delay: 100,\n    //   callback: function() {\n    //     var enemy = new GunShip(\n    //       this,\n    //       Phaser.Math.Between(0, this.game.config.width),\n    //       0\n    //     );\n    //     this.enemies.add(enemy);\n    //   },\n    //   callbackScope: this,\n    //   loop: true\n    // });\n\n\n    this.backgrounds = [];\n    for (var i = 0; i < 5; i++) {\n      var keys = ['sprBg0', 'sprBg1'];\n      var key = keys[Phaser.Math.Between(0, keys.length - 1)];\n      var bg = new _Entities__WEBPACK_IMPORTED_MODULE_0__[\"ScrollingBackground\"](this, key, i * 10);\n      this.backgrounds.push(bg);\n    }\n    console.log(this.player);\n  }\n  update() {\n    if (!this.player.getData(\"isDead\")) {\n      this.player.update();\n      if (this.keyW.isDown) {\n        this.player.moveUp();\n      }\n      else if (this.keyS.isDown) {\n        this.player.moveDown();\n      }\n      if (this.keyA.isDown) {\n        this.player.moveLeft();\n      }\n      else if (this.keyD.isDown) {\n        this.player.x +=4;\n      }\n\n      if (this.keySpace.isDown) {\n        this.player.setData(\"isShooting\", true);\n      }\n      else {\n        this.player.setData(\"timerShootTick\", this.player.getData(\"timerShootDelay\") - 1);\n        this.player.setData(\"isShooting\", false);\n      }\n    }\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (SceneMain);\n\n\n//# sourceURL=webpack:///./src/components/SceneMain.js?");

/***/ }),

/***/ "./src/components/SceneMainMenu.js":
/*!*****************************************!*\
  !*** ./src/components/SceneMainMenu.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Entities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Entities */ \"./src/components/Entities.js\");\n\nclass SceneMainMenu extends Phaser.Scene {\n  constructor() {\n    super({ key: 'SceneMainMenu' });\n  }\n  preload() {\n    this.load.image('sprBg0', 'img/sprBg0.png');\n    this.load.image('sprBg1', 'img/sprBg1.png');\n    this.load.image('sprBtnPlay', 'img/sprBtnPlay.png');\n    this.load.image('sprBtnPlayHover', 'img/sprBtnPlayHover.png');\n    this.load.image('sprBtnPlayDown', 'img/sprBtnPlayDown.png');\n    this.load.image('sprBtnRestart', 'img/sprBtnRestart.png');\n    this.load.image('sprBtnRestartHover', 'img/sprBtnRestartHover.png');\n    this.load.image('sprBtnRestartDown', 'img/sprBtnRestartDown.png');\n    this.load.audio('sndBtnOver', 'img/sndBtnOver.wav');\n    this.load.audio('sndBtnDown', 'img/sndBtnDown.wav');\n  }\n\n  create() {\n    this.sfx = {\n      btnOver: this.sound.add('sndBtnOver'),\n      btnDown: this.sound.add('sndBtnDown')\n    };\n\n    this.btnPlay = this.add.sprite(\n      this.game.config.width * 0.5,\n      this.game.config.height * 0.5,\n      'sprBtnPlay'\n    );\n    this.btnPlay.setInteractive();\n\n    this.btnPlay.on(\n      'pointerover',\n      function() {\n        this.btnPlay.setTexture('sprBtnPlayHover'); // set the button texture to sprBtnPlayHover\n        this.sfx.btnOver.play(); // play the button over sound\n      },\n      this\n    );\n\n    this.btnPlay.on('pointerout', function() {\n      this.setTexture('sprBtnPlay');\n    });\n\n    this.btnPlay.on(\"pointerdown\", function() {\n      this.btnPlay.setTexture(\"sprBtnPlayDown\");\n      this.sfx.btnDown.play();\n    }, this);\n\n    this.btnPlay.on(\"pointerup\", function() {\n      this.btnPlay.setTexture(\"sprBtnPlay\");\n      this.scene.start(\"SceneMain\");\n    }, this);\n\n    this.title = this.add.text(\n      this.game.config.width * 0.5,\n      128,\n      \"ALIEN'S ATTACK\",\n      {\n        fontFamily: 'monospace',\n        fontSize: 48,\n        fontStyle: 'bold',\n        color: 'rgba(100,100,65,0.6)',\n        align: 'center'\n      }\n    );\n    this.title.setOrigin(0.5);\n\n    this.backgrounds = [];\n    for (var i = 0; i < 5; i++) {\n      var keys = ['sprBg0', 'sprBg1'];\n      var key = keys[Phaser.Math.Between(0, keys.length - 1)];\n      var bg = new _Entities__WEBPACK_IMPORTED_MODULE_0__[\"ScrollingBackground\"](this, key, i * 10);\n      this.backgrounds.push(bg);\n    }\n\n  }\n  update() {\n    for (var i = 0; i < this.backgrounds.length; i++) {\n      this.backgrounds[i].update();\n    }\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (SceneMainMenu);\n\n\n//# sourceURL=webpack:///./src/components/SceneMainMenu.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_SceneMainMenu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/SceneMainMenu */ \"./src/components/SceneMainMenu.js\");\n/* harmony import */ var _components_SceneMain__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/SceneMain */ \"./src/components/SceneMain.js\");\n/* harmony import */ var _components_SceneGameOver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/SceneGameOver */ \"./src/components/SceneGameOver.js\");\n/* harmony import */ var _src_components_Entities__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../src/components/Entities */ \"./src/components/Entities.js\");\n\n\n\n\n\nvar config = {\n  type: Phaser.WEBGL,\n  width: 480,\n  height: 640,\n  backgroundColor: 'none',\n  physics: {\n    default: 'arcade',\n    arcade: {\n      gravity: { x: 0, y: 0 }\n    }\n  },\n  scene: [_components_SceneMainMenu__WEBPACK_IMPORTED_MODULE_0__[\"default\"], _components_SceneMain__WEBPACK_IMPORTED_MODULE_1__[\"default\"], _components_SceneGameOver__WEBPACK_IMPORTED_MODULE_2__[\"default\"]],\n  pixelArt: true,\n  roundPixels: true\n};\nvar game = new Phaser.Game(config);\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });