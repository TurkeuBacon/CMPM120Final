class Npc extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y, texture, frame)
    {
        super(scene, x, y, texture, frame);
        this.dialogueLines = [];
        this.currentLine = 0;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setImmovable(true);
        scene.events.on('playerInterractDown', ()=>{
            if(this.scene.physics.collide(this, this.scene.player))
            {
                this.playDialogue();
            }
        });
    }

    addDialogue(text, repeat)
    {
        this.dialogueLines.push({
            text: text,
            repeat: repeat
        });
    }

    playDialogue()
    {
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
        let success = this.scene.dialogueManager.playDialogue(this.dialogueLines[this.currentLine].text);
        if(success && !this.dialogueLines[this.currentLine].repeat)
        {
            this.currentLine += 1;
        }
        return success;
    }
}

export default Npc