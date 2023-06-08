class Hitbox extends Phaser.GameObjects.Rectangle {
    
    constructor (scene, x, y, mapName, destX, destY){
        super(x, y, 100, 100, 0x000000, 1);
        this.destX = destX;
        this.destY = destY;
        //mapName will take in the map the hitbox will send you to.
            //makes the most amount of sense. It will allow our player to traverse simply given that.
        this.mapName = mapName;
        this.scene = scene;
        this.player = this.scene.player;
        this.scene.add.existing(this);
        
        this.scene.physics.world.collide(this.player, this, () => {
            this.scene.mapManager.loadingZone(this.mapName, this.destX, this.destY);
        });
    }
    //used to determine where each hitbox will take the user
    /*getCoords(){
        return this.coords;
    }*/


}