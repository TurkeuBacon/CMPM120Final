import MainMenu from "./scenes/MainMenu.js";
import Town from "./scenes/Town.js";
import IntroCutscene from "./scenes/IntroCutscene.js";

let config = {
//     width: 1280,
//     height: 720,
    scale:{mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    type: Phaser.WEBGL,
    pixelArt: true,
    backgroundColor: 0x00000,
    physics: {
        default: 'arcade',
        arcade: { debug: false }
    },
    scene: [MainMenu, IntroCutscene, Town],
}

let game = new Phaser.Game(config);

