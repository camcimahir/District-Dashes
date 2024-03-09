class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOverScene") 
    }

    
    preload() {
        this.load.path = './assets/'

        this.load.image('button', 'img/button.png');
    }


    create(){

        this.add.bitmapText(centerX, centerY - 128, 'gem_font', 'GAME OVER', 24).setOrigin(0.5)
        this.add.bitmapText(centerX, centerY - 64, 'gem_font', ' right for menu, left for play again', 12).setOrigin(0.5)


        // Add button
        const buttonLevel1 = this.add.image(centerX - 64, centerY + 128, 'button').setInteractive().setScale(0.05);
        buttonLevel1.on('pointerdown', () => {
            this.scene.start('Level1');
        });

        const buttonCredits = this.add.image(centerX + 64, centerY + 128, 'button').setInteractive().setScale(0.05);
        buttonCredits.on('pointerdown', () => {
            this.scene.start('menuScene');
        });

      

    }



}