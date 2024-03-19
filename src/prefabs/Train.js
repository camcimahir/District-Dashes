class Train extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, enemySpawn) {
        super(scene, x, y, texture, frame)

        scene.add.existing(this)  
        scene.physics.add.existing(this)
        this.startingX = x;
        //this.direction = 1;
        this.body.setVelocityX(-300);

        this.enemySpawn = enemySpawn

        // this.body.setOffset(3, 3)
        //this.body.setSize(10, 10)

        

    }

    update(){

    }

    resetPosition() {
        this.setPosition(this.enemySpawn, this.y);
        this.body.setVelocityX(-100);
    }



}
