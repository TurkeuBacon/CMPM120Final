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
import Item from '../Item.js'

class Town extends Phaser.Scene
{
    constructor()
    {
        super('town');
    }

    loadItem(itemKey, itemPath)
    {
        this.load.json(itemKey, itemPath);
        this.load.on("filecomplete-json-" + itemKey, function (key, type, data) {
            this.load.image(key + 'Texture', '/Items/ItemTextures/' + data.texture);
        }, this);
    }
    loadNpc(npcKey, npcPath)
    {
        this.load.json(npcKey, npcPath);
        this.load.on("filecomplete-json-" + npcKey, function (key, type, data) {
            this.load.spritesheet(key + 'Texture', '/Npcs/NpcTextures/' + data.texture, { frameWidth: 16, frameHeight: 32});
        }, this);
    }
    loadAudio(audioKey, audioPath)
    {
        this.load.audio(audioKey, audioPath);
        this.load.on("filecomplete-audio-" + audioKey, function (key, type, data) {
            AudioManager.getInstance(this).addAudio(key);
        }, this);
    }

    preload()
    {
        this.load.path = '../assets/';
        this.load.spritesheet('player', '/General/Player_spritesheet.png', { frameWidth: 16, frameHeight: 32});
        this.load.image('presentDayFloor', '/Scene_PresentDay/PresentDay.png');
        //Trees
        this.load.image('trees', '/Scene_PresentDay/trees.png');
        this.load.image ('trees1700s', '/Scene_1700s/trees1700.png');
        this.load.image('treeRight', '/Scene_PresentDay/tree_right.png');
        //Housing
        this.load.image('presentDayHousing', '/Scene_PresentDay/buildings_all.png');
        this.load.image('buildings1700', '/Scene_1700s/buildings1700.png');
        this.load.image ('buildings1960', '/Scene_1960s/buildings1960.png');
        //Floors
        this.load.image('1700sFloor', '/Scene_1700s/1700s.png');
        this.load.image('1960sFloor', '/Scene_1960s/1960s.png');
        //Interior
        this.load.image('PresentDayInt', '/Scene_PresentDay/Interior.png');
        this.load.image('1700sInt', '/Scene_1700s/Interior1700s.png');
        //Dialogue
        this.load.image('dialogueBox', '/HUD/text_box.png');
        //Park
        this.load.image('parkStart', '/Scene_PresentDay/Park_Initial.png');
        this.load.image('park1700s', '/Scene_1700s/Park1700s.png');
        this.load.image('park1960s', '/Scene_1960s/1960sPark.png');
        //Music
        this.loadAudio('overworldBGM', '/Music/GAME SONG.mp3', 0.2);
        this.loadAudio('npcAudio', 'npcAudio.mp3', 1);

        //Music On/Off
        this.load.spritesheet('musicOnOff', '/General/music_on_off.png', { frameWidth: 130, frameHeight: 128 });
        //CC On/Off
        this.load.spritesheet('CCOnOff', '/General/cc_on_off.png', { frameWidth: 130, frameHeight: 128 });

        //Purple Guy Stuff
        //PurpleGuy.loadPurpleGuyData(this);

        this.load.image('fsbutton','/HUD/fullscreen_button.png');

        this.loadItem('testItem', '/Items/itemTest.json');


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

        AudioManager.getInstance(this).addBackgroundMusic('overworldBGM', 0.2, true, true);

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
        
        this.purpleGuy = new PurpleGuy(this, 400, 500, purpleGuyData);
        //trees
        this.trees = this.add.image(screenWidth/2, screenHeight/2, 'trees');
        this.trees.depth = 3;
        this.trees.alpha = 1;
        this.treesRight = this.add.image(screenWidth/2-65, screenHeight/2-150, 'treeRight');
        this.treesRight.depth = 3;
        this.treesRight.alpha = 1;
        this.treesBottomRight = this.add.image(screenWidth/2-65, screenHeight/2+ 500, 'treesBottomRight');
        this.trees1700s = this.add.image(screenWidth/2, screenHeight/2, 'trees1700s');
        this.trees1700s.depth = 3;
        this.trees1700s.alpha = 1;
        
        //Buildings
        this.buildingPresent = this.add.image(screenWidth/2, screenHeight/2, 'presentDayHousing');
        this.buildingPresent.depth = 4;
        this.buildingPresent.alpha = 1;
        this.building1700s = this.add.image(screenWidth/2, screenHeight/2, 'buildings1700');
        this.building1700s.depth = 4;
        this.building1700s.alpha = 1;
        this.buildings1960s = this.add.image(screenWidth/2, screenHeight/2, 'buildings1960');
        this.buildings1960s.depth = 4;
        this.buildings1960s.alpha = 1;
        this.PresentDayBG = this.add.image(screenWidth/2, screenHeight/2, 'presentDayFloor');
        this.PresentDayBG.depth = 1;
        this.PresentDayBG.alpha = 1;
        this.BeginningTimeBG = this.add.image(screenWidth/2, screenHeight/2, '1700sFloor');
        this.BeginningTimeBG.depth = 1;
        this.BeginningTimeBG.alpha = 1;
        this.MiddleTimeBG = this.add.image(screenWidth/2, screenHeight/2, '1960sFloor'); 
        this.MiddleTimeBG.depth = 1;
        this.MiddleTimeBG.alpha = 1;
        this.initalParkBG = this.add.image(screenWidth/2, screenHeight/2-200, 'parkStart');
        this.initalParkBG.depth = 1;
        this.initalParkBG.alpha = 1;
        this.park1700BG = this.add.image(screenWidth/2, screenHeight/2-200, 'park1700s');
        //Interior
        this.presentDayIntBG = this.add.image(screenWidth/2, screenHeight/2, 'PresentDayInt');
        this.earlyIntBG = this.add.image(screenWidth/2, screenHeight/2, '1700sInt');
        this.joystick = new TouchJoystick(this, {'width': 0.4, 'height': .5}, 150, 75, 125, 0.42);
        this.player = new Player(this, 500, 500, 'player', 1, this.joystick);
        this.player.depth = 2;
        this.cameraManager.setPlayerCameraTarget(this.player);

        this.testNpc = new Npc(this, 'girl');
        this.npc2 = new Npc(this, 'girl').setPosition(400, 400);

        this.testItem = new Item(this, 'testItem');
        //this.testNpc.addDialogue("This is some long text to test out the dialogue system. Hope it works (:. Here's some more text.\n\n\nHehe.", true);
        //this.testNpc.depth = 2;
        //this.testNpc.playDialogue();

        //testing for groups
        this.group1 = this.add.group();
        this.group2 = this.add.group();
        this.group3 = this.add.group();
        this.group4 = this.add.group();
        this.group5 = this.add.group();
        this.group6 = this.add.group();
        this.group7 = this.add.group();
        this.group8 = this.add.group();
        this.group9 = this.add.group();
        //Present Day Group
        this.group1.add(this.trees);
        this.group1.add(this.buildingPresent);
        this.group1.add(this.testNpc);
        this.group1.add(this.npc2);
        this.group1.add(this.purpleGuy);
        //Present Day Park Group
        this.group5.add(this.treesRight);
        //1700s group
        this.group3.add(this.trees1700s);
        this.group3.add(this.building1700s);
        //1960s group
        this.group2.add(this.trees);
        this.group2.add(this.buildings1960s);
        this.presentDayMap = new Map(this, "Present Day", this.PresentDayBG, this.group1);
        this.sixtiesMap = new Map(this, "1960s", this.MiddleTimeBG, this.group2);
        this.earlyMap = new Map(this, "1700s", this.BeginningTimeBG, this.group3);
        this.presentDayInt = new Map (this, "PresentDayInt",  this.presentDayIntBG, this.group4);
        this.sixtiesInt = new Map (this, "SixtiesInt", this.presentDayIntBG, this.group8);
        this.earlyInt = new Map (this, "1700sInt", this.earlyIntBG, this.group6);
        this.initialPark = new Map (this, "Initial Park", this.initalParkBG, this.group5);
        this.earlyPark = new Map (this, "1700s Park", this.park1700BG, this.group7);
        this.sixtiesPark = new Map (this, "Sixties Park", this.initalParkBG, this.group9)
        this.mapManager = new MapState(this,this.PlayerCamera, this.player, this.earlyMap, this.sixtiesMap, this.presentDayMap, this.earlyPark, this.initialPark, this.sixtiesPark, this.presentDayInt, this.earlyInt, this.sixtiesInt);
        this.mapManager.initialize();
        //this.cameraManager.playerCamera.setBounds(this.PresentDayBG.x - this.PresentDayBG.width/2, this.PresentDayBG.y - this.PresentDayBG.height/2, this.PresentDayBG.width, this.PresentDayBG.height);
        //used to trigger a test on mapstate transitions
        this.input.keyboard.on('keydown-X', function(event) {
            this.mapManager.loadingZone("1700s", this.player.x, this.player.y);
        }, this);
        this.fsbutton = this.add.sprite(25,25,'fsbutton').setInteractive().setOrigin(0, 0).setScale(1.5).on('pointerdown', () => 
        {
            if(this.scale.isFullscreen){
                this.scale.stopFullscreen();
            }else{
                this.scale.startFullscreen();
            }
        });
        this.cameraManager.addUI(this.fsbutton);
        let mutedItem = localStorage.getItem("Muted");
        console.log("Muted Item: " + mutedItem);
        this.musicButton = this.add.sprite(this.fsbutton.x, this.fsbutton.y + this.fsbutton.displayHeight + 65, 'musicOnOff', 0).setOrigin(0, 0).setScale(.6).setInteractive().on('pointerdown', ()=>{
            this.musicButton.setFrame(AudioManager.getInstance(this).toggleMute() ? 1 : 0);
        });
        this.cameraManager.addUI(this.musicButton);
        if(mutedItem != null)
        {
            let shouldMute = mutedItem == "TRUE";
            this.musicButton.setFrame(shouldMute ? 1 : 0);
            AudioManager.getInstance(this).setMute(shouldMute);
        }
        this.ccButton = this.add.sprite(this.fsbutton.x, this.fsbutton.y + this.fsbutton.displayWidth + 65, 'CCOnOff', 0).setOrigin(0, 0).setScale(.6).setInteractive().on('pointerdown', ()=>{
            this.ccButton.setFrame(AudioManager.getInstance(this).toggleCC() ? 1 : 0);
        });
        this.cameraManager.addUI(this.ccButton);
    }

    update(time, delta)
    {
        // this.joystick.update();
        // this.player.update();
        //console.log("Cam Scroll: (" + this.cameraManager.playerCamera.scrollX + ", " + this.cameraManager.playerCamera.scrollY + ")");
        //console.log("x" + this.player.x);
        //console.log("y" + this.player.y);
    }
}

export default Town;
