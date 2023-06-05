import PlayerCamera from "./PlayerCamera.js";
import Player from "./Player.js";
class MapState {
    //While not set up yet, I believe that if we group our members in groups associated with a time period it will be easier to mitigate our tweens for them
    constructor(playerCamera, player, map1700, map1960, mapPresent){
        this.playerCamera = playerCamera;
        this.player = player;
        this.maps = [map1700, map1960, mapPresent];
        //this.groups = [group1700, group1960, groupPresent];
        this.currentMap = mapPresent;
    }
    showMap(){
        this.player.depth = 1;
        this.currentMap.depth = 0;
        this.currentMap.alpha = 1;
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
        this.currentMap.setVisible(false);
        this.currentMap = this.nextMap;
        this.currentMap.setVisible(true);
    }

}

export default MapState;