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
class sfMeat extends Phaser.Scene{
    constructor(){
        super('sfcommence');
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
    preload(){
        this.load.path = '../assets/';
        this.load.audio('overworldBGM', '/Music/GAME SONG.mp3', 0.2);
        this.load.audio('npcAudio', 'npcAudio.mp3', 1);
        this.load.audio('leanguy','/Music/Wackyman.mp3',0,2);
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

        this.loadNpc('girl', '/Npcs/SceneFlowNpc.json');
        this.loadNpc('bacon','/Npcs/Gabe.json');
        this.loadNpc('girl2','/Npcs/Lovely.json');

        this.load.image('JoystickBack', '/HUD/Jbase.png');
        this.load.image('JoystickHandle', '/HUD/Jhandle.png');
        this.load.spritesheet('Button', '/HUD/A_Button.png', { frameWidth: 68, frameHeight: 70});

        this.loadItem('Water Can', '/Items/waterCan.json');
    }
    create(){
        const screenWidth = this.sys.game.config.width;
        const screenHeight = this.sys.game.config.height;
        let PresentDayBG = this.add.image(screenWidth/2, screenHeight/2, 'presentDayFloor');
        PresentDayBG.depth = 1;
        PresentDayBG.alpha = 0;
        this.tweens.add({
            targets:PresentDayBG,
            alpha:1,
            duration:5000,
        });

        let buildingPresent = this.add.image(screenWidth/2, screenHeight/2, 'presentDayHousing');
        buildingPresent.depth = 4;
        buildingPresent.alpha = 0;
        this.tweens.add({
            targets:buildingPresent,
            alpha:1,
            duration:5000,
        });

        this.cameraManager = new CameraManager(this);
        this.dialogueManager = new DialogueManager(this, 'dialogueBox');

        
        this.npc2 = new Npc(this, 'girl').setPosition(400, 400).setInteractive().on('pointerdown', () => 
        {
            this.npc2.playDialogue();
        });
        this.npc2.alpha = 0;
        this.tweens.add({
            targets:this.npc2,
            alpha:1,
            duration:5000,
        });
        this.npc3 = new Npc(this,'bacon').setPosition(300,400);
        this.npc3.alpha = 0;
        this.tweens.add({
            targets:this.npc3,
            alpha:1,
            duration:5000,
        });
        this.npc4 = new Npc(this,'girl2').setPosition(600,500);
        this.npc4.alpha = 0;
        this.tweens.add({
            targets:this.npc4,
            alpha:1,
            duration:5000,
        });
        this.joystick = new TouchJoystick(this, {'width': 0.4, 'height': .5}, 'JoystickBack', 'JoystickHandle',  150, 75, 125, 0.42);
        //0,350
        this.player = new Player(this, 0, 350, 'player', 1, this.joystick, 'Button');
        this.player.depth = 2;
        this.tweens.add({
            targets:this.player,
            x:500,
            duration:5000,
        });
        let parkText = this.add.text(300-25,300+40,'Click for Park').setScale(1)
        .setInteractive()
        .on('pointerdown',()=>{
            this.scene.start('parkington');
        });
        parkText.depth = 2;

        let endText = this.add.text(600-25,300+40,'Click for Bad End').setScale(1)
        .setInteractive()
        .on('pointerdown',()=>{
            this.scene.start('baddie');
        });
        endText.depth = 2;
    }
}
export default sfMeat