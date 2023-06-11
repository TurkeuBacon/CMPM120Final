import MainMenu from "./scenes/MainMenu.js";
import Town from "./scenes/Town.js";
import IntroCutscene from "./scenes/IntroCutscene.js";
import Credits from "./scenes/Credits.js";
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
        //arcade: { debug: true }
    },
    scene: [MainMenu, IntroCutscene, Town, Credits],
}

let game = new Phaser.Game(config);

