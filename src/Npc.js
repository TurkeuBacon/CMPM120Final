class Npc extends Phaser.GameObjects.Sprite
{
    constructor(scene, jsonKey)
    {
        const json = scene.cache.json.get(jsonKey);
        super(scene, json.x, json.y, jsonKey + "Texture", json.frame);
        this.dialogueLines = [];
        this.currentLine = 0;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setImmovable(true);
        this.jumpItem = json.jumpItem;
        scene.events.on('playerInterractDown', ()=>{
            if(this.scene.physics.collide(this, this.scene.player))
            {
                this.playDialogue();
            }
        });
        const jsonLines = json.lines;
        for(let i = 0; i < jsonLines.length; i++)
        {
            this.addDialogue(jsonLines[i].text, jsonLines[i].repeat, jsonLines[i].delays, jsonLines[i].item);
        }
        this.depth = 1;
    }

    addDialogue(text, repeat, delays=[], item, requiredItem, alternateText)
    {
        this.dialogueLines.push({
            text: text,
            repeat: repeat,
            delays: delays,
            item: item
        });
    }

    playDialogue()
    {
        //console.log(this.scene.player.hasItem(this.jumpItem.itemKey));
        if(this.jumpItem != undefined && this.scene.player.hasItem(this.jumpItem.itemKey))
        {
            console.log("Has Item");
            this.currentLine = this.jumpItem.lineNumber;
        }
        if(this.dialogueLines.length < 1)
        {
            console.error("Empty Dialogue List");
            return false;
        }
        else if(this.currentLine >= this.dialogueLines.length)
        {
            console.error("No Dialogue Lines Left");
            return false;
        }

        let success = this.scene.dialogueManager.playDialogue(this.dialogueLines[this.currentLine]);
        if(success && !this.dialogueLines[this.currentLine].repeat)
        {
            this.currentLine += 1;
        }
        return success;
    }
}

export default Npc