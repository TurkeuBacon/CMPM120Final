import Player from '../Player.js'
import CameraManager from '../CameraManager.js'
import HUD from './HUD.js'
import TouchJoystick from '../InputDevices.js'
import PlayerCamera from '../PlayerCamera.js'

class PresentDay extends Phaser.Scene
{
    constructor()
    {
        super('present_day');
    }

    preload()
    {
        this.load.path = '../assets/';
        this.load.spritesheet('player', '/General/Player_spritesheet.png', { frameWidth: 16, frameHeight: 32})
        this.load.image('background', '/Scene_PresentDay/prototype_hub_layout_1960S.jpg');
    }

    create()
    {
        //Since our camera will be taking care of hud, should we change this line of code below? 
        //Also, should we restructure this .js to be our main scene that alters between timelines? (Daniel)
        this.hudScene = this.scene.launch('present_day_hud');

        const screenWidth = this.sys.game.config.width;
        const screenHeight = this.sys.game.config.height;
        this.background = this.add.image(screenWidth/2, screenHeight/2, 'background');

        this.CameraManager = new CameraManager();
        this.joystick = new TouchJoystick(this, {'width': 0.33, 'height': .5}, 100, 50, 75, 0.5);
        this.player = new Player(this, 100, 100, 'player', 1, this.joystick);
        //Camera for player
        this.PlayerCamera = new PlayerCamera(this,this.player);
        //Assigns our camera manager the player camera
        this.CameraManager.assignCamera(this.PlayerCamera);

    }

    update()
    {
        this.joystick.update();
        this.player.update();

    }
}

export default PresentDay;