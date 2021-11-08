namespace SpriteKind {
    export const Gas = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Projectile, function (sprite, otherSprite) {
    projectile.destroy(effects.hearts, 500)
    otherSprite.destroy(effects.starField, 500)
    info.changeScoreBy(1)
    scene.cameraShake(4, 500)
    if (info.score() == 10) {
        info.changeScoreBy(5)
        mySprite.sayText("+ 5", 1000, true)
        enemyspeed = 70
    }
})
controller.A.onEvent(ControllerButtonEvent.Released, function () {
    DARTS = [assets.image`DART 3`, assets.image`Dart`, assets.image`DART 3`]
    projectile = sprites.createProjectileFromSprite(assets.image`Dart`, mySprite, 0, -50)
    projectile.startEffect(effects.spray, 100)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Gas, function (sprite, otherSprite) {
    statusbar.value = 100
    otherSprite.destroy()
})
statusbars.onZero(StatusBarKind.Energy, function (status) {
    game.over(false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy(effects.blizzard, 500)
})
let myFuel: Sprite = null
let myEnemy: Sprite = null
let DARTS: Image[] = []
let projectile: Sprite = null
let enemyspeed = 0
let statusbar: StatusBarSprite = null
let mySprite: Sprite = null
scene.setBackgroundImage(assets.image`Galaxy`)
scroller.scrollBackgroundWithSpeed(0, 10)
mySprite = sprites.create(assets.image`Rocket`, SpriteKind.Player)
controller.moveSprite(mySprite)
animation.runImageAnimation(
mySprite,
assets.animation`Flying Blue`,
200,
true
)
mySprite.setStayInScreen(true)
statusbar = statusbars.create(20, 4, StatusBarKind.Energy)
statusbar.attachToSprite(mySprite, -30, 0)
enemyspeed = 50
game.onUpdateInterval(2000, function () {
    myEnemy = sprites.createProjectileFromSide(assets.image`Spider`, 0, enemyspeed)
    myEnemy.x = randint(5, 155)
    myEnemy.setKind(SpriteKind.Enemy)
    animation.runImageAnimation(
    myEnemy,
    assets.animation`Flying Spider`,
    100,
    true
    )
})
game.onUpdateInterval(3500, function () {
    myFuel = sprites.createProjectileFromSide(assets.image`Fuel`, 0, 50)
    myFuel.x = randint(5, 10)
    myFuel.setKind(SpriteKind.Gas)
})
game.onUpdateInterval(300, function () {
    statusbar.value += -1
})
