class PurpleGuy extends Phaser.GameObjects.Container
{
    constructor(scene, x, y, parts)
    {
        super(scene, x, y);
        this.scene.events.on('update', (time, delta) => { this.update(time, delta)} );
        scene.add.existing(this);
        this.torsoImage = scene.add.image(parts.torso.x, parts.torso.y, parts.torso.image);
        this.add(this.torsoImage);
        
        this.headImage = scene.add.image(parts.head.x, parts.head.y, parts.head.image);
        this.add(this.headImage);

        this.upperArmLContainer = scene.add.container(parts.upperArmL.x, parts.upperArmL.y);
        this.upperArmLImage = scene.add.image(0, 0, parts.upperArmL.image);
        this.upperArmRContainer = scene.add.container(parts.upperArmR.x, parts.upperArmR.y);
        this.upperArmRImage = scene.add.image(0, 0, parts.upperArmR.image);

        this.forearmLImage = scene.add.image(parts.forearmL.x, parts.forearmL.y, parts.forearmL.image);
        this.forearmRImage = scene.add.image(parts.forearmR.x, parts.forearmR.y, parts.forearmR.image);

        this.upperArmLContainer.add(this.upperArmLImage);
        this.upperArmLContainer.add(this.forearmLImage);
        this.upperArmRContainer.add(this.upperArmRImage);
        this.upperArmRContainer.add(this.forearmRImage);

        this.add(this.upperArmLContainer);
        this.add(this.upperArmRContainer);
        
        this.legLContainer = scene.add.container(parts.legL.x, parts.legL.y);
        this.legLImage = scene.add.image(0, 0, parts.legL.image);
        this.legRContainer = scene.add.container(parts.legR.x, parts.upperArmR.y);
        this.legRImage = scene.add.image(0, 0, parts.upperArmR.image);

        this.ankleLImage = scene.add.image(parts.ankleL.x, parts.ankleL.y, parts.ankleL.image);
        this.ankleRImage = scene.add.image(parts.ankleR.x, parts.ankleR.y, parts.ankleR.image);

        this.legLContainer.add(this.legLImage);
        this.legLContainer.add(this.ankleLImage);
        this.legRContainer.add(this.legRImage);
        this.legRContainer.add(this.ankleRImage);

        this.add(this.legLContainer);
        this.add(this.legRContainer);

        this.depth = 3;
    }

    update(time, delta)
    {
        this.x = 100 + Math.sin(time/750) * 100;
        this.angle += 2.5;
        this.upperArmLContainer.angle += 2.5;
        this.upperArmRContainer.angle += 2.5;
        this.forearmLImage.angle += 2.5;
        this.forearmRImage.angle += 2.5;
        this.legLContainer.angle += 2.5;
        this.legRContainer.angle += 2.5;
        this.ankleLImage.angle += 2.5;
        this.ankleRImage.angle += 2.5;
    }
}

export default PurpleGuy