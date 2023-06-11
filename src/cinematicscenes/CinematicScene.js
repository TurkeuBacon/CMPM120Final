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
    constructor(){
        super('cinetitle');
    }
    preload(){
        this.load.path = '../assets/';

        this.load.image('TitleArt', 'Scene_MainMenu/Title.png');
        this.load.image('BackgroundArt', 'Scene_MainMenu/BackgroundArt.png');
        this.load.image('ButtonArt', 'Scene_MainMenu/play1.png');
        this.load.image('hoverOn', 'Scene_MainMenu/play2.png');
    }
    create(){
        let canvasWidth = this.sys.game.canvas.width;
        let canvasHeight = this.sys.game.canvas.height;

        AudioManager.getInstance(this).addBackgroundMusic('Theme', 1, true, true);
        this.backgroundArt = this.add.image(0, 0, 'BackgroundArt');
        this.backgroundArt.setOrigin(0, 0);
        this.backgroundArt.setDisplaySize(canvasWidth, canvasHeight);

        this.titleArt = this.add.image(canvasWidth/2, 100, 'TitleArt');
        this.titleArt.setOrigin(0.5, 0);
        this.titleArt.setScale(0.5);

        this.startButton = this.add.image(canvasWidth/2, canvasHeight/2+250, 'ButtonArt');
        this.hoverOn = this.add.image(canvasWidth/2, canvasHeight/2+250, 'hoverOn');
        this.hoverOn.alpha = 0;
        this.startButton.setScale(1);
        this.startButton.setInteractive().on('pointerover', () =>{
            this.startButton.alpha = 0.01;
            this.hoverOn.alpha = 1;
        });
        this.startButton.setInteractive().on('pointerout', () =>{
            this.startButton.alpha = 1;
            this.hoverOn.alpha = 0;
        });
        
        this.time.delayedCall(15000, function() {
            this.scene.start('poop'); // Start the new scene
          }, [], this);
        this.tweens.add({
            targets:this.backgroundArt,
            alpha:{from:1, to:0},
                    ease:'Linear',
                    duration:10000,
                    repeat:0,
        });
        
        this.tweens.add({
            targets:this.startButton,
            alpha:{from:1, to:0},
                    ease:'Linear',
                    duration:10000,
                    repeat:0,
        });
        this.tweens.add({
            targets:this.titleArt,
            alpha:{from:1, to:0},
                    ease:'Linear',
                    duration:15000,
                    repeat:0,
        });
        
    }
    
}


export default Cinematic;
