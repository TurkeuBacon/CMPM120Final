//Needs to hold map data (Image, group association)
//implement Hitbox functionality
class Map {
    constructor(scene, mapName, mapImage, group){
        this.scene = scene;
        this.mapName = mapName;
        this.group = group;
        this.mapImage = mapImage;
        this.visible = false;
    }
    showMap(){
        this.group.setVisible(true);
        this.mapImage.setVisible(true);
        this.visible = true;
        return this.visible;
    }
    VanishInstant(){
        this.visible = false;
        this.group.setVisible(false);
        this.mapImage.setVisible(false);
    }
    Vanish(nextMap){
        const blackScreen = this.scene.add.rectangle(
            this.scene.cameras.main.centerX,
            this.scene.cameras.main.centerY,
            this.scene.cameras.main.width,
            this.scene.cameras.main.height,
            0x000000
        );
        blackScreen.setDepth(2);
        blackScreen.alpha = 0;
        this.scene.tweens.add({
            targets: blackScreen,
            alpha: 1,
            duration: 2000,
            onComplete: () => {
                this.visible = false;
                this.group.setVisible(false);
                this.mapImage.setVisible(false);
                nextMap.showMap();
                blackScreen.setVisible(false);
                return this.visible;
            }
        });
        
    }
    //used to make our hitbox gone when needed (by associating it with group)
    addHitbox(x,y){
        let hitbox = new Hitbox(this.scene, x, y);
        this.group.add(hitbox);

        return hitBox;
    }
    
    getName(){
        return this.mapName;
    }
}

export default Map;