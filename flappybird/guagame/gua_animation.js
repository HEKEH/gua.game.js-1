class GuaAnimation {
    constructor(game) {
        this.game = game
        //为了省事，在这里hard code —套动画
        this.animations = {
            idle: [],
        }
        for (var i = 0; i < 3; i++) {
            var name = `bird${i}`
            var t = game.textureByName(name)
            this.animations['idle'].push(t)
        }
        
        this.animationName = 'idle'
	    console.log('this.frameCount', this.frameCount);
        this.texture = this.frames()[2]
        this.w = this.texture.width
        this.h = this.texture.height
        this.frameIndex = 0
        this.frameCount = 3

        this.flipX = false
        this.rotation = 0
        this.alpha = 1
        // 重力和加速度
        this.gy = 10
        this.vy = 0
    }
    static new(game) {
        return new this(game)
    }
    frames () {
        return this.animations[this.animationName]
    }
    jump() {
        this.vy = -10
        this.rotation = -45
    }
    update() {
        //更新　alpha
        if (this.alpha > 0) {
            this.alpha -= 0.05
        }
        // 更新受力
        this.y += this.vy
        this.vy += this.gy * 0.2
        var h = 415
        if (this.y > h) {
            this.y = h
	        var end = SceneEnd.new(this.game)
	        this.game.replaceScene(end)
        }
        // 更新角度
        if (this.rotation < 45) {
            this.rotation += 5
        }
        // console.log('this.frameCount', this.frameCount);
        this.frameCount--
        if (this.frameCount == 0) {
            this.frameCount = 3
        }
	    this.frameIndex = (this.frameIndex + 1) % this.frames().length
	    this.texture = this.frames()[this.frameIndex]
        // 判断两者是否相撞
        var a01 = this
	    // console.log('pppp', this.frameCount, this.texture);
		for (var i = 0; i < window.pipesArray.length; i++) {
      
		    var p = window.pipesArray[i]
			var con = rectIntersects02(a01, p)
			if (p.y > 0 ) {
				var con = rectIntersects01(p, a01)
			}
			if (con) {
				console.log('p.y', p.y, con);
				var end = SceneEnd.new(this.game)
				this.game.replaceScene(end)
			}
			// console.log('con', this);
		}
    }
    draw() {
        var context = this.game.context
        context.save()

        var w2 = this.w / 2
        var h2 = this.h / 2
        context.translate(this.x + w2 ,this.y + h2)
        if (this.flipX) {
            context.scale(-1, 1)
        }
        context.globalAlpha = this.alpha
        context.rotate(this.rotation * Math.PI / 180)
        context.translate(-w2, -h2)

        context.drawImage(this.texture, 0, 0)

        context.restore()
    }
    move(x, keyStatus) {
        this.flipX = (x < 0)
        this.x += x
        // console.log('this.flipX', this.flipX, this.x);
        // var animationNames = {
        //     down: 'run',
        //     up: 'idle',
        // }
        // var name = animationNames[keyStatus]
        // this.changeAnimation[name]
    }
    changeAnimation(name) {
        this.animationName = name
    }
}
