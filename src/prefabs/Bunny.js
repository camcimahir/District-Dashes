class Bunny extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        scene.add.existing(this)  
        scene.physics.add.existing(this)

        this.body.setOffset(3, 3)
        this.body.setSize(22, 62)

        cursors = scene.input.keyboard.createCursorKeys()


        

    }

    update(){
        this.handleBridgeInteraction();

        //movement
        if (cursors.left.isDown) {
            this.body.setVelocityX(-160) // Move left
        } else if (cursors.right.isDown) {
            this.body.setVelocityX(160); // Move right
        } else if (cursors){
            this.body.setVelocityX(0); // if nothing is pressed stops
        }

        // Jumping
        if (cursors.up.isDown && this.body.onFloor()) {
            this.body.setVelocityY(-300); //jumping amount
        }

        // gravity
        this.body.gravity.y = 500;
        // for the feel of the jump
        this.body.setDragX(100);


    }

    handleBridgeInteraction() {
        const onBridge = this.scene.physics.overlap(this, this.scene.BridgeLayer);
        console.log(onBridge)
        if (cursors.down.isDown && onBridge) {
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
    }

}
