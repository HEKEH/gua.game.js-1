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
        //this.fire()
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
    
    kill () {
        //显示粒子动画然后消失
        this.x = 1000
        this.alive = false
        
    }
}