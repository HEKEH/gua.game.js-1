var e = sel => document.querySelector(sel)

var log = console.log.bind(console)

var imageFromPath = function(path) {
    var img = new Image()
    img.src = path
    return img
}
var rectIntersects01 = function(a, b) {
	var o = a
	if (b.y > o.y && b.y < o.y + o.h) {
		if (b.x > o.x && b.x < o.x + o.w) {
			return true
		}
	}
	return false
}
var rectIntersects02 = function(a, b) {
	if (b.y < a.y && b.y + b.h > a.y) {
		if (b.x < a.x + a.w && b.x + b.w< a.x + a.w) {
			return true
		}
	}
	return false
}
var aInb = function(x, x1, x2) {
    return x >= x1 && x <= x2
}
const randomBetween = function(start, end) {
	var n = Math.random() * (end - start + 1)
	return Math.floor(n + start)
}