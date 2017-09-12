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
