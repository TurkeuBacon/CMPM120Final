

class DialogueManager
{
    constructor(scene, dialogueBoxKey)
    {
        this.dialogues = {};
        this.scene = scene;
        this.cm = this.scene.cameraManager;
        this.dialogueBoxContainer = this.cm.addUI(this.scene.add.container(scene.sys.game.canvas.width/2, 650));
        this.dialogueBox = this.scene.add.image(0, 0, dialogueBoxKey).setAlpha(1).setOrigin(0.5, 0.5);
        this.dialogueBoxContainer.add(this.dialogueBox);
        this.textObj = this.scene.add.text(0, 0, 'TESTING',{
            fontSize: '45px',
            maxLines: 3,
            fixedWidth: this.dialogueBox.width-25,
            fixedHeight: this.dialogueBox.height-25,
            boundsAlignH: 'right',
            boundsAlignV: 'top',
            wordWrap: {width: this.dialogueBox.width-25}
        }).setOrigin(0.5, 0.5);
        this.dialogueBoxContainer.add(this.textObj);
        this.dialogueBoxContainer.alpha = 0;
        this.playing = false;
        this.maxCharPerLine = 25;
        this.click = false;
        this.waitNextClick = false;
        this.scene.input.on('pointerdown', ()=>{ this.click = true; });
        this.scene.input.on('pointerup', ()=>{ this.click = false; this.waitNextClick = false; });
    }
    
    playDialogue(dialogue)
    {
        if(this.playing) return false;
        this.playing = true;
        this.dialogueBoxContainer.alpha = 1;
        this.writeDialogue(dialogue);
        this.scene.events.emit('freezeInput', true );

        return true;
    }

    onDialogueComplete()
    {
        console.log("dialogue complete");
        this.playing = false;
        this.scene.events.emit('freezeInput', false );
        this.dialogueBoxContainer.alpha = 0;
    }

    stopDialogue()
    {
        this.dialogueBoxContainer.alpha = 0;
    }

    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    preprocessText(text)
    {
        let startingI = 0;
        let outputText = "";
        while(true)
        {
            if(startingI+this.maxCharPerLine >= text.length)
            {
                outputText += text.substring(startingI, text.length);
                break;
            }
            else
            {
                for(let i = (startingI+this.maxCharPerLine); i >= startingI; i--)
                {
                    if(text[i] == " " || text[i] == "\n")
                    {
                        outputText += (text.substring(startingI, i) + "\n");
                        startingI = i+1;
                        break;
                    }
                }
            }
        }
        return outputText;
    }

    async writeDialogue(text, preprocess=true){
        let lineCount = 0;
        if(preprocess)
        {
            text = this.preprocessText(text);
        }
        let textProgress = "";
        for (let i = 0; i < text.length; i++){
            textProgress += text[i];
            this.textObj.setText(textProgress);
            if (text[i] == '\n'){
                lineCount++;
                if(lineCount % 3 == 0)
                {
                    while(!this.click || this.waitNextClick) await this.wait(1);
                    textProgress = "";
                }
            }
            if(this.click && !this.waitNextClick)
            {
                this.waitNextClick = true;
            }
            await this.wait(50);
        }
        while(!this.click || this.waitNextClick) await this.wait(1);
        this.onDialogueComplete();
    }
}

export default DialogueManager