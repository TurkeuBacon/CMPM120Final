class Player extends Phaser.Sprite
{
    constructor(scene, x, y, texture, frame)
    {
        this.inventory = [];
        super(scene, x, y, texture, frame);
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


}