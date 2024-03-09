class Weasel extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        scene.add.existing(this)  
        scene.physics.add.existing(this)
        this.body.setSize(150, 500)
        
        // Generate a random letter combination
        this.letterCombination = this.generateRandomLetters(4);
        console.log("Letter combination:", this.letterCombination);
        
        // Display letters at the top of the weasel
        this.letterText = scene.add.text(x - 10, y - 50, this.letterCombination, { fontFamily: 'Arial', fontSize: 24, color: '#ffffff' }).setOrigin(0.5);
        
    }

    update(){

        if (inputString == this.letterCombination){
            this.destroy()
            this.letterText.destroy()
            return;
        }


        this.body.gravity.y = 500;

    }

    generateRandomLetters(length) {
        const characters = 'abcdefghijklmnopqrstuvwxyz';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }


}
