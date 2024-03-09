class Level1 extends Phaser.Scene {
    constructor() {
        super('Level1')

    }

    init() {

    }


    create() {
        //this.blueHillsLeft = this.add.tileSprite(0, 0, 960, 640, 'blueHills').setOrigin(0, 0).setAlpha(0.3);
        //this.blueHillsRight = this.add.tileSprite(960, 0, 960*2, 640, 'blueHills').setOrigin(0, 0).setAlpha(0.3);
        //this.blueHills = this.add.tileSprite(0, 0, 960, 640, 'blueHills').setOrigin(0, 0).setAlpha(0.3)
        const map = this.add.tilemap('tilemapJSON')
        //const groundTileset = map.addTilesetImage('ground', 'grassTiles')
        const buildingTileset = map.addTilesetImage('buildings','buildingTiles')
        //const terrainLayer = map.createLayer('platforms', groundTileset, 0, 0)
        const RatCollide = map.createLayer('RatCollides', buildingTileset, 0, 0)
        
        //terrainLayer.setCollisionByProperty({collides: true})
        RatCollide.setCollisionByProperty({collides: true})

        this.physics.world.setBounds(0,0, map.widthInPixels, map.heightInPixels)

        const slimeSpawn = map.findObject('Spawns',(obj) => obj.name === 'slimeSpawn')
        const enemySpawn = map.findObject('enemySpawns', (obj) => obj.name === 'enemySpawn')
        const weaselSpawn = map.findObject('WeaselSpawn',(obj) => obj.name === 'WeaselSpawn')

        cursors = this.input.keyboard.createCursorKeys()

        // add slime
        this.slime = new Bunny(this, slimeSpawn.x, slimeSpawn.y, 'slime', 5)
        
        this.slime.body.setCollideWorldBounds(true)
        this.cameras.main.setBounds(0,0, map.widthInPixels, map.heightInPixels)
        this.cameras.main.startFollow(this.slime, true, 0.25, 0.25)

        this.physics.add.collider(this.slime, terrainLayer)
        this.physics.add.collider(this.slime, RatCollide)
    
        this.slime.setScale(4)
        this.slime.setSize(10, 10)
        this.slime.play('jiggle')

        this.rats = [];
        const numberOfRats = 5;
        for (let i = 0; i < numberOfRats; i++) {

                const enemy = new Rats(this, enemySpawn.x - 165*i, enemySpawn.y, 'enemy', 0 , enemySpawn.x ).setScale(0.5);
                
                enemy.body.setCollideWorldBounds(true);
                this.physics.add.collider(enemy, terrainLayer);
                this.physics.add.collider(enemy, RatCollide);

                this.rats.push(enemy)

        }

        this.physics.add.overlap(this.slime, this.rats, () => {
            this.gameOver()
        });

        inputKeys = this.input.keyboard.addKeys('ABCDEFGHIJKLMNOPQRSTUVWXYZ');

        this.weasel = new Weasel(this, weaselSpawn.x, weaselSpawn.y, 'weasel', 0).setScale(0.2)
        this.weasel.body.setOffset(100, 0)
        this.weasel.body.setCollideWorldBounds(true);
        this.physics.add.collider(this.weasel, terrainLayer);
        this.physics.add.collider(this.weasel, RatCollide);


        inputString = ""

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

        console.log(inputString)

        this.slime.update();
        if (this.weasel.body){
            this.weasel.update();
        }
        this.rats.forEach(enemy => {
            enemy.update();
        });
        
    }

    gameOver() {

        this.scene.start('gameOverScene');

    }

}