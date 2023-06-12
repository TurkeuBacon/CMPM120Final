import AudioManager from '../AudioManager.js';
import CameraManager from '../CameraManager.js';
import DialogueManager from '../DialogueManager.js';
import TouchJoystick from '../InputDevices.js';
import Player from '../Player.js'
import PurpleGuy from '../PurpleGuy.js'

class IntroCutscene extends Phaser.Scene
{
    constructor()
    {
        super('introCutscene');
    }

    loadItem(itemKey, itemPath)
    {
        this.load.json(itemKey, itemPath);
        this.load.on("filecomplete-json-" + itemKey, function (key, type, data) {
            this.load.image(key + 'Texture', '/Items/ItemTextures/' + data.texture);
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
        this.load.image('InteriorBackground', '/Scene_PresentDay/Interior.png');
        this.loadAudio('purpleGuyTheme', '/Music/Wackyman.mp3');
        this.loadAudio('houseMusic', '/Music/BeneathTheMask-instrumental.mp3');
        PurpleGuy.loadPurpleGuyData(this);
        //Music On/Off
        this.load.spritesheet('musicOnOff', '/General/music_on_off.png', { frameWidth: 130, frameHeight: 128 });
        //CC On/Off
        this.load.spritesheet('CCOnOff', '/General/cc_on_off.png', { frameWidth: 130, frameHeight: 128 });

        this.load.image('fsbutton','/HUD/fullscreen_button.png');
        this.load.image('dialogueBox', '/HUD/text_box.png');
        this.load.image('purpleBox', '/HUD/text_box_wacky_guy.png');
        this.loadAudio('purpleDAudio', 'purpleGuyTextAudio.mp3', 1);
        //this.loadAudio('npcAudio', 'npcAudio.mp3', 1);
        this.load.image('taskHub', '/HUD/task_hub.png');

        this.loadItem('researchTreeAssigned', '/Items/Metaphysical/researchTreeAssigned.json');
        this.load.image('JoystickBack', '/HUD/Jbase.png');
        this.load.image('JoystickHandle', '/HUD/Jhandle.png');
        this.load.spritesheet('Button', '/HUD/A_Button.png', { frameWidth: 68, frameHeight: 70});
    }

    spawnCollision()
    {
        //this.editCollider = this.add.rectangle(400, 450, 10, 10, 0xff00aa, 1).setOrigin(0, 0);
        this.colliders = [
            this.physics.add.existing(this.add.rectangle(299, 251, 4, 233, 0xff00aa, 0).setOrigin(0, 0)),
            this.physics.add.existing(this.add.rectangle(302, 480, 424, 4, 0xff00aa, 0).setOrigin(0, 0)),
            this.physics.add.existing(this.add.rectangle(721, 250, 6, 234, 0xff00aa, 0).setOrigin(0, 0)),
            this.physics.add.existing(this.add.rectangle(300, 251, 426, 57, 0xff00aa, 0).setOrigin(0, 0)),
            this.physics.add.existing(this.add.rectangle(391, 308, 16, 18, 0xff00aa, 0).setOrigin(0, 0)),
            this.physics.add.existing(this.add.rectangle(316, 360, 76, 16, 0xff00aa, 0).setOrigin(0, 0)),
            this.physics.add.existing(this.add.rectangle(430, 307, 10, 86, 0xff00aa, 0).setOrigin(0, 0)),
            this.physics.add.existing(this.add.rectangle(440, 308, 19, 76, 0xff00aa, 0).setOrigin(0, 0)),
            this.physics.add.existing(this.add.rectangle(512, 321, 45, 22, 0xff00aa, 0).setOrigin(0, 0)),
            this.physics.add.existing(this.add.rectangle(428, 450, 13, 32, 0xff00aa, 0).setOrigin(0, 0)),
            this.physics.add.existing(this.add.rectangle(442, 456, 21, 22, 0xff00aa, 0).setOrigin(0, 0)),
            this.physics.add.existing(this.add.rectangle(620, 307, 101, 17, 0xff00aa, 0).setOrigin(0, 0)),
            this.physics.add.existing(this.add.rectangle(613, 432, 25, 51, 0xff00aa, 0).setOrigin(0, 0)),
            this.physics.add.existing(this.add.rectangle(693, 429, 28, 54, 0xff00aa, 0).setOrigin(0, 0)),
        ];
        this.loadingZone = this.add.rectangle(525, 465, 35, 15, 0xff00aa, 0).setOrigin(0, 0);
        this.physics.add.existing(this.loadingZone);
        this.loadingZone.body.setImmovable(true);
        this.physics.add.collider(this.loadingZone, this.player, ()=>{
            console.log("Player Exits into main scene");
            AudioManager.getInstance(this).endAllSound();
            this.scene.start('town');
        });

        this.colliders.forEach(element => {
            element.body.setImmovable(true);
        });
    }

    create()
    {
        // this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        // this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        // this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        // this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        // this.u = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.U);
        // this.h = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);
        // this.j = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        // this.k = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
        
        this.input.keyboard.on('keydown-SPACE', function(event) {
            console.log("Collider Data:\n\tPosition: (" + this.editCollider.x + ", " + this.editCollider.y + ")\n\tSize: [" + this.editCollider.width + ", " + this.editCollider.height + "]\n" + this.editCollider.originX + ", " + this.editCollider.originY);
            this.editCollider = this.add.rectangle(400, 450, 10, 10, 0xff00aa, 1);
        }, this);

        this.cameras.main.zoom = 1;

        this.cameraManager = new CameraManager(this);

        this.dialogueManager = new DialogueManager(this, 'dialogueBox', 'purpleBox');

        this.add.image(175, 10, 'InteriorBackground');
        this.joystick = new TouchJoystick(this, {'width': 0.4, 'height': .5}, 'JoystickBack', 'JoystickHandle',  150, 75, 125, 0.42);
        this.player = new Player(this, 380, 343, 'player', 0, this.joystick, 'Button');
        this.player.depth = 2;
        this.spawnCollision();
        //this.cameraManager.setPlayerCameraTarget(this.player);

        //this.purpleGuy = new PurpleGuy(this, 400, 400, this.cache.json.get('purpleGuyData'));

        this.input.on('pointerdown', () => {
            console.log("POINTER DOWN");
            //this.scene.start('town');
            //new PurpleGuy(this, Math.random()*400 + 200, Math.random()*300 + 150, this.cache.json.get('purpleGuyData'));
        });
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

        this.events.emit('freezeInput', true);

        this.purpleGuy = new PurpleGuy(this, 900, 400, this.cache.json.get('purpleGuyData'));

        this.time.delayedCall(0, () =>{
            this.player.play('walk_right', true);
        });
        this.time.delayedCall(50, () =>{
            this.add.tween({
                targets: this.player,
                y:425,
                duration: 1100,
                onComplete: () => 
                {
                    this.player.play('walk_right', true);
                    this.add.tween({
                        targets: this.player,
                        x: 500,
                        duration: 1000,
                        onComplete: () => 
                        {
                            AudioManager.getInstance(this).addBackgroundMusic('purpleGuyTheme', 0.8, true, true);
                            this.purpleGuy.playAnimation("wackadoodle");
                            this.player.stop();
                            this.add.tween({
                                targets: this.purpleGuy,
                                x: 540,
                                y: 420,
                                duration: 2000,
                                onComplete: () => 
                                {
                                    this.purpleGuy.playAnimation(this.purpleGuy.playAnimation("stab", 150, ()=>{
                                        this.purpleGuy.playAnimation("wackadoodle");
                                        this.dialogueManager.playDialogue(
                                            {
                                                "text": "HeEEeeYYyyY Johnny BoyoOo\n\n\nI just poisoned you!!\n...OOps!!\nHAhAhAHAAhAhaHAHa!\nAnyways!\nThe only antidote comes from a tree thats been extinct for at least a century now\n\nTo make things a bit more Interestinggg, I'll let you time travel!!! (:",
                                                "delays": [{charI : 50, delay: 400}, {charI : 51, delay: 400}, {charI : 52, delay: 400}, {charI : 53, delay: 400}, {charI : 60, delay: 750}],
                                                "repeat": false,
                                                "item": "researchTreeAssigned"
                                            },
                                            true,
                                            true,
                                            ()=>{
                                                this.add.tween({
                                                    targets: this.purpleGuy,
                                                    ease: "Sine.easeIn",
                                                    duration: 1000,
                                                    x: 900,
                                                    onComplete: ()=>{
                                                        AudioManager.getInstance(this).endBGM();
                                                    }
                                                });
                                            }
                                        )
                                    }));
                                },
                                ease: "Expo.easeOut"
                            });
                        }
                    });
                },
            });
        })
        this.add.tween({
            targets: this.player,
            delay: 0,
            x: 410,
            duration: 100,
            onComplete: () => 
            {
                this.player.play('walk_down', true);
            }
        });
    }

    update()
    {
        this.colliders.forEach(element => {
            this.physics.collide(element, this.player);
        });
        // if(this.w.isDown)
        // {
        //     this.editCollider.y -= 1;
        // }
        // if(this.a.isDown)
        // {
        //     this.editCollider.x -= 1;
        // }
        // if(this.s.isDown)
        // {
        //     this.editCollider.y += 1;
        // }
        // if(this.d.isDown)
        // {
        //     this.editCollider.x += 1;
        // }
        
        // if(this.u.isDown)
        // {
        //     this.editCollider.height += 1;
        // }
        // if(this.h.isDown)
        // {
        //     this.editCollider.width -= 1;
        // }
        // if(this.j.isDown)
        // {
        //     this.editCollider.height -= 1;
        // }
        // if(this.k.isDown)
        // {
        //     this.editCollider.width += 1;
        // }
    }
}

export default IntroCutscene