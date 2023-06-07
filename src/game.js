import MainMenu from "./scenes/MainMenu.js";
import Town from "./scenes/Town.js";

let config = {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    type: Phaser.WEBGL,
    pixelArt: true,
    backgroundColor: 0x00ffff,
    physics: {
        default: 'arcade',
        debug: true
    },
    scene: [MainMenu, Town],
}

let game = new Phaser.Game(config);

