$(document).ready(function() {
    var velociteJoueur = 200;
    var game = new Phaser.Game(960, 639, Phaser.AUTO, '', { preload: preload, create: create, update: update });
    var player, fire, cursors, fireshot;

    function preload() {
        game.load.image('bg', '../images/volcan.jpg');
        game.load.image('house', '../images/House.png');
        game.load.spritesheet('fire', '../images/Soreyuke Fire.png', 130, 130, 30);
        game.load.spritesheet('megaman', '../images/Mega Man.png', 65, 65, 20);
        game.load.spritesheet('fireshot', '../images/explosion_transparent.png', 60, 60, 2);
        game.load.spritesheet('house', '../images/House.png', 190, 210, 4);

    }

    function create() {
        game.add.image(0, 0, 'bg');
        game.add.image(0, 0, 'house');

        fire = game.add.sprite(170, 290, 'fire');
        fire.animations.add('center', [0, 1, 2, 3], 10, true);
        game.physics.arcade.enable(fire);

        

        player = game.add.sprite(800, 500, 'megaman');
        player.animations.add('left', [0, 1, 2], 5, true);
        player.animations.add('right', [4, 5, 6], 5, true);
        player.animations.add('up', [8, 9, 10], 5, true);
        player.animations.add('down', [2, 6], 5, true);
        game.physics.arcade.enable(player);

        cursors = game.input.keyboard.createCursorKeys();

        player.body.collideWorldBounds = true;
        //fireshot.body.collideWorldBounds = true;

        //fireshot = game.add.sprite(190, 350, 'fireshot');
        //fireshot.animations.add('right', [8, 9, 10, 11], 10, true);
        // addBulletAnimation(name, frames, frameRate, loop, useNumericIndex)
        weapon = game.add.weapon(30, 'fireshot');
        weapon.setBulletFrames(0, 2, true);
        weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        //  The speed at which the bullet is fired
        weapon.bulletSpeed = 300;
        //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
        //  Tell the Weapon to track the 'player' Sprite
        //  With no offsets from the position
        //  But the 'true' argument tells the weapon to track sprite rotation
        //weapon.fireFrom.setTo(170, 200, 1, 1);
        weapon.trackSprite(fire, 0, 0, true);

        weapon.fireRate = 1300;
        weapon.fireRateVariance = 200;
        
        
        //weapon.fireFrom();
        //weapon.trackSprite(player);
        //
        // game.physics.arcade.enable(fireshot);

        fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

    }
    

    function update() {
        game.physics.arcade.overlap(weapon.bullets, player, bulletHitPlayer, null, this);
        fire.animations.play('center');
        //fireshot.animations.play('right');

        window.setInterval();
        //  Reset the players velocity (movement)
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;
        //fireshot.rotation = 1.2;
        //fireshot.body.angle = 2;
        //fireshot.body.velocity.y = -100;
        //fireshot.body.velocity.x = 150;

        if (cursors.left.isDown) {
            //  Move to the left
            player.body.velocity.x = -velociteJoueur;

            player.animations.play('left');
        } else if (cursors.right.isDown) {
            //  Move to the right
            player.body.velocity.x = velociteJoueur;

            player.animations.play('right');
        } else if (cursors.up.isDown) {
            //  Move to the right
            player.body.velocity.y = -velociteJoueur;

            player.animations.play('up');
        } else if (cursors.down.isDown) {
            //  Move to the right
            player.body.velocity.y = velociteJoueur;

            player.animations.play('down');
        } else {
            //  Stand still
            player.animations.stop();
            player.frame = 4;
        }

        //if (fireButton.isDown)
            //{
                weapon.fireAtSprite(player);
            //}
            
    }

    function bulletHitPlayer (player, bullet) {
        console.log('collision');
        bullet.kill();
        player.kill();
        player.reset(800, 500);

    }




});