class Phone {
    constructor(scene, phoneImage, cameraManager){
        this.scene = scene;
        this.phone = phoneImage;
        //this.phone.alpha = 0;
        this.cm = cameraManager;
        this.cm.addUI(this.phone);
    }
}

export default Phone;