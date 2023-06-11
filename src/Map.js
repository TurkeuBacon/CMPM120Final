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
            this.cm.playerCamera.useBounds = false;
        } else {
            this.cm.playerCamera.startFollowing();
            this.cm.playerCamera.useBounds = true;
            this.cm.playerCamera.setBounds(this.mapImage.x - this.mapImage.width/2, this.mapImage.y - this.mapImage.height/2, this.mapImage.width, this.mapImage.height);
        }
        
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
                this.addHitbox(518, 210, 50, 20, "PresentDayInt", 998, 349, 490, -110);
                //library
                this.addHitbox(-16, 178, 40, 20, "PresentDayInt", -84, 329, -466, -165);
                //home repo
                this.addHitbox(1000, 185, 70, 20, "PresentDayInt", 527, 244, 15, -246);
                //house bottom right
                this.addHitbox(986, 795, 50, 20, "PresentDayInt", 879, 811, 328, 355);
                //house bottom left
                this.addHitbox(71, 790, 50, 20, "PresentDayInt", 97, 814, -463, 338);
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
                this.addHitbox(-84, 355, 100, 20, "Present Day", -16, 206);
                this.addHitbox(525, 272, 50, 20, "Present Day", 1001, 212);
                this.addHitbox(879, 850, 50, 20, "Present Day", 976, 825);
                this.addHitbox(97, 843, 50, 20, "Present Day", 71, 816);
                //townhall present day interior
                this.addBounds(895,300,55,46,"Present Day"); //townhall table 1
                this.addBounds(1120,296,55,46,"Present Day"); //townhall table 2
                this.addBounds(1007,260,50,30,"Present Day"); //townhall front desk
                this.addBounds(1010,190,350,20,"Present Day"); //townhall interior upper bound
                this.addBounds(1010,400,350,20,"Present Day"); //townhall interior lower bound
                this.addBounds(1198,308,32,236,"Present Day");//townhall interior right bound
                this.addBounds(813,284,32,236,"Present Day"); //townhall interior left bound
                //library present day interior
                this.addBounds(-140,170,29,420,"Present Day");//Library interior left bound
                this.addBounds(200,170,29,420,"Present Day");//Library interior right bound
                this.addBounds(0,130,350,20,"Present Day");//Library interior upper bound
                this.addBounds(-65,162,68,24,"Present Day"); //Library bookcase 1
                this.addBounds(32.5,156,80,35,"Present Day"); //Library bookcase 2
                this.addBounds(120,165,69,25,"Present Day"); //Library Bookcase 3
                this.addBounds(-35,285,27,109,"Present Day");//Library Table
                this.addBounds(154,220,42,15,"Present Day");//Library Couch Arm 1
                this.addBounds(157,278,42,22,"Present Day");//Library Couch Arm 2
                this.addBounds(167,243,23,43,"Present Day");//Library Couch Back
                this.addBounds(69,300,60,22,"Present Day");//Library Lower Bounds 1
                this.addBounds(69,322,92,22,"Present Day");//Library Lower Bounds 2
                this.addBounds(69,344,172,22,"Present Day");//Library Lower Bounds 3
                this.addBounds(69,366,217,22,"Present Day");//Library Lower Bounds 4
            //home repo present day interior
                this.addBounds(320,150,30,278,"Present Day");//Home Repo Left Bound
                this.addBounds(730,150,30,278,"Present Day");//Home Repo Right Bound
                this.addBounds(520,30,380,80,"Present Day");//Home Repo Upper Bound
                this.addBounds(520,330,380,80,"Present Day");//Home Repo Lower Bound
                this.addBounds(660,85,110,10,"Present Day");//Home Repo First Row End Table
                this.addBounds(660,135,110,10,"Present Day");//Home Repo Second Row End Table
                this.addBounds(660,185,110,10,"Present Day");//Home Repo Third Row End Table
                this.addBounds(365,85,44,21,"Present Day");//Home Repo Cabinet 1
                this.addBounds(420,85,44,21,"Present Day");//Home Repo Cabinet 2
                this.addBounds(485,85,44,21,"Present Day");//Home Repo Cabinet 3
                this.addBounds(540,85,44,21,"Present Day");//Home Repo Cabinet 4
                this.addBounds(395,150,105,5,"Present Day");//Home Repo Flower Row 
                this.addBounds(395,250,105,12,"Present Day");//Home Repo Planter Row 1
                this.addBounds(395,200,105,12,"Present Day");//Home Repo Planter Row 2
                this.addBounds(700,230,42,1,"Present Day");//Home Repo Couch Arm 1
                this.addBounds(700,273,42,8,"Present Day");//Home Repo Couch Arm 2
                this.addBounds(720,243,23,37,"Present Day");//Home Repo Couch Back
             //Bottom Left House present day interior
                this.addBounds(-160,645,29,420,"Present Day");//Left House Left Bound
                this.addBounds(285,645,29,420,"Present Day");//Left House Right Bound
                this.addBounds(105,675,490,20,"Present Day");//Left House Upper Bound
                this.addBounds(95,863,490,20,"Present Day");//Left House Lower Bound
                this.addBounds(225,675,102,46,"Present Day");//Left House Kitchen
                this.addBounds(90,710,44,44,"Present Day");//Left House Table
                this.addBounds(-5,730,30,65,"Present Day"); //Left House Flower Table / Middle wall upper section
                this.addBounds(-5,850,30,30,"Present Day"); //Left House Flower Table / Middle wall lower section
                this.addBounds(-95,740,80,10,"Present Day");//Left House Bed
                this.addBounds(170,825,8,37,"Present Day");//Left House Couch Back
            //Bottom Right House present day interior
            //-25
            this.addBounds(620,645,29,420,"Present Day");//Left House Left Bound
                this.addBounds(1085-15,645,29,420,"Present Day");//Left House Right Bound
                this.addBounds(905-15,675,490,20,"Present Day");//Left House Upper Bound
                this.addBounds(895-15,863,490,20,"Present Day");//Left House Lower Bound
                this.addBounds(1025-15,675,102,46,"Present Day");//Left House Kitchen
                this.addBounds(890-15,710,44,44,"Present Day");//Left House Table
                this.addBounds(795-15,730,30,65,"Present Day"); //Left House Flower Table / Middle wall upper section
                this.addBounds(795-15,850,30,30,"Present Day"); //Left House Flower Table / Middle wall lower section
                this.addBounds(705-15,740,80,10,"Present Day");//Left House Bed
                this.addBounds(970-15,825,8,37,"Present Day");//Left House Couch Back




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
                this.addHitbox(518, 210, 50, 20, "1700sInt", 810, 265, 274, -233);
                //library
                this.addHitbox(-16, 178, 40, 20, "1700sInt", -7, 264);
                //this.addHitbox(1000, 185, 70, 20, "PresentDayInt", 527, 244);
                //House Bottom Right
                this.addHitbox(986, 795, 50, 20, "1700sInt", 878, 810);
                //House Bottom Left
                this.addHitbox(71, 790, 50, 20, "1700sInt", 140, 818);
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
                this.addHitbox(805, 295, 50, 20, "1700s", 518, 240);
                this.addHitbox(-14, 295, 50, 20, "1700s", -20, 210);
                this.addHitbox(140, 850, 50, 20,"1700s", 71, 820);
                this.addHitbox(878, 839, 50, 20, "1700s", 986, 828);
                break;
            case "1960s":
                //Town hall
                this.addHitbox(518, 210, 50, 20, "SixtiesInt", 998, 349, 490, -110);
                //library
                this.addHitbox(-16, 178, 40, 20, "SixtiesInt", -84, 329, -466, -165);
                //this.addHitbox(1000, 185, 70, 20, "PresentDayInt", 527, 244);
                //House Bottom Right
                this.addHitbox(-220, 354, 30, 1000, "Sixties Park", 1122, 538, false, true);
                this.addHitbox(986, 795, 50, 20, "SixtiesInt", 879, 811, 328, 355);
                //House Bottom Left
                this.addHitbox(71, 790, 50, 20, "SixtiesInt", 97, 811, -463, 338);
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