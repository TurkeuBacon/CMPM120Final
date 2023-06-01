import Player from '../Player.js'
import CameraManager from '../CameraManager.js'
import TouchJoystick from '../InputDevices.js'
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
        this.hudScene = this.scene.launch('present_day_hud');

        const screenWidth = this.sys.game.config.width;
        const screenHeight = this.sys.game.config.height;
        this.background = this.add.image(screenWidth/2, screenHeight/2, 'background');
    
        this.joystick = new TouchJoystick(this, {'width': 0.33, 'height': .5}, 100, 50, 75, 0.5);
        this.player = new Player(this, 100, 100, 'player', 1, this.joystick);
        this.CameraManager = new CameraManager(this, this.player);
    }

    update()
    {
        this.joystick.update();
        this.player.update();

    }
}

export default PresentDay;