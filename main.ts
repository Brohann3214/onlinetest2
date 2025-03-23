namespace SpriteKind {
    export const hitbox = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mySprite.isHittingTile(CollisionDirection.Bottom) || myhitbox.overlapsWith(mySprite2)) {
        mySprite.vy = -170
    }
})
let mySprite2: Sprite = null
let myhitbox: Sprite = null
let mySprite: Sprite = null
let playerid = 1
let gottenanswer = false
let connection = false
let answer = ''
let datareq = ""
let req = ""
let testmsg = "tick"
const ws = new WebSocket("wss://weboscketserver2.onrender.com")
control.runInParallel(function () {
    console.log(`connecting to wss://weboscketserver2.onrender.com`)


    ws.onerror = () => console.log("error connecting to server, it may be offline.")
    ws.onmessage = (msg) => {
        gottenanswer = true
        connection = true
        const data = msg.data;
        console.log(`[Recieved] ${data}`)
        answer = `${data}`
    }
    ws.onopen = () => {

        //ws.send(msg);
        console.log(`connected`);
        //connection = true

        game.onUpdateInterval(10000, function () {
            ws.send("tick")
        })

    }
    ws.onclose = () => {
        console.log("disconnected")
    }


})
game.consoleOverlay.setVisible(true)
scene.setBackgroundColor(13)
tiles.setCurrentTilemap(tilemap`level`)
mySprite = sprites.create(img`
    . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 . 
    2 4 4 4 4 4 4 4 4 4 4 4 4 4 4 2 
    2 4 4 4 4 4 4 4 4 4 4 4 4 4 4 2 
    2 4 4 4 4 4 4 4 4 4 4 4 4 4 4 2 
    2 4 4 4 4 4 4 4 4 4 4 4 4 4 4 2 
    2 4 4 4 4 4 4 4 4 4 4 4 4 4 4 2 
    2 4 4 4 4 4 4 4 4 4 4 4 4 4 4 2 
    2 4 4 4 4 4 4 4 4 4 4 4 4 4 4 2 
    2 4 4 4 4 4 4 4 4 4 4 4 4 4 4 2 
    2 4 4 4 4 4 4 4 4 4 4 4 4 4 4 2 
    2 4 4 4 4 4 4 4 4 4 4 4 4 4 4 2 
    2 4 4 4 4 4 4 4 4 4 4 4 4 4 4 2 
    2 4 4 4 4 4 4 4 4 4 4 4 4 4 4 2 
    2 4 4 4 4 4 4 4 4 4 4 4 4 4 4 2 
    2 4 4 4 4 4 4 4 4 4 4 4 4 4 4 2 
    . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 . 
    `, SpriteKind.Player)
myhitbox = sprites.create(img`
    ................
    ................
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    2222222222222222
    `, SpriteKind.hitbox)
myhitbox.setFlag(SpriteFlag.Invisible, true)
mySprite2 = sprites.create(img`
    . 8 8 8 8 8 8 8 8 8 8 8 8 8 8 . 
    8 6 6 6 6 6 6 6 6 6 6 6 6 6 6 8 
    8 6 6 6 6 6 6 6 6 6 6 6 6 6 6 8 
    8 6 6 6 6 6 6 6 6 6 6 6 6 6 6 8 
    8 6 6 6 6 6 6 6 6 6 6 6 6 6 6 8 
    8 6 6 6 6 6 6 6 6 6 6 6 6 6 6 8 
    8 6 6 6 6 6 6 6 6 6 6 6 6 6 6 8 
    8 6 6 6 6 6 6 6 6 6 6 6 6 6 6 8 
    8 6 6 6 6 6 6 6 6 6 6 6 6 6 6 8 
    8 6 6 6 6 6 6 6 6 6 6 6 6 6 6 8 
    8 6 6 6 6 6 6 6 6 6 6 6 6 6 6 8 
    8 6 6 6 6 6 6 6 6 6 6 6 6 6 6 8 
    8 6 6 6 6 6 6 6 6 6 6 6 6 6 6 8 
    8 6 6 6 6 6 6 6 6 6 6 6 6 6 6 8 
    8 6 6 6 6 6 6 6 6 6 6 6 6 6 6 8 
    . 8 8 8 8 8 8 8 8 8 8 8 8 8 8 . 
    `, SpriteKind.Player)


scene.cameraFollowSprite(mySprite)
CollisionHandler.handleSolidCollision(mySprite, SpriteKind.Player)
controller.B.onEvent(ControllerButtonEvent.Pressed, function() {
    playerid = 2
})
game.onUpdate(function () {
    myhitbox.setPosition(mySprite.x, mySprite.y)
    if (playerid == 1){
        controller.moveSprite(mySprite, 100, 0)
        mySprite.ay = 500
        controller.moveSprite(mySprite2, 0, 0)
        mySprite2.ay = 0
    } else{
        controller.moveSprite(mySprite, 0, 0)
        mySprite.ay = 0
        mySprite2.ay = 500
        controller.moveSprite(mySprite2, 100, 0)
    }
    if (playerid == 1 && gottenanswer) {
        datareq = "n/mmop/player1/x>" +  mySprite.x
        ws.send(datareq)
        datareq = "n/mmop/player1/y>" + mySprite.y
        ws.send(datareq)
        datareq = "/mmop/player2/x"
        ws.send(datareq)
        pauseUntil(() => gottenanswer)
        let p2x = parseInt(answer)
        datareq = "/mmop/player2/y"
        ws.send(datareq)
        pauseUntil(() => gottenanswer)
        let p2y = parseInt(answer)
        mySprite2.setPosition(p2x,p2y)
    } else if (connection){
        datareq = "n/mmop/player2/x>" + mySprite.x
        ws.send(datareq)
        datareq = "n/mmop/player2/y>" + mySprite.y
        ws.send(datareq)
        datareq = "/mmop/player1/x"
        ws.send(datareq)
        pauseUntil(() => gottenanswer)
        let p2x = parseInt(answer)
        datareq = "/mmop/player1/y"
        ws.send(datareq)
        pauseUntil(() => gottenanswer)
        let p2y = parseInt(answer)
        mySprite.setPosition(p2x, p2y)
    }
})
