class Level1 extends Phaser.Scene {
    constructor() {
        super('Level1')

    }

    init() {

    }


    create() {
        this.sound.play('background', { loop: true })
        
        //this.blueHillsLeft = this.add.tileSprite(0, 0, 960, 640, 'blueHills').setOrigin(0, 0).setAlpha(0.3);
        //this.blueHillsRight = this.add.tileSprite(960, 0, 960*2, 640, 'blueHills').setOrigin(0, 0).setAlpha(0.3);
        //this.blueHills = this.add.tileSprite(0, 0, 960, 640, 'blueHills').setOrigin(0, 0).setAlpha(0.3)
        const map = this.add.tilemap('tilemapJSON')
        const groundTileset = map.addTilesetImage('ground', 'ground')
        const buildingTileset = map.addTilesetImage('objects','buildings')
        const terrainLayer = map.createLayer('platforms', groundTileset, 0, 0)
        const RatCollide = map.createLayer('RatCollides', buildingTileset, 0, 0)
        const BridgeLayer = map.createLayer('Bridge', buildingTileset, 0, 0)
        const houseLayer = map.createLayer('houses', buildingTileset, 0, 0)
        
        terrainLayer.setCollisionByProperty({collides: true})
        RatCollide.setCollisionByProperty({collides: true})
        BridgeLayer.setCollisionByProperty({collides: true})

        this.physics.world.setBounds(0,0, map.widthInPixels, map.heightInPixels)

        const slimeSpawn = map.findObject('Spawns',(obj) => obj.name === 'slimeSpawn')
        const enemySpawn = map.findObject('enemySpawns', (obj) => obj.name === 'enemySpawn')
        const weaselSpawn = map.findObject('WeaselSpawn',(obj) => obj.name === 'WeaselSpawn')
        const trainSpawns = map.findObject('trainSpawns', (obj) => obj.name === 'trainSpawns')

        cursors = this.input.keyboard.createCursorKeys()

        // add slime
        this.slime = new Bunny(this, slimeSpawn.x, slimeSpawn.y, 'slime', 5)
        
        this.slime.body.setCollideWorldBounds(true)
        this.cameras.main.setBounds(0,0, map.widthInPixels, map.heightInPixels)
        this.cameras.main.startFollow(this.slime, true, 0.05,0.05 )

        this.physics.add.collider(this.slime, terrainLayer)
        this.physics.add.collider(this.slime, BridgeLayer)
        //this.physics.add.collider(this.slime, RatCollide)
    
        this.slime.setSize(100, 100)
        this.slime.play('jiggle')

        this.train = new Train(this, trainSpawns.x, trainSpawns.y, 'train', 0, trainSpawns.x)
        this.physics.add.collider(this.train, BridgeLayer);
        this.physics.add.collider(this.train, RatCollide, () => {
            
            this.train.resetPosition()
        });
        //this.physics.add.collider(rat, RatCollide);

        this.rats = [];
        const numberOfRats = 5;
        for (let i = 0; i < numberOfRats; i++) {

                const rat = new Rats(this, enemySpawn.x - 150*i, enemySpawn.y, 'rat', 0 , enemySpawn.x ).setScale();
                
                rat.body.setCollideWorldBounds(true);
                this.physics.add.collider(rat, terrainLayer);
                this.physics.add.collider(rat, RatCollide);

                this.rats.push(rat)

        }

        this.physics.add.overlap(this.slime, this.rats, () => {
            this.gameOver()
        });

        inputKeys = this.input.keyboard.addKeys('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
        inputString = ""

        this.weasel = new Weasel(this, weaselSpawn.x, weaselSpawn.y, 'weasel', 0).setScale(0.2)
        this.weasel.body.setOffset(100, 0)
        this.weasel.body.setCollideWorldBounds(true);
        this.physics.add.collider(this.weasel, terrainLayer);
        //this.physics.add.collider(this.weasel, RatCollide);




        this.input.keyboard.on('keydown', function(event) {
            if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.key >= 'a' && event.key <= 'z')) {
                inputString += event.key;
            }
        });

        this.physics.add.overlap(this.slime, this.weasel, () => {
            this.gameOver()
        });

    }

        

    update() {


        this.slime.update();
        if (this.weasel.body){
            this.weasel.update();
        }
        this.rats.forEach(rat => {
            rat.update();
        });
        this.train.update()
        
    }

    gameOver() {

        this.scene.start('gameOverScene');

    }

}
