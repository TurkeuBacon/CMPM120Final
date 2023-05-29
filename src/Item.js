class Item extends Phaser.Sprite
{
    constructor(scene, x, y, frame, canPickup)
    {
        this.canPickup = canPickup;
        super(scene, x, y, frame);
    }
}