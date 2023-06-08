import PlayerCamera from "./PlayerCamera.js";
import Player from "./Player.js";
import Map from "./Map.js";

//Interiors will be Maps (Will only contain PresentInterior for testing)
    
class MapState {
    constructor(playerCamera, player, map1700, map1960, mapPresent, presentInt){
        this.playerCamera = playerCamera;
        this.player = player;
        this.maps = [map1700, map1960, mapPresent, presentInt];
        this.currentMap = this.mapPresent;
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
        for (let i = 0; i < this.maps.length; i++){
            if (this.maps[i].getName() === MapName){
                this.nextMap = this.maps[i];
                break;
            }
        }
        if (typeof this.nextMap != 'undefined'){
            this.currentMap.Vanish(this.nextMap);
            this.currentMap = this.nextMap;
        }
    }

}

export default MapState;