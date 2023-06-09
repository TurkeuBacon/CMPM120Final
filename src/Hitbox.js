class Hitbox extends Phaser.GameObjects.Rectangle {
    
    constructor (scene, x, y, width, height, mapName, destX, destY){
        super(scene, x, y, width, height, 0x000000, 0);
        this.destX = destX;
        this.destY = destY;
        this.mapName = mapName;
        this.scene = scene;
        this.player = this.scene.player;

        this.setDepth(2);
        this.scene.events.on('update', (time, delta) => { this.update(time, delta)} );
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setImmovable(true);
        this.waitForNextCollision = false;
        this.scene.physics.add.collider(this.player, this, () => {
            if(this.waitForNextCollision) return;
            this.waitForNextCollision = true;
            this.scene.mapManager.loadingZone(this.mapName, this.destX, this.destY);
        });
    }

    update(time, delta)
    {
        if(!this.scene.physics.collide(this, this.player))
        {
            this.waitForNextCollision = false;
        }
    }
    //used to determine where each hitbox will take the user
    /*getCoords(){
        return this.coords;
    }*/


}

export default Hitbox;