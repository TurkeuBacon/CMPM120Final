import AudioManager from "./AudioManager.js";
import Item from "./Item.js";

class DialogueManager
{
    constructor(scene, dialogueBoxKey, purpleDialogueKey)
    {
        this.dialogues = {};
        this.scene = scene;
        this.cm = this.scene.cameraManager;
        this.dialogueBoxContainer = this.cm.addUI(this.scene.add.container(scene.sys.game.canvas.width/2, 650));
        this.dialogueBox = this.scene.add.image(0, 0, dialogueBoxKey).setAlpha(1).setOrigin(0.5, 0.5);
        this.purpleDialogueBox = this.scene.add.image(0, 0, purpleDialogueKey).setAlpha(1).setOrigin(0.5, 0.5);
        this.dialogueBoxContainer.add(this.dialogueBox);
        this.dialogueBoxContainer.add(this.purpleDialogueBox);
        this.textObj = this.scene.add.text(0, 0, 'TESTING',{
            fontSize: '45px',
            maxLines: 3,
            fixedWidth: this.dialogueBox.width-35,
            fixedHeight: this.dialogueBox.height-35,
            boundsAlignH: 'right',
            boundsAlignV: 'top',
            wordWrap: {width: this.dialogueBox.width-35}
        }).setOrigin(0.5, 0.5);
        this.dialogueBoxContainer.add(this.textObj);
        this.dialogueBoxContainer.alpha = 0;
        this.playing = false;
        this.maxCharPerLine = 25;
        this.click = false;
        this.waitNextClick = false;
        this.framesClicked = 0;
        this.scene.input.on('pointerdown', ()=>{ this.click = true; });
        this.scene.input.on('pointerup', ()=>{ this.click = false; this.waitNextClick = false; this.framesClicked = 0; });
    }
    
    playDialogue(dialogue, preprocess=true, purple=false, onComplete=()=>{})
    {
        if(this.playing) return false;
        this.playing = true;
        this.dialogueBoxContainer.alpha = 1;
        this.purpleDialogueBox.alpha = purple;
        this.dialogueBox.alpha = !purple;
        
        this.writeDialogue(dialogue.text, dialogue.delays, preprocess, dialogue.item, purple, onComplete);
        this.scene.events.emit('freezeInput', true);
        
        return true;
    }

    onDialogueComplete(onComplete=()=>{})
    {
        console.log("dialogue complete");
        this.playing = false;
        this.scene.events.emit('freezeInput', false );
        this.dialogueBoxContainer.alpha = 0;
        onComplete();
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
            let lastNewLineI = -1;
            for(let i = (startingI+this.maxCharPerLine); i >= startingI; i--)
            {
                if(text[i] == '\n')
                {
                    lastNewLineI = i;
                    break;
                }
            }
            if(lastNewLineI >= 0)
            {
                outputText += (text.substring(startingI, lastNewLineI) + "\n");
                startingI = lastNewLineI+1;
            }
            else if(startingI+this.maxCharPerLine >= text.length)
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

    async writeDialogue(text, delays, preprocess, item=null, purple=false, onComplete=()=>{}){
        let lineCount = 0;
        let currDelay = 0;
        let delayTime = 50;
        this.framesClicked = 0;
        if(preprocess)
        {
            console.log("Hi");
            text = this.preprocessText(text);
        }
        let textProgress = "";
        AudioManager.getInstance(this.scene).addSfx(purple ? 'purpleDAudio' : 'npcAudio', purple ? 4 : 1, true, 1.5);
        for (let i = 0; i < text.length; i++){
            if(currDelay < delays.length && i+1 == delays[currDelay].charI)
            {
                delayTime = delays[currDelay].delay;
                currDelay++;
            }
            textProgress += text[i];
            this.textObj.setText(textProgress);
            if (text[i] == '\n'){
                lineCount++;
                if(lineCount % 3 == 0)
                {
                    AudioManager.getInstance(this.scene).stopSfx(purple ? 'purpleDAudio' : 'npcAudio');
                    while(!this.click || this.waitNextClick) await this.wait(1);
                    AudioManager.getInstance(this.scene).addSfx(purple ? 'purpleDAudio' : 'npcAudio', purple ? 5 : 1, true, 1.5);
                    textProgress = "";
                }
            }
            if(this.click)
            {
                this.framesClicked++;
                if(this.framesClicked > 5)
                {
                    delayTime = 15;
                }

                this.waitNextClick = true;
            }
            await this.wait(delayTime);
            delayTime = 50;
        }
        AudioManager.getInstance(this.scene).stopSfx(purple ? 'purpleDAudio' : 'npcAudio');
        console.log(item);
        if(item != null)
        {
            this.scene.player.addItem(new Item(this.scene, item));
        }
        while(!this.click || this.waitNextClick) await this.wait(1);
        this.onDialogueComplete(onComplete);
    }
}

export default DialogueManager

//https://knowyourmeme.com/memes/oo-ee-a-e-a-tiktok-sound
//https://www.youtube.com/watch?v=d-ePyjHkdN0