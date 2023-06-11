class PlayerCamera extends Phaser.Cameras.Scene2D.Camera
{
    constructor(scene, zoom=2, target=null){
        let canvas = scene.sys.game.canvas;
        super(0, 0, canvas.width, canvas.height);
        if(target != null)
        {
            this.setTarget(target);
        }
        this.setZoom(zoom);
    }

    setTarget(target)
    {
        this.stopFollow();
        this.target = target;
        this.startFollow(this.target);
    }
    stopFollowing(){
        this.stopFollow();
    }
    startFollowing(){
        this.startFollow(this.target);
    }
}

export default PlayerCamera;