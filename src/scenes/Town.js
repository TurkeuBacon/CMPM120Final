import Player from '../Player.js'
import CameraManager from '../CameraManager.js'
import TouchJoystick from '../InputDevices.js'
import PlayerCamera from '../PlayerCamera.js'
import MapState from '../MapStates.js'
import Map from '../Map.js'
import Dialogue from '../Dialogue.js' 
import DialogueManager from '../DialogueManager.js'
import Npc from '../Npc.js'
//Gabe can we switch PresentDay to a class called World instead? I think it would make more sense since we won't be having separate scenes.
    //didn't want to change your code here because it t's associated with "Present Day" (Daniel)
class Town extends Phaser.Scene
{
    constructor()
    {
        super('town');
    }

    preload()
    {
        this.load.path = '../assets/';
        this.load.spritesheet('player', '/General/Player_spritesheet.png', { frameWidth: 16, frameHeight: 32});
        this.load.image('PresentDayMap', '/Scene_PresentDay/PresentDay.png');
        this.load.image('1700sMap', '/Scene_1700s/1700s.png');
        this.load.image('1960sMap', '/Scene_1960s/1960s.png');
        this.load.image('testin1', '/Testing/mario.png');
        this.load.image('testin2', '/Testing/link.jpg');
        this.load.image('testin3', '/Testing/sonic.jpg');
        this.load.image('testin4', '/Testing/weird.png');
        this.load.image('testin5', '/Testing/jungle.jpg');
        this.load.image('testin6', '/Testing/dragon.png');
        this.load.image('dialogueBox', '/HUD/text_box.png');

        this.load.json('girl', '/Npcs/npc1.json');
        this.load.on("filecomplete-json-girl", function (key, type, data) {
            this.load.spritesheet(key + 'Texture', '/Npcs/NpcTextures/' + data.texture, { frameWidth: 16, frameHeight: 32});
        }, this);
    }
    
    create()
    {
        //Since our camera will be taking care of hud, should we change this line of code below?
        //Also, should we restructure this .js to be our main scene that alters between timelines? (Daniel)
        //this.add.sprite(100,100,'fstest').setInteractable();
        //this.hudScene = this.scene.launch('town_hud');
        const screenWidth = this.sys.game.config.width;
        const screenHeight = this.sys.game.config.height;

        this.cameraManager = new CameraManager(this);
        this.cameraManager.addUI(this.add.rectangle(100, 100, 40, 40, 0xff0000, 1));

        this.dialogueManager = new DialogueManager(this, 'dialogueBox');

        this.PresentDayBG = this.add.image(screenWidth/2, screenHeight/2, 'PresentDayMap');
        this.PresentDayBG.depth = 1;
        this.PresentDayBG.alpha = 1;
        this.BeginningTimeBG = this.add.image(screenWidth/2, screenHeight/2, '1700sMap');
        this.BeginningTimeBG.depth = 1;
        this.BeginningTimeBG.alpha = 1;
        this.MiddleTimeBG = this.add.image(screenWidth/2, screenHeight/2, '1960sMap'); 
        this.MiddleTimeBG.depth = 1;
        this.MiddleTimeBG.alpha = 1;
        
        this.joystick = new TouchJoystick(this, {'width': 0.33, 'height': .5}, 100, 50, 75, 0.5);
        this.player = new Player(this, 500, 500, 'player', 1, this.joystick);
        this.player.depth = 2;
        this.cameraManager.setPlayerCameraTarget(this.player);

        this.testNpc = new Npc(this, 'girl');
        this.npc2 = new Npc(this, 'girl').setPosition(400, 400);
        //this.testNpc.addDialogue("This is some long text to test out the dialogue system. Hope it works (:. Here's some more text.\n\n\nHehe.", true);
        //this.testNpc.depth = 2;
        //this.testNpc.playDialogue();

        //testing for groups
        this.group1 = this.add.group();
        this.group2 = this.add.group();
        this.group3 = this.add.group();
        this.link = this.add.image(screenWidth/2, screenHeight/2, 'testin1').setScale(0.3);
        this.link.depth = 1;
        this.mario = this.add.image(screenWidth/2, screenHeight/2, 'testin2').setScale(0.3);
        this.mario.depth = 1;
        this.group1.add(this.link);
        this.group1.add(this.mario);
        this.sonic = this.add.image(screenWidth/2, screenHeight/2, 'testin3').setScale(0.3);
        this.sonic.depth = 1;
        this.weird = this.add.image(screenWidth/2, screenHeight/2, 'testin4').setScale(0.3);
        this.weird.depth = 1;
        this.group2.add(this.sonic);
        this.group2.add(this.weird);
        this.jungle = this.add.image(screenWidth/2, screenHeight/2, 'testin5').setScale(0.3);
        this.jungle.depth = 1;
        this.dragon = this.add.image(screenWidth/2, screenHeight/2, 'testin6').setScale(0.3);
        this.dragon.depth = 1;
        this.group3.add(this.jungle);
        this.group3.add(this.dragon);
        this.PresentDayMap = new Map(this, "Present Day", this.PresentDayBG, this.group1);
        this.SixtiesMap = new Map(this, "1960s", this.MiddleTimeBG, this.group2);
        this.EarlyMap = new Map(this, "1700s", this.BeginningTimeBG, this.group3);
        //testing dialogue
        this.Dialogue = new Dialogue(this, "HELLO", )
        this.MapManager = new MapState(this.PlayerCamera, this.player, this.EarlyMap, this.SixtiesMap, this.PresentDayMap);
        this.MapManager.initialize();
        //used to trigger a test on mapstate transitions
        this.input.keyboard.on('keydown-X', function(event) {
            // Your code here
            this.MapManager.switchTimes("1700s");
        }, this);

    }

    update(time, delta)
    {
        // this.joystick.update();
        // this.player.update();

    }
}

export default Town;