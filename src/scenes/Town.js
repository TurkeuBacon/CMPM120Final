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

class Town extends Phaser.Scene
{
    constructor()
    {
        super('town');
    }

    loadNpc(npcKey, npcPath)
    {
        this.load.json(npcKey, npcPath);
        this.load.on("filecomplete-json-" + npcKey, function (key, type, data) {
            this.load.spritesheet(key + 'Texture', '/Npcs/NpcTextures/' + data.texture, { frameWidth: 16, frameHeight: 32});
        }, this);
    }
    loadAudio(audioKey, audioPath, volume=1)
    {
        this.load.audio(audioKey, audioPath);
        this.load.on("filecomplete-audio-" + audioKey, function (key, type, data) {
            AudioManager.getInstance(this).addAudio(key, volume);
        }, this);
    }

    preload()
    {
        this.load.path = '../assets/';
        this.load.spritesheet('player', '/General/Player_spritesheet.png', { frameWidth: 16, frameHeight: 32});
        this.load.image('PresentDayMap', '/Scene_PresentDay/PresentDay.png');
        this.load.image('1700sMap', '/Scene_1700s/1700s.png');
        this.load.image('1960sMap', '/Scene_1960s/1960s.png');
        this.load.image('PresentDayInt', '/Scene_PresentDay/Interior.png');
        this.load.image('dialogueBox', '/HUD/text_box.png');
        this.load.image('parkStart', '/Scene_PresentDay/Park_Initial.png');
        this.loadAudio('overworldBGM', '/Music/GAME SONG.mp3', 0.2);
        this.loadAudio('npcAudio', 'npcAudio.mp3', 1);

        //Purple Guy Stuff
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

        this.loadNpc('girl', '/Npcs/npc1.json');
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

        this.dialogueManager = new DialogueManager(this, 'dialogueBox');

        AudioManager.getInstance(this).addBackgroundMusic('overworldBGM', true, true);

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
                y: 0,
                image: 'head'
            },
            upperArmL:
            {
                x: 0,
                y: 0,
                image: 'arm_left'
            },
            upperArmR:
            {
                x: 0,
                y: 0,
                image: 'arm_right'
            },
            forearmL:
            {
                x: 0,
                y: 0,
                image: 'wrist_hand_left'
            },
            forearmR:
            {
                x: 0,
                y: 0,
                image: 'wrist_hand_right'
            },
            legL:
            {
                x: 0,
                y: 0,
                image: 'leg_left'
            },
            legR:
            {
                x: 0,
                y: 0,
                image: 'leg_right'
            },
            ankleL:
            {
                x: 0,
                y: 0,
                image: 'ankle_foot_left'
            },
            ankleR:
            {
                x: 0,
                y: 0,
                image: 'ankle_foot_right'
            }
        };
        this.purpleGuy = new PurpleGuy(this, 400, 500, purpleGuyData);


        this.PresentDayBG = this.add.image(screenWidth/2, screenHeight/2, 'PresentDayMap');
        this.PresentDayBG.depth = 1;
        this.PresentDayBG.alpha = 1;
        this.BeginningTimeBG = this.add.image(screenWidth/2, screenHeight/2, '1700sMap');
        this.BeginningTimeBG.depth = 1;
        this.BeginningTimeBG.alpha = 1;
        this.MiddleTimeBG = this.add.image(screenWidth/2, screenHeight/2, '1960sMap'); 
        this.MiddleTimeBG.depth = 1;
        this.MiddleTimeBG.alpha = 1;
        this.initalParkBG = this.add.image(screenWidth/2, screenHeight/2, 'parkStart');
        this.initalParkBG.depth = 1;
        this.initalParkBG.alpha = 1;
        //
        this.presentDayIntBG = this.add.image(screenWidth/2, screenHeight/2, 'PresentDayInt');
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
        this.group4 = this.add.group();
        this.group5 = this.add.group();
        this.presentDayMap = new Map(this, "Present Day", this.PresentDayBG, this.group1);
        this.sixtiesMap = new Map(this, "1960s", this.MiddleTimeBG, this.group2);
        this.earlyMap = new Map(this, "1700s", this.BeginningTimeBG, this.group3);
        this.presentDayInt = new Map (this, "PresentDayInt",  this.presentDayIntBG, this.group4);
        this.initalPark = new Map (this, "Initial Park", this.initalParkBG, this.group5);
        //this.presentDayInt.initializeHitboxes();
        this.mapManager = new MapState(this,this.PlayerCamera, this.player, this.earlyMap, this.sixtiesMap, this.presentDayMap, this.initalPark, this.presentDayInt);
        this.mapManager.initialize();
        //used to trigger a test on mapstate transitions
        this.input.keyboard.on('keydown-X', function(event) {
            this.mapManager.loadingZone("Initial Park", this.player.x, this.player.y);
        }, this);

    }

    update(time, delta)
    {
        // this.joystick.update();
        // this.player.update();
        //console.log("x " + this.player.x);
        //console.log("y " + this.player.y);

    }
}

export default Town;