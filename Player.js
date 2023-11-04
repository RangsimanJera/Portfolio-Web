class Player extends Sprite {
    constructor({position, imageSrc, frameRate, animations, loop}) {
        super({position, imageSrc, frameRate, animations, loop})
        this.velocity = {
            x: 0,
            y: 0
        };
        this.height = 245 * (gameCanvas.height / 1080);
        this.width = 1020 * (gameCanvas.height / 1080);
        this.position = {
            x: 4850 * (gameCanvas.height / 1080) - (this.width / 8),
            y: 800 * (gameCanvas.height / 1080) - this.height,
        }

        this.positionTemp = this.position.x / (gameCanvas.height / 1080);

        this.hitbox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            width: this.width,
            height: this.height
        }

        this.animations = animations
        this.lastDirection = 'right'

        this.camerabox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            width: gameCanvas.width,
            height: 450,
        }
    }

    updateSize() {
        this.height = this.image.height * (gameCanvas.height / 1080);
        this.width = (this.image.width / this.frameRate) * (gameCanvas.height / 1080);
        this.position = {
            x: this.positionTemp * (gameCanvas.height / 1080),
            y: 800 * (gameCanvas.height / 1080) - this.height,
        }

        this.hitbox = {
            position: {
                x: this.positionTemp - ((this.hitbox.width / 2) - (this.width / 2)),
                y: this.position.y
            },
            width: 145 * (gameCanvas.height / 1080),
            height: this.image.height
        }
    }

    updateCamerabox() {
        this.camerabox = {
            position: {
                x: this.position.x - ((gameCanvas.width / 2) - (this.width / 2)),
                y: this.position.y,
            },
            width: gameCanvas.width,
            height: 450,
        }
    }

    checkForHorizontalCanvasCollision() {
        if (this.hitbox.position.x + this.hitbox.width + this.velocity.x >= 19200 * (gameCanvas.height / 1080) || 
            this.hitbox.position.x + this.velocity.x <= 0
            ) {
            this.velocity.x = 0
        }
    }

    shouldPanCameraToTheLeft({gameCanvas, camera}) {
        const cameraboxRightSide = this.camerabox.position.x + this.camerabox.width

        if (cameraboxRightSide >= 19200 * (gameCanvas.height / 1080)) return
        if(cameraboxRightSide >= 19200 * (gameCanvas.height / 1080)) {
            this.position.x = ((gameCanvas.width / 2) - (this.width / 2))
            camera.position.x = - (this.position.x - ((gameCanvas.width / 2) - (this.width / 2)))
        }

        if (cameraboxRightSide >= gameCanvas.width - camera.position.x) {
            camera.position.x -= this.velocity.x
            layerBack2.velocity.x = 0.25
            layerBack.velocity.x = 0.25
        }
    }

    shouldPanCameraToTheRight({gameCanvas, camera}) {
        if (this.camerabox.position.x <= 0) return
        if (this.camerabox.position.x <= 0) {
            this.position.x = 19200 * (gameCanvas.height / 1080) - (gameCanvas.width / 2) + (this.width / 2)
            camera.position.x = - (this.position.x - ((gameCanvas.width / 2) - (this.width / 2)))
        }

        if (this.camerabox.position.x <= Math.abs(camera.position.x)) {
          camera.position.x -= this.velocity.x
          layerBack2.velocity.x = -0.25
          layerBack.velocity.x = -0.25
        }
    }

    update() {
        this.updateFrames()

        this.updateHitbox()

        this.updateCamerabox()
        // Canvas.fillStyle = 'rgba(0, 0, 255, 0.2)'
        // Canvas.fillRect(
        //     this.position.x,
        //     this.position.y,
        //     this.width,
        //     this.height
        // )
        // Canvas.fillStyle = 'rgba(255, 0, 0, 0.2'
        // Canvas.fillRect(
        //     this.hitbox.position.x,
        //     this.hitbox.position.y,
        //     this.hitbox.width,
        //     this.hitbox.height
        // )
        
        this.draw()
        this.position.x += this.velocity.x;
        if (this.position.x <= 1440 * (gameCanvas.height / 1080)) {
            this.position.x = (16800 * (gameCanvas.height / 1080))
            camera.position.x = - (this.position.x - ((gameCanvas.width / 2) - (this.width / 2)))
        } else if (this.position.x >= 17760 * (gameCanvas.height / 1080)) {
            this.position.x = 2400 * (gameCanvas.height / 1080)
            camera.position.x = - (this.position.x - ((gameCanvas.width / 2) - (this.width / 2)))
        }
        this.positionTemp = this.position.x / (gameCanvas.height / 1080);
    }

    updateHitbox() {
        this.hitbox = {
            position: {
                x: this.position.x - ((this.hitbox.width / 2) - (this.width / 2)),
                y: this.position.y
            },
            width: 145 * (gameCanvas.height / 1080),
            height: this.height
        }
    }
}