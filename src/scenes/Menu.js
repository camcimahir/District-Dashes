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

        menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 0
        }
        game.settings = {
          mouseEnabled: false
        }


    }



}