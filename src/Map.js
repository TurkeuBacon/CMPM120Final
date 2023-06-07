//Needs to hold map data (Image, group association)
class Map {
    constructor(scene, mapName, mapImage, group){
        this.scene = scene;
        this.mapName = mapName;
        this.group = group;
        this.mapImage = mapImage;
        this.visible = false;
    }
    Vanish(){
        this.group.setVisible(false);
        this.mapImage.setVisible(false);
        this.visible = false; 
        return this.visible;
    }
    showMap(){
        this.group.setVisible(true);
        this.mapImage.setVisible(true);
        this.visible = true;
        return this.visible;
    }
    getName(){
        return this.mapName;
    }
}

export default Map;