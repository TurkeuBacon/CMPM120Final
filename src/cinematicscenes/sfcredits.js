class sfCredit extends Phaser.Scene{
    constructor(){
        super('credito');
    }
    preload(){
        this.load.image('ButtonArt', 'Scene_MainMenu/play1.png');
        this.load.image('hoverOn', 'Scene_MainMenu/play2.png');
    }
    create(){
        let canvasWidth = this.sys.game.canvas.width;
        let canvasHeight = this.sys.game.canvas.height;
        this.add.text(200,200,'Placeholder for Credits!');
        this.add.text(300,300,'Click the button to return to the title screen.');
        this.add.text(500,500,'Developed by Gabe, Daniel, Gordon, and Jacob');
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
            
            this.scene.start('bababooey');
        });
    }
}
export default sfCredit