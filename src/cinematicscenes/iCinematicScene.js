class CinematicInteractive extends Phaser.Scene{
    preload(){
        this.load.path = '../assets/';
        this.load.image('TitleArt', 'Scene_MainMenu/Title.png');
        this.load.image('BackgroundArt', 'Scene_MainMenu/BackgroundArt.png');
        this.load.image('ButtonArt', 'Scene_MainMenu/play1.png');
        this.load.image('hoverOn', 'Scene_MainMenu/play2.png');
    }
    create(){
        let canvasWidth = this.sys.game.canvas.width;
        let canvasHeight = this.sys.game.canvas.height;

        let backgroundArt = this.add.image(0, 0, 'BackgroundArt');
        backgroundArt.setOrigin(0, 0);
        backgroundArt.setDisplaySize(canvasWidth, canvasHeight);

        let titleArt = this.add.image(canvasWidth/2, 100, 'TitleArt');
        titleArt.setOrigin(0.5, 0);
        titleArt.setScale(0.5);

        let startButton = this.add.image(canvasWidth/2, canvasHeight/2+250, 'ButtonArt');
        let hoverOn = this.add.image(canvasWidth/2, canvasHeight/2+250, 'hoverOn');
        hoverOn.alpha = 0;
        startButton.setScale(1);
        startButton.setInteractive().on('pointerover', () =>{
            startButton.alpha = 0.01;
            hoverOn.alpha = 1;
        });
        startButton.setInteractive().on('pointerout', () =>{
            startButton.alpha = 1;
            hoverOn.alpha = 0;
        });
        startButton.setInteractive().on('pointerdown', () => 
        {
            
            this.scene.start('iladies');
        });
        startButton.setScale(0.4);
        this.tweens.add({
            targets:backgroundArt,
            alpha:{from:1, to:0},
                    ease:'Linear',
                    duration:10000,
                    repeat:0,
        });
        this.tweens.add({
            targets:titleArt,
            alpha:{from:1, to:0},
                    ease:'Linear',
                    duration:15000,
                    repeat:0,
        });
        
    }
    
}
export default CinematicInteractive