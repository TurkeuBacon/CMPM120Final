class PresentDay_HUD extends Phaser.Scene
{
    constructor()
    {
        super('present_day_hud');
    }

    preload()
    {
    }

    create()
    {
        this.scene.get('present_day').events.on('setJoystickUI', function (joystickActive, joystickPosition, joystickData) {
            if(!this.joystickElements)
            {
                console.log("Creating Joystick Elements");
                this.joystickElements =
                {
                    "background":
                        this.add.circle(
                            0,
                            0,
                            joystickData.backgroundRadius,
                            joystickData.backgroundColor,
                            joystickData.backgroundAlpha),
                    "stick":
                        this.add.circle(
                            0,
                            0,
                            joystickData.stickRadius,
                            joystickData.stickColor,
                            joystickData.stickAlpha)
                };
            }
            else
            {
                this.joystickElements.background.setVisible(joystickActive);
                this.joystickElements.stick.setVisible(joystickActive);
                
                this.joystickElements.background.setPosition(joystickPosition.background.x, joystickPosition.background.y);
                this.joystickElements.stick.setPosition(joystickPosition.stick.x, joystickPosition.stick.y);
            }
        }, this);
    }

    update()
    {
        
    }
}

export default PresentDay_HUD;