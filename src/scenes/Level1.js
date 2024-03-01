class Level1 extends Phaser.Scene {
    constructor() {
        super('Level1')
    }

    init() {

    }

    preload() {
        this.load.path = './assets/'
        this.load.spritesheet('slime', 'img/slime.png', {
            frameWidth: 16,
            frameHeight: 16
        })
        this.load.image('blueHills', 'img/blueHills.png')

        this.load.image('tilesetImage', 'tiled/ground.png')
        this.load.tilemapTiledJSON('tilemapJSON', 'tiled/PlatformTest.json')
    }

    create() {
        this.blueHills = this.add.tileSprite(0, 0, 960, 640, 'blueHills').setOrigin(0, 0).setAlpha(0.3)
        const map = this.add.tilemap('tilemapJSON')
        const tileset = map.addTilesetImage('tileset', 'tilesetImage')
        const terrainLayer = map.createLayer('platforms', tileset, 0, 0)
    

        terrainLayer.setCollisionByProperty({collides: true})

        this.physics.world.setBounds(0,0, map.widthInPixels, map.heightInPixels)

        const slimeSpawn = map.findObject('Spawns',(obj) => obj.name === 'slimeSpawn')

        // add slime
        this.slime = this.physics.add.sprite(slimeSpawn.x, slimeSpawn.y, 'slime', 0)
        this.slime.body.setCollideWorldBounds(true)

        this.physics.add.collider(this.slime, terrainLayer)
        this.slime.setScale(4)
        this.slime.setSize(10, 10)
        this.slime.setOffset(3, 3)

        // slime animation
        this.anims.create({
            key: 'jiggle',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('slime', {
                start: 0,
                end: 1
            })
        })

        this.slime.play('jiggle')

        this.cursors = this.input.keyboard.createCursorKeys()
        
    }

    update() {

        //movement
        if (this.cursors.left.isDown) {
            this.slime.setVelocityX(-160); // Move left
        } else if (this.cursors.right.isDown) {
            this.slime.setVelocityX(160); // Move right
        } else {
            this.slime.setVelocityX(0); // if nothing is pressed stops
        }

        // Jumping
        if (this.cursors.up.isDown && this.slime.body.onFloor()) {
            this.slime.setVelocityY(-400); //jumping amount
        }

        // gravity
        this.slime.body.gravity.y = 500;
        // for the feel of the jump
        this.slime.setDragX(100);
    }

}