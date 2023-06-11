import PlayerCamera from "./PlayerCamera.js";
import Player from "./Player.js";
import Map from "./Map.js";

//Interiors will be Maps (Will only contain PresentInterior for testing)
    
class MapState {
    constructor(scene, playerCamera, player, map1700, map1960, mapPresent, initialPark, park1700s, park1960s, presentInt, earlyInt, sixtiesInt){
        this.playerCamera = playerCamera;
        this.player = player;
        this.maps = [map1700, map1960, mapPresent, initialPark, park1700s, park1960s, presentInt, earlyInt, sixtiesInt];
        this.currentMap = this.mapPresent;
        this.scene = scene;
    }
    initialize(){
        for (let i = 0; i < this.maps.length; i++){
            this.maps[i].VanishInstant();
        }
        this.maps[2].showMap();
        this.currentMap = this.maps[2];
    }
    //Function to take care of Loading Zones (Time Switches, Interior buildings, etc.)
    loadingZone(MapName, destX, destY, camX, camY, keepX, keepY){
        //this.nextMap;
        console.log(MapName)
        for (let i = 0; i < this.maps.length;   i++){
            if (this.maps[i].getName() === MapName){
                this.nextMap = this.maps[i];
                break;
            }
        }
        console.log(this.nextMap.getName());

        if (typeof this.nextMap != 'undefined' && this.currentMap.getName() != this.nextMap.getName()){
            console.log("Next Map " + this.nextMap.mapName);
            if(this.nextMap.getName().includes("Int") || this.nextMap.getName().includes("Park")){
                    this.currentMap.Vanish(this.nextMap, 700, camX, camY);
                    this.currentMap = this.nextMap;
                    console.log("Set Current Map 1 " + this.currentMap.mapName);
                    this.scene.time.delayedCall(700, () => {
                        if(!keepX) this.player.x = destX;
                        if(!keepY) this.player.y = destY;
                    });
            }
            else if (this.currentMap.getName().includes("Int") || this.currentMap.getName().includes("Park")){
                    this.currentMap.Vanish(this.nextMap, 600);
                    this.currentMap = this.nextMap;
                    console.log("Set Current Map 2" + this.currentMap.mapName);
                    this.scene.time.delayedCall(600, () => {
                        if(!keepX) this.player.x = destX;
                        if(!keepY) this.player.y = destY;
                    });
            }
            else {
                console.log("TIE TAVEL");
                this.currentMap.Vanish(this.nextMap, 2000);
                this.currentMap = this.nextMap;
                this.scene.time.delayedCall(2000, () => {
                    
                    if(!keepX) this.player.x = destX;
                    if(!keepY) this.player.y = destY;
                });
            }
            
            
            
            
        }
    }

}

export default MapState;