import AudioManager from "../AudioManager.js";
import CameraManager from "../CameraManager.js";
class MainMenu extends Phaser.Scene
{

    constructor()
    {
        super("main_menu");
    }
    loadAudio(audioKey, audioPath, caption)
    {
        this.load.audio(audioKey, audioPath);
        this.load.on("filecomplete-audio-" + audioKey, function (key, type, data) {
            AudioManager.getInstance(this).addAudio(key, caption);
        }, this);
    }

    preload()
    {
        this.load.path = '../assets/';
        this.load.image('fsbutton','/HUD/fullscreen_button.png');
        //Music On/Off
        this.load.spritesheet('musicOnOff', '/General/music_on_off.png', { frameWidth: 130, frameHeight: 128 });
        //CC On/Off
        this.load.spritesheet('CCOnOff', '/General/cc_on_off.png', { frameWidth: 130, frameHeight: 128 });
        this.loadAudio('Theme', '/Music/TitleScreen.mp3', 'Music: Title Theme');
        this.load.image('TitleArt', 'Scene_MainMenu/Title.png');
        this.load.image('BackgroundArt', 'Scene_MainMenu/BackgroundArt.png');
        this.load.image('ButtonArt', 'Scene_MainMenu/play1.png');
        this.load.image('Credits', '/General/Credits.png');
        this.load.image('hoverOn', 'Scene_MainMenu/play2.png');
    }

    create()
    {
        this.cameraManager = new CameraManager(this, 1);
        let canvasWidth = this.sys.game.canvas.width;
        let canvasHeight = this.sys.game.canvas.height;
        AudioManager.getInstance(this).addBackgroundMusic('Theme', 1, true, true);
        this.backgroundArt = this.add.image(0, 0, 'BackgroundArt');
        this.backgroundArt.setOrigin(0, 0);
        this.backgroundArt.setDisplaySize(canvasWidth, canvasHeight);

        this.titleArt = this.add.image(canvasWidth/2, 100, 'TitleArt');
        this.titleArt.setOrigin(0.5, 0);
        this.titleArt.setScale(0.5);
        this.credits = this.add.image(canvasWidth/2, canvasHeight/2 + 275, 'Credits');
        this.startButton = this.add.image(canvasWidth/2, canvasHeight/2+180, 'ButtonArt');
        this.hoverOn = this.add.image(canvasWidth/2, canvasHeight/2+180, 'hoverOn');
        this.hoverOn.alpha = 0;
        this.startButton.setScale(1);
        this.credits.setInteractive().on('pointerdown', () =>{
            this.scene.start('credits');
        });
        this.startButton.setInteractive().on('pointerover', () =>{
            this.startButton.alpha = 0.01;
            this.hoverOn.alpha = 1;
        });
        this.startButton.setInteractive().on('pointerout', () =>{
            this.startButton.alpha = 1;
            this.hoverOn.alpha = 0;
        });
        this.startButton.setInteractive().on('pointerdown', () => 
        {
            AudioManager.getInstance(this).endAllSound();
            this.scene.start('introCutscene');
        });
        this.fsbutton = this.add.sprite(25,25,'fsbutton').setInteractive().setOrigin(0, 0).setScale(1.2).on('pointerdown', () => 
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

    update()
    {
        
    }
}

export default MainMenu;