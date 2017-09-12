var levels = [
    [
        [0, 0,],
    ],
    [
        [50, 0,],
        [100, 100,],
    ],
    [
        [50, 30,],
        [100, 100, 2],
        [200, 100, 2],
    ],
]
var randomInt = function(a, b) {
	var mathRandom = Math.random()
	var numberRandom = mathRandom * (b - a + 1) + (a - 1)
	// 对数进行上舍入。
	var intRandom = Math.ceil(numberRandom)
	return intRandom
}
// 产生随机的数组，这个就是block的位置和生命
var suijishuzu = function () {
    var arr = []
    var numRow = randomInt(0, 10)
    var numCol = randomInt(0, 10)
    var numLives = randomInt(1, 3)
    arr.push(numRow)
    arr.push(numCol)
    arr.push(numLives)
    return arr
}