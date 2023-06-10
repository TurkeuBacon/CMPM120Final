//Needs to hold map data (Image, group association)
//implement Hitbox functionality
import Hitbox from "./Hitbox.js";
import Bounds from "./Bounds.js";
class Map {
    constructor(scene, mapName, mapImage, group){
        this.scene = scene;
        this.mapName = mapName;
        this.group = group;
        this.mapImage = mapImage;
        this.visible = false;
        this.initialized = false;
    }
    showMap(){
        this.group.setVisible(true);
        this.mapImage.setVisible(true);
        let children = this.group.getChildren();
            children.forEach((child) => { 
                this.scene.physics.world.enable(child);
            });
        //an initial call to hitboxes if not called yet. Here to prevent reuse.
        if (this.initialized == false){
            this.initializeZone();
            this.initialized = true;
        } else {
            children.forEach((child) => {
                this.scene.physics.world.enable(child);
            });
        }
        this.visible = true;
        this.scene.events.emit('freezeInput', false);
        
        return this.visible;
    }
    VanishInstant(){
        this.visible = false;
        this.group.setVisible(false);
        this.mapImage.setVisible(false);
    }
    Vanish(nextMap, vanishTime){
        const blackScreen = this.scene.add.rectangle(
            this.scene.game.canvas.width /2,
            this.scene.game.canvas.height /2,
            this.scene.game.canvas.width,
            this.scene.game.canvas.height,
            0x000000
        );
        this.scene.events.emit('freezeInput', true);
        this.scene.cameraManager.addUI(blackScreen);
        blackScreen.setDepth(2);
        blackScreen.alpha = 0;
        this.scene.tweens.add({
            targets: blackScreen,
            alpha: 1,
            duration: vanishTime,
            onComplete: () => {
                this.visible = false;
                this.group.setVisible(false);
                let children = this.group.getChildren();
                children.forEach((child) => {
                    console.log("hello"); 
                    this.scene.physics.world.disable(child);
                });
                this.mapImage.setVisible(false);
                blackScreen.setVisible(false);
                nextMap.showMap();
                return true;
            }
        }); 
    }
    initializeZone(){
        //console.log(this.mapName);
        switch (this.mapName){
            case "Present Day":
                this.addHitbox(518, 174, 50, 20, "PresentDayInt", 998, 349);
                this.addHitbox(-16, 178, 40, 20, "PresentDayInt", -84, 329);
                this.addHitbox(1000, 180, 70, 20, "PresentDayInt", 527, 244);
                this.addHitbox(986, 790, 50, 20, "PresentDayInt", 879, 811);
                this.addHitbox(71, 785, 50, 20, "PresentDayInt", 97, 814);
                this.addHitbox(-220, 354, 30, 1000, "Initial Park", 1122, 538, false, true);
                //Bounds Initialization
                this.addBounds(500, 950, 1500, 50, "Present Day");
                this.addBounds(1218, 473, 50, 1500, "Present Day");
                this.addBounds(501, -115, 1500, 50, "Present Day");
                break;
            case "PresentDayInt":
                this.addHitbox(998, 375, 50, 20, "Present Day", 514, 203);
                this.addHitbox(-84, 355, 50, 20, "Present Day", -16, 206);
                this.addHitbox(525, 272, 50, 20, "Present Day", 1001, 208);
                this.addHitbox(879, 850, 50, 20, "Present Day", 976, 816);
                this.addHitbox(95, 842, 50, 20, "Present Day", 71, 813);
                break;
            case "Initial Park":
                this.addHitbox(1160, 364, 20, 1000, "Present Day", -193, 339, false, true);
                
        }
    }
    //used to make our hitbox gone when needed (by associating it with group)
    addHitbox(x,y, width, height, mapName, destX, destY, keepX=false, keepY=false){
        let hitBox = new Hitbox(this.scene, x, y, width, height, mapName, destX, destY, keepX, keepY);
        this.group.add(hitBox);
        return hitBox;
    }
    addBounds(x, y, width, height, mapName){
        let bound = new Bounds (this.scene, x, y, width, height, mapName);
        this.group.add(bound); 
    }
    getName(){
        return this.mapName;
    }
}

export default Map;