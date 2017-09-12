class GuaLabel {
    constructor(game, text) {
        this.game = game
        this.text = text
    }
    static new(game, text) {
        return new this(game, text)
    }
    draw() {
        // console.log('draw', this.text, this.game);
        this.game.context.fillText(this.text, 100, 190)
    }
    update() {
    }
}

class GuaParticle extends GuaImage {
    constructor(game) {
        super(game, 'ball')
        this.setup()
    }
    setup() {
        this.life = 100
    }
    init(x, y, vx, vy) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
    }
    update() {
        this.life--
        this.x += this.vx
        this.y += this.vy
        var factor = 0.01
        this.vx += factor * this.vx
        this.vy += factor * this.vy
    }
}

class GuaParticleSystem {
    constructor(game) {
        this.game = game
        this.setup()
    }
    static new(game) {
        return new this(game)
    }
    setup() {
        this.duration = 50
        this.x = 150
        this.y = 200
        this.numberOfParticles = 50
        this.particles = []
    }
    update() {
        this.duration--
        // 元素的draw是通过gua_scene中的addElement生成的，只要从该数组中删除掉即可
        if (this.duration < 0) {

        }
        //添加小火花
        if (this.particles.length < this.numberOfParticles) {
            var p = GuaParticle.new(this.game)
            var s = 2
            var vx = randomBetween(-s, s)
            var vy = randomBetween(-s, s)
            p.init(this.x, this.y, vx, vy)
	        // console.log('this.particles', this.particles);
            this.particles.push(p)
        }
        //更新所有的小火花
        for (var p of this.particles) {
            p.update()
	
	        console.log('更新this.particles', this.particles);
        }
        // 删除死掉的小火花
        this.particles = this.particles.filter(p => p.life > 0)
    }
    draw() {
        if (this.duration < 0) {
            // TODO,这是临时方案
            //应该从scene中删除自己才对
            return
        }
        for (var p of this.particles) {
            p.draw()
        }
    }
}

class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        var label = GuaLabel.new(game, 'hello')
        this.addElement(label)
	    console.log('7.28--GuaParticleSystem的参数', game);
        var ps = GuaParticleSystem.new(game)
	    console.log('7.28--ps', ps);
        this.addElement(ps)
    }
    // draw() {
    //     super.draw()
    //     // draw labels
    //     // this.game.context.fillText('按 k 开始游戏', 100, 190)
    // }
}
