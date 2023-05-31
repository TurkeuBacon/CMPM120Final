class Player extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y, texture, frame, inputDevice)
    {
        super(scene, x, y, texture, frame);
        this.inventory = [];
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.keys = scene.input.keyboard.addKeys('W,A,S,D');
        this.inputDevice = inputDevice;

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
        this.task = task;
    }

    pickupItem(item)
    {
        if(item.canPickup == false) return;
        this.inventory.push(item);
        item.setActive(false);
        if(task.item == item)
        {
            //Todo: task completed stuff
            this.task = task.nextTask;
        }
    }
    update(){
        this.handleMovement();
    }
    handleMovement(){
        this.body.setVelocity(0);

        switch(this.inputDevice.direction)
        {
            case "neutral":
                this.verticalSpeed = 0;
                this.horizontalSpeed = 0;
                this.stop();
                this.setFrame(0);
                break;
            case "up":
                this.verticalSpeed = -100;
                this.horizontalSpeed = 0;
                this.play('walk_up', true);
                break;
            case "down":
                this.verticalSpeed = 100;
                this.horizontalSpeed = 0;
                this.play('walk_down', true);
                break;
            case "left":
                this.verticalSpeed = 0;
                this.horizontalSpeed = -100;
                this.play('walk_left', true);
                break;
            case "right":
                this.verticalSpeed = 0;
                this.horizontalSpeed = 100;
                this.play('walk_right', true);
                break;
        }

        this.body.setVelocity(this.horizontalSpeed, this.verticalSpeed);
    }

}
export default Player;