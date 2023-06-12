import MainMenu from "./MainMenu.js";
class Credits extends Phaser.Scene {
    constructor(){
        super('credits')
    }
    preload(){
        this.load.path = '../assets/';
        this.load.image('credits1', '/General/CreditsPage.png');
    }
    create(){
        const screenWidth = this.sys.game.config.width;
        const screenHeight = this.sys.game.config.height;
        this.credits = this.add.image(screenWidth/2, screenHeight/2, 'credits1').setScale(0.8);
        /*this.input.on('pointerdown', () =>{
            this.scene.start('main_menu');
        });*/
    }
}

export default Credits