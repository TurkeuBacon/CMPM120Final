import Player from "./Player.js";
import PlayerCamera from "./PlayerCamera.js";

class CameraManager
{
    constructor(scene, pCamZoom=2)
    {
        this.scene = scene;
        this.hudContainer = this.scene.add.container(-5000, -5000).setDepth(2);
        this.playerCamera = new PlayerCamera(this.scene, pCamZoom);
        this.scene.cameras.remove(this.scene.cameras.main);
        this.scene.cameras.addExisting(this.playerCamera, true);
        let canvas = this.scene.sys.game.canvas;
        this.hudCamera = this.scene.cameras.add(0, 0, canvas.width, canvas.height).setScroll(this.hudContainer.x, this.hudContainer.y);
    }

    setPlayerCameraTarget(target)
    {
        this.playerCamera.setTarget(target);
    }

    addUI(object)
    {
        this.hudContainer.add(object);
        return object;
    }
}

export default CameraManager;