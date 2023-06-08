//we want this to display text given an interaction.

//We want it to hold the text pertaining to said interaction.

//Given a word count limit (Which will be decided by testing), we will split it so that only a certain amount of text is shown at a time.

//Once the dialogue is over, we will make the box go away


class Dialogue {
    constructor(Text){
        this.Text = Text;
        this.TextNum = 20;
        this.Count = 0;
    }
    
}

export default Dialogue;