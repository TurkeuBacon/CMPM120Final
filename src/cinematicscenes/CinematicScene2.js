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

class C2 extends Phaser.Scene{
    constructor(){
        super('poop');
    }
    

    preload(){
        this.load.path = '../assets/';
        this.load.audio('overworldBGM', '/Music/GAME SONG.mp3', 0.2);
        this.load.audio('npcAudio', 'npcAudio.mp3', 1);
        this.load.audio('leanguy','/Music/Wacky man.mp3',0,2);
        this.load.spritesheet('player', '/General/Player_spritesheet.png', { frameWidth: 16, frameHeight: 32});

        
        this.load.image('torso', '/PurpleGuy/torso.png');
        this.load.image('head', '/PurpleGuy/head.png');

        this.load.image('arm_left', '/PurpleGuy/arm_left.png');
        this.load.image('arm_right', '/PurpleGuy/arm_right.png');
        this.load.image('wrist_hand_left', '/PurpleGuy/wrist_hand_left.png');
        this.load.image('wrist_hand_right', '/PurpleGuy/wrist_hand_right.png');

        this.load.image('leg_left', '/PurpleGuy/leg_left.png');
        this.load.image('leg_right', '/PurpleGuy/leg_right.png');
        this.load.image('ankle_foot_left', '/PurpleGuy/ankle_foot_left.png');
        this.load.image('ankle_foot_right', '/PurpleGuy/ankle_foot_right.png');

        this.load.image('presentDayFloor', '/Scene_PresentDay/PresentDay.png');
        this.load.image('presentDayHousing', '/Scene_PresentDay/buildings_all.png');
        this.load.image('dialogueBox', '/HUD/text_box.png');
    }
    create(){
        const screenWidth = this.sys.game.config.width;
        const screenHeight = this.sys.game.config.height;

        
        this.cameraManager = new CameraManager(this);
        const intro2 = this.sound.add('overworldBGM');
        const burplenurple = this.sound.add('leanguy');
        intro2.play();
        
        this.PresentDayBG = this.add.image(screenWidth/2, screenHeight/2, 'presentDayFloor');
        this.PresentDayBG.depth = 1;
        this.PresentDayBG.alpha = 1;

        this.buildingPresent = this.add.image(screenWidth/2, screenHeight/2, 'presentDayHousing');
        this.buildingPresent.depth = 4;
        this.buildingPresent.alpha = 1;

        let player = this.add.sprite(0,345,'player');
      //  let purplehead = this.add.sprite(800,325,'head');
        //let purpletorso = this.add.sprite(800,355,'torso');
        player.depth = 2;
      //  purplehead.depth = 2;
        //purpletorso.depth = 2;
        let purpleGuyData = 
        {
            torso:
            {
                x: 0,
                y: 0,
                image: 'torso'
            },
            head:
            {
                x: 0,
                y: -13,
                image: 'head'
            },
            upperArmL:
            {
                x: -6,
                y: -13,
                image: 'arm_left'
            },
            upperArmR:
            {
                x: 6.5,
                y: -12,
                image: 'arm_right'
            },
            forearmL:
            {
                x: -8,
                y: 12,
                image: 'wrist_hand_left'
            },
            forearmR:
            {
                x: 8,
                y: 12,
                image: 'wrist_hand_right'
            },
            legL:
            {
                x: -3,
                y: 16,
                image: 'leg_left'
            },
            legR:
            {
                x: 3,
                y: 16,
                image: 'leg_right'
            },
            ankleL:
            {
                x: -4,
                y: 20,
                image: 'ankle_foot_left'
            },
            ankleR:
            {
                x: 4,
                y: 20,
                image: 'ankle_foot_right'
            }
        };
        this.purpleGuy = new PurpleGuy(this, 825, 345, purpleGuyData);


        this.anims.create(
            {
                key: 'walk_up',
                frameRate: 4,
                frames: this.anims.generateFrameNumbers('player', {start: 8, end: 11}),
                repeat: -1
            });
        this.anims.create(
            {
                key: 'walk_down',
                frameRate: 4,
                frames: this.anims.generateFrameNumbers('player', {start: 0, end: 3}),
                repeat: -1
            });
        this.anims.create(
            {
                key: 'walk_left',
                frameRate: 4,
                frames: this.anims.generateFrameNumbers('player', {start: 12, end: 15}),
                repeat: -1
            });
        this.anims.create(
            {
                key: 'walk_right',
                frameRate: 4,
                frames: this.anims.generateFrameNumbers('player', {start: 4, end: 7}),
                repeat: -1
            });

            player.play('walk_right');
        this.tweens.add({
            targets:player,
            x:500,
            duration:6000,
            onComplete: function(){
                stopAnim();
            }
        });
        this.tweens.add({
            targets:this.purpleGuy,
            delay:10000,
            x:550,
            duration:8000,
            //onComplete: this.burplenurple.play(),
            onComplete: function () {
                console.log("Tween completed");
                onEvent();
            }
        });
       function onEvent(){
        burplenurple.play();
        intro2.stop();
    }
        function stopAnim(){
            player.anims.stop();
        }
        
        
    }
}
export default C2;