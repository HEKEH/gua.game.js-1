var e = sel => document.querySelector(sel)

var log = console.log.bind(console)

let imageFromPath = function(path) {
	let img = new Image()
	img.src = path
	return img
}

var rectIntersects = function(a, b) {
    var o = a
    if (b.y > o.y && b.y < o.y + o.image.height) {
        if (b.x > o.x && b.x < o.x + o.image.width) {
            return true
        }
    }
    return false
}
const randomBetween = function(start, end) {
	var n = Math.random() * (end - start + 1)
	return Math.floor(n + start)
}

let templateControl = function(key,item) {
	let t = `<div class="">
        <label>
            <input class="gua-auto-slider" type="range"
                max='300'
                value="${item.value}"
                data-value='config.${key}'>
            ${item._comment}: <span class="gua-label"></span>
        </label>
    </div>`
	return t
}

let insertControls = function() {
	let div = e('.gua-controls')
	let keys = Object.keys(config)
	for (let k of keys) {
		let item = config[k]
		let html = templateControl(k, item)
		div.insertAdjacentHTML('beforeend',html)
	}
}

let bindEvents = function() {
	bindAll('.gua-auto-slider','input',function(event) {
		let target = event.target
		let bindlet = target.dataset.value
		let v = target.value
		eval(bindlet + '.value =' + v)
		//
		let label = target.closest('label').querySelector('.gua-label')
		label.innerText = v
	})
}


class Gualabel {
	constructor(game, text) {
		this.game = game
		this.text = text
	}
	static new(game, text) {
		return new this(game, text)
	}
	draw() {
		this.game.context.fillText(this.text, 100, 190)
	}
	update() {
	
	}
}