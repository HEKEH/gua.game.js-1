const config = {
    player_speed: 10,
    cloud_speed: 10,
    enemy_speed: 10,
    bullet_speed: 10,
    fire_cooldown: 9,
    enemy_fire_cooldown: 20,
}
class Bullet extends GuaImage {
	constructor(game) {
		super(game, 'bullet')
		this.setup()
	}
	setup(game) {
		this.speed = config.bullet_speed.value
	}
	update(game) {
		this.x += this.speed
		// log('子弹',this.x,this.y)
		let enemies = this.game.scene.enemies || []
		for (let e of enemies) {
			if (this.collide(e)) {
				this.kill()
				e.explode(e.x, e.y)
				e.kill()
				config.score.value += 1
				log(config.score.value)
			} else if (this.scene.player.collide(e)) {
				// log('撞上敌人')
				this.scene.player.kill()
				e.explode(e.x, e.y)
				e.kill()
			}
		}
		let playerBullets = this.scene.playerBullets || []
		let enemiesBullets = this.scene.enemiesBullets || []
		for (let pb of playerBullets) {
			for (let eb of enemiesBullets) {
				if (pb.collide(eb)) {
					pb.kill()
					eb.kill()
				}
			}
			
		}
	}
	kill() {
		this.x = 900
	}
	
	collide(ball){
		let aInb = function(x, x1, x2) {
			return x >= x1 && x <= x2
		}
		let a = this
		let b = ball
		if (aInb(a.x, b.x, b.x + b.w) || aInb(b.x, a.x, a.x + a.w)) {
			if (aInb(a.y, b.y, b.y + b.h) || aInb(b.y, a.y, a.y + a.h)) {
				return true
			}
		}
		return false
	}
}
class EnemyBullet extends GuaImage {
	constructor(game) {
		super(game, 'enemyBullet')
		this.setup()
	}
	setup(game) {
		this.speed = config.bullet_speed.value
	}
	update(game) {
		this.x -= this.speed
		let player = this.scene.player
		if (this.collide(player)) {
			this.kill()
			player.kill()
		}
	}
	kill() {
		this.x = 900
	}
	
	collide(ball){
		let aInb = function(x, x1, x2) {
			return x >= x1 && x <= x2
		}
		let a = this
		let b = ball
		if (aInb(a.x, b.x, b.x + b.w) || aInb(b.x, a.x, a.x + a.w)) {
			if (aInb(a.y, b.y, b.y + b.h) || aInb(b.y, a.y, a.y + a.h)) {
				return true
			}
		}
		return false
	}
}


class Player extends GuaImage {
	constructor(game) {
		super(game, 'player')
		this.setup()
	}
	setup() {
		this.speed = 5
		this.cooldown = 0
	}
	update() {
		this.speed = config.player_speed.value
		if (this.cooldown > 0) {
			this.cooldown--
		}
	}
	fire(initColiide) {
		// let self = this
		let game = this.game
		if (this.cooldown == 0) {
			this.cooldown = config.fire_cooldown.value
			let x = this.x + this.w / 2
			let y = this.y
			let b = Bullet.new(game)
			b.x = x
			b.y = y
			if (initColiide) {
				b.x = 1000
			}
			this.addPlayerBullets(b)
		}
	}
	addPlayerBullets(b) {
		this.scene.playerBullets.push(b)
		this.scene.addElement(b)
	}
	kill() {
		let game = this.game
		let s = SceneEnd.new(game)
		game.replaceScene(s)
		// log('切换场景')
	}
	moveLeft() {
		if (this.x > 0) {
			this.x -= this.speed
		}
	}
	moveRight() {
		if (this.x < this.game.canvas.width - this.scene.player.w - this.speed) {
			this.x += this.speed
		}
	}
	moveUp() {
		if (this.y > 0) {
			this.y -= this.speed
		}
	}
	moveDown() {
		if (this.y < this.game.canvas.height - this.scene.player.h) {
			this.y += this.speed
		}
	}
	collide(ball){
		let aInb = function(x, x1, x2) {
			return x >= x1 && x <= x2
		}
		let a = this
		let b = ball
		if (aInb(a.x, b.x, b.x + b.w) || aInb(b.x, a.x, a.x + a.w)) {
			if (aInb(a.y, b.y, b.y + b.h) || aInb(b.y, a.y, a.y + a.h)) {
				return true
			}
		}
		return false
	}
	
}

class Enemy extends GuaImage {
	constructor(game) {
		let type = randomBetween(0, 3)
		let name = 'enemy' + type
		super(game,name)
		this.setup()
	}
	setup(){
		this.alive = true
		this.speed = randomBetween(2, 5)
		this.x = randomBetween(0, 600)
		this.y = -randomBetween(0, 200)
		this.cooldown = 0
	}
	update() {
		this.y += this.speed
		if (this.y > 600) {
			this.setup()
		}
		let game = this.game
		if (this.cooldown > 0) {
			this.cooldown--
		}
		if (this.alive && this.cooldown == 0) {
			this.cooldown = config.fire_cooldown.value
			let b = EnemyBullet.new(game)
			b.x = this.x + this.w / 2
			b.y = this.y
			this.addEnemiesBullets(b)
		}
		
	}
	addEnemiesBullets(b) {
		this.scene.enemiesBullets.push(b)
		this.scene.addElement(b)
	}
	kill() {
		//显示粒子动画然后消失
		this.x = 1000
		this.alive = false
		
	}
	explode(x, y) {
		let game = this.game
		let ps = GuaParticleSystem.new(game)
		ps.x = x
		ps.y = y
		// log('psps', ps.x, ps.y)
		// log('this',this,this.scene)
		this.scene.addElement(ps)
	}
}



class Cloud extends GuaImage {
	constructor(game) {
		super(game,'cloud')
		this.setup()
	}
	setup(){
		this.speed = 1
		this.x = randomBetween(0, this.game.canvas.width - this.w)
		this.y = -this.h
	}
	update() {
		this.speed = config.cloud_speed.value
		this.y += this.speed
		if (this.y > this.game.canvas.height) {
			this.setup()
		}
	}
	debug() {
		this.speed = config.cloud_speed.value
	}
}

class Scene extends GuaScene {
	constructor(game) {
		super(game)
		this.setup()
		this.setupInputs()
		
	}
	setup() {
		this.playerBullets = []
		this.enemiesBullets = []
		
		let game = this.game
		this.label = Gualabel.new(game,'X ' + config.score.value)
		this.label.x = 400
		this.label.y = 200
		this.numberOfEnemies = 3
		this.bg = GuaImage.new(game, 'sky')
		this.carrot = GuaImage.new(game, 'carrot')
		this.cloud = Cloud.new(game, 'cloud')
		this.player = Player.new(game)
		
		
		this.addElement(this.bg)
		this.addElement(this.cloud)
		this.player.x = 0
		this.player.y = 150
		this.addElement(this.player)
		this.carrot.x = -10
		this.carrot.y = 120
		this.addElement(this.carrot)
		
		
		// 添加敌人
		this.addEnemies()
	}
	addEnemies() {
		let arr = []
		for (let i = 0; i < this.numberOfEnemies ; i++) {
			let e = Enemy.new(this.game)
			arr.push(e)
			this.addElement(e)
		}
		this.enemies = arr
	}
	setupInputs() {
		let g = this.game
		let s = this
		g.registerAction('w', function(){
			s.player.moveUp()
		})
		g.registerAction('a', function(){
			s.player.moveLeft()
		})
		g.registerAction('s', function(){
			s.player.moveDown()
		})
		g.registerAction('d', function(){
			s.player.moveRight()
		})
		// 解决初始不碰撞问题
		s.player.fire('initColiide')
		g.registerAction('j', function(){
			s.player.fire()
		})
	}
	update() {
		super.update()
		this.cloud.y += 1
		this.cloud.x += 1
		this.addElement(this.label)
		
	}
}

//
// class GuaParticleSystem {
//     constructor(game) {
//         this.game = game
//         this.setup(game)
//     }
//     static new(game) {
//         return new this(game)
//     }
//     setup() {
//         this.duration = 10
//         // this.x = 150
//         // this.y = 200
//         this.numberOfParticles = 20
//         this.particles = []
//     }
//     update() {
//         this.duration--
//         // 添加 小火花
//         if (this.particles.length < this.numberOfParticles) {
//             let p = GuaParticle.new(this.game)
//             //设置初始化坐标
//             let s = 2
//             let vx = randomBetween(-s, s)
//             let vy = randomBetween(-s, s)
//             p.init(this.x, this.y, vx, vy)
//             this.particles.push(p)
//         }
//         // 更新所有的小火花
//         for(let p of this.particles) {
//             p.update()
//         }
//         //删除死掉的小火花
//         this.particles = this.particles.filter(p => p.life > 0)
//     }
//     draw() {
//         if (this.duration < 0) {
//             // log('删掉',this.game.scene.elements)
//             //Todo 删掉小火花
//             //在数组中找到并且splice掉它
//             //应该从scene删除
//             return
//         }
//         for(let p of this.particles) {
//             p.draw()
//         }
//     }
// }
//
// class GuaParticle extends GuaImage {
//     constructor(game) {
//         super(game, 'star')
//         this.setup()
//     }
//     setup() {
//         this.life = 10
//     }
//     init(x, y, vx, vy) {
//         this.x = x + this.w * 2
//         this.y = y + this.h * 2
//         this.vy = vy
//         this.vx = vx
//     }
//     update() {
//         this.life--
//         this.x += this.vx
//         this.y += this.vy
//         let factor = 0.01
//         this.vx += factor * this.vx
//         this.vy += factor * this.vy
//     }
// }
