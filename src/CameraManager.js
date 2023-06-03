import Player from "./Player.js";
import PlayerCamera from "./PlayerCamera.js";

class CameraManager {
    constructor(){
        this.playerCamera;
        this.hudCamera;
        this.ModernDayCamera;
        this.NinetiesCamera;
        this.SeventeenHCamera;
    }
    assignCamera(camerasItem){
        if (camerasItem instanceof PlayerCamera){
            this.playerCamera = camerasItem;
        } else {
            console.error("Invalid camera item.");
        }
    }
}

export default CameraManager;