class PurpleGuy extends Phaser.GameObjects.Container
{
    constructor(scene, x, y, parts)
    {
        super(scene, x, y);
        this.scene.events.on('update', (time, delta) => { this.update(time, delta)} );
        scene.add.existing(this);
        
        this.headImage = scene.physics.add.image(parts.head.x, parts.head.y, parts.head.image).setOrigin(.55, 1);
        this.add(this.headImage);

        this.upperArmLContainer = scene.add.container(parts.upperArmL.x, parts.upperArmL.y);
        this.upperArmLImage = scene.physics.add.image(0, 0, parts.upperArmL.image).setOrigin(.85, .15);
        this.upperArmRContainer = scene.add.container(parts.upperArmR.x, parts.upperArmR.y);
        this.upperArmRImage = scene.physics.add.image(0, 0, parts.upperArmR.image).setOrigin(.15, .15);

        this.forearmLImage = scene.physics.add.image(parts.forearmL.x, parts.forearmL.y, parts.forearmL.image).setOrigin(0.65, 0);
        this.forearmRImage = scene.physics.add.image(parts.forearmR.x, parts.forearmR.y, parts.forearmR.image).setOrigin(0.35, 0);

        this.upperArmLContainer.add(this.upperArmLImage);
        this.upperArmLContainer.add(this.forearmLImage);
        this.upperArmRContainer.add(this.upperArmRImage);
        this.upperArmRContainer.add(this.forearmRImage);

        this.add(this.upperArmLContainer);
        this.add(this.upperArmRContainer);
        
        this.legLContainer = scene.add.container(parts.legL.x, parts.legL.y);
        this.legLImage = scene.physics.add.image(0, 0, parts.legL.image).setOrigin(.7, .1);
        this.legRContainer = scene.add.container(parts.legR.x, parts.legR.y);
        this.legRImage = scene.physics.add.image(0, 0, parts.legR.image).setOrigin(.3, .1);

        this.ankleLImage = scene.physics.add.image(parts.ankleL.x, parts.ankleL.y, parts.ankleL.image).setOrigin(0.5, 0);
        this.ankleRImage = scene.physics.add.image(parts.ankleR.x, parts.ankleR.y, parts.ankleR.image).setOrigin(0.5, 0);

        this.legLContainer.add(this.legLImage);
        this.legLContainer.add(this.ankleLImage);
        this.legRContainer.add(this.legRImage);
        this.legRContainer.add(this.ankleRImage);

        this.add(this.legLContainer);
        this.add(this.legRContainer);
        
        this.torsoImage = scene.physics.add.image(parts.torso.x, parts.torso.y, parts.torso.image);
        this.add(this.torsoImage);

        this.depth = 3;
    }

    update(time, delta)
    {
        this.x = 100 + Math.sin(time/750) * 100;
    }
}

export default PurpleGuy