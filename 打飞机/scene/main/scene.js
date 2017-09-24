
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
