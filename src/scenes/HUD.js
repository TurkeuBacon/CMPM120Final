class Town_HUD extends Phaser.Scene
{
    constructor()
    {
        super('town_hud');
    }

    preload()
    {
        this.load.image('fstest', '/assets/HUD/fullscreen_button.png');
    }
    /*enableFullscreen() {
        if(this.scale.isFullscreen){
            this.scale.stopFullscreen();
        }
        else{
            this.scale.startFullscreen();
        }
    }*/
    /*requestFullscreen() {
        const element = document.documentElement; // Get the root element of the document
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.mozRequestFullScreen) { // Firefox
          element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) { // Chrome, Safari and Opera
          element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) { // Internet Explorer and Edge
          element.msRequestFullscreen();
        }

      
      }*/
    create()
    {
        
        
        /*this.fs = this.add.sprite(100,100,'fstest');
        this.fs.setInteractive();
        this.fs.on('pointerdown', this.requestFullscreen, this);*/
        


        this.scene.get('town').events.on('setJoystickUI', function (joystickActive, joystickPosition, joystickData) {
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

export default Town_HUD;