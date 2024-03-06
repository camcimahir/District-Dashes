class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene") 
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
        this.load.image('button', 'img/button.avif');
        this.load.bitmapFont('gem_font', 'font/gem.png', 'font/gem.xml')
        this.load.image('enemy', 'img/MainCharacter.png')
    }


    create(){

        this.add.bitmapText(centerX, centerY - 64, 'gem_font', 'DISTRICT DASHES', 72).setOrigin(0.5)
        this.add.bitmapText(centerX, centerY, 'gem_font', 'Press the right button fr credits and left to play  ', 32).setOrigin(0.5)

        // Add button
        const buttonLevel1 = this.add.image(centerX - 64, centerY + 128, 'button').setInteractive().setScale(0.15);
        buttonLevel1.on('pointerdown', () => {
            this.scene.start('Level1');
        });

        const buttonCredits = this.add.image(centerX + 64, centerY + 128, 'button').setInteractive().setScale(0.15);
        buttonCredits.on('pointerdown', () => {
            this.scene.start('creditScene');
        });

        // slime animation I get a warning saying this is already created look to fix it if time
        this.anims.create({
            key: 'jiggle',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers( 'slime', {
                start: 0,
                end: 1
            })
        })


    }



}