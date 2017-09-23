class GuaImage {
    constructor (game, name) {
        this.game = game
        this.texture = game.textureByName(name)
        this.x = 0
        this.y = 0
        this.w = this.texture.width
        this.h = this.texture.height
    }
    
    static new (game, name) {
        var i = new this(game, name)
        return i
    }
    
    draw () {
    
    }
    
    update () {
    
    }
    
    rectIntersects (a, b) {
        var o = a
        if (b.y > o.y && b.y < o.y + o.image.height) {
            if (b.x > o.x && b.x < o.x + o.image.width) {
                return true
            }
        }
        return false
    }
}
