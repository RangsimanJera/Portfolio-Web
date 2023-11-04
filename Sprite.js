class Sprite {
    constructor({position, imageSrc, scale = 1, event = "none", text = "none", text2 = "none", frameRate = 1, frameBuffer = 48, animations, loop = true, orientation = "horizontal", play = "normal"}) {
        this.velocity = {
            x: 0,
        };
        this.position = position
        this.position.x = this.position.x * (gameCanvas.height / 1080);
        this.position.y = this.position.y * (gameCanvas.height / 1080);
        this.scale = scale
        this.orientation = orientation

        this.loaded = false
        this.image = new Image()
        this.image.onload = () => {
            if (this.orientation === 'vertical') {
                this.height = (this.image.height / this.frameRate) * (gameCanvas.height / 1080) * this.scale;
                this.width = this.image.width * (gameCanvas.height / 1080) * this.scale;
            } else {
                this.height = this.image.height * (gameCanvas.height / 1080) * this.scale;
                this.width = (this.image.width / this.frameRate) * (gameCanvas.height / 1080) * this.scale;
            }
            this.loaded = true
        }
        this.image.src = imageSrc

        this.frameRate = frameRate
        this.play = play
        if (play === 'reverse') this.currentFrame = this.frameRate - 1
        else this.currentFrame = 0
        this.frameBuffer = frameBuffer
        this.animations = animations
        this.elapsedFrames = 0
        this.loop = loop
        this.currentAnimation

        if (this.animations) {
            for (let key in this.animations) {
                const image = new Image()
                image.src = this.animations[key].imageSrc
    
                this.animations[key].image = image
            }
        }

        this.positionTempX = this.position.x / (gameCanvas.height / 1080);
        this.positionTempY = this.position.y / (gameCanvas.height / 1080);

        this.event = event
        this.text = text
        this.text2 = text2
        this.distance = 0
    }

    switchSprite(key) {
        if (this.image === this.animations[key] || !this.loaded) return
        
        this.image = this.animations[key].image
        this.frameBuffer = this.animations[key].frameBuffer
        this.frameRate = this.animations[key].frameRate
        this.loop = this.animations[key].loop
        this.currentAnimation = this.animations[key]
        this.orientation = this.animations[key].orientation
        this.play = this.animations[key].play
    }

    draw() {
        if (!this.image) return

        const cropbox = {
            position: {
                x: 0,
                y: 0,
            },
            width: this.image.width,
            height: this.image.height,
        }

        if (this.orientation === 'vertical') {
            cropbox.position.x = 0
            cropbox.position.y = this.currentFrame * (this.image.height / this.frameRate)
            cropbox.width = this.image.width,
            cropbox.height = this.image.height / this.frameRate
        } else {
            cropbox.position.x = this.currentFrame * (this.image.width / this.frameRate)
            cropbox.position.y = 0
            cropbox.width = this.image.width / this.frameRate
            cropbox.height = this.image.height
        }

        Canvas.drawImage(
            this.image, 
            cropbox.position.x, 
            cropbox.position.y, 
            cropbox.width,
            cropbox.height,
            this.position.x, 
            this.position.y, 
            this.width, 
            this.height
        )
    }

    updateSize() {
        this.height = this.image.height * (gameCanvas.height / 1080) * this.scale;
        this.width = (this.image.width / this.frameRate) * (gameCanvas.height / 1080) * this.scale;
        this.position = {
            x: this.positionTempX * (gameCanvas.height / 1080),
            y: this.positionTempY * (gameCanvas.height / 1080),
        }
    }

    update() {
        this.draw()
        this.updateFrames()
        this.position.x += this.velocity.x;
        this.positionTempX = this.position.x / (gameCanvas.height / 1080);
        this.positionTempY = this.position.y / (gameCanvas.height / 1080);
        
        if (this.event === "button" && page.main) {
            let dx = mouse.x - camera.position.x - (this.position.x + (this.width / 2))
            let dy = mouse.y - (this.position.y + (this.height / 2))
            this.distance = Math.sqrt(dx * dx + dy * dy)
            if (this.distance < mouse.radius + 15) {
                cursor.classList.add('button');
                // if (isMobile) {
                //     cursor.style.opacity = 1
                // }
                mouse.onLink = this.text
                button.innerHTML = mouse.onLink;
            }
        }
    }

    updateFrames() {
        this.elapsedFrames++

        if (this.orientation === 'vertical') {
            if (this.currentFrame === 0) {
                if (this.play === 'reverse') this.frameBuffer = 96
                else this.frameBuffer = 128
            }
            else this.frameBuffer = 12
        }

        if (this.play === 'reverse') {
            if (this.elapsedFrames % this.frameBuffer === 0) {
                if (this.currentFrame >= 0) this.currentFrame--
                else if (this.loop) this.currentFrame = this.frameRate - 1
            }

            if (this.currentAnimation?.onComplete) {
                if (this.currentFrame === -1 && !this.currentAnimation.isActive) {
                    this.currentAnimation.onComplete()
                    this.currentAnimation.isActive = true
                }
            }
        } 
        else {
            if (this.elapsedFrames % this.frameBuffer === 0) {
                if (this.currentFrame < this.frameRate - 1) this.currentFrame++
                else if (this.loop) this.currentFrame = 0
            }

            if (this.currentAnimation?.onComplete) {
                if (this.currentFrame === this.frameRate - 1 && !this.currentAnimation.isActive) {
                    this.currentAnimation.onComplete()
                    this.currentAnimation.isActive = true
                }
            }
        }   
    }
}