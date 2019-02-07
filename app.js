var game = new Phaser.Game(
    800,
    600,
    Phaser.AUTO,
    'game',
    {
        preload: preload,
        create: create,
        update: update
    }
);

var platforms;
var player;
var player2;
var cursors;
var stars;
var diamonds;
var midDiamonds;
var midStars;
var score1;
var score2;
var scoreText1;
var scoreText2;
var starsAmount = Math.floor(Math.random()*(15 - 10) + 10);
function preload(){
    game.load.image('sky', 'source/sky.png');
    game.load.image('ground','source/platform.png');
    game.load.image('star','source/banana.gif');
    game.load.image('diamond','source/diamond.png');
    game.load.spritesheet('dude', 'source/minion2.png', 48, 48);
    game.load.spritesheet('baddie', 'source/baddie.png', 32, 32);
}
function create(){
    score1 = 0;
    score2 = 0;


    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0, 0, 'sky');


    platforms = game.add.group();
    platforms.enableBody = true;
    var ground = platforms.create(0, game.world.height - 64, 'ground');
    ground.scale.setTo(2,2);
    ground.body.immovable = true;
    var ground = platforms.create(600, game.world.height - 64, 'ground');
    ground.scale.setTo(2,2);
    ground.body.immovable = true;
    var ledge = platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;
    ledge = platforms.create(Math.floor(Math.random()*((game.world.width - 100) - 400) + 400), 100,'ground');
    ledge.body.immovable = true;
    ledge = platforms.create(-100, Math.floor(Math.random()*(150 - 140) + 140),'ground');
    ledge.body.immovable = true;
    ledge = platforms.create(900, 850, 'ground');
    ledge.body.immovable = true;
    ledge = platforms.create(300, 1000, 'ground');
    ledge.body.immovable = true;
    ledge = platforms.create(Math.floor(Math.random()*(-200 + 100) - 100), 850, 'ground');
    ledge.body.immovable = true;
    ledge = platforms.create(Math.floor(Math.random()*(500 - 100) + 100), 700, 'ground');
    ledge.body.immovable = true;
    ledge = platforms.create(250, 550, 'ground');
    ledge.body.immovable = true;
    ledge = platforms.create(800, 250, 'ground');
    ledge.body.immovable = true;
    ledge = platforms.create(150, 300, 'ground');
    ledge.body.immovable = true;



    player = game.add.sprite(32, game.world.height - 150, 'dude');
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;
    player.animations.add('left',[0,1,2,3], 10, true);
    player.animations.add('right',[5,6,7,8], 10, true);

    player2 = game.add.sprite(500, game.world.height - 150, 'baddie');
    game.physics.arcade.enable(player2);
    player2.body.bounce.y = 0.2;
    player2.body.gravity.y = 300;
    player2.body.collideWorldBounds = true;
    player2.animations.add('left',[0,1,0,1], 10, true);
    player2.animations.add('right',[2,3,2,3], 10, true);

    stars = game.add.group();
    stars.enableBody = true;
    diamonds = game.add.group();
    diamonds.enableBody = true;
    for (var i = 0; i < starsAmount; i++)
    {
        var star = stars.create(i * Math.floor(Math.random()*(70 - 50) + 50), 0, 'star');
        var diamond = diamonds.create(i * Math.floor(Math.random()*(95-75) + 75), 0, 'diamond');
        var midStars = stars.create(i * Math.floor(Math.random()*(80 - 60) + 60), 500, 'star');
        var midDiamonds = diamonds.create(i * Math.floor(Math.random()*(50 - 40) + 40), 500, 'diamond');
        star.body.gravity.y = 250;
        midStars.body.gravity.y = 250;
        diamond.body.gravity.y = 350;
        midDiamonds.body.gravity.y = 350;
        star.body.bounce.y = 0.5 + Math.random() * 0.1;
        midStars.body.bounce.y = 0.5 + Math.random() * 0.1;
        diamond.body.bounce.y = 0.5 + Math.random() * 0.1;
        midDiamonds.body.bounce.y = 0.5 + Math.random() * 0.1;
    }

    scoreText1 = game.add.text(0,0, 'score: 0', {fontSize:'32px', fill: '#000'});
    scoreText2 = game.add.text(1095,0, 'score: 0', {fontSize:'32px', fill: '#000'});

    cursors = game.input.keyboard.createCursorKeys();
    game.camera.follow(player);
}
function update(){
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(player2, platforms);
    game.physics.arcade.collide(stars, platforms);
    game.physics.arcade.collide(diamonds, platforms);
    game.physics.arcade.overlap(player, stars, collectStar, null, this);
    game.physics.arcade.overlap(player2, diamonds, collectDiamonds, null, this);
    game.physics.arcade.overlap(player2, midDiamonds, collectMidDiamonds, null, this);
    game.physics.arcade.overlap(player, midStars, collectMidStar, null, this);

    player.body.velocity.x = 0;

    if (cursors.left.isDown){
        player.body.velocity.x = -150;
        player.animations.play('left');
    }
    else if (cursors.right.isDown){
        player.body.velocity.x = 150;
        player.animations.play('right');
    }
    else{
        player.animations.stop();
        player.frame = 4;
    }

    if (cursors.up.isDown && player.body.touching.down){
        player.body.velocity.y = -310;
    }

    player2.body.velocity.x = 0;


    if (game.input.keyboard.addKey(Phaser.Keyboard.A).isDown) {
        player2.body.velocity.x = -150;
        player2.animations.play('left');
    }
    else if (game.input.keyboard.addKey(Phaser.Keyboard.D).isDown) {
        player2.body.velocity.x = 150;
        player2.animations.play('right');
    }
    else {
        player2.animations.stop();
        player2.frame = 4;
    }

    if (game.input.keyboard.addKey(Phaser.Keyboard.W).isDown && player2.body.touching.down) {
        player2.body.velocity.y = -310;
    }
}
function collectStar (player1, star) {
    star.kill();
    score1+=10;
    scoreText1.text = 'Score: ' + score1;
    if (score1 === starsAmount*20){
        scoreText1.text = 'You win!';
        create();
        update();
    }
}
function collectMidStar (player1, midStars) {
    midStars.kill();
    score1+=10;
    scoreText1.text = 'Score: ' + score1;
    if (score1 === starsAmount*20){
        scoreText1.text = 'You win!';
        create();
        update();
    }
}
function collectDiamonds (player2, diamond){
    diamond.kill();
    score2+=10;
    scoreText2.text = 'Score: ' + score2;
    if (score2 === starsAmount*20){
        scoreText2.text = 'You win!';
        create();
        update();
    }
}
function collectMidDiamonds (player2, midDiamonds){
    midDiamonds.kill();
    score2+=10;
    scoreText2.text = 'Score: ' + score2;
    if (score2 === starsAmount*20){
        scoreText2.text = 'You win!';
        create();
        update();
    }
}
