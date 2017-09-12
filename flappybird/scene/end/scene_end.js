class SceneEnd extends GuaScene {
    constructor(game) {
        super(game)
        game.registerAction('r', function(){
            var s = Scene.new(game)
            game.replaceScene(s)
        })
    }
    draw() {
        // draw labels
        this.game.context.fillText('游戏结束, 按 r 返回youxi界面', 50, 190)
    }
}
