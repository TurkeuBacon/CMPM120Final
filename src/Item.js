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

        scene.events.on('playerInterractDown', ()=>{
            if(this.canPickup && this.scene.physics.collide(this, this.scene.player))
            {
                this.scene.player.addItem(this);
                this.scene.dialogueManager.playDialogue({
                    text: "You got the " + this.itemKey +"!",
                    delay:[],
                    repeat: false,
                    item: null
                });
            }
        });

        this.depth = 2;
    }
}

export default Item