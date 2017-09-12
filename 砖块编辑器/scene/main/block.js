var Block = function(game, position) {
    // positon 是 [0, 0] 格式
    var p = position
    var img01 = game.imageByName('block01')
	var img02 = game.imageByName('block02')
	var img03 = game.imageByName('block03')
    var o = {
        x: p[0],
        y: p[1],
        alive: true,
        lifes: p[2] || 1,
    }
    if (o.lifes == 1) {
	    o.image = img01.image
    } else if (o.lifes == 2) {
	    o.image = img02.image
    } else if (o.lifes == 3) {
	    o.image = img03.image
    }
    console.log('o.lifes', o.lifes);
    // 根据o.lifes设置不同图片
    
    o.w = img01.w
    o.h = img01.h
    o.kill = function() {
	    var position =  [this.x, this.y]
		for (var i = 0; i < window.plusArray.length; i++) {
			if (window.plusArray[i] == position) {
				window.plusArray.splice(i)
			}
		}
	    console.log('b倍kill了', this);
        o.lifes--
        if (o.lifes < 1) {
            o.alive = false
        }
    }
    o.collide = function(b) {
        // log('block', o.alive, b)
        return o.alive && (rectIntersects(o, b) || rectIntersects(b, o))
    }
    return o
}
