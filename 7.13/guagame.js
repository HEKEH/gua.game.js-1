// 瓜
var GuaGame = function(fps) {
    var g = {
        actions: {},
        keydowns: {},
    }
    var canvas = document.querySelector('#id-canvas')
    var context = canvas.getContext('2d')
    g.canvas = canvas
    g.context = context
    // draw
    g.drawImage = function(guaImage) {
        g.context.drawImage(guaImage.image, guaImage.x, guaImage.y)
    }
    // events
    window.addEventListener('keydown', function(event){
        g.keydowns[event.key] = true
    })
    window.addEventListener('keyup', function(event){
        g.keydowns[event.key] = false
    })
    //
    g.registerAction = function(key, callback) {
        g.actions[key] = callback
    }
    // timer
    window.fps = 30
    var runloop = function() {
        log(window.fps)
        // events
        var actions = Object.keys(g.actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            if(g.keydowns[key]) {
                // 如果按键被按下, 调用注册的 action
                g.actions[key]()
            }
        }
        // update
        g.update()
        // clear
        context.clearRect(0, 0, canvas.width, canvas.height)
        // draw
        g.draw()
        // next run loop
        setTimeout(function(){
            runloop()
        }, 1000/window.fps)
    }

    setTimeout(function(){
        runloop()
    }, 1000/fps)

    return g
}
