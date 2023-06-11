import Phone from "./Phone.js";
class Sign extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, signkey, phone){
        super(scene, x, y, signkey, 0);
        this.scene = scene;
        this.phone = phone;
        this.sign = signkey;
        this.scene.add.existing(this);
        this.alpha = 1;
        this.depth = 3;
        this.scene.physics.add.existing(this);
        this.body.setImmovable(true);
        this.player = this.scene.player;
        //this.scene.events.on('update', (time, delta) => { this.update(time, delta)} );
        if(this.scene.physics.overlap(this.player, this)){
            console.log('hi');
        }
        this.scene.events.on('playerInterractDown', () => {
            if(this.scene.physics.overlap(this.player, this)){
                if(this.player.hasItem("Tree Book"))
                {
                    this.player.hideInventory();
                    this.phone.displayPhone();
                    this.scene.events.emit('freezeInput', true);
                }
                else
                {
                    this.scene.dialogueManager.playDialogue(
                        {
                            "text": "You should explore the town more before firing up that bad boi.",
                            "delays": [],
                            "repeat": false,
                            "item": null
                        }, true, true);
                }
            }
        })
        
    }
    disappear(){
        this.scene.physics.world.disable(this.sign);
        this.sign.alpha = 0;
    }
    appear(){
        this.scene.physics.world.enable(this.sign);
        this.sign.alpha = 1;
    }
    update (time, delta)
    {
        
        
    }

}

export default Sign;