import PlayerCamera from "./PlayerCamera.js";
import Player from "./Player.js";
import Map from "./Map.js";

//Interiors will be Maps (Will only contain PresentInterior for testing)
    
class MapState {
    constructor(scene, playerCamera, player, map1700, map1960, mapPresent, initalPark, presentInt){
        this.playerCamera = playerCamera;
        this.player = player;
        this.maps = [map1700, map1960, mapPresent, initalPark, presentInt];
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
    loadingZone(MapName, destX, destY, keepX, keepY){
        this.nextMap;
        for (let i = 0; i < this.maps.length;   i++){
            if (this.maps[i].getName() === MapName){
                this.nextMap = this.maps[i];
                break;
            }
        }

        if (typeof this.nextMap != 'undefined'){
            if(this.nextMap.getName().includes("Int") || this.nextMap.getName().includes("Park")){
                    this.currentMap.Vanish(this.nextMap, 600);
                    this.currentMap = this.nextMap;
                    this.scene.time.delayedCall(600, () => {
                        if(!keepX) this.player.x = destX;
                        if(!keepY) this.player.y = destY;
                    });
            }
            //extremely messy, but takes care of cases of being inside.
            if (this.currentMap.getName().includes("Int") || this.currentMap.getName().includes("Park")){
                    this.currentMap.Vanish(this.nextMap, 600);
                    this.currentMap = this.nextMap;
                    this.scene.time.delayedCall(600, () => {
                        if(!keepX) this.player.x = destX;
                        if(!keepY) this.player.y = destY;
                    });
            }
            else {
                console.log(this.nextMap.getName());
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