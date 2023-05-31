class Item extends Phaser.Sprite
{
    constructor(scene, x, y, frame, canPickup)
    {
        super(scene, x, y, frame);
        this.canPickup = canPickup;
        scene.add.existing(this);
    }
}