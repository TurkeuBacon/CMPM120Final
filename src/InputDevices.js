/*
As of June 1st 2023 this file was written by Gabe,
Ask him any questions you have about these classes
*/

/*
The base class for directional inputs.

I'm (Gabriel) designing the player to operate on the direction string,
so each child of DirectionalInput will have one two jobs:
    -Convert player inputs into a direction
    -Communicate these inputs to the HUD UI if necessary ex. Displaying
    the virtual touch joystick
*/
class DirectionalInputDevice extends Phaser.GameObjects.GameObject
{
    constructor(scene)
    {
        super(scene, "inputDevice");
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.events.on('update', (time, delta) => { this.update(time, delta)} );
        this.cm = this.scene.cameraManager;
        
        this.direction = "neutral";
    }
}

/*
A Joystick for touchscreen directional inputs

* The joystick has an area in the bottom left corner of the screen where it can activate.
* When there is a press in that area, the joystick will appear at that initial location
until the press is released.
* While the joystick is active, sliding the pointer will cause the "Stick" to move within
it's movement radius.
* The direction the stick points relative to the starting press can be read as inputs either
through the input property (the relative xy position of the stick), or through the direction
property (The direction the stick is pointing, represented as a string: "neutral", "up",
"down", "left", or "right")
*/
class TouchJoystick extends DirectionalInputDevice
{
    constructor(scene, touchArea, backImg, stickImg, backRadius, stickRadius, stickMoveRadius, minForDirection)
    {
        super(scene);
        this.touchArea = touchArea; // The percentage of width and height that will trigger the joystick. (The joystick will always be triggered in the bottom left)
        this.stickMoveRadius = stickMoveRadius; // How far the stick can move from the center of the joystick

        this.input = {'x': 0, 'y': 0}; // The current raw output of the joystick
        this.joystickStartScreen = {'x': 0, 'y': 0}; // Where the current joystick is located
        this.active = false; // Is the joystick currently being used
        this.waitForNextPress = false; // Indicates if joystick checks should wait for the next click/touch
        this.minForDirection = minForDirection;

        this.disableInput = false;
        this.scene.events.on('freezeInput', (freeze) => {
            this.disableInput = freeze;
            this.active = false;
            this.joystickElements.background.setVisible(this.active);
            this.joystickElements.stick.setVisible(this.active);
            this.direction = "neutral";
        });

        this.joystickElements =
                {
                    "background":
                        this.cm.addUI(this.scene.add.image(
                            0,
                            0,
                            backImg).setAlpha(0.90).setDisplaySize(backRadius*2, backRadius*2)),
                    "stick":
                        this.cm.addUI(this.scene.add.image(
                            0,
                            0,
                            stickImg).setAlpha(0.77).setDisplaySize(stickRadius*2, stickRadius*2)),
                };
    }

    update(time, delta)
    {
        if(this.disableInput) return;

        // The current active pointer (pointers handle both mouse and touch inputs)
        let pointer = this.scene.input.activePointer;
        // The position of the pointer with each axis normalized between zero and one
        // Left side x=0. Right side x=1. Top y=0. Bottom y=1
        let pointerPositionNormalized = new Phaser.Math.Vector2(pointer.position.x/this.scene.sys.game.canvas.width, pointer.position.y/this.scene.sys.game.canvas.height);

        /*
        The condition for a new joystick press
        Sets the joystick active and saves the starting position
        Sets waitForNextPress to true if the press was outside the joystick area
        */
        if(!this.active && !this.waitForNextPress && pointer.isDown)
        {
            if(pointerPositionNormalized.x < (this.touchArea.width) && pointerPositionNormalized.y > (1-this.touchArea.height))
            {
                this.joystickStartScreen = {'x': pointer.position.x, 'y': pointer.position.y};

                this.active = true;
            }
            else
            {
                this.waitForNextPress = true;
            }
        }
        
        /*
        The condition for an active joystick
        Calculates the joystick direction
        */
        else if(this.active && pointer.isDown)
        {
            let inputX = pointer.position.x - this.joystickStartScreen.x; // The X position of pointer relative to the starting position
            let inputY = pointer.position.y - this.joystickStartScreen.y; // The Y position of pointer relative to the starting position
            // The magnitude of the relative position vector
            // Used to normalize the input
            let magnitude = Math.sqrt(Math.pow(inputX, 2) + Math.pow(inputY, 2));
            // Clamps the magnitude of the dirctional vector to the stick move radius while preserving the direction itself
            if(magnitude > this.stickMoveRadius )
            {
                inputX = inputX / magnitude * this.stickMoveRadius;
                inputY = inputY / magnitude * this.stickMoveRadius;
            }

            // Sets the final raw input of the joystick
            // A 2D vector with a magnitude between 0 and 1
            this.input = {'x': inputX / this.stickMoveRadius, 'y': -inputY / this.stickMoveRadius}

            // Determining the discrete direction of the joystick
            // The basic idea is that x > y means a horizonal input and y > x means a vertical input
            // the sign of x or y is the used to determine left/right or up/down
            if(Math.abs(this.input.x) > Math.abs(this.input.y) && this.input.x > this.minForDirection)
            {
                this.direction = "right";
            }
            else if(Math.abs(this.input.x) > Math.abs(this.input.y) && this.input.x < -this.minForDirection)
            {
                this.direction = "left";
            }
            else if(Math.abs(this.input.x) < Math.abs(this.input.y) && this.input.y > this.minForDirection)
            {
                this.direction = "up";
            }
            else if(Math.abs(this.input.x) < Math.abs(this.input.y) && this.input.y < -this.minForDirection)
            {
                this.direction = "down";
            }
            else
            {
                this.direction = "neutral";
            }
        }

        /*
        Condition for no touch inputs detected
        If active: set inactive, reset the input vector and direction to the neutral states
        Always sets waitForNextPress to false, since we have ended the invalid press
        */
        if(!pointer.isDown)
        {
            if(this.active)
            {
                this.input = {'x': 0, 'y': 0};
                this.direction = "neutral";
                this.active = false;
            }
            this.waitForNextPress = false;
        }
        /*
        An event trigger that the HUD Scene listens for
        It sends the data needed to properly display the joystick UI

        This is the area of the code I a least familiar with, it was based off this code example:
        https://labs.phaser.io/edit.html?src=src%5Cscenes%5Cui%20scene%20es6.js
        */
       let joystickPosition = {
            'background': 
            {
                'x': this.joystickStartScreen.x, 'y': this.joystickStartScreen.y
            },
            'stick': 
            {
                'x': this.joystickStartScreen.x + this.input.x * this.stickMoveRadius, 'y': this.joystickStartScreen.y - this.input.y * this.stickMoveRadius
            }
        }
        this.joystickElements.background.setVisible(this.active);
        this.joystickElements.stick.setVisible(this.active);
        
        this.joystickElements.background.setPosition(joystickPosition.background.x, joystickPosition.background.y);
        this.joystickElements.stick.setPosition(joystickPosition.stick.x, joystickPosition.stick.y);
        // this.scene.events.emit('setJoystickUI',
        //     this.active,
        //     {
        //         'background': 
        //         {
        //             'x': this.joystickStartScreen.x, 'y': this.joystickStartScreen.y
        //         },
        //         'stick': 
        //         {
        //             'x': this.joystickStartScreen.x + this.input.x * this.stickMoveRadius, 'y': this.joystickStartScreen.y - this.input.y * this.stickMoveRadius
        //         }
        //     },
        //     this.joystickUIData
        //     );
    }
}
export default TouchJoystick;