class DirectionalInputDevice
{
    constructor(scene)
    {
        this.scene = scene;
        
        this.direction = "neutral";
    }
}

class TouchJoystick extends DirectionalInputDevice
{
    constructor(scene, touchArea, backRadius, stickRadius, stickMoveRadius, minForDirection)
    {
        super(scene);
        this.touchArea = touchArea;
        this.backRadius = backRadius;
        this.stickRadius = stickRadius;
        this.stickMoveRadius = stickMoveRadius;

        this.input = {'x': 0, 'y': 0};
        this.joystickStartScreen = {'x': 0, 'y': 0};
        this.joystickStartWorld = {'x': 0, 'y': 0};
        this.enabled = false;
        this.waitForNextPress = false;
        this.minForDirection = minForDirection;
    }

    update()
    {
        let cam = this.scene.cameras.main;
        let zoom = this.scene.cameras.main.zoom;
        let pointer = this.scene.input.activePointer;
        let pointerPositionNormalized = new Phaser.Math.Vector2(pointer.position.x/this.scene.sys.game.canvas.width, pointer.position.y/this.scene.sys.game.canvas.height);

        if(!this.enabled && !this.waitForNextPress && pointer.isDown)
        {
            if(pointerPositionNormalized.x < (this.touchArea.width) && pointerPositionNormalized.y > (1-this.touchArea.height))
            {
                this.joystickStartWorld = {'x': pointer.worldX, 'y': pointer.worldY};

                this.backCircle = this.scene.add.circle(300, 300, this.backRadius, 0x888888, 0.5);
                this.stickCircle = this.scene.add.circle(300, 300, this.stickRadius, 0xaaffaa, 0.75);

                this.backCircle.setScrollFactor(0, 0);
                this.stickCircle.setScrollFactor(0, 0);

                this.enabled = true;
            }
            else
            {
                this.waitForNextPress = true;
            }
        }
        else if(this.enabled && pointer.isDown)
        {
            //Do Joystick Stuff
            let inputX = pointer.worldX - this.joystickStartWorld.x;
            let inputY = pointer.worldY - this.joystickStartWorld.y;
            let magnitude = Math.sqrt(Math.pow(inputX, 2) + Math.pow(inputY, 2));
            if(magnitude > this.stickMoveRadius )
            {
                inputX = inputX / magnitude * this.stickMoveRadius;
                inputY = inputY / magnitude * this.stickMoveRadius;
            }
            this.stickCircle.setPosition(this.joystickStartWorld.x + inputX, this.joystickStartWorld.y + inputY);

            this.input = {'x': inputX / this.stickMoveRadius, 'y': -inputY / this.stickMoveRadius}

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
        if(!pointer.isDown)
        {
            if(this.enabled)
            {
                //Destroy Joystick UI Elements
                this.backCircle.destroy();
                this.stickCircle.destroy();

                this.input = {'x': 0, 'y': 0};
                this.direction = "neutral";
                this.enabled = false;
            }
            this.waitForNextPress = false;
        }
    }
}
export default TouchJoystick;