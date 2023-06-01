import MainMenu from "./scenes/MainMenu.js";
import PresentDay from "./scenes/PresentDay.js";
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
    scene: [MainMenu, PresentDay, HUD],
}

let game = new Phaser.Game(config);