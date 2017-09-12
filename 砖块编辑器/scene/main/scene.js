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

// var Scene = function(game) {
//     var s = {
//         game: game,
//     }
//     // 初始化
//     var paddle = Paddle(game)
//     var ball = Ball(game)
//     var score = 0
//
//     var blocks = loadLevel(game, 1)
//     game.registerAction('a', function(){
//         paddle.moveLeft()
//     })
//     game.registerAction('d', function(){
//         paddle.moveRight()
//     })
//     game.registerAction('f', function(){
//         ball.fire()
//     })
//
//     s.draw = function(drawArray) {
//         // draw 背景
//         game.context.fillStyle = "#554"
//         game.context.fillRect(0, 0, 400, 300)
//         // draw
//         game.drawImage(paddle)
//         game.drawImage(ball)
//         // draw blocks
//         for (var i = 0; i < blocks.length; i++) {
//             var block = blocks[i]
//             if (block.alive) {
//                 game.drawImage(block)
//             }
//         }
//         // draw labels
//         game.context.fillText('分数: ' + score, 10, 290)
//     }
//     s.update = function() {
//         if (window.paused) {
//             return
//         }
//
//         ball.move()
//         // 判断游戏结束
//         if (ball.y > paddle.y) {
//             // 跳转到 游戏结束 的场景
//             var end = SceneEnd.new(game)
//             game.replaceScene(end)
//         }
//         // 判断相撞
//         if (paddle.collide(ball)) {
//             // 这里应该调用一个 ball.反弹() 来实现
//             ball.反弹()
//         }
//         // 判断 ball 和 blocks 相撞
//         for (var i = 0; i < blocks.length; i++) {
//             var block = blocks[i]
//             if (block.collide(ball)) {
//                 // log('block 相撞')
//                 block.kill()
//                 ball.反弹()
//                 // 更新分数
//                 score += 100
//             }
//         }
//         if (window.array) {
//
// 	        for (var j = 0; j < window.array.length; j++) {
// 		        var array01 = window.array[j]
// 		        if (array01.collide(ball)) {
// 			        array01.kill()
// 			        // 在此处判断球与那个block相撞，然后删除
// 			        window.plusArray.splice(j)
// 			        ball.反弹()
// 			        // 更新分数
// 			        score += 100
// 		        }
// 	        }
//         }
//     }
//
//     // mouse event
//     var enableDrag = false
//     game.canvas.addEventListener('mousedown', function(event) {
//         var x = event.offsetX
//         var y = event.offsetY
//         // log(x, y, event)
//         // 检查是否点中了 ball
//         if (ball.hasPoint(x, y)) {
//             // 设置拖拽状态
//             enableDrag = true
//         }
//     })
//     game.canvas.addEventListener('mousemove', function(event) {
//         var x = event.offsetX
//         var y = event.offsetY
//         // log(x, y, 'move')
//         if (enableDrag) {
//             // log(x, y, 'drag')
//             ball.x = x
//             ball.y = y
//         }
//     })
//     game.canvas.addEventListener('mouseup', function(event) {
//         var x = event.offsetX
//         var y = event.offsetY
//         // log(x, y, 'up')
//         enableDrag = false
//     })
//
//     return s
// }
