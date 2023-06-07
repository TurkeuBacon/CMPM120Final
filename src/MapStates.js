import PlayerCamera from "./PlayerCamera.js";
import Player from "./Player.js";
import Map from "./Map.js";


class MapState {
    constructor(playerCamera, player, map1700, map1960, mapPresent){
        this.playerCamera = playerCamera;
        this.player = player;
        this.maps = [map1700, map1960, mapPresent];
        this.currentMap;
    }
    initialize(){
        for (let i = 0; i < this.maps.length; i++){
            this.maps[i].VanishInstant();
        }
        this.maps[2].showMap();
        this.currentMap = this.maps[2];
    }
    //Function to switch maps. Takes in a string
     //will only have map switching functionality for now
    switchTimes(MapName){
        this.nextMap;
        for (let i = 0; i < this.maps.length; i++){
            if (this.maps[i].getName() === MapName){
                this.nextMap = this.maps[i];
                break;
            }
        }
        this.currentMap.Vanish(this.nextMap);
        this.currentMap = this.nextMap;
    }

}

export default MapState;