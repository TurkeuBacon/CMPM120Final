import MainMenu from "./scenes/MainMenu.js";
import PresentDay from "./scenes/PresentDay.js";

let config = {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    type: Phaser.WEBGL,
    pixelArt: true,
    backgroundColor: 0x00ffff,
    physics: {
        default: 'arcade',
        debug: true
    },
    scene: [MainMenu, PresentDay],
}

let game = new Phaser.Game(config);