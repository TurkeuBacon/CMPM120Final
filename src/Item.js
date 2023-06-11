import Task from "./Task.js";

class Item extends Phaser.GameObjects.Sprite
{
    constructor(scene, jsonKey)
    {
        const json = scene.cache.json.get(jsonKey);
        super(scene, json.x, json.y, jsonKey + "Texture");
        this.canPickup = json.canPickup;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.itemKey = jsonKey;
        this.task = Task.loadTask(json.task);
        this.metaphysical = json.metaphysical != undefined ? json.metaphysical : false;

        scene.events.on('playerInterractDown', ()=>{
            if(this.canPickup && this.scene.physics.collide(this, this.scene.player))
            {
                this.scene.player.addItem(this);
                if(!this.metaphysical)
                {
                    this.scene.dialogueManager.playDialogue({
                        text: "You got a " + this.itemKey +"!",
                        delays:[],
                        repeat: false,
                        item: null
                    });
                }
            }
        });

        this.depth = 2;
    }
}

export default Item