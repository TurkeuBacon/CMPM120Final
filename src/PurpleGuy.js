class PurpleGuy extends Phaser.GameObjects.Container
{
    static loadPurpleGuyData(scene)
    {
        scene.load.path = '../assets/';
        
        scene.load.image('torso', '/PurpleGuy/torso.png');

        scene.load.image('head', '/PurpleGuy/head.png');

        scene.load.image('arm_left', '/PurpleGuy/arm_left.png');
        scene.load.image('arm_right', '/PurpleGuy/arm_right.png');
        scene.load.image('wrist_hand_left', '/PurpleGuy/wrist_hand_left.png');
        scene.load.image('wrist_hand_right', '/PurpleGuy/wrist_hand_right.png');

        scene.load.image('leg_left', '/PurpleGuy/leg_left.png');
        scene.load.image('leg_right', '/PurpleGuy/leg_right.png');
        scene.load.image('ankle_foot_left', '/PurpleGuy/ankle_foot_left.png');
        scene.load.image('ankle_foot_right', '/PurpleGuy/ankle_foot_right.png');

        scene.load.json('purpleGuyData', '/PurpleGuy/data.json');
    }

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

        this.playAnimation("wackadoodle");
    }

    update(time, delta)
    {
        //this.x = 100 + Math.sin(time/750) * 100;
    }

    playAnimation(name)
    {

        switch(name)
        {
            case "wackadoodle":
                this.headImage.angle = 0;
                this.ankleLImage.angle = 20;
                this.ankleRImage.angle = -20;
                this.legLContainer.angle = 0;
                this.legRContainer.angle = 0;
                this.upperArmLContainer.angle = 80;
                this.upperArmRContainer.angle = -60;
                this.forearmLImage.angle = -90;
                this.forearmRImage.angle = 80;
                this.angle = 0;
        
                // this.scene.add.tween({
                //     targets: this,
                //     angle: 10,
                //     duration: 2000,
                //     repeat: -1,
                //     ease: "Elastic"
                // });
        
                // this.scene.add.tween({
                //     targets: this.headImage,
                //     angle: -35,
                //     duration: 700,
                //     yoyo: true,
                //     repeat: -1,
                //     ease: "Elastic"
                // });
                this.scene.add.tween({
                    targets: this.legLContainer,
                    angle: 30,
                    duration: 250,
                    yoyo: true,
                    repeat: -1,
                });
                this.scene.add.tween({
                    targets: this.legRContainer,
                    angle: -30,
                    duration: 300,
                    ease: "Quart",
                    yoyo: true,
                    repeat: -1,
                });
                this.scene.add.tween({
                    targets: this.ankleLImage,
                    angle: -30,
                    duration: 400,
                    yoyo: true,
                    ease: "Quint",
                    repeat: -1,
                });
                this.scene.add.tween({
                    targets: this.ankleRImage,
                    angle: 30,
                    duration: 320,
                    yoyo: true,
                    repeat: -1,
                });
                this.scene.add.tween({
                    targets: this.upperArmLContainer,
                    angle: 10,
                    duration: 300,
                    yoyo: true,
                    repeat: -1,
                    ease: "Quart"
                });
                this.scene.add.tween({
                    targets: this.upperArmRContainer,
                    angle: -30,
                    duration: 400,
                    yoyo: true,
                    repeat: -1,
                    ease: "Quint"
                });
                this.scene.add.tween({
                    targets: this.forearmLImage,
                    angle: 50,
                    duration: 200,
                    yoyo: true,
                    repeat: -1,
                    ease: "Quart"
                });
                this.scene.add.tween({
                    targets: this.forearmRImage,
                    angle: -43,
                    duration: 300,
                    yoyo: true,
                    repeat: -1,
                    ease: "Quint"
                });
                break;
        }
    }
}

export default PurpleGuy