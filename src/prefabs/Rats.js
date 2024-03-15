class Rats extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, enemySpawn) {
        super(scene, x, y, texture, frame)

        scene.add.existing(this)  
        scene.physics.add.existing(this)
        this.startingX = x;
        //this.direction = 1;
        this.body.setVelocityX(-100);

        this.enemySpawn = enemySpawn

        // this.body.setOffset(3, 3)
        //this.body.setSize(10, 10)

        

    }

    update(){

        this.body.gravity.y = 500;

        if (this.body.blocked.left || this.body.touching.left) {
            this.resetPosition();
        }
    }

    resetPosition() {
        const randomOffsetX = Phaser.Math.Between(-150, 150);
        const newX = this.enemySpawn + randomOffsetX;
        
        this.setPosition(newX, this.y);
        this.body.setVelocityX(-100);
    }



}
