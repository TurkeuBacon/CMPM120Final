import PlayerCamera from "./PlayerCamera.js";
import Player from "./Player.js";
import Map from "./Map.js";


class MapState {
    //While not set up yet, I believe that if we group our members in groups associated with a time period it will be easier to mitigate our tweens for them
    constructor(playerCamera, player, map1700, map1960, mapPresent){
        //switch this?
        this.playerCamera = playerCamera;
        this.player = player;
        this.map1700 = map1700;
        this.map1960 = map1960;
        this.mapPresent = mapPresent;
        //this.groups = [group1700, group1960, groupPresent];
        this.currentMap = mapPresent;
    }
    showMap(){
        
    }
    
    //Function to switch maps. Takes in a string
     //will only have map switching functionality for now
    switchTimes(MapName){
        this.nextMap;
        for (let i = 0; i < this.maps.length; i++){
            if (this.maps[i].name === MapName){
                this.nextMap = this.maps[i];
                break;
            }
        }
        //should theoretically work
        
    }

}

export default MapState;