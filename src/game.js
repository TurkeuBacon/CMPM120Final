import MainMenu from "./scenes/MainMenu.js";
import Town from "./scenes/Town.js";
import HUD from "./scenes/HUD.js";

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
    scene: [MainMenu, Town, HUD],
}

let game = new Phaser.Game(config);