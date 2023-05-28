import MainMenu from "./scenes/MainMenu.js";

let config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    backgroundColor: 0x00ffff,
    scene: [MainMenu],
}

let game = new Phaser.Game(config);