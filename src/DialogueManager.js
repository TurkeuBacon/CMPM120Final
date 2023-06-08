

class DialogueManager
{
    constructor(scene, dialogueBoxKey)
    {
        this.dialogues = {};
        this.scene = scene;
        this.cm = this.scene.cameraManager;
        this.dialogueBox = this.cm.addUI(this.scene.add.image(dialogueBoxKey, 0, 900, dialogueBoxKey));
        
    }

    addDialogue(key, dialogue)
    {
        if(key in this.dialogues)
        {
            console.error("KEY: '" + key + "' ALREADY EXISTS");
        }
        else
        {
            this.dialogues[key] = dialogue;
        }
    }
    
    playDialogue()
    {
        this.dialogueBox.alpha = 1;
    }

    stopDialogue()
    {
        this.dialogueBox.alpha = 0;
    }

    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async writeDialogue(){
        for (let i = 0; i < this.Text.length; i++){
            await this.wait(100);
            console.log(this.Text[i]);
            if (this.Text[i] === " "){
                this.Count++;
            }
        }
    }
}

export default DialogueManager