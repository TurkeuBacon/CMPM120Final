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
        this.load.audio('leanguy','/Music/Wacky man.mp3',0,2);
        this.load.spritesheet('player', '/General/Player_spritesheet.png', { frameWidth: 16, frameHeight: 32});

        
        PurpleGuy.loadPurpleGuyData(this);

        this.load.image('presentDayFloor', '/Scene_PresentDay/PresentDay.png');
        this.load.image('presentDayHousing', '/Scene_PresentDay/buildings_all.png');
        this.load.image('dialogueBox', '/HUD/text_box.png');
    }
    create(){
        const screenWidth = this.sys.game.config.width;
        const screenHeight = this.sys.game.config.height;

        
        this.cameraManager = new CameraManager(this);
        this.dialogueManager = new DialogueManager(this, 'dialogueBox');
        let textBox = this.add.graphics();
        textBox.fillStyle(0x000000, 0.8);  // Set the fill color and opacity
            textBox.fillRect(315,400, 400, 100); 
            textBox.depth = 2;
        textBox.visible = false;
        let testtext = this.add.text(325,425,
            'This is John. He is a normal dude in a \nnormal village, living his normal life.').setScale(1);
        testtext.depth = 2;
        testtext.visible = false;
        let purpletext = this.add.text(325,425,
            'Oh shit!!! Purple guy is here!!! \nWatch out John!').setScale(1);
        purpletext.depth = 2;
        purpletext.visible = false;
        let poisontext = this.add.text(325,425,
            '"Hee Hee Heeee!!! I have poisoned you!\n There is no escape. \nGoodbye!"').setScale(1);
        poisontext.depth = 2;
        poisontext.visible = false;
        let finaltext = this.add.text(325,425,
            'John is now poisoned...\nYou must find a cure for him!').setScale(1);
        finaltext.depth = 2;
        finaltext.visible = false;



        const intro2 = this.sound.add('overworldBGM');
        const burplenurple = this.sound.add('leanguy');
        intro2.play();
        
        let PresentDayBG = this.add.image(screenWidth/2, screenHeight/2, 'presentDayFloor');
        PresentDayBG.depth = 1;
        PresentDayBG.alpha = 1;

        let buildingPresent = this.add.image(screenWidth/2, screenHeight/2, 'presentDayHousing');
        buildingPresent.depth = 4;
        buildingPresent.alpha = 1;

        let player = this.add.sprite(0,345,'player');
      //  let purplehead = this.add.sprite(800,325,'head');
        //let purpletorso = this.add.sprite(800,355,'torso');
        player.depth = 2;
      //  purplehead.depth = 2;
        //purpletorso.depth = 2;
        this.purpleGuy = new PurpleGuy(this, 825, 345, this.cache.json.get('purpleGuyData'));
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
            


            player.play('walk_right');
        this.tweens.add({
            targets:player,
            x:500,
            duration:6000,
            onComplete: function(){
                addText();
                addBox();
            }
        });
        let purpleGuyComes = this.tweens.add({
            targets:this.purpleGuy,
            delay:10000,
            x:550,
            duration:8000,
            //onComplete: this.burplenurple.play(),
            onComplete: function () {
                console.log("Tween completed");
                stopAnim();
                onEvent();
                removeText();
                addPurple();
                purplePoison.resume();
            }
            
        });
        let purplePoison = this.tweens.add({
            targets:this.purpleGuy,
            delay:4000,
            y:325,
            x:525,
            yoyo:true,
            duration:4000,
            paused:true,
            onComplete: function(){
                removePurple();
                addPoison();
                purpleLeave.resume();
            }
        });
        let purpleLeave = this.tweens.add({
            targets:this.purpleGuy,
            delay:2000,
            x:900,
            duration:2000,
            paused:true,
            onComplete: function(){
                removePoison();
                burplenurple.stop();
                intro2.play();
                finaletext();
                fade.resume();
                fadebuilding.resume();
            }
        });
        let fadebuilding = this.tweens.add({
            delay:3000,
            targets:buildingPresent,
            alpha:0,
            duration:5000,
            paused:true,
        });
        let fade = this.tweens.add({
            delay:3000,
            targets:PresentDayBG,buildingPresent,
            alpha:0,
            duration:5000,
            paused:true,
            onComplete(){
                fadeplayer.resume();
            }
        });
        let fadeplayer = this.tweens.add({
            delay:2000,
            targets:player,
            alpha:0,
            paused:true,
            onComplete:function(){
                intro2.stop();
                textfade.resume();
            }
        });
        let textfade = this.tweens.add({
            delay:2000,
            targets:finaltext,
            alpha: 0,
            paused:true,
        })
       
       function onEvent(){
        burplenurple.play();
        intro2.stop();
         }
        function stopAnim(){
            player.anims.stop();
        }
        function addBox(){
            textBox.visible = true;
        }
        function removeBox(){
            textBox.visible = false;
        }
        function removeText(){
            testtext.visible = false;
        }
        function addText(){
            testtext.visible = true;
        }
        function addPurple(){
            purpletext.visible = true;
        }
        function removePurple(){
            purpletext.visible = false;
        }
        function addPoison(){
            poisontext.visible = true;
        }
        function removePoison(){
            poisontext.visible = false;
        }
        function finaletext(){
            finaltext.visible = true;
        }
    }
    }

export default C2;