import Player from '../Player.js'
import CameraManager from '../CameraManager.js'
import TouchJoystick from '../InputDevices.js'
import PlayerCamera from '../PlayerCamera.js'
import MapState from '../MapStates.js'
import Map from '../Map.js'
import AudioManager from '../AudioManager.js' 
import DialogueManager from '../DialogueManager.js'
import Npc from '../Npc.js'
import PurpleGuy from '../PurpleGuy.js'

class Cinematic extends Phaser.Scene{
    preload(){
        this.load.path = '../assets/';
        this.load.image('TitleArt', 'Scene_MainMenu/TitleArtPlaceholder.png');
        this.load.image('BackgroundArt', 'Scene_MainMenu/BackgroundArt.png');
        this.load.image('ButtonArt', 'Scene_MainMenu/ShittyButton.png');
    }
    create(){
        let canvasWidth = this.sys.game.canvas.width;
        let canvasHeight = this.sys.game.canvas.height;

        let backgroundArt = this.add.image(0, 0, 'BackgroundArt');
        backgroundArt.setOrigin(0, 0);
        backgroundArt.setDisplaySize(canvasWidth, canvasHeight);

        let titleArt = this.add.image(canvasWidth/2, 100, 'TitleArt');
        titleArt.setOrigin(0.5, 0);
        titleArt.setScale(0.5);

        let startButton = this.add.image(canvasWidth/2, canvasHeight/2+200, 'ButtonArt');
        startButton.setScale(0.4);
        this.tweens.add({
            targets:backgroundArt,
            alpha:{from:1, to:0},
                    ease:'Linear',
                    duration:10000,
                    repeat:0,
        });
        
        this.tweens.add({
            targets:startButton,
            alpha:{from:1, to:0},
                    ease:'Linear',
                    duration:10000,
                    repeat:0,
        });
        this.tweens.add({
            targets:titleArt,
            alpha:{from:1, to:0},
                    ease:'Linear',
                    duration:15000,
                    repeat:0,
        });
    }
}

export default Cinematic;