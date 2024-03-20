class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene") 
    }

    
    preload() {
        this.load.path = './assets/'
        this.load.spritesheet('judy', 'img/judy-animations.png', {
            frameWidth: 64,
            frameHeight: 64
        })
        // this.load.spritesheet('judyRunning', 'img/run.png', {
        //     frameWidth: 34,
        //     frameHeight: 46
        // })
        // this.load.spritesheet('judyTransition', 'img/stand-to-run.png', {
        //     frameWidth: 64,
        //     frameHeight: 64
        // })
        //this.load.image('blueHills', 'img/blueHills.png')

        this.load.image('ground', 'img/ground.png')
        this.load.image('train', 'img/scene-one-train.png')
        this.load.image('buildings', 'img/scene-one-tileset.png')
        this.load.image('tutorial', 'img/tutorial.png')
        this.load.image('finish', 'img/finish.png')
        this.load.image('polarbear', 'img/polarbear.png')
        this.load.tilemapTiledJSON('tilemapJSON', 'tiled/PlatformTest.json')
        this.load.image('button', 'img/button.avif')
        this.load.bitmapFont('gem_font', 'font/gem.png', 'font/gem.xml')
        this.load.bitmapFont('nathanFont', 'font/nathan-w.png', 'font/nathan-w.xml' )
        this.load.spritesheet('rat2', 'img/rat.png', {
            frameWidth: 16,
            frameHeight: 18
        })
        this.load.image('weasel', 'img/weasel.png')
        this.load.image('bunny', 'img/menu-scene-character.png' )
        this.load.audio('background', 'sound/background.mp3')
        this.load.audio('weasel-lose', 'sound/weasel-lose-darn.mp3')
        this.load.image('menu', 'img/menu.png')
        this.load.audio('blood', 'sound/blood.mp3' )
    }


    create(){

        const menuBackground = this.add.image(0, 0, 'menu').setScale(2)
        menuBackground.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2);


        // this.add.bitmapText(centerX, centerY - 32, 'nathanFont', 'DISTRICT DASHES', 24).setOrigin(0.5)
        // this.add.bitmapText(centerX, centerY, 'nathanFont', 'click the right button fr credits and left to play  ', 24).setOrigin(0.5)

        // Add button

        const button1 = this.add.rectangle(90, 190, 130, 40, 0xFF0000, 0).setOrigin(0);
        const button2 = this.add.rectangle(230, 190, 130, 40, 0xFF0000, 0).setOrigin(0);
    
        button1.setInteractive();
        button2.setInteractive();
    
        button1.on('pointerdown', () => {
            this.scene.start('Level1');
        });
    
        button2.on('pointerdown', () => {
            this.scene.start('creditScene');
        });

        // const buttonLevel1 = this.add.image(centerX - 48, centerY + 64, 'button').setInteractive().setScale(0.05);
        // buttonLevel1.on('pointerdown', () => {
        //     this.scene.start('Level1');
        // });

        // const buttonCredits = this.add.image(centerX + 48, centerY + 64, 'button').setInteractive().setScale(0.05);
        // buttonCredits.on('pointerdown', () => {
        //     this.scene.start('creditScene');
        // });
        this.backgroundMusic = this.sound.add('background', { loop: true });
        this.backgroundMusic.setVolume(0.10);

        if (!playing) {
            this.backgroundMusic.play()
            playing = true
        }

        // const animationCompleteHandler = (animation) => {
        //     if (animation.key === 'transition') {
        //         // Transition animation complete, play run animation
        //         this.bunny.play('run');
        //     }
        // };

        // bunny  animation I get a warning saying this is already created look to fix it if time
        this.anims.create({
            key: 'idle',
            frameRate: 3,
            repeat: -1,
            frames: this.anims.generateFrameNumbers( 'judy', {
                frames: [0,1,2,4,5,6]
            })
        })

        this.anims.create({
            key: 'run',
            frameRate: 7,
            repeat: -1,
            frames: this.anims.generateFrameNumbers( 'judy', {
                start: 12,
                end: 19
            }),
        })

        this.anims.create({
            key: 'transition',
            frameRate: 10,
            repeat: 0,
            frames: this.anims.generateFrameNumbers( 'judy', {
                start: 8,
                end: 11
            }),
        })

        this.anims.create({
            key: 'mouse2',
            frameRate: 7,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('rat2', {
                start: 0, 
                end: 1
            })
        })

        


    }



}
