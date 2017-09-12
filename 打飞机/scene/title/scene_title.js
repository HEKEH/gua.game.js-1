class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        game.registerAction('f', function(){
            var s = Scene.new(game)
            game.replaceScene(s)
        })
	    var ps = GuaParticleSystem.new(game)
	    this.addElement(ps)
    }
    draw() {
        // draw labels
        this.game.context.fillText('按 f 开始游戏', 100, 190)
    }
}
