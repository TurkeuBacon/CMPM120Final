//Needs to hold map data (Image, group association)
class Map {
    constructor(scene, mapName, mapImage, group){
        this.scene = scene;
        this.mapName = mapName;
        this.group = group;
        this.mapImage = mapImage;
    }
    Vanish(){
        this.group.setVisible(false);
        this.mapImage.setVisible(false);
    }
    showMap(){
        this.group.setVisible(true);
        this.mapImage.setVisible(true);
    }
}

export default Map;