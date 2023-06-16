import Task from "./Task.js"

class Player extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y, texture, frame, inputDevice, aKey)
    {
        super(scene, x, y, texture, frame);
        this.inventory = [];
        this.playerSpeed = 170;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setImmovable(false);
        this.body.onCollide = true;
        this.scene.events.on('update', (time, delta) => { this.update(time, delta)} );
        this.keys = scene.input.keyboard.addKeys('W,A,S,D');
        this.sprintKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);  // Get key object
        this.inputDevice = inputDevice;
        let canvas = scene.sys.game.canvas;
        //we want to add a circle here
        this.interractionButton = this.scene.add.sprite(canvas.width-200, canvas.height-170, aKey).setAlpha(1).setDisplaySize(175, 175);
        this.interractionButton.setInteractive();
        this.interractionButton.on('pointerdown', (pointer, gameObject) =>
        {
            this.interractionButton.setFrame(1);
            this.scene.events.emit('playerInterractDown');
        });
        this.disableInput = false;
        this.scene.events.on('freezeInput', (freeze) => {
            this.disableInput = freeze;
            this.interractionButton.setVisible(!freeze).setActive(!freeze).setFrame(0);
        });
        this.interractionButton.on('pointerup', (pointer, gameObject) =>
        {
            this.interractionButton.setFrame(0);
            this.scene.events.emit('playerInterractUp');
        });
        this.scene.input.on('pointerup', () => {
            this.interractionButton.setFrame(0);
        });
        this.scene.cameraManager.addUI(this.interractionButton);

        this.taskBox = scene.add.image(0, 0, 'taskHub', 1);
        this.taskBox.setPosition(canvas.width-this.taskBox.displayWidth, 0).setOrigin(0, 0);
        //this.taskBox = scene.add.rectangle(canvas.width-taskBoxSize.w, 0, taskBoxSize.w, taskBoxSize.h, 0x00aaff, 0.5).setOrigin(0, 0);
        this.taskText = scene.add.text(canvas.width - this.taskBox.displayWidth/2, this.taskBox.displayHeight/2, "No Task",{
            fontSize: '25px',
            wordWrap: {width: this.taskBox.displayWidth-10}
        }).setOrigin(.5, .5);
        this.taskText.alpha = 0;
        this.taskBox.alpha = 0;
        this.scene.cameraManager.addUI(this.taskBox);
        this.scene.cameraManager.addUI(this.taskText);

        //this.setTask(new Task('TreeBook', "Research the extinct tree.\n\nThere could be some info at the Library", null));

        this.anims.create(
            {
                key: 'walk_up',
                frameRate: 4,
                frames: scene.anims.generateFrameNumbers('player', {start: 8, end: 11}),
                repeat: -1
            });
        this.anims.create(
            {
                key: 'walk_down',
                frameRate: 4,
                frames: scene.anims.generateFrameNumbers('player', {start: 0, end: 3}),
                repeat: -1
            });
        this.anims.create(
            {
                key: 'walk_left',
                frameRate: 4,
                frames: scene.anims.generateFrameNumbers('player', {start: 12, end: 15}),
                repeat: -1
            });
        this.anims.create(
            {
                key: 'walk_right',
                frameRate: 4,
                frames: scene.anims.generateFrameNumbers('player', {start: 4, end: 7}),
                repeat: -1
            });

        this.horizontalSpeed = 0;
        this.verticalSpeed = 0;
    }

    setTask(task) {
        if(task == null || task == undefined)
        {
            this.scene.add.tween({
                targets: [this.taskBox, this.taskText],
                duration: 1000,
                alpha: 0
            });
        }
        else
        {
            this.scene.add.tween({
                targets: [this.taskBox, this.taskText],
                duration: 1000,
                alpha: 1
            });
            console.log("Setting Task: " + task.text);
            this.taskText.setText(task.text);
            this.task = task;
        }
    }

    addItem(item)
    {
        console.log("Aquired: " + item.itemKey);
        this.inventory.push(item);
        item.setVisible(false);
        item.setActive(false);
        this.scene.cameraManager.addUI(item);
        this.scene.physics.world.disable(item);
        if(this.task != null && this.task.itemKey == item.itemKey)
        {
            console.log("next task");
            //Todo: task completed stuff
            this.setTask(this.task.nextTask);
        }
        else if(item.task != null && item.task != undefined)
        {
            console.log("PLEASE");
            this.setTask(Task.loadTask(item.task));
        }
        this.placeItems();
    }
    
    placeItems()
    {
        let itemSize = 48;
        let itemCount = 0;
        let nextXOffset = 0;
        let nextYOffset = 10;
        this.inventory.forEach(element => {
            if(!element.metaphysical)
            {
                element.setVisible(true);
                element.setOrigin(0, 0).setPosition(this.taskBox.x + nextXOffset, this.taskBox.displayHeight + nextYOffset).setDisplaySize(itemSize, itemSize).setDepth(1);
                nextXOffset += (10 + itemSize);
                if(nextXOffset > (this.taskBox.displayWidth - itemSize - 10))
                {
                    nextXOffset = 0;
                    nextYOffset += itemSize + 10;
                }
                itemCount++;
            }
        });
    }

    hideInventory()
    {
        this.inventory.forEach(element => {
        if(!element.metaphysical)
        {
            element.setVisible(false);
        }
    });
    }

    hasItem(itemKey)
    {
        let returnVal = false;
        this.inventory.forEach(element => {
            console.log("Item: " + element.itemKey + " | " + itemKey + ": " + (element.itemKey == itemKey));
            console.log("Checking " + element.itemKey + ": " + element.itemKey == itemKey);
            if(element.itemKey == itemKey)
            {
                console.log("returning true");
                returnVal = true;
                return true;
            }
        });
        return returnVal;
    }
    hasNumItems(itemKey, num)
    {
        let count = 0;
        this.inventory.forEach(element => {
            console.log("Item: " + element.itemKey + " | " + itemKey + ": " + (element.itemKey == itemKey));
            if(element.itemKey == itemKey)
            {
                console.log("returning true");
                count++;
            }
        });
        return count >= num;
    }

    removeItem(itemKey)
    {
        for(let i = 0; i < this.inventory.length; i++)
        {
            if(this.inventory[i].itemKey == itemKey)
            {
                console.log("Removing: " + this.inventory[i].itemKey);
                let item = this.inventory[i];
                this.inventory.splice(i, 1);
                let arrStr = "";
                this.inventory.forEach(element => {
                    arrStr += element.itemKey + ", ";
                });
                console.log("Removed: " + item.itemKey + " new inventory: " + arrStr);
                item.setActive(false);
                item.setVisible(false);
                break;
            }
        }
        this.placeItems();
    }
    
    update(){
        this.handleMovement();
    }
    handleMovement(){
        this.body.setVelocity(0);
        let multiplier = 1;
        if(this.sprintKey.isDown)
        {
            multiplier = 4;
        }

        switch(this.inputDevice.direction)
        {
            case "neutral":
                this.verticalSpeed = 0;
                this.horizontalSpeed = 0;
                if(!this.disableInput)
                {
                    if(this.anims.currentAnim != null) this.anims.setCurrentFrame(this.anims.currentAnim.getFrameByProgress(1));
                    this.anims.stop();
                }
                this.verticalSpeed = 0;
                this.horizontalSpeed = 0;
                break;
            case "up":
                this.verticalSpeed = -this.playerSpeed * multiplier;
                this.horizontalSpeed = 0;
                this.play('walk_up', true);
                break;
            case "down":
                this.verticalSpeed = this.playerSpeed * multiplier;
                this.horizontalSpeed = 0;
                this.play('walk_down', true);
                break;
            case "left":
                this.verticalSpeed = 0;
                this.horizontalSpeed = -this.playerSpeed * multiplier;
                this.play('walk_left', true);
                break;
            case "right":
                this.verticalSpeed = 0;
                this.horizontalSpeed = this.playerSpeed * multiplier;
                this.play('walk_right', true);
                break;
        }

        this.body.setVelocity(this.horizontalSpeed, this.verticalSpeed);
    }

}
export default Player;