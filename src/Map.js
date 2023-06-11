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
        this.cm = this.scene.cameraManager;
    }
    showMap(camX, camY){
        this.group.setVisible(true);
        this.mapImage.setVisible(true);
        if (this.mapName.includes("Int") && this.scene.player.x){
            //this.cm.playerCamera.stopFollowing();
            //this.cm.playerCamera.setScroll(camX, camY);
        } else {
            this.cm.playerCamera.startFollowing();
        }
        this.cm.playerCamera.setBounds(this.mapImage.x - this.mapImage.width/2, this.mapImage.y - this.mapImage.height/2, this.mapImage.width, this.mapImage.height);
        let children = this.group.getChildren();
        //WEIRD
            children.forEach((child) => { 
                console.log("being enabled");
                this.scene.physics.world.enable(child);
            });
        //an initial call to hitboxes if not called yet. Here to prevent reuse.
        if (this.initialized == false){
            console.log("initialized");
            this.initializeZone();
            this.initialized = true;
        } else {
            children.forEach((child) => {
                console.log("being enabled");
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
    Vanish(nextMap, vanishTime, camX, camY){
        const blackScreen = this.scene.add.rectangle(
            this.scene.game.canvas.width /2,
            this.scene.game.canvas.height /2,
            this.scene.game.canvas.width,
            this.scene.game.canvas.height,
            0x000000
        );
        this.scene.events.emit('freezeInput', true);
        this.scene.cameraManager.addUI(blackScreen);
        blackScreen.setDepth(10);
        blackScreen.alpha = 0;
        this.scene.tweens.add({
            targets: blackScreen,
            alpha: 1,
            duration: vanishTime,
            onComplete: () => {
                this.visible = false;
                this.group.setVisible(false);
                let i = 0;
                let children = this.group.getChildren();
                children.forEach((child) => { 
                    i++;
                    console.log(this.mapName + i);
                    this.scene.physics.world.disable(child);
                });
                this.mapImage.setVisible(false);
                blackScreen.setVisible(false);
                nextMap.showMap(camX, camY);
                return true;
            }
        });
        console.log("Vanished Finished");
    }
    initializeZone(){
        //console.log(this.mapName);
        switch (this.mapName){
            case "Present Day":
                //town hall
                this.addHitbox(518, 210, 50, 20, "PresentDayInt", 998, 349, 466, -80);
                this.addHitbox(-16, 178, 40, 20, "PresentDayInt", -84, 329);
                this.addHitbox(1000, 185, 70, 20, "PresentDayInt", 527, 244);
                this.addHitbox(986, 795, 50, 20, "PresentDayInt", 879, 811);
                this.addHitbox(71, 790, 50, 20, "PresentDayInt", 97, 814);
                this.addHitbox(-220, 400, 30, 1000, "Initial Park", 1122, 538, false, true);
                //Bounds Initialization
                this.addBounds(500, 950, 1500, 50, "Present Day");
                this.addBounds(1218, 473, 50, 1500, "Present Day");
                this.addBounds(501, -48, 1500, 50, "Present Day");
                this.addBounds(-175, 690, 50, 500, "Present Day");
                    //Library
                this.addBounds(44, 139, 266, 100,"Present Day");
                    //house
                this.addBounds(47, 755, 295, 90,"Present Day");
                    //Home Repo
                this.addBounds(1002, 135, 355, 115, "Present Day");
                    //Town Hall
                this.addBounds(520, 170, 350, 90, "Present Day");
                    //House
                this.addBounds(956, 760, 295, 90, "Present Day");

                
                break;
            case "PresentDayInt":
                this.addHitbox(998, 375, 50, 20, "Present Day", 514, 240);
                this.addHitbox(-84, 355, 50, 20, "Present Day", -16, 206);
                this.addHitbox(525, 272, 50, 20, "Present Day", 1001, 212);
                this.addHitbox(879, 850, 50, 20, "Present Day", 976, 825);
                this.addHitbox(97, 843, 50, 20, "Present Day", 71, 816);
                break;
            case "Initial Park":
                this.addHitbox(1160, 364, 20, 1000, "Present Day", -193, 339, false, true);
                //BOUNDS
                this.addBounds(443, 665, 2000, 20, "Initial Park");
                this.addBounds(1140, -520, 50, 1000, "Initial Park");
                this.addBounds(530, -340, 2000, 50, "Initial Park");
                this.addBounds(-100, 75, 50, 2000, "Initial Park");
                break;
            case "1700s Park":
                this.addHitbox(1160, 364, 20, 1000, "1700s", -193, 339, false, true);
                this.addBounds(443, 665, 2000, 20, "1700s");
                this.addBounds(1140, -520, 50, 1000, "1700s");
                this.addBounds(530, -340, 2000, 50, "1700s");
                this.addBounds(-100, 75, 50, 2000, "1700s");
                break;
            case "1700s":
                console.log("when here for some reason");
                //Town
                this.addHitbox(518, 210, 50, 20, "1700sInt", 786, 255);
                //library
                this.addHitbox(-16, 178, 40, 20, "1700sInt", -26, 331);
                //this.addHitbox(1000, 185, 70, 20, "PresentDayInt", 527, 244);
                //House Bottom Right
                this.addHitbox(986, 795, 50, 20, "1700sInt", 923, 801);
                //House Bottom Left
                this.addHitbox(71, 790, 50, 20, "1700sInt", 205, 818);
                this.addHitbox(-220, 354, 30, 1000, "1700s Park", 1122, 538, false, true);
                this.addBounds(500, 950, 1500, 50, "1700s");
                this.addBounds(1218, 473, 50, 1500, "1700s");
                this.addBounds(501, -48, 1500, 50, "1700s");
                this.addBounds(-175, 690, 50, 500, "1700s");
                    //Library
                this.addBounds(44, 139, 266, 100,"1700s");
                    //house
                this.addBounds(47, 755, 295, 90,"1700s");
                    //Town Hall
                this.addBounds(520, 170, 350, 90, "1700s");
                    //House
                this.addBounds(956, 760, 295, 90, "1700s");
                break;
            case "1700sInt":
                this.addHitbox(785, 287, 50, 20, "1700s", 518, 240);
                this.addHitbox(-29, 359, 50, 20, "1700s", -20, 210);
                this.addHitbox(200, 850, 50, 20,"1700s", 71, 820);
                this.addHitbox(920, 839, 50, 20, "1700s", 986, 830);
                break;
            case "1960s":
                //Town hall
                this.addHitbox(518, 210, 50, 20, "SixtiesInt", 998, 349);
                //library
                this.addHitbox(-16, 178, 40, 20, "SixtiesInt", -84, 329);
                //this.addHitbox(1000, 185, 70, 20, "PresentDayInt", 527, 244);
                //House Bottom Right
                this.addHitbox(-220, 354, 30, 1000, "Sixties Park", 1122, 538, false, true);
                this.addHitbox(986, 795, 50, 20, "SixtiesInt", 879, 811);
                //House Bottom Left
                this.addHitbox(71, 790, 50, 20, "SixtiesInt", 97, 811);
                this.addBounds(500, 950, 1500, 50, "1700s");
                this.addBounds(1218, 473, 50, 1500, "1700s");
                this.addBounds(501, -48, 1500, 50, "1700s");
                this.addBounds(-175, 690, 50, 500, "1700s");
                    //Library
                this.addBounds(44, 139, 266, 100,"1700s");
                    //house
                this.addBounds(47, 755, 295, 90,"1700s");
                    //Town Hall
                this.addBounds(520, 170, 350, 90, "1700s");
                    //House
                this.addBounds(956, 760, 295, 90, "1700s");
                
                break;
            case "SixtiesInt":
                this.addHitbox(998, 375, 50, 20, "1960s", 514, 240);
                this.addHitbox(-84, 355, 50, 20, "1960s", -16, 206);
                this.addHitbox(525, 272, 50, 20, "1960s", 1001, 212);
                this.addHitbox(97, 843, 50, 20, "1960s", 71, 816);
                this.addHitbox(879, 850, 50, 20, "1960s", 976, 825);
                break;
            case "Sixties Park":
                this.addBounds(443, 665, 2000, 20, "Initial Park");
                this.addBounds(1140, -520, 50, 1000, "Initial Park");
                this.addBounds(530, -340, 2000, 50, "Initial Park");
                this.addBounds(-100, 75, 50, 2000, "Initial Park");
                this.addHitbox(1160, 364, 20, 1000, "1960s", -193, 339, false, true);
                break;
        }
    }
    addHitbox(x,y, width, height, mapName, destX, destY, camX=0, camY=0, keepX=false, keepY=false){
        let hitBox = new Hitbox(this.scene, x, y, width, height, mapName, destX, destY, camX, camY, keepX, keepY);
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