class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        var label = GuaLabel.new(game, 'hello from gua')
        this.addElement(label)

        // cave bg
        var cave = GuaImage.new(game, 'cave')
        this.addElement(cave)
        // player
        var w = GuaAnimation.new(game)
        w.x = 100
        w.y = 480
        this.w = w
        this.addElement(w)

        this.setupInputs()
    }
    setupInputs() {
        var self = this
        self.game.registerAction('a', function (keyStatus) {
            self.w.move(-2, keyStatus)
        })
        self.game.registerAction('d', function (keyStatus) {
            self.w.move(2, keyStatus)
        })
    }
}
