class Credits extends Phaser.Scene {
    constructor() {
        super("creditScene") 
    }

    
    preload() {
        this.load.path = './assets/'

        this.load.image('menuButton', 'img/carrot-text-menu.png');
        this.load.image('playButton', 'img/carrot-text-start.png')
    }


    create(){

    // Add credits text
    this.add.bitmapText(centerX - 170, centerY - 110, 'nathanFont', 'Programming: Mahir Camci & Evenly Fu', 20).setOrigin(0);
    this.add.bitmapText(centerX - 170, centerY - 80, 'nathanFont', 'Art: Evelyn Fu', 20).setOrigin(0);
    this.add.bitmapText(centerX - 170, centerY - 48, 'nathanFont', 'Font: Peter Wiegel', 20).setOrigin(0);
    this.add.bitmapText(centerX - 170, centerY - 16, 'nathanFont', 'BGM: Felicity by Scott Buckley', 20).setOrigin(0);

    // Add controls text
    this.add.bitmapText(centerX - 170, centerY + 16, 'nathanFont', 'Controls:', 18).setOrigin(0);
    this.add.bitmapText(centerX - 170, centerY + 48, 'nathanFont', 'Use arrow keys to move', 18).setOrigin(0);
    this.add.bitmapText(centerX - 170, centerY + 80, 'nathanFont', 'Use the keyboard to type the code', 18).setOrigin(0);



    // Add button
    const buttonLevel1 = this.add.image(centerX + 120, centerY + 40, 'playButton').setInteractive().setScale(2);
    buttonLevel1.on('pointerdown', () => {
        this.scene.start('Level1');
    });

    const buttonCredits = this.add.image(centerX + 120, centerY + 80, 'menuButton').setInteractive().setScale(2);    
    buttonCredits.on('pointerdown', () => {
        this.scene.start('menuScene');
    });

      

    }



}