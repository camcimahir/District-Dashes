class Enemy1 extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        scene.add.existing(this)  
        scene.physics.add.existing(this)

        this.direction = 1;
        this.body.setVelocityX(100 * this.direction);
        this.startingX = x;


        // this.body.setOffset(3, 3)
        // this.body.setSize(10, 10)

        

    }

    update(){


        this.body.gravity.y = 500;

        const distanceFromStart = Math.abs(this.x - this.startingX);

        if (distanceFromStart >= 200) {
            this.direction *= -1;
            this.startingX = this.x;
            this.body.setVelocityX(100 * this.direction);
        }
    }

}
