class MainMenu extends Phaser.Scene
{

    constructor()
    {
        super("main_menu");
    }

    preload()
    {
        this.load.path = '../assets/';
        this.load.image('TitleArt', 'Scene_MainMenu/Title.png');
        this.load.image('BackgroundArt', 'Scene_MainMenu/BackgroundArt.png');
        this.load.image('ButtonArt', 'Scene_MainMenu/play2.png');
    }

    create()
    {
        let canvasWidth = this.sys.game.canvas.width;
        let canvasHeight = this.sys.game.canvas.height;

        this.backgroundArt = this.add.image(0, 0, 'BackgroundArt');
        this.backgroundArt.setOrigin(0, 0);
        this.backgroundArt.setDisplaySize(canvasWidth, canvasHeight);

        this.titleArt = this.add.image(canvasWidth/2, 50, 'TitleArt');
        this.titleArt.setOrigin(0.5, 0);
        this.titleArt.setScale(0.5);

        this.startButton = this.add.image(canvasWidth/2, canvasHeight/2+200, 'ButtonArt');
        this.startButton.setScale(1);
        this.startButton.setInteractive().on('pointerdown', () => 
        {
            this.scene.start('introCutscene');
        });
    }

    update()
    {
        
    }
}

export default MainMenu;