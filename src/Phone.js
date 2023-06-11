class Phone {
    constructor(scene, phoneImage, cameraManager,screenAniVal){
        this.scene = scene;
        this.mm = this.scene.mapManager;
        this.phone = phoneImage;
        this.phone.alpha = 1;
        this.cm = cameraManager;
        this.screenHeight = screenAniVal;
        this.cm.addUI(this.phone);
        this.phone.depth = 10;
        
    }
    displayPhone(){
        this.scene.tweens.add({
            targets: this.phone,
            y: this.screenHeight,
            duration: 1100,
            ease: 'Power4',
        });
        //this.exit = this.scene.add.rectangle(300, 200, 200, 100, 0x0000);
        this.exit = this.scene.add.rectangle(330, 90, 100, 100, 0x0000);
        this.present = this.scene.add.rectangle(520, 167, 300, 180, 0x0000);
        this.sixteen = this.scene.add.rectangle(520, 377, 300, 180, 0x0000);
        this.early = this.scene.add.rectangle(520, 600, 300, 180, 0x0000);
        this.present.alpha = 0.01;
        this.sixteen.alpha = 0.01;
        this.early.alpha = 0.01;
        this.exit.alpha = 0.01;
        this.exit.setInteractive().on('pointerdown', () => 
        {
            this.scene.player.placeItems();
            this.scene.tweens.add({
                targets: this.phone,
                y: this.screenHeight + 900,
                duration: 900,
                ease: 'Quart',
            });
                this.exit.destroy();
                this.present.destroy();
                this.sixteen.destroy();
                this.early.destroy();
                this.scene.events.emit('freezeInput', false);
        });
        this.sixteen.setInteractive().on('pointerdown', () => 
        {
            this.scene.player.placeItems();
            if (this.mm.getCurrentMapName() != '1960s'){
                this.mm.loadingZone('1960s', this.scene.player.x, this.scene.player.y);
                this.scene.tweens.add({
                    targets: this.phone,
                    y: this.screenHeight + 900,
                    duration: 900,
                    ease: 'Quart',
                });
                    this.exit.destroy();
                    this.present.destroy();
                    this.sixteen.destroy();
                    this.early.destroy();
            }
        });
        this.present.setInteractive().on('pointerdown', () => 
        {
            this.scene.player.placeItems();
            if (this.mm.getCurrentMapName() != 'Present Day'){
                this.mm.loadingZone('Present Day', this.scene.player.x, this.scene.player.y);
                this.scene.tweens.add({
                    targets: this.phone,
                    y: this.screenHeight + 900,
                    duration: 900,
                    ease: 'Quart',
                });
                    this.exit.destroy();
                    this.present.destroy();
                    this.sixteen.destroy();
                    this.early.destroy();
            }
        });
        this.early.setInteractive().on('pointerdown', () => 
        {
            this.scene.player.placeItems();
            if (this.mm.getCurrentMapName() != '1700s'){
                this.mm.loadingZone('1700s', this.scene.player.x, this.scene.player.y);
                this.scene.tweens.add({
                    targets: this.phone,
                    y: this.screenHeight + 900,
                    duration: 900,
                    ease: 'Quart',
                });
                    this.exit.destroy();
                    this.present.destroy();
                    this.sixteen.destroy();
                    this.early.destroy();
            }
        });
        this.cm.addUI(this.exit);
        this.cm.addUI(this.present);
        this.cm.addUI(this.sixteen);
        this.cm.addUI(this.early);
        
    }
}

export default Phone;