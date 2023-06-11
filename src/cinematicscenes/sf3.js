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

class sfPark extends Phaser.Scene{
    constructor(){
        super('parkington');
    }
    preload(){
        this.load.path = '../assets/';
        this.load.image('parkStart', '/Scene_PresentDay/Park_Initial.png');

        this.load.image('JoystickBack', '/HUD/Jbase.png');
        this.load.image('JoystickHandle', '/HUD/Jhandle.png');
        this.load.spritesheet('Button', '/HUD/A_Button.png', { frameWidth: 68, frameHeight: 70});

        this.load.spritesheet('player', '/General/Player_spritesheet.png', { frameWidth: 16, frameHeight: 32});
    }
    create(){
        const screenWidth = this.sys.game.config.width;
        const screenHeight = this.sys.game.config.height;
        this.cameraManager = new CameraManager(this);
        this.dialogueManager = new DialogueManager(this, 'dialogueBox');
        this.initalParkBG = this.add.image(screenWidth/2, screenHeight/2, 'parkStart');
        this.initalParkBG.depth = 1;
        this.initalParkBG.alpha = 1;
        this.joystick = new TouchJoystick(this, {'width': 0.4, 'height': .5}, 'JoystickBack', 'JoystickHandle',  150, 75, 125, 0.42);
        //0,350
        this.player = new Player(this, 500, 500, 'player', 1, this.joystick, 'Button');
        this.player.depth = 2;
    }
}
export default sfPark