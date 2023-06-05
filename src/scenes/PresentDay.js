import Player from '../Player.js'
import CameraManager from '../CameraManager.js'
import HUD from './HUD.js'
import TouchJoystick from '../InputDevices.js'
import PlayerCamera from '../PlayerCamera.js'
import MapState from '../MapStates.js'

//Gabe can we switch PresentDay to a class called World instead? I think it would make more sense since we won't be having separate scenes.
    //didn't want to change your code here because it t's associated with "Present Day" (Daniel)
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
        this.load.image('PresentDayMap', '/Scene_PresentDay/prototype_hub_layout_1960S.jpg');
        this.load.image('1700sMap', '/Scene_1700s/town_past.png');
        this.load.image('1960sMap', '/Scene_1960s/Town_without_home_repo_past.png');
    }

    create()
    {
        //Since our camera will be taking care of hud, should we change this line of code below? 
        //Also, should we restructure this .js to be our main scene that alters between timelines? (Daniel)
        this.hudScene = this.scene.launch('present_day_hud');
        const screenWidth = this.sys.game.config.width;
        const screenHeight = this.sys.game.config.height;
        this.PresentDayBG = this.add.image(screenWidth/2, screenHeight/2, 'PresentDayMap');
        this.PresentDayBG.depth = 0;
        this.PresentDayBG.alpha = 0;
        this.BeginningTimeBG = this.add.image(screenWidth/2, screenHeight/2, '1700sMap');
        this.BeginningTimeBG.depth = 0;
        this.BeginningTimeBG.alpha = 0;
        this.MiddleTimeBG = this.add.image(screenWidth/2, screenHeight/2, '1960sMap'); 
        this.MiddleTimeBG.depth = 0;
        this.MiddleTimeBG.alpha = 0;
        this.joystick = new TouchJoystick(this, {'width': 0.33, 'height': .5}, 100, 50, 75, 0.5);
        this.player = new Player(this, 100, 100, 'player', 1, this.joystick);
        //Camera for player
        this.PlayerCamera = new PlayerCamera(this,this.player);
        //Assigns our camera manager the player camera
        //this.CameraManager.assignCamera(this.PlayerCamera);
        var mapState = new MapState(this.PlayerCamera, this.player, this.BeginningTimeBG, this.MiddleTimeBG, this.PresentDayBG);
        mapState.showMap();

    }

    update()
    {
        this.joystick.update();
        this.player.update();

    }
}

export default PresentDay;