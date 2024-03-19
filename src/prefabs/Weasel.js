class Weasel extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        scene.add.existing(this)  
        scene.physics.add.existing(this)
        //this.body.setSize(150, 500)
        
        // Generate a random letter combination
        this.letterCombination = this.generateRandomLetters(4);
        console.log("Letter combination:", this.letterCombination);
        
        // Display letters at the top of the weasel
        this.guessText = scene.add.text(x - 10, y - 60, inputString, { fontFamily: 'Arial', fontSize: 24, color: '#ffffff' }).setOrigin(0.5);
        this.letterText = scene.add.text(x - 10, y - 40, this.letterCombination, { fontFamily: 'Arial', fontSize: 24, color: '#ffffff' }).setOrigin(0.5);
    

        // Store index of current letter to check
        this.bool = true;


    }
    

    update(){

        if (inputString == this.letterCombination){
            this.scene.time.delayedCall(500, () => {
                this.letterText.destroy()
                this.guessText.destroy()
                this.destroy()
            });
        }

        this.guessText.setText(inputString);

        this.body.gravity.y = 500;

        //console.log(this.letterCombination[0, inputString.length])


        this.bool = this.checkLetter()
        if (!(this.bool)){
            inputString = ""
        }

    }

    generateRandomLetters(length) {
        const characters = 'qwertyasdfghzxcvb';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    checkLetter() {
        if (inputString === this.letterCombination.slice(0, inputString.length)) {
            //this.guessText.setStyle({ fill: '#00ff00' }); // Turn letter green
            return true;
        } else {
            return false;
        }
    }


}
