class Bounds extends Phaser.GameObjects.Rectangle {
    constructor(scene, x, y, width, height, mapName){
        super(scene, x, y, width, height, 0x000000, 1);
        this.mapName = mapName;
        this.scene = scene;
        this.player = this.scene.player;
        this.setDepth(2);
        this.scene.physics.add.existing(this);
        this.body.setImmovable(true);
        this.scene.physics.add.collider(this.player, this, () => {
             // Calculate the player's previous position
            
            
        });
    }
}

export default Bounds;