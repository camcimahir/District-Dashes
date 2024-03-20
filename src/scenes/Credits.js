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
    this.add.bitmapText(centerX - 170, centerY - 110, 'bricksFont', 'Programming: Mahir Camci & Evenly Fu', 18).setOrigin(0);
    this.add.bitmapText(centerX - 170, centerY - 80, 'bricksFont', 'Art: Evelyn Fu', 18).setOrigin(0);
    this.add.bitmapText(centerX - 170, centerY - 48, 'bricksFont', 'Font: TT Bricks by TypeType Foundry', 18).setOrigin(0);
    this.add.bitmapText(centerX - 170, centerY - 16, 'bricksFont', 'BGM: Felicity by Scott Buckley', 18).setOrigin(0);

    // Add controls text
    this.add.bitmapText(centerX - 170, centerY + 16, 'bricksFont', 'Controls:', 16).setOrigin(0);
    this.add.bitmapText(centerX - 170, centerY + 48, 'bricksFont', 'Use arrow keys to move', 16).setOrigin(0);
    this.add.bitmapText(centerX - 170, centerY + 80, 'bricksFont', 'Use the keyboard to type the code', 16  ).setOrigin(0);



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