class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOverScene") 
    }

    
    preload() {
        this.load.path = './assets/'

        this.load.image('playButton', 'img/carrot-text-start.png')
        this.load.image('menuButton', 'img/carrot-text-menu.png');
    }


    create(){

        this.sound.add('blood').play()

        this.add.bitmapText(centerX, centerY - 64, 'nathanFont', 'You Are Fired', 50).setOrigin(0.5)
        //this.add.bitmapText(centerX, centerY - 32, 'nathanFont', ' right for menu, left for play again', 12).setOrigin(0.5)


        // Add button
        const buttonLevel1 = this.add.image(centerX, centerY + 20, 'playButton').setInteractive().setScale(2);
        buttonLevel1.on('pointerdown', () => {
            this.scene.start('Level1');
        });
    
        const buttonCredits = this.add.image(centerX, centerY + 60, 'menuButton').setInteractive().setScale(2);    
        buttonCredits.on('pointerdown', () => {
            this.scene.start('menuScene');
        });

      

    }



}