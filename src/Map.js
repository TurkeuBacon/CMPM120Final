//Needs to hold map data (Image, group association)
//implement Hitbox functionality
import Hitbox from "./Hitbox.js";

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
            this.initializeHitboxes();
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
    initializeHitboxes(){
        //console.log(this.mapName);
        switch (this.mapName){
            case "Present Day":
                this.addHitbox(518, 174, 50, 20, "PresentDayInt", 998, 349);
                this.addHitbox(-14, 178, 50, 20, "PresentDayInt", -84, 329);
                this.addHitbox(997, 180, 100, 20, "PresentDayInt", 527, 244);
                break;
            case "PresentDayInt":
                this.addHitbox(998, 375, 50, 20, "Present Day", 514, 203);
                this.addHitbox(-84, 355, 50, 20, "Present Day", -16, 206);
                this.addHitbox(525, 272, 50, 20, "Present Day", 1001, 208);
                
        }
    }
    //used to make our hitbox gone when needed (by associating it with group)
    addHitbox(x,y, width, height, mapName, destX, destY){
        let hitBox = new Hitbox(this.scene, x, y, width, height, mapName, destX, destY);
        this.group.add(hitBox);

        return hitBox;
    }
    
    getName(){
        return this.mapName;
    }
}

export default Map;