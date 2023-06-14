//Needs to hold map data (Image, group association)
//implement Hitbox functionality
import Hitbox from "./Hitbox.js";
import Bounds from "./Bounds.js";
import Sign from "./Sign.js";
import Npc from "./Npc.js";
import Item from "./Item.js";
import AudioManager from "./AudioManager.js";
class Map {
    constructor(scene, mapName, mapImage, group, bad){
        this.Sign = Sign;
      //  this.badPark = this.add.image(this.scene.sys.game.width/2, this.scene.sys.game.width/2, bad);
        this.badPark = bad;
        console.log(this.badPark);
        this.badPark.setDepth(0);
        this.badparkHitbox;
        this.scene = scene;
        this.mapName = mapName;
        this.group = group;
        this.mapImage = mapImage;
        this.visible = false;
        this.initialized = false;
        this.cm = this.scene.cameraManager;
        this.scene.events.on('update', (time, delta) => { this.update(time, delta)} );
    }
    showMap(camX, camY){
        this.group.setVisible(true);
        this.mapImage.setVisible(true);
        if (this.mapName.includes("Int") && this.scene.player.x){
            this.cm.playerCamera.stopFollowing();
            this.cm.playerCamera.setScroll(camX, camY);
            this.cm.playerCamera.useBounds = false;
        } else {
            this.cm.playerCamera.startFollowing();
            this.cm.playerCamera.useBounds = true;
            this.cm.playerCamera.setBounds(this.mapImage.x - this.mapImage.width/2, this.mapImage.y - this.mapImage.height/2, this.mapImage.width, this.mapImage.height);
        }
        if(!this.scene.player.hasItem("Apartments Found") && this.mapName == "Present Day" && this.scene.player.hasItem("Plant Tree") && !this.scene.player.hasItem("Petition Completed"))
        {
            this.scene.player.addItem(new Item(this.scene, "Apartments Found"));
        }

        if (this.scene.player.hasItem("Apartments Found") && this.mapName == "Initial Park"){
            this.mapImage.setDepth(0);
            this.badPark.setDepth(1);
            this.badparkHitbox = this.addBounds(481,290,5000,5,"Initial Park");//apartment bounds
            for(let i = 0; i < 20; i++){
                setTimeout(() => {
                    this.scene.player.addItem(new Item(this.scene, "Depression"));
                  }, 1500*(i+1));
            }
            AudioManager.getInstance(this.scene).endAllSound();
            this.chaos = new Npc(this.scene, 'paranoia');
            this.chaos.playDialogue();
            //this.addItem('gottem');
            
            
        } else if (this.scene.player.hasItem('Depression')) {
            this.mapImage.setDepth(1);
            this.badPark.setDepth(0);
            //this. this.add.rectangle
        } else {
            this.mapImage.setDepth(1);
            this.badPark.setDepth(0);
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
        if (this.scene.player.hasItem("Depression")){
            this.god  = this.addNPC('deadGuy');
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
                this.addHitbox(-220, 400, 30, 1000, "Initial Park", 1122, 538,0, 0, false, true);
                //Bounds Initialization
                this.addBounds(500, 950, 1500, 50, "Present Day");
                this.addBounds(1218, 473, 50, 1500, "Present Day");
                this.addBounds(501, -48, 1500, 50, "Present Day");
                this.addBounds(-175, 7, 50, 500, "Present Day");
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

                //this.addItem('dose of revenge');
                //NPC
                this.addNPC('Susan');
                this.addNPC('Janet');
                this.addNPC('Gabe');
                this.addNPC('Lovely');
                this.addNPC('Paradox');
                this.addNPC('Ryan');
                
                //this.addNPC(1000, 750, 'girl5');
              //  this.addItem('Apartments Found');
                
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
                
            //NPCS
                this.addNPC('Oscar');
                this.addNPC('Ron');
                this.addNPC('Mayor');
                
            //Items
                this.addItem('Water Can');
                this.addItem('Tree Book');
                this.addItem('Apartments Found');


                break;
            case "Initial Park":
                this.addHitbox(1160, 364, 20, 1000, "Present Day", -193, 339, 0, 0, false, true);
                //BOUNDS
                this.addBounds(443, 665, 2000, 20, "Initial Park");
                this.addBounds(1140, -520, 50, 1000, "Initial Park");
                this.addBounds(530, -340, 2000, 50, "Initial Park");
                this.addBounds(-100, 75, 50, 2000, "Initial Park");
                //NPC
                
                break;
            case "1700s Park":
                this.addHitbox(1160, 364, 20, 1000, "1700s", -193, 339, 0, 0, false, true);
                this.addBounds(443, 665, 2000, 20, "1700s");
                this.addBounds(1140, -520, 50, 1000, "1700s");
                this.addBounds(530, -340, 2000, 50, "1700s");
                this.addBounds(-100, 75, 50, 2000, "1700s");
                // this.addItem('Plant Tree');
                this.rect = this.scene.add.rectangle(193, 96, 40, 40, 0xff00aa, 0.01);
                this.scene.physics.add.existing(this.rect);
                this.rect.body.setImmovable(true);
                this.scene.events.on('playerInterractDown', ()=>{
                    this.scene.physics.collide(this.scene.player, this.rect, () => {
                        console.log("colliding");
                        if (this.scene.player.hasItem("Tree Seed")){
                            this.scene.player.addItem(new Item(this.scene, "Plant Tree"));
                            this.scene.player.removeItem("Tree Seed");
                        } else if (this.scene.player.hasItem("Plant Tree") && this.scene.player.hasItem("Water Can"))
                        {

                        }
                    });
                });
                break;
            case "1700s":
                console.log("when here for some reason");
                //Town
                this.addHitbox(518, 210, 50, 20, "1700sInt", 810, 265, 298, -203);
                //library
                this.addHitbox(-16, 178, 40, 20, "1700sInt", -7, 264, -419, -238);
                //this.addHitbox(1000, 185, 70, 20, "PresentDayInt", 527, 244);
                //House Bottom Right
                this.addHitbox(986, 795, 50, 20, "1700sInt", 878, 810, 326, 347);
                //House Bottom Left
                this.addHitbox(71, 790, 50, 20, "1700sInt", 140, 818, -377, 357);
                this.addHitbox(-220, 354, 30, 1000, "1700s Park", 1122, 538, 0, 0, false, true);
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
                this.addNPC('FetchFirst1700s');
                this.addNPC('FetchSecond1700s');
                this.addItem('Tree Seed');
                break;
            case "1700sInt":
                this.addHitbox(805, 295, 50, 20, "1700s", 518, 240);
                this.addHitbox(-14, 295, 50, 20, "1700s", -20, 210);
                this.addHitbox(140, 850, 50, 20,"1700s", 71, 820);
                this.addHitbox(878, 839, 50, 20, "1700s", 986, 828);
                //1700s interior for the Town Hall
                //-50 for x, -50 for y
                this.addBounds(895-190,300-85,55,46,"1700sInt"); //townhall table 1
                this.addBounds(1120-190,296-85,55,46,"1700sInt"); //townhall table 2
                this.addBounds(1007-190,260-85,50,30,"1700sInt"); //townhall front desk
                this.addBounds(1010-190,190-85,350,20,"1700sInt"); //townhall interior upper bound
                this.addBounds(1010-190,400-85,350,20,"1700sInt"); //townhall interior lower bound
                this.addBounds(1198-190,308-85,32,236,"1700sInt");//townhall interior right bound
                this.addBounds(813-190,284-85,32,236,"1700sInt"); //townhall interior left bound
                //1700s Library interior
                this.addBounds(-140+75,170-60,29,420,"1700sInt");//Library interior left bound
                this.addBounds(200+75,170-60,29,420,"1700sInt");//Library interior right bound
                this.addBounds(0+75,130-60,350,20,"1700sInt");//Library interior upper bound
                this.addBounds(-65+75,162-60,68,24,"1700sInt"); //Library bookcase 1
                this.addBounds(32.5+75,156-60,80,35,"1700sInt"); //Library bookcase 2
                this.addBounds(120+75,165-60,69,25,"1700sInt"); //Library Bookcase 3
                this.addBounds(-35+75,285-60,27,109,"1700sInt");//Library Table
                this.addBounds(154+75,220-60,42,15,"1700sInt");//Library Couch Arm 1
                this.addBounds(157+75,278-60,42,22,"1700sInt");//Library Couch Arm 2
                this.addBounds(167+75,243-60,23,43,"1700sInt");//Library Couch Back
                this.addBounds(69+75,300-60,60,22,"1700sInt");//Library Lower Bounds 1
                this.addBounds(69+75,322-60,92,22,"1700sInt");//Library Lower Bounds 2
                this.addBounds(69+75,344-60,172,22,"1700sInt");//Library Lower Bounds 3
                this.addBounds(69+75,366-60,217,22,"1700sInt");//Library Lower Bounds 4
                 //Bottom Left House 1700s interior
                 this.addBounds(-160+45,645,29,420,"1700sInt");//Left House Left Bound
                 this.addBounds(285+45,645,29,420,"1700sInt");//Left House Right Bound
                 this.addBounds(105+45,675,490,20,"1700sInt");//Left House Upper Bound
                 this.addBounds(95+45,863,490,20,"1700sInt");//Left House Lower Bound
                 this.addBounds(225+45,675,102,46,"1700sInt");//Left House Kitchen
                 this.addBounds(90+45,710,44,44,"1700sInt");//Left House Table
                 this.addBounds(-5+45,730,30,65,"1700sInt"); //Left House Flower Table / Middle wall upper section
                 this.addBounds(-5+45,850,30,30,"1700sInt"); //Left House Flower Table / Middle wall lower section
                 this.addBounds(-95+45,740,80,10,"1700sInt");//Left House Bed
                 this.addBounds(170+45,825,8,37,"1700sInt");//Left House Couch Back
                 //Bottom Right House present day interior
            //-25
            this.addBounds(620,645,29,420,"1700sInt");//Left House Left Bound
            this.addBounds(1085-20,645,29,420,"1700sInt");//Left House Right Bound
            this.addBounds(905-20,675,490,20,"1700sInt");//Left House Upper Bound
            this.addBounds(895-20,863,490,20,"1700sInt");//Left House Lower Bound
            this.addBounds(1025-20,675,102,46,"1700sInt");//Left House Kitchen
            this.addBounds(890-20,710,44,44,"1700sInt");//Left House Table
            this.addBounds(795-20,730,30,65,"1700sInt"); //Left House Flower Table / Middle wall upper section
            this.addBounds(795-20,850,30,30,"1700sInt"); //Left House Flower Table / Middle wall lower section
            this.addBounds(705-20,740,80,10,"1700sInt");//Left House Bed
            this.addBounds(970-20,825,8,37,"1700sInt");//Left House Couch Back
            this.addNPC('FetchThird1700s');
                break;
            case "1960s":
                //Town hall
                this.addHitbox(518, 210, 50, 20, "SixtiesInt", 998, 349, 490, -110);
                //library
                this.addHitbox(-16, 178, 40, 20, "SixtiesInt", -84, 329, -466, -165);
                //this.addHitbox(1000, 185, 70, 20, "PresentDayInt", 527, 244);
                //House Bottom Right
                this.addHitbox(-220, 354, 30, 1000, "Sixties Park", 1122, 538, 0, 0, false, true);
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
                this.addNPC('Heawaits');
                this.addNPC('Lovely1960s');
                break;
            case "SixtiesInt":
                this.addHitbox(998, 375, 50, 20, "1960s", 514, 240);
                this.addHitbox(-84, 355, 50, 20, "1960s", -16, 206);
                this.addHitbox(525, 272, 50, 20, "1960s", 1001, 212);
                this.addHitbox(97, 843, 50, 20, "1960s", 71, 816);
                this.addHitbox(879, 850, 50, 20, "1960s", 976, 825);
                //townhall SixtiesInt interior
                this.addBounds(895,300,55,46,"SixtiesInt"); //townhall table 1
                this.addBounds(1120,296,55,46,"SixtiesInt"); //townhall table 2
                this.addBounds(1007,260,50,30,"SixtiesInt"); //townhall front desk
                this.addBounds(1010,190,350,20,"SixtiesInt"); //townhall interior upper bound
                this.addBounds(1010,400,350,20,"SixtiesInt"); //townhall interior lower bound
                this.addBounds(1198,308,32,236,"SixtiesInt");//townhall interior right bound
                this.addBounds(813,284,32,236,"SixtiesInt"); //townhall interior left bound
                 //library SixtiesInt interior
                 this.addBounds(-140,170,29,420,"SixtiesInt");//Library interior left bound
                 this.addBounds(200,170,29,420,"SixtiesInt");//Library interior right bound
                 this.addBounds(0,130,350,20,"SixtiesInt");//Library interior upper bound
                 this.addBounds(-65,162,68,24,"SixtiesInt"); //Library bookcase 1
                 this.addBounds(32.5,156,80,35,"SixtiesInt"); //Library bookcase 2
                 this.addBounds(120,165,69,25,"SixtiesInt"); //Library Bookcase 3
                 this.addBounds(-35,285,27,109,"SixtiesInt");//Library Table
                 this.addBounds(154,220,42,15,"SixtiesInt");//Library Couch Arm 1
                 this.addBounds(157,278,42,22,"SixtiesInt");//Library Couch Arm 2
                 this.addBounds(167,243,23,43,"SixtiesInt");//Library Couch Back
                 this.addBounds(69,300,60,22,"SixtiesInt");//Library Lower Bounds 1
                 this.addBounds(69,322,92,22,"SixtiesInt");//Library Lower Bounds 2
                 this.addBounds(69,344,172,22,"SixtiesInt");//Library Lower Bounds 3
                 this.addBounds(69,366,217,22,"SixtiesInt");//Library Lower Bounds 4
              //Bottom Left House SixtiesInt interior
                 this.addBounds(-160,645,29,420,"SixtiesInt");//Left House Left Bound
                 this.addBounds(285,645,29,420,"SixtiesInt");//Left House Right Bound
                 this.addBounds(105,675,490,20,"SixtiesInt");//Left House Upper Bound
                 this.addBounds(95,863,490,20,"SixtiesInt");//Left House Lower Bound
                 this.addBounds(225,675,102,46,"SixtiesInt");//Left House Kitchen
                 this.addBounds(90,710,44,44,"SixtiesInt");//Left House Table
                 this.addBounds(-5,730,30,65,"SixtiesInt"); //Left House Flower Table / Middle wall upper section
                 this.addBounds(-5,850,30,30,"SixtiesInt"); //Left House Flower Table / Middle wall lower section
                 this.addBounds(-95,740,80,10,"SixtiesInt");//Left House Bed
                 this.addBounds(170,825,8,37,"SixtiesInt");//Left House Couch Back
             //Bottom Right House SixtiesInt interior
             //-25
             this.addBounds(620,645,29,420,"SixtiesInt");//Left House Left Bound
                 this.addBounds(1085-15,645,29,420,"SixtiesInt");//Left House Right Bound
                 this.addBounds(905-15,675,490,20,"SixtiesInt");//Left House Upper Bound
                 this.addBounds(895-15,863,490,20,"SixtiesInt");//Left House Lower Bound
                 this.addBounds(1025-15,675,102,46,"SixtiesInt");//Left House Kitchen
                 this.addBounds(890-15,710,44,44,"SixtiesInt");//Left House Table
                 this.addBounds(795-15,730,30,65,"SixtiesInt"); //Left House Flower Table / Middle wall upper section
                 this.addBounds(795-15,850,30,30,"SixtiesInt"); //Left House Flower Table / Middle wall lower section
                 this.addBounds(705-15,740,80,10,"SixtiesInt");//Left House Bed
                 this.addBounds(970-15,825,8,37,"SixtiesInt");//Left House Couch Back
                 //npcs
                 this.addNPC('Oscar1960s');
                 this.addNPC('Mayor1960s');
                 
                break;
            case "Sixties Park":
                this.addBounds(443, 665, 2000, 20, "Sixties Park");
                this.addBounds(1140, -520, 50, 1000, "Sixties Park");
                this.addBounds(530, -340, 2000, 50, "Sixties Park");
                this.addBounds(-100, 75, 50, 2000, "Sixties Park");
                this.addHitbox(1160, 364, 20, 1000, "1960s", -193, 339, 0, 0, false, true);
                break;
        }
    }
    update(time,delta){
        
        if (this.scene.player.hasItem("dose of revenge")){
                
                setTimeout(() => {
                    this.scene.scene.start('credits');
                  }, 3000);
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
        return bound;
    }
    addNPC(name){
        let npc = new Npc(this.scene, name);
        this.group.add(npc);
    }
    addItem(name){
        let item = new Item(this.scene, name);
        item.group = this.group;
        this.group.add(item);
    }
    getName(){
        return this.mapName;
    }
}

export default Map;