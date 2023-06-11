import sfIntro from "./cinematicscenes/sf.js";
import sfMeat from "./cinematicscenes/sf2.js";
import sfCredit from "./cinematicscenes/sfcredits.js";
import sfPark from "./cinematicscenes/sf3.js";
import sfSetting from "./cinematicscenes/sfsettings.js";
import sfBadEnding from "./cinematicscenes/sfbadend.js";

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
    scene: [sfIntro,sfMeat,sfPark,sfCredit,sfSetting,sfBadEnding],
}
let game = new Phaser.Game(config);