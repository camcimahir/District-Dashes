class Credits extends Phaser.Scene {
    constructor() {
        super("creditScene") 
    }

    
    preload() {
        this.load.path = './assets/'

        this.load.image('button', 'img/button.png');
    }


    create(){

        this.add.bitmapText(centerX, centerY - 128, 'gem_font', 'CREDITS', 72).setOrigin(0.5)
        this.add.bitmapText(centerX, centerY - 64, 'gem_font', 'Temporary Font - Nathan Altice  ', 32).setOrigin(0.5)
        this.add.bitmapText(centerX, centerY, 'gem_font', ' right for menu, left for play ', 32).setOrigin(0.5)


        // Add button
        const buttonLevel1 = this.add.image(centerX - 64, centerY + 128, 'button').setInteractive().setScale(0.15);
        buttonLevel1.on('pointerdown', () => {
            this.scene.start('Level1');
        });

        const buttonCredits = this.add.image(centerX + 64, centerY + 128, 'button').setInteractive().setScale(0.15);
        buttonCredits.on('pointerdown', () => {
            this.scene.start('menuScene');
        });

      

    }



}