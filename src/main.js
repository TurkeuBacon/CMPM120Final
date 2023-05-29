import MainMenu from "./scenes/MainMenu.js";

let config = {
    type: Phaser.WEBGL,
    width: 1280,
    height: 720,
    backgroundColor: 0x00ffff,
    physics: {
        default: 'arcade',

    },
    scene: [MainMenu],
}

let game = new Phaser.Game(config);