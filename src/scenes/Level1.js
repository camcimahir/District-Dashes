class Level1 extends Phaser.Scene {
    constructor() {
        super('Level1')

    }

    init() {

    }


    create() {
        lives = 3;
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
        const bunnySpawn = map.findObject('Spawns',(obj) => obj.name === 'bunnySpawn')
        const enemySpawn = map.findObject('enemySpawns', (obj) => obj.name === 'enemySpawn')
        const weaselSpawn = map.findObject('WeaselSpawn',(obj) => obj.name === 'WeaselSpawn')
        const trainSpawns = map.findObject('trainSpawns', (obj) => obj.name === 'trainSpawns')

        // add bunny
        this.bunny = new Bunny(this, bunnySpawn.x, bunnySpawn.y, 'judy', 5)
        this.bunny.setSize(100, 100)
        this.bunny.play('idle')
        this.bunny.body.setCollideWorldBounds(true)

        //fix camera to bunny
        this.cameras.main.setBounds(0,0, map.widthInPixels, map.heightInPixels)
        this.cameras.main.startFollow(this.bunny, true, 0.05,0.05 )

        //bunny collissions
        this.physics.add.collider(this.bunny, terrainLayer)
        this.physics.add.collider(this.bunny, this.BridgeLayer)
        this.physics.add.collider(this.bunny, DoorLayer)

         //train stuff
        this.train = new Train(this, trainSpawns.x, 355, 'train', 0, trainSpawns.x)
        this.physics.add.collider(this.train, this.BridgeLayer);
        this.physics.add.overlap(this.bunny, this.train, () => {
            this.bunny.handleBridgeInteraction()
            this.bunny.push()
        });
        this.physics.add.collider(this.train, RatCollide, () => {
            this.train.resetPosition()
        });


        //rat stuff
        this.rats = [];
        const numberOfRats = 8;
        for (let i = 0; i < numberOfRats; i++) {

            const rat = new Rats(this, enemySpawn.x - 150*i, enemySpawn.y, 'rat', 0 , enemySpawn.x ).setScale();
            
            rat.body.setCollideWorldBounds(true);
            this.physics.add.collider(rat, terrainLayer);
            this.physics.add.collider(rat, RatCollide);

            this.rats.push(rat)

            rat.play('mouse2')
 

        }
        this.physics.add.overlap(this.bunny, this.rats, () => {
            this.loseLife()
            //this.gameOver()
        });

        //keys that you can input
        inputKeys = this.input.keyboard.addKeys('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
        inputString = ""

        //weasel stuff
        this.weasel = new Weasel(this, weaselSpawn.x, weaselSpawn.y, 'weasel', 0).setScale(0.2)
        this.weasel.body.setOffset(100, 0)
        this.weasel.body.setCollideWorldBounds(true);
        this.physics.add.collider(this.weasel, terrainLayer);
        this.physics.add.overlap(this.bunny, this.weasel, () => {
            this.loseLife()
            //this.gameOver()
        });


        //taking input from the user
        this.input.keyboard.on('keydown', function(event) {
            if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.key >= 'a' && event.key <= 'z')) {
                inputString += event.key;
            }
        });

        this.livesText = this.add.text(10, 10, 'Lives: ' + lives, { fontSize: '16px', fill: '#000000' });


    }

        

    update() {

        this.bunny.update();
        if (this.weasel.body){
            this.weasel.update();
        }
        this.rats.forEach(rat => {
            rat.update();
        });
        this.train.update()
        if (lives <= 0){
            this.gameOver();
        }
        this.livesText.setText('Lives: ' + lives);
        this.livesText.x = this.cameras.main.scrollX + 10;
        this.livesText.y = this.cameras.main.scrollY + 10;
        
    }

    gameOver() {

        this.scene.start('gameOverScene');

    }

    loseLife(){
        lives--
        this.livesText.setColor('#FF0000')
        this.tweens.add({
            targets: this.livesText,
            duration: 200,
            repeat: 5, 
            alpha: 0,
            yoyo: true,
            onComplete: () => {
                this.livesText.setColor('#000000');
                this.livesText.setAlpha(1);
            }
        });


        this.tweens.add({
            targets: this.livesText,
            duration: 50,
            repeat: 10,
            x: '+=10', 
            yoyo: true 
        });
    }

}
