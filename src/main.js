
"use strict"

// game config
let config = {
    type: Phaser.AUTO,
    render: {
        pixelArt: true
    },
    width: 360,
    height: 240,
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    },
    zoom: 2.5,
    scene: [ Menu, Credits, Level1, GameOver ],
}

const game = new Phaser.Game(config)

let cursors, menuConfig, inputString, inputKeys, collider1, playing, lives

let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

// // globals
const centerX = game.config.width / 2
const centerY = game.config.height / 2
