
"use strict"

// game config
let config = {
    type: Phaser.AUTO,
    render: {
        pixelArt: true
    },
    width: 960,
    height: 640,
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    },
    zoom: 1,
    scene: [ Menu, Credits, Level1 ]
}

const game = new Phaser.Game(config)

let cursors, menuConfig

let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

// // globals
const centerX = game.config.width / 2
const centerY = game.config.height / 2
