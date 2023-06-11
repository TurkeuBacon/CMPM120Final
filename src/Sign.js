class Sign {
    constructor(scene, x, y, signImage, phone){
        this.scene = scene;
        this.phone = phone;
        this.sign = signImage;
        this.scene.physics.add.existing(this.sign);
        this.sign.body.setImmovable(true);
        this.sign.x = x;
        this.sign.y = y;
        this.player = this.scene.player;
        this.scene.events.on('update', (time, delta) => { this.update(time, delta)} );
        this.scene.events.on('playerInterractDown', () => {
            if(this.scene.physics.overlap(this.player, this.sign)){

            }
        })
        
    }
    update (time, delta)
    {
        if(this.scene.physics.overlap(this.player, this.sign)){
            
        }
        
    }

}

export default Sign;