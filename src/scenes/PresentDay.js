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
        this.load.image('testin1', '/Testing/mario.png');
        this.load.image('testin2', '/Testing/link.jpg');
        this.load.image('testin3', '/Testing/sonic.jpg');
        this.load.image('testin4', '/Testing/weird.png');
        this.load.image('testin5', '/Testing/jungle.jpg');
        this.load.image('testin6', '/Testing/dragon.png');
    }

    create()
    {
        //Since our camera will be taking care of hud, should we change this line of code below? 
        //Also, should we restructure this .js to be our main scene that alters between timelines? (Daniel)
        this.hudScene = this.scene.launch('present_day_hud');
        const screenWidth = this.sys.game.config.width;
        const screenHeight = this.sys.game.config.height;
        /*this.PresentDayBG = this.add.image(screenWidth/2, screenHeight/2, 'PresentDayMap');
        this.PresentDayBG.depth = 0;
        this.PresentDayBG.alpha = 0;
        this.BeginningTimeBG = this.add.image(screenWidth/2, screenHeight/2, '1700sMap');
        this.BeginningTimeBG.depth = 0;
        this.BeginningTimeBG.alpha = 0;
        this.MiddleTimeBG = this.add.image(screenWidth/2, screenHeight/2, '1960sMap'); 
        this.MiddleTimeBG.depth = 0;
        this.MiddleTimeBG.alpha = 0;*/
        
        this.joystick = new TouchJoystick(this, {'width': 0.33, 'height': .5}, 100, 50, 75, 0.5);
        this.player = new Player(this, 100, 100, 'player', 1, this.joystick);
        //testing for groups
        var group1 = this.add.group();
        var group2 = this.add.group();
        var group3 = this.add.group();
        var link = this.add.image(screenWidth/2, screenHeight/2, 'testin1');
        var mario = this.add.image(screenWidth/2, screenHeight/2, 'testin2');
        group1.add(link);
        group1.add(mario);
        var sonic = this.add.image(screenWidth/2, screenHeight/2, 'testin3');
        var weird = this.add.image(screenWidth/2, screenHeight/2, 'testin4');
        group2.add(sonic);
        group2.add(weird);
        var jungle = this.add.image(screenWidth/2, screenHeight/2, 'testin5');
        var dragon = this.add.image(screenWidth/2, screenHeight/2, 'testin6');
        group3.add(jungle);
        group3.add(dragon);
        var map1700s = new Map("Map1700s", this.add.image(screenWidth/2, screenHeight/2, '1700sMap'), group1);
        var map1960s = new Map("Map1960s", this.add.image(screenWidth/2, screenHeight/2, '1960sMap'), group2);
        var mapPresent = new Map("MapPresent", this.add.image(screenWidth/2, screenHeight/2, 'PresentDayMap'), group3);
        //Camera for player
        this.PlayerCamera = new PlayerCamera(this,this.player);
        //Assigns our camera manager the player camera
        //this.CameraManager.assignCamera(this.PlayerCamera);
        

    }

    update()
    {
        this.joystick.update();
        this.player.update();

    }
}

export default PresentDay;