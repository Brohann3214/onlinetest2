namespace SpriteKind {
    export const hitbox = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (playerid == 1) {
        if (mySprite.isHittingTile(CollisionDirection.Bottom) || myhitbox.overlapsWith(mySprite2)) {
            mySprite.vy = -170
        }
    } else {
        if (mySprite2.isHittingTile(CollisionDirection.Bottom) || myhitbox.overlapsWith(mySprite)) {
            mySprite2.vy = -170
        }
    }
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    playerid = 2
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    playerid = 1
})
let p2y2 = 0
let p2x2 = 0
let p2y = 0
let p2x = 0
let mySprite2: Sprite = null
let myhitbox: Sprite = null
let mySprite: Sprite = null
let playerid = 0
let gottenanswer = false
let connection = false
let answer = ''
let datareq = ""
let req = ""
playerid = 1
let testmsg = "tick"
const ws = new WebSocket("wss://weboscketserver2.onrender.com")
control.runInParallel(function () {
    console.log(`connecting to wss://weboscketserver2.onrender.com`)


    ws.onerror = () => console.log("error connecting to server, it may be offline.")
    ws.onmessage = (msg) => {
        gottenanswer = true
        connection = true
        console.log("connected")
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
CollisionHandler.handleSolidCollision(mySprite2, SpriteKind.Player)
game.onUpdate(function () {
    if (playerid == 1) {
        myhitbox.setPosition(mySprite.x, mySprite.y)
        controller.moveSprite(mySprite, 100, 0)
        mySprite.ay = 500
        controller.moveSprite(mySprite2, 0, 0)
        mySprite2.ay = 0
        scene.cameraFollowSprite(mySprite)
    } else {
        controller.moveSprite(mySprite, 0, 0)
        mySprite.ay = 0
        mySprite2.ay = 500
        controller.moveSprite(mySprite2, 100, 0)
        scene.cameraFollowSprite(mySprite2)
        myhitbox.setPosition(mySprite2.x, mySprite2.y)
    }
    if (playerid == 1 && gottenanswer) {
        datareq = "n/mmop/player1/x>" + mySprite.x
        ws.send(datareq)
datareq = "n/mmop/player1/y>" + mySprite.y
        ws.send(datareq)
datareq = "/mmop/player2/x"
        gottenanswer = false
        ws.send(datareq)
pauseUntil(() => gottenanswer)
        p2x = parseInt(answer)
        datareq = "/mmop/player2/y"
        gottenanswer = false
        ws.send(datareq)
pauseUntil(() => gottenanswer)
        p2y = parseInt(answer)
    } else if (connection && playerid == 2) {
        datareq = "n/mmop/player2/x>" + mySprite.x
        ws.send(datareq)
datareq = "n/mmop/player2/y>" + mySprite.y
        ws.send(datareq)
datareq = "/mmop/player1/x"
        gottenanswer = false
        ws.send(datareq)
pauseUntil(() => gottenanswer)
        p2x2 = parseInt(answer)
        datareq = "/mmop/player1/y"
        gottenanswer = false
        ws.send(datareq)
pauseUntil(() => gottenanswer)
        p2y2 = parseInt(answer)
    }
})
game.onUpdate(function () {
    if (playerid == 1) {
        mySprite2.setPosition(p2x, p2y)
    } else {
        mySprite.setPosition(p2x2, p2y2)
    }
})
