var loadLevel = function(game, n) {
    n = n - 1
    var level = levels[n]
    window.blocks = []
	
    for (var i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Block(game, p)
        blocks.push(b)
    }
    return blocks
}

var enableDebugMode = function(game, enable) {
    if(!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function(event){
        var k = event.key
        if (k == 'p') {
            // 暂停功能
            window.paused = !window.paused
        } else if ('1234567'.includes(k)) {
            // 为了 debug 临时加的载入关卡功能
            blocks = loadLevel(game, Number(k))
        }
    })
    // 控制速度
    document.querySelector('#id-input-speed').addEventListener('input', function(event) {
        var input = event.target
        // log(event, input.value)
        window.fps = Number(input.value)
    })
}
window.plusArray = []
var __main = function() {
    var images = {
        ball: 'img/ball.png',
        block01: 'img/block01.png',
	    block02: 'img/block02.png',
	    block03: 'img/block03.png',
        paddle: 'img/paddle.png',
    }
    var game = GuaGame.instance(30, images, function(g){
        var s = SceneTitle.new(g)
        g.runWithScene(s)
    })
	window.blocks = []
	var randomInt = function(a, b) {
		// 返回 0 ~ 1 之间的随机数。
		var mathRandom = Math.random()
		var numberRandom = mathRandom * (b - a + 1) + (a - 1)
		// 对数进行上舍入。
		var intRandom = Math.ceil(numberRandom)
		return intRandom
	}
	window.addEventListener('click', function (event) {
		var lives = randomInt(1, 3)
		var position = [event.offsetX, event.offsetY, lives]
		var block01 = Block(game, position)
		console.log('block01', block01);
		window.blocks.push(block01)
	})
    enableDebugMode(game, true)
}
__main()
