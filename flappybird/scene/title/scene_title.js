class Pipes {
    constructor(game) {
        this.game = game
        this.setup()
        this.addPipes()
    }
    static new(...args) {
        this.i = new this(...args)
        return this.i
    }
    setup() {
        this.pipes = []
        this.pipeSpace = 150
        this.pipeCross = 200
        this.columsOfPipe = 3
        // this.alive = true
    }
    reset() {
        for (var i = 0; i < this.columsOfPipe; i++) {
            var index = i * 2
            var p1 = this.pipes[index]
            var p2 = this.pipes[index+1]
            p1.x = 500 + i * this.pipeCross
            p1.y = randonBetween(-150, 0)
            this.resetPipesPostion(p1, p2)
        }

    }
    addPipes() {
        var game = this.game
        for (var i = 0; i < this.columsOfPipe; i++) {
            var p1 = GuaImage.new(game, 'pipe_down')

            p1.x = 500 + i * this.pipeCross
            p1.y = randomBetween(-150, 0)


            var p2 = GuaImage.new(game, 'pipe_up')

            this.resetPipesPosition(p1, p2)
            this.pipes.push(p1)
            this.pipes.push(p2)
        }
    }

    resetPipesPosition(p1, p2) {
        p2.x = p1.x
        p2.y = p1.y + p1.h + this.pipeSpace
    }
    debug() {
        this.pipeCross = config.pipeCross.value
        this.pipeSpace = config.pipe_space.value
    }

    update() {
        if (window.paused) {
            return
        }
		
        for (var i = 0; i < this.columsOfPipe ; i ++) {
            var index = i * 2
            var p1 = this.pipes[index]
            var p2 = this.pipes[index+1]
            p1.x -= 5
            this.resetPipesPosition(p1,p2)
            if (p1.x < -p1.w) {
                   p1.x =  this.pipeCross * this.columsOfPipe
                   this.resetPipesPosition(p1, p2)
            }

        }
	    window.pipesArray = this.pipes
    }
    draw() {
        var context = this.game.context
        for(var p of this.pipes) {
            context.drawImage(p.texture, p.x, p.y, p.w, p.h)
        }
    }
}
class SceneTitle extends GuaScene {
	constructor(game) {
		super(game)
		game.registerAction('f', function(){
			var s = Scene.new(game)
			game.replaceScene(s)
		})
	}
	draw() {
		// draw labels
		this.game.context.fillText('按 f 开始游戏', 50, 190)
	}
}
// class SceneTitle extends GuaScene {
// 	constructor(game) {
// 		super(game)
// 		game.registerAction('k', function(){
// 			var s = Scene.new(game)
// 			game.replaceScene(s)
// 		})
// 	}
// 	draw() {
// 		// draw labels
// 		this.game.context.fillText('按 k 开始游戏', 100, 190)
// 	}
// }
// class SceneTitle extends GuaScene {
//     constructor(game) {
//         super(game)
//         // var label = GuaLabel.new(game, 'hello from gua')
//         // this.addElement(label)
//
//         // cave bg
//         var bg = GuaImage.new(game, 'bg')
//         this.addElement(bg)
//         // 加入水管
//         this.pipe = Pipes.new(game)
//         this.addElement(this.pipe)
//         // 循环移动的地面
//         this.grounds = []
//         for (var i = 0; i < 30; i++) {
//             var g = GuaImage.new(game, 'ground')
//             g.x = i * 19
//             g.y = 450
//             this.addElement(g)
//             this.grounds.push(g)
//         }
//         this.skipCount = 5
//         // bird
//         var b = GuaAnimation.new(game)
//         b.x = 100
//         b.y = 150
//         this.bird = b
//         this.addElement(b)
//
//         this.setupInputs()
//     }
//     update() {
//         super.update()
//         // 地面移动
//         this.skipCount--
//         var offset = -5
//         if (this.skipCount == 0) {
//             this.skipCount = 4
//             offset = 15
//         }
//         for (var i = 0; i < 30; i++) {
//             var g = this.grounds[i]
//             g.x += offset
//         }
//     }
//     setupInputs() {
//         var self = this
//         var b = this.bird
//         self.game.registerAction('a', function (keyStatus) {
//             b.move(-5, keyStatus)
//         })
//         self.game.registerAction('d', function (keyStatus) {
//             b.move(5, keyStatus)
//         })
//         self.game.registerAction('w', function (keyStatus) {
//             b.jump()
//         })
//     }
//     collide(pipe) {
//         return rectIntersects(this, pipe) && rectIntersects(pipe, this)
//     }
//
// }
