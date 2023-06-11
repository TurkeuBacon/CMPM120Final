import PurpleGuy from '../PurpleGuy.js'

class IntroCutscene extends Phaser.Scene
{
    constructor()
    {
        super('introCutscene');
    }

    preload()
    {
        // this.load.image()
        PurpleGuy.loadPurpleGuyData(this);
    }

    create()
    {
        this.cameras.main.zoom = 2;
        this.purpleGuy = new PurpleGuy(this, 400, 400, this.cache.json.get('purpleGuyData'));

        this.input.on('pointerdown', () => {
            console.log("POINTER DOWN");
        })
    }
}

export default IntroCutscene