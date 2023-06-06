class PlayerCamera extends Phaser.Camera
{
    constructor(scene, target, ){
        this.scene = scene;
        this.target = target;
        this.startFollow(this.target);
        this.setZoom(2);
    }
}

export default PlayerCamera;