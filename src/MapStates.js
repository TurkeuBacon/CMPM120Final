import PlayerCamera from "./PlayerCamera.js";
import Player from "./Player.js";
import Map from "./Map.js";

//Interiors will be Maps (Will only contain PresentInterior for testing)
    
class MapState {
    constructor(scene, playerCamera, player, map1700, map1960, mapPresent, presentInt){
        this.playerCamera = playerCamera;
        this.player = player;
        this.maps = [map1700, map1960, mapPresent, presentInt];
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
    loadingZone(MapName, destX, destY){
        this.nextMap;
        for (let i = 0; i < this.maps.length;   i++){
            if (this.maps[i].getName() === MapName){
                this.nextMap = this.maps[i];
                break;
            }
        }

        if (typeof this.nextMap != 'undefined'){
            if (this.nextMap.getName() == "PresentDayInt"){
                this.currentMap.Vanish(this.nextMap, 600);
                this.currentMap = this.nextMap;
                this.scene.time.delayedCall(600, () => {
                    this.player.x = destX;
                    this.player.y = destY;
                });
            }
            //extremely messy, but takes care of cases of being inside.
            if (this.currentMap.getName () == "PresentDayInt" || this.currentMap.getName() == "1960sInt" || this.currentMap.getName() == "1700sInt"){
                    this.currentMap.Vanish(this.nextMap, 600);
                    this.currentMap = this.nextMap;
                    this.scene.time.delayedCall(600, () => {
                        this.player.x = destX;
                        this.player.y = destY;
                    });
            }
            else {
                this.currentMap.Vanish(this.nextMap, 2000);
                this.currentMap = this.nextMap;
                this.scene.time.delayedCall(2000, () => {
                    this.player.x = destX;
                    this.player.y = destY;
                });
            }
            
            
            
            
        }
    }

}

export default MapState;