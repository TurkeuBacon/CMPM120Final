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
        this.extraText = json.extraText != undefined ? json.extraText : null;

        scene.events.on('playerInterractDown', ()=>{
            if(this.canPickup && this.scene.physics.collide(this, this.scene.player))
            {
                if(this.group != undefined)
                {
                    this.group.remove(this);
                }
                if(!this.metaphysical)
                {
                    let extra = this.extraText == null ? "" : "\n\n\n" + this.extraText
                    this.scene.dialogueManager.playDialogue({
                        text: "You got a " + this.itemKey +"!" + extra,
                        delays:[],
                        repeat: false,
                        item: null
                    }, true, false,
                    ()=>{ this.scene.player.addItem(this); });
                }
                else
                {
                    this.scene.player.addItem(this);
                }
            }
        });

        this.depth = 2;
    }
}

export default Item