const config = {
    player_speed: 10,
    cloud_speed: 10,
    enemy_speed: 10,
    bullet_speed: 10,
    fire_cooldown: 9,
    enemy_fire_cooldown: 20,
}
class Bullet extends GuaImage {
    constructor (game) {
        super(game, 'bullet')
        this.setup()
    }
    
    setup () {
        this.speed = config.bullet_speed
        // this.speed = 1
    }
    
    update () {
        this.y -= this.speed
        // log('子弹',this.x,this.y)
        let enemies = this.game.scene.enemies || []
        for (let e of enemies) {
            if (this.collide(e)) {
                this.kill()
                // e.explode(e.x, e.y)
                e.kill()
            } else if (this.scene.player.collide(e)) {
                // log('撞上敌人')
                this.scene.player.kill()
                // e.explode(e.x, e.y)
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
    
    kill () {
        this.x = 900
    }
    
    collide (ball) {
        let aInb = function (x, x1, x2) {
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

class Enemybullet extends GuaImage {
    constructor (game) {
        super(game, 'enemyBullet')
        this.setup()
    }
    
    setup () {
        this.speed = config.bullet_speed
        // this.speed = 1
    }
    
    update () {
        this.y += this.speed
        let player = this.scene.player
        if (this.collide(player)) {
            this.kill()
            player.kill()
        }
    }
    
    kill () {
        this.x = 900
    }
    
    collide (ball) {
        let aInb = function (x, x1, x2) {
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
    constructor (game) {
        super(game, 'player')
        this.setup()
    }
    
    setup () {
        this.speed = 5
        this.cooldown = 0
    }
    
    update () {
        this.speed = config.player_speed
        if (this.cooldown > 0) {
            this.cooldown--
        }
    }
    
    fire () {
        if (this.cooldown == 0) {
            this.cooldown = config.fire_cooldown
            var x = this.x + this.w / 2
            var y = this.y
            var b = Bullet.new(this.game)
            b.x = x
            b.y = y
            this.scene.addElement(b)
        }
    }
    
    kill () {
        let game = this.game
        let s = SceneEnd.new(game)
        game.replaceScene(s)
        log('切换场景')
    }
    
    collide (ball) {
        let aInb = function (x, x1, x2) {
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
    
    moveLeft () {
        this.x -= this.speed
    }
    
    moveRight () {
        this.x += this.speed
    }
    
    moveUp () {
        this.y -= this.speed
    }
    
    moveDown () {
        this.y += this.speed
    }
}

const randomBetween = function (start, end) {
    var n = Math.random() * (end - start + 1)
    return Math.floor(n + start)
}
class Enemy extends GuaImage {
    constructor (game) {
        var type = randomBetween(0, 1)
        var name = 'enemy' + type
        super(game, name)
        this.setup()
    }
    
    setup () {
        this.speed = randomBetween(2, 3)
        this.x = randomBetween(0, 350)
        this.y = -randomBetween(0, 200)
        this.cooldown = 0
    }
    
    update () {
        this.y += this.speed
        this.fire()
        if (this.y > 600) {
            this.setup()
        }
        if (this.cooldown > 0) {
            this.cooldown--
        }
    }
    
    fire () {
        if (this.cooldown == 0) {
            this.cooldown = config.enemy_fire_cooldown
            var x = this.x + this.w / 2
            var y = this.y + this.h
            var b = Enemybullet.new(this.game)
            b.x = x
            b.y = y
            this.scene.addElement(b)
        }
    }
    
    // explode(x, y) {
    //     let game = this.game
    //     let ps = GuaParticleSystem.new(game)
    //     ps.x = x
    //     ps.y = y
    //     // log('psps', ps.x, ps.y)
    //     // log('this',this,this.scene)
    //     this.scene.addElement(ps)
    // }
    kill () {
        //显示粒子动画然后消失
        this.x = 1000
        this.alive = false
        
    }
}

class Cloud extends GuaImage {
    constructor (game) {
        super(game, 'cloud')
        this.setup()
    }
    
    setup () {
        this.speed = 1
        this.x = randomBetween(0, 350)
        this.y = -randomBetween(0, 200)
    }
    
    update () {
        this.y += this.speed
        if (this.y > 600) {
            this.setup()
        }
    }
    
    debug () {
        this.speed = config.cloud_speed
    }
}

class Scene extends GuaScene {
    constructor (game) {
        super(game)
        this.setup()
        this.setupInputs()
    }
    
    setup () {
        var game = this.game
        this.numberOfEnemies = 10
        this.bg = GuaImage.new(game, 'sky')
        this.cloud = Cloud.new(game, 'cloud')
        
        // this.player = GuaImage.new(game, 'player')
        // this.player.x = 100
        // this.player.y = 450
        this.player = Player.new(game)
        this.player.x = 100
        this.player.y = 450
        
        this.addElement(this.bg)
        this.addElement(this.cloud)
        this.addElement(this.player)
        //
        this.addEnemies()
    }
    
    addEnemies () {
        var es = []
        for (var i = 0; i < this.numberOfEnemies; i++) {
            var e = Enemy.new(this.game)
            es.push(e)
            this.addElement(e)
        }
        this.enemies = es
    }
    
    setupInputs () {
        var g = this.game
        var s = this
        g.registerAction('a', function () {
            s.player.moveLeft()
        })
        g.registerAction('d', function () {
            s.player.moveRight()
        })
        g.registerAction('w', function () {
            s.player.moveUp()
        })
        g.registerAction('s', function () {
            s.player.moveDown()
        })
        g.registerAction('j', function () {
            s.player.fire()
        })
    }
    
    update () {
        super.update()
        this.cloud.y += 1
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
