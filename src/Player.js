import Task from "./Task.js"

class Player extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y, texture, frame, inputDevice, aKey)
    {
        super(scene, x, y, texture, frame);
        this.inventory = [];
        this.playerSpeed = 100;
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
        this.interractionButton = this.scene.add.sprite(canvas.width-200, canvas.height-170, aKey).setAlpha(1).setDisplaySize(200, 200);
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

        let taskBoxSize = {w: 400, h: 200}
        this.taskBox = scene.add.rectangle(canvas.width-taskBoxSize.w, 0, taskBoxSize.w, taskBoxSize.h, 0x00aaff, 0.5).setOrigin(0, 0);
        this.taskText = scene.add.text(canvas.width - this.taskBox.width/2, this.taskBox.height/2, "No Task",{
            fontSize: '30px',
            wordWrap: {width: this.taskBox.width-10}
        }).setOrigin(.5, .5);
        scene.cameraManager.addUI(this.taskBox);
        scene.cameraManager.addUI(this.taskText);

        this.setTask(new Task('TreeBook', "Research the extinct tree.\n\nThere could be some info at the Library", null));

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
            this.taskText.setText("No Task");
        }
        else
        {
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
        this.scene.physics.world.disable(item);
        if(this.task != null && this.task.itemKey == item.itemKey)
        {
            console.log("next task");
            //Todo: task completed stuff
            this.setTask(this.task.nextTask);
        }
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
                if(!this.disableInput)
                {
                    this.verticalSpeed = 0;
                    this.horizontalSpeed = 0;
                    this.stop();
                    this.setFrame(0);
                }
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