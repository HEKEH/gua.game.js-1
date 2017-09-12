class Scene extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
    }
    setup() {
        var game = this.game
        this.bg = GuaImage.new(game, 'sky')
        this.cloud = GuaImage.new(game, 'cloud')

        this.player = GuaImage.new(game, 'player')
        this.player.x = 100
        this.player.y = 450

        this.addElement(this.bg)
        this.addElement(this.player)
        this.addElement(this.cloud)
    }
    update() {
        this.cloud.y += 1
    }
}
