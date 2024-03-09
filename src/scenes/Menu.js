class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene") 
    }

    
    preload() {
        this.load.path = './assets/'
        this.load.spritesheet('slime', 'img/judy-standing.png', {
            frameWidth: 64,
            frameHeight: 64
        })
        //this.load.image('blueHills', 'img/blueHills.png')

        this.load.image('grass', 'tiled/GrassTiles.png')
        this.load.image('houses', 'img/scene-one-pt-one-buildings.png')
        this.load.tilemapTiledJSON('tilemapJSON', 'tiled/PlatformTest.json')
        this.load.image('button', 'img/button.avif')
        this.load.bitmapFont('gem_font', 'font/gem.png', 'font/gem.xml')
        this.load.image('enemy', 'img/rat-version-one.png')
        this.load.image('weasel', 'img/weasel.png')
    }


    create(){

        this.add.bitmapText(centerX, centerY - 32, 'gem_font', 'DISTRICT DASHES', 24).setOrigin(0.5)
        this.add.bitmapText(centerX, centerY, 'gem_font', 'Press the right button fr credits and left to play  ', 12).setOrigin(0.5)

        // Add button
        const buttonLevel1 = this.add.image(centerX - 48, centerY + 64, 'button').setInteractive().setScale(0.05);
        buttonLevel1.on('pointerdown', () => {
            this.scene.start('Level1');
        });

        const buttonCredits = this.add.image(centerX + 48, centerY + 64, 'button').setInteractive().setScale(0.05);
        buttonCredits.on('pointerdown', () => {
            this.scene.start('creditScene');
        });

        // slime animation I get a warning saying this is already created look to fix it if time
        this.anims.create({
            key: 'jiggle',
            frameRate: 4,
            repeat: -1,
            frames: this.anims.generateFrameNumbers( 'slime', {
                start: 0,
                end: 5
            })
        })


    }



}