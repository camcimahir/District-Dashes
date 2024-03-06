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
        this.blueHillsLeft = this.add.tileSprite(0, 0, 960, 640, 'blueHills').setOrigin(0, 0).setAlpha(0.3);
        this.blueHillsRight = this.add.tileSprite(960, 0, 960*2, 640, 'blueHills').setOrigin(0, 0).setAlpha(0.3);
        //this.blueHills = this.add.tileSprite(0, 0, 960, 640, 'blueHills').setOrigin(0, 0).setAlpha(0.3)
        const map = this.add.tilemap('tilemapJSON')
        const tileset = map.addTilesetImage('tileset', 'tilesetImage')
        const terrainLayer = map.createLayer('platforms', tileset, 0, 0)

        // slime animation
        this.anims.create({
            key: 'jiggle',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers( 'slime', {
                start: 0,
                end: 1
            })
        })
        
    

        terrainLayer.setCollisionByProperty({collides: true})

        this.physics.world.setBounds(0,0, map.widthInPixels*2, map.heightInPixels)


        const slimeSpawn = map.findObject('Spawns',(obj) => obj.name === 'slimeSpawn')

        cursors = this.input.keyboard.createCursorKeys()

        // add slime
        this.slime = new Bunny(this, slimeSpawn.x, slimeSpawn.y, 'slime', 1)
    
        this.slime.body.setCollideWorldBounds(true)
        this.cameras.main.setBounds(0,0, map.widthInPixels*2, map.heightInPixels)
        this.cameras.main.startFollow(this.slime, true, 0.25, 0.25)

        this.physics.add.collider(this.slime, terrainLayer)
        this.slime.setScale(4)
        this.slime.setSize(10, 10)

        this.slime.play('jiggle')

        
    }

    update() {


        this.slime.update()
    }

}