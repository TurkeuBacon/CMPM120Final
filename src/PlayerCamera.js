class PlayerCamera
{
    constructor(scene, target){
        this.scene = scene;
        this.target = target;
        this.scene.cameras.main.startFollow(this.target);
        this.scene.cameras.main.setZoom(2);
    }
}

export default PlayerCamera;