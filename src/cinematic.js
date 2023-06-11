import MainMenu from "./scenes/MainMenu.js";
import Town from "./scenes/Town.js";
import Cinematic from "./cinematicscenes/CinematicScene.js";
import C2 from "./cinematicscenes/CinematicScene2.js";
import interactiveCinematic from "./cinematicscenes/iCinematic.js";

let config = {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    type: Phaser.WEBGL,
    pixelArt: true,
    backgroundColor: 0x00000,
    physics: {
        default: 'arcade',
        arcade: { debug: false }
    },
    scene: [Cinematic,C2,interactiveCinematic],
}

let game = new Phaser.Game(config);