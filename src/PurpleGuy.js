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

        this.waitFor = {
            head: false,
            torso: false,
            armL: false,
            armR: false,
            wristL: false,
            wristR: false,
            legL: false,
            legR: false,
            ankleL: false,
            ankleR: false,
        };
        this.activeTweens = [];

        this.depth = 6;

    }

    isDone()
    {
        let isWaiting = this.waitFor.head
        || this.waitFor.torse
        || this.waitFor.armL
        || this.waitFor.armR
        || this.waitFor.wristL
        || this.waitFor.wristR
        || this.waitFor.legL
        || this.waitFor.legR
        || this.waitFor.ankleL
        || this.waitFor.ankleR;
        console.log("Is Done: " + !isWaiting);
        return !isWaiting;
    }

    update(time, delta)
    {
        //this.x = 100 + Math.sin(time/750) * 100;
    }

    playAnimation(name, transitionDuration=150, onComplete=()=>{})
    {
        this.activeTweens.forEach(element => {
            element.stop();
        });
        switch(name)
        {
            case "stab":
                function stab(pGuy)
                {
                    pGuy.waitFor.armL = true;
                    pGuy.activeTweens.push(pGuy.scene.add.tween({
                        targets: pGuy.upperArmLContainer,
                        duration: 350,
                        angle: 25,
                        ease: "Bounce",
                        onComplete: ()=>{
                            pGuy.activeTweens.push(pGuy.scene.add.tween({
                                targets: pGuy.upperArmLContainer,
                                duration: 350,
                                angle: 0,
                                ease: "Elastic",
                                onComplete:()=>{pGuy.waitFor.armL = false; if(pGuy.isDone()) onComplete(); }
                            }));
                        }
                    }));
                    pGuy.activeTweens.push(pGuy.scene.add.tween({
                        targets: pGuy.forearmLImage,
                        duration: 500,
                        angle: 50,
                        ease: "Bounce",
                        onComplete: ()=>{
                            pGuy.activeTweens.push(pGuy.scene.add.tween({
                                targets: pGuy.forearmLImage,
                                duration: 350,
                                angle: 0,
                                ease: "Elastic",
                                onComplete:()=>{pGuy.waitFor.wristL = false; if(pGuy.isDone()) onComplete(); }
                            }));
                        }
                    }));
                    pGuy.activeTweens.push(pGuy.scene.add.tween({
                        targets: pGuy.upperArmRContainer,
                        duration: 100,
                        angle: -90,
                        ease: "Quint.easeInOut",
                        yoyo: true,
                        repeat: -1
                    }));
                    pGuy.activeTweens.push(pGuy.scene.add.tween({
                        targets: pGuy.forearmRImage,
                        duration: 100,
                        angle: -45,
                        ease: "Quint.easeInOut",
                        yoyo: true,
                        repeat: -1
                    }));
                    pGuy.activeTweens.push(pGuy.scene.add.tween({
                        targets: pGuy.headImage,
                        duration: 200,
                        angle: -45,
                        ease: "Quad.easeInOut",
                        yoyo: true,
                        repeat: -1
                    }));
                }
                this.scene.add.tween({targets:this, angle: 0, duration: transitionDuration, onComplete: ()=>{this.waitFor.head = false; if(this.isDone()) stab(this);}});
                this.scene.add.tween({targets:this.headImage, angle: -10, duration: transitionDuration, onComplete: ()=>{this.waitFor.torso = false; if(this.isDone()) stab(this);}});
                this.scene.add.tween({targets:this.upperArmLContainer, angle: 0, duration: transitionDuration, onComplete: ()=>{this.waitFor.armL = false; if(this.isDone()) stab(this);}});
                this.scene.add.tween({targets:this.upperArmRContainer, angle: 15, duration: transitionDuration, onComplete: ()=>{this.waitFor.armR = false; if(this.isDone()) stab(this);}});
                this.scene.add.tween({targets:this.forearmLImage, angle: 0, duration: transitionDuration, onComplete: ()=>{this.waitFor.wristL = false; if(this.isDone()) stab(this);}});
                this.scene.add.tween({targets:this.forearmRImage, angle: 45, duration: transitionDuration, onComplete: ()=>{this.waitFor.wristR = false; if(this.isDone()) stab(this);}});
                this.scene.add.tween({targets:this.legLContainer, angle: 0, duration: transitionDuration, onComplete: ()=>{this.waitFor.legL = false; if(this.isDone()) stab(this);}});
                this.scene.add.tween({targets:this.legRContainer, angle: 0, duration: transitionDuration, onComplete: ()=>{this.waitFor.legR = false; if(this.isDone()) stab(this);}});
                this.scene.add.tween({targets:this.ankleLImage, angle: 0, duration: transitionDuration, onComplete: ()=>{this.waitFor.ankleL = false; if(this.isDone()) stab(this);}});
                this.scene.add.tween({targets:this.ankleRImage, angle: 0, duration: transitionDuration, onComplete: ()=>{this.waitFor.ankleR = false; if(this.isDone()) stab(this);}});
            break;
            case "idle":
                function idle(pGuy)
                {
                    onComplete();
                }
                this.scene.add.tween({targets:this, angle: 0, duration: transitionDuration, onComplete: ()=>{this.waitFor.head = false; if(this.isDone()) idle(this);}});
                this.scene.add.tween({targets:this.headImage, angle: 0, duration: transitionDuration, onComplete: ()=>{this.waitFor.torso = false; if(this.isDone()) idle(this);}});
                this.scene.add.tween({targets:this.upperArmLContainer, angle: 0, duration: transitionDuration, onComplete: ()=>{this.waitFor.armL = false; if(this.isDone()) idle(this);}});
                this.scene.add.tween({targets:this.upperArmRContainer, angle: 0, duration: transitionDuration, onComplete: ()=>{this.waitFor.armR = false; if(this.isDone()) idle(this);}});
                this.scene.add.tween({targets:this.forearmLImage, angle: 0, duration: transitionDuration, onComplete: ()=>{this.waitFor.wristL = false; if(this.isDone()) idle(this);}});
                this.scene.add.tween({targets:this.forearmRImage, angle: 0, duration: transitionDuration, onComplete: ()=>{this.waitFor.wristR = false; if(this.isDone()) idle(this);}});
                this.scene.add.tween({targets:this.legLContainer, angle: 0, duration: transitionDuration, onComplete: ()=>{this.waitFor.legL = false; if(this.isDone()) idle(this);}});
                this.scene.add.tween({targets:this.legRContainer, angle: 0, duration: transitionDuration, onComplete: ()=>{this.waitFor.legR = false; if(this.isDone()) idle(this);}});
                this.scene.add.tween({targets:this.ankleLImage, angle: 0, duration: transitionDuration, onComplete: ()=>{this.waitFor.ankleL = false; if(this.isDone()) idle(this);}});
                this.scene.add.tween({targets:this.ankleRImage, angle: 0, duration: transitionDuration, onComplete: ()=>{this.waitFor.ankleR = false; if(this.isDone()) idle(this);}});
            break;
            case "wackadoodle":
                function wackadoodle(pGuy)
                {
                    pGuy.waitFor.legL = true;
                    pGuy.activeTweens.push(pGuy.scene.add.tween({
                        targets: pGuy.legLContainer,
                        angle: 30,
                        duration: 250,
                        yoyo: pGuy,
                        repeat: -1,
                    }));
                    pGuy.waitFor.legR = true;
                    pGuy.activeTweens.push(pGuy.scene.add.tween({
                        targets: pGuy.legRContainer,
                        angle: -30,
                        duration: 300,
                        ease: "Quart",
                        yoyo: true,
                        repeat: -1,
                    }));
                    pGuy.waitFor.ankleL = true;
                    pGuy.activeTweens.push(pGuy.scene.add.tween({
                        targets: pGuy.ankleLImage,
                        angle: -30,
                        duration: 400,
                        yoyo: true,
                        ease: "Quint",
                        repeat: -1,
                    }));
                    pGuy.waitFor.ankleR = true;
                    pGuy.activeTweens.push(pGuy.scene.add.tween({
                        targets: pGuy.ankleRImage,
                        angle: 30,
                        duration: 320,
                        yoyo: true,
                        repeat: -1,
                    }));
                    pGuy.waitFor.armL = true;
                    pGuy.activeTweens.push(pGuy.scene.add.tween({
                        targets: pGuy.upperArmLContainer,
                        angle: 10,
                        duration: 300,
                        yoyo: true,
                        repeat: -1,
                        ease: "Quart"
                    }));
                    pGuy.waitFor.armR = true;
                    pGuy.activeTweens.push(pGuy.scene.add.tween({
                        targets: pGuy.upperArmRContainer,
                        angle: -30,
                        duration: 400,
                        yoyo: true,
                        repeat: -1,
                        ease: "Quint"
                    }));
                    pGuy.waitFor.wristL = true;
                    pGuy.activeTweens.push(pGuy.scene.add.tween({
                        targets: pGuy.forearmLImage,
                        angle: 50,
                        duration: 200,
                        yoyo: true,
                        repeat: -1,
                        ease: "Quart"
                    }));
                    pGuy.waitFor.wristR = true;
                    pGuy.activeTweens.push(pGuy.scene.add.tween({
                        targets: pGuy.forearmRImage,
                        angle: -43,
                        duration: 300,
                        yoyo: true,
                        repeat: -1,
                        ease: "Quint"
                    }));
                }

                this.scene.add.tween({targets:this, angle: 0, duration: transitionDuration, onComplete: ()=>{this.waitFor.head = false; if(this.isDone()) wackadoodle(this);}});
                this.scene.add.tween({targets:this.headImage, angle: 0, duration: transitionDuration, onComplete: ()=>{this.waitFor.torso = false; if(this.isDone()) wackadoodle(this);}});
                this.scene.add.tween({targets:this.upperArmLContainer, angle: 80, duration: transitionDuration, onComplete: ()=>{this.waitFor.armL = false; if(this.isDone()) wackadoodle(this);}});
                this.scene.add.tween({targets:this.upperArmRContainer, angle: -60, duration: transitionDuration, onComplete: ()=>{this.waitFor.armR = false; if(this.isDone()) wackadoodle(this);}});
                this.scene.add.tween({targets:this.forearmLImage, angle: -90, duration: transitionDuration, onComplete: ()=>{this.waitFor.wristL = false; if(this.isDone()) wackadoodle(this);}});
                this.scene.add.tween({targets:this.forearmRImage, angle: 80, duration: transitionDuration, onComplete: ()=>{this.waitFor.wristR = false; if(this.isDone()) wackadoodle(this);}});
                this.scene.add.tween({targets:this.legLContainer, angle: 0, duration: transitionDuration, onComplete: ()=>{this.waitFor.legL = false; if(this.isDone()) wackadoodle(this);}});
                this.scene.add.tween({targets:this.legRContainer, angle: 0, duration: transitionDuration, onComplete: ()=>{this.waitFor.legR = false; if(this.isDone()) wackadoodle(this);}});
                this.scene.add.tween({targets:this.ankleLImage, angle: 20, duration: transitionDuration, onComplete: ()=>{this.waitFor.ankleL = false; if(this.isDone()) wackadoodle(this);}});
                this.scene.add.tween({targets:this.ankleRImage, angle: -20, duration: transitionDuration, onComplete: ()=>{this.waitFor.ankleR = false; if(this.isDone()) wackadoodle(this);}});
                break;
        }
    }
}

export default PurpleGuy