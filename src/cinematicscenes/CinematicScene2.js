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
        this.load.spritesheet('player', '/General/Player_spritesheet.png', { frameWidth: 16, frameHeight: 32});
        this.load.image('torso', '/PurpleGuy/torso.png');
        this.load.image('head', '/PurpleGuy/head.png');
        this.load.image('presentDayFloor', '/Scene_PresentDay/PresentDay.png');
        this.load.image('presentDayHousing', '/Scene_PresentDay/buildings_all.png');
        this.load.image('dialogueBox', '/HUD/text_box.png');
    }
    create(){
        const screenWidth = this.sys.game.config.width;
        const screenHeight = this.sys.game.config.height;

        
        this.cameraManager = new CameraManager(this);
        this.intro2 = this.sound.add('overworldBGM');
        this.intro2.play();
        this.PresentDayBG = this.add.image(screenWidth/2, screenHeight/2, 'presentDayFloor');
        this.PresentDayBG.depth = 1;
        this.PresentDayBG.alpha = 1;

        this.buildingPresent = this.add.image(screenWidth/2, screenHeight/2, 'presentDayHousing');
        this.buildingPresent.depth = 4;
        this.buildingPresent.alpha = 1;

        this.player = this.add.sprite(0,345,'player');
        this.player.depth = 2;

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

            this.player.play('walk_right');
        this.tweens.add({
            targets:this.player,
            x:500,
            duration:6000,
            
        });
        /*this.time.addEvent({
            delay:6000,
            callback:stopAnim(this.player),
            callbackScope:this
        });*/
        function stopAnim(sprite){
            sprite.anims.stop();
            sprite.setFrame(0);
        }
        
    }
}
export default C2;