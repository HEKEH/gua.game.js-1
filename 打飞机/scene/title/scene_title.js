class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        game.registerAction('k', function () {
            var s = Scene.new(game)
            game.replaceScene(s)
        })
    }

    draw() {
        // draw labels
        var canvas = document.querySelector('#id-canvas')
        var ctx = canvas.getContext('2d')
        ctx.font = '36px serif'
        this.game.context.fillText('按 k 开始游戏', 50, 190)
    }
}
