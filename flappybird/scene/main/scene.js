class Scene extends GuaScene {
    constructor(game) {
        super(game)
        // var label = GuaLabel.new(game, 'hello from gua')
        // this.addElement(label)

        // cave bg
        var bg = GuaImage.new(game, 'bg')
        this.addElement(bg)
        // 加入水管
        this.pipe = Pipes.new(game)
        this.addElement(this.pipe)
        // 循环移动的地面
        this.grounds = []
        for (var i = 0; i < 30; i++) {
            var g = GuaImage.new(game, 'ground')
            g.x = i * 19
            g.y = 450
            this.addElement(g)
            this.grounds.push(g)
        }
        this.skipCount = 5
        // bird
        var b = GuaAnimation.new(game)
        b.x = 100
        b.y = 150
        this.bird = b
        this.addElement(b)

        this.setupInputs()
    }
    update() {
        super.update()
        // 地面移动
        this.skipCount--
        var offset = -5
        if (this.skipCount == 0) {
            this.skipCount = 4
            offset = 15
        }
        for (var i = 0; i < 30; i++) {
            var g = this.grounds[i]
            g.x += offset
        }
    }
    setupInputs() {
        var self = this
        var b = this.bird
        self.game.registerAction('a', function (keyStatus) {
            b.move(-5, keyStatus)
        })
        self.game.registerAction('d', function (keyStatus) {
            b.move(5, keyStatus)
        })
        self.game.registerAction('w', function (keyStatus) {
            b.jump()
        })
    }
    collide(pipe) {
        return rectIntersects(this, pipe) && rectIntersects(pipe, this)
    }

}