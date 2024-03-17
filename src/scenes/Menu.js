class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene") 
    }

    
    preload() {
        this.load.path = './assets/'
        this.load.spritesheet('judy', 'img/judy-standing.png', {
            frameWidth: 64,
            frameHeight: 64
        })
        //this.load.image('blueHills', 'img/blueHills.png')

        this.load.image('ground', 'img/ground.png')
        this.load.image('train', 'img/scene-one-train.png')
        this.load.image('buildings', 'img/scene-one-tileset.png')
        this.load.tilemapTiledJSON('tilemapJSON', 'tiled/PlatformTest.json')
        this.load.image('button', 'img/button.avif')
        this.load.bitmapFont('gem_font', 'font/gem.png', 'font/gem.xml')
        this.load.image('rat', 'img/rat-version-one.png')
        this.load.image('weasel', 'img/weasel.png')

        this.load.audio('background', 'sound/background.mp3')
        this.load.audio('weasel-lose', 'sound/weasel-lose-darn.mp3')
    }


    create(){

        this.add.bitmapText(centerX, centerY - 32, 'gem_font', 'DISTRICT DASHES', 24).setOrigin(0.5)
        this.add.bitmapText(centerX, centerY, 'gem_font', 'click the right button fr credits and left to play  ', 12).setOrigin(0.5)

        // Add button
        const buttonLevel1 = this.add.image(centerX - 48, centerY + 64, 'button').setInteractive().setScale(0.05);
        buttonLevel1.on('pointerdown', () => {
            this.scene.start('Level1');
        });

        const buttonCredits = this.add.image(centerX + 48, centerY + 64, 'button').setInteractive().setScale(0.05);
        buttonCredits.on('pointerdown', () => {
            this.scene.start('creditScene');
        });

        // bunny  animation I get a warning saying this is already created look to fix it if time
        this.anims.create({
            key: 'idle',
            frameRate: 4,
            repeat: -1,
            frames: this.anims.generateFrameNumbers( 'judy', {
                start: 0,
                end: 5
            })
        })


    }



}
