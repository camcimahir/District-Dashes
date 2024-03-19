class Bunny extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        scene.add.existing(this)  
        scene.physics.add.existing(this)

        // this.body.setOffset(50, 30)
        this.body.setSize(22, 62)

        cursors = scene.input.keyboard.createCursorKeys()


        this.pushed = false;

    }

    update(){
        if (cursors.down.isDown ) {
            this.handleBridgeInteraction()
        }

        if (this.body.velocity.x < 0) {
            // Moving left
            this.setFlipX(true);
        } else if (this.body.velocity.x > 0) {
            // Moving right
            this.setFlipX(false);
        }

        //movement
        if (!this.pushed){
            if (cursors.left.isDown) {
                this.body.setVelocityX(-160) // Move left
            } else if (cursors.right.isDown) {
                this.body.setVelocityX(160); // Move right
            } else if (cursors){
                this.body.setVelocityX(0); // if nothing is pressed stops
            }

            // Jumping
            if (cursors.up.isDown && this.body.onFloor()) {
                this.body.setVelocityY(-250); //jumping amount
            }
        }

        // gravity
        this.body.gravity.y = 500;
        // for the feel of the jump
        this.body.setDragX(100);


    }

    handleBridgeInteraction() {
        
        this.scene.physics.world.removeCollider(collider1);
        this.scene.BridgeLayer.forEachTile(tile => {
            if (tile.properties["OneWay"]) {
                tile.setCollision(false, false, false, false);
            }
            });
        this.scene.time.delayedCall(500, () => {
            this.scene.BridgeLayer.forEachTile(tile => {
                if (tile.properties["OneWay"]) {
                    tile.setCollision(false, false, true, false);
                }
                });
        });
        
    }

    push(){
        this.body.setVelocityX(-250);
        this.pushed = true
        this.scene.time.delayedCall(750, () => {
            this.pushed = false
        })

    }

}
