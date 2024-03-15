class Level1 extends Phaser.Scene {
    constructor() {
        super('Level1')

    }

    init() {

    }


    create() {
        this.sound.play('background', { loop: true })
        
        const map = this.add.tilemap('tilemapJSON')

        //tilesets
        const groundTileset = map.addTilesetImage('ground', 'ground')
        const buildingTileset = map.addTilesetImage('objects','buildings')

        //layers
        const terrainLayer = map.createLayer('platforms', groundTileset, 0, 0)
        const RatCollide = map.createLayer('RatCollides', buildingTileset, 0, 0)
        const DoorLayer = map.createLayer('Door', buildingTileset, 0, 0)
        this.BridgeLayer = map.createLayer('Bridge', buildingTileset, 0, 0)
        const houseLayer = map.createLayer('houses', buildingTileset, 0, 0)
        
        //layer collissions
        terrainLayer.setCollisionByProperty({collides: true})
        RatCollide.setCollisionByProperty({collides: true})
        DoorLayer.setCollisionByProperty({collides: true})

        this.BridgeLayer.forEachTile(tile => {
            if (tile.properties["OneWay"]) {
              tile.setCollision(false, false, true, false);
            }
         });

        this.physics.world.setBounds(0,0, map.widthInPixels, map.heightInPixels)


        //spawn locations
        const slimeSpawn = map.findObject('Spawns',(obj) => obj.name === 'slimeSpawn')
        const enemySpawn = map.findObject('enemySpawns', (obj) => obj.name === 'enemySpawn')
        const weaselSpawn = map.findObject('WeaselSpawn',(obj) => obj.name === 'WeaselSpawn')
        const trainSpawns = map.findObject('trainSpawns', (obj) => obj.name === 'trainSpawns')

        // add slime
        this.slime = new Bunny(this, slimeSpawn.x, slimeSpawn.y, 'judy', 5)
        this.slime.setSize(100, 100)
        this.slime.play('idle')
        this.slime.body.setCollideWorldBounds(true)

        //fix camera to bunny
        this.cameras.main.setBounds(0,0, map.widthInPixels, map.heightInPixels)
        this.cameras.main.startFollow(this.slime, true, 0.05,0.05 )

        //bunny collissions
        this.physics.add.collider(this.slime, terrainLayer)
        this.physics.add.collider(this.slime, this.BridgeLayer)
        this.physics.add.collider(this.slime, DoorLayer)

         //train stuff
        this.train = new Train(this, trainSpawns.x, 395, 'train', 0, trainSpawns.x)
        this.physics.add.collider(this.train, this.BridgeLayer);
        this.physics.add.collider(this.train, RatCollide, () => {
            
            this.train.resetPosition()
        });


        //rat stuff
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

        //keys that you can input
        inputKeys = this.input.keyboard.addKeys('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
        inputString = ""

        //weasel stuff
        this.weasel = new Weasel(this, weaselSpawn.x, weaselSpawn.y, 'weasel', 0).setScale(0.2)
        this.weasel.body.setOffset(100, 0)
        this.weasel.body.setCollideWorldBounds(true);
        this.physics.add.collider(this.weasel, terrainLayer);
        this.physics.add.overlap(this.slime, this.weasel, () => {
            this.gameOver()
        });


        //taking input from the user
        this.input.keyboard.on('keydown', function(event) {
            if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.key >= 'a' && event.key <= 'z')) {
                inputString += event.key;
            }
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
