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
    }
    showMap(){
        this.group.setVisible(true);
        this.mapImage.setVisible(true);
        let children = this.group.getChildren();
            children.forEach((child) => { 
                this.scene.physics.world.enable(child);
            });
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
        console.log(this.mapName);
        switch (this.mapName){
            case "Present Day":
                this.addHitbox(528,160, 100, 50, "PresentDayInt", 794, 767);
                this.addHitbox(-14, 169, 50, 20, "PresentDayInt", -75, 786);
                this.addHitbox(999, 187, 50, 20, "PresentDayInt", 817, 252);
                break;
            case "PresentDayInt":
                this.addHitbox(794, 800, 100, 20, "Present Day", 516, 216);
                this.addHitbox(-75, 820, 50, 20, "Present Day", -15, 198);
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