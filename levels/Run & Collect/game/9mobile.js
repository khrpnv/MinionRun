var game = new Phaser.Game(
    600,
    350,
    Phaser.AUTO,
    'game',
    {
        preload: preload,
        create: create,
        update: update
    }
);

var time = 80;
var platforms;
var player;
var cursors;
var bananas;
var score;
var left=false;
var right=false;
var up=false;
var buttonright;
var buttonleft;
var buttonup;
var box1;
var box2;
var timerText;
var scoreText;
var obstacle;
var itemsAmount = 23;
var extraItems = 23;
function preload(){
    game.load.image('sky', 'source/bgExtr.jpg');
    game.load.image('ground','source/5-Ground.png');
    game.load.image('step','source/ground.png');
    game.load.image('banana','source/pineapple.png');
    game.load.image('step','source/ground.png');
    game.load.image('100step','source/100ground.png');
    game.load.image('30step','source/30ground.png');
    game.load.image('200step','source/200ground.png');
    game.load.image('70step','source/70ground.png');
    game.load.image('thorn','source/obstacle1.png');
    game.load.image('box','source/box.png');
    game.load.image('buttonL','source/buttonLeft.png');
    game.load.image('buttonR','source/buttonRight.png');
    game.load.image('buttonU','source/buttonUp.png');
    game.load.image('box2','source/box.png');
    game.load.spritesheet('minion', 'source/minion2.png', 48, 48)
}
function create(){
    score = 0;

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.tileSprite(0, 0, 1200, 1200, 'sky');
    game.world.setBounds(0, 0, 1200, 1200);

    platforms = game.add.group();
    platforms.enableBody = true;

    var ground = platforms.create(0, game.world.height - 64, 'ground');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(250, game.world.height - 64, 'ground');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(500, game.world.height - 64, 'ground');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(750, game.world.height - 64, 'ground');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(900, game.world.height - 64, 'ground');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(1150, game.world.height - 64, 'ground');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(1400, game.world.height - 64, 'ground');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;

    obstacle = game.add.group();
    obstacle.enableBody = true;

    var thorns = obstacle.create(150, 1105, 'thorn');
    thorns.body.immovable = true;
    thorns = obstacle.create(175, 1105, 'thorn');
    thorns.body.immovable = true;
    thorns = obstacle.create(200, 1105, 'thorn');
    thorns.body.immovable = true;
    thorns = obstacle.create(370, 1105, 'thorn');
    thorns.body.immovable = true;
    thorns = obstacle.create(395, 1105, 'thorn');
    thorns.body.immovable = true;
    thorns = obstacle.create(420, 1105, 'thorn');
    thorns.body.immovable = true;
    thorns = obstacle.create(445, 1105, 'thorn');
    thorns.body.immovable = true;
    thorns = obstacle.create(470, 1105, 'thorn');
    thorns.body.immovable = true;
    thorns = obstacle.create(495, 1105, 'thorn');
    thorns.body.immovable = true;

    var ledge = platforms.create(400, 400, 'step');
    ledge.body.immovable = true;
    ledge = platforms.create(350, 1000, '200step');
    ledge.body.immovable = true;
    ledge = platforms.create(350, 850, '200step');
    ledge.body.immovable = true;
    ledge = platforms.create(0, 915, '100step');
    ledge.body.immovable = true;
    ledge = platforms.create(130, 815, '100step');
    ledge.body.immovable = true;
    ledge = platforms.create(300, 650, '200step');
    ledge.body.immovable = true;
    ledge = platforms.create(680, 750, '100step');
    ledge.body.immovable = true;
    ledge = platforms.create(950, 650, '100step');
    ledge.body.immovable = true;
    ledge = platforms.create(1050, 550, '70step');
    ledge.body.immovable = true;
    ledge = platforms.create(950, 450, '70step');
    ledge.body.immovable = true;
    ledge = platforms.create(1050, 350, '70step');
    ledge.body.immovable = true;
    ledge = platforms.create(800, 950, 'step');
    ledge.body.immovable = true;
    ledge = platforms.create(1050, 950, '200step');
    ledge.body.immovable = true;
    ledge = platforms.create(700, 250, '200step');
    ledge.body.immovable = true;
    ledge = platforms.create(-200, 550, 'step');
    ledge.body.immovable = true;
    ledge = platforms.create(150, 280, '100step');
    ledge.body.immovable = true;
    ledge = platforms.create(450, 150, '100step');
    ledge.body.immovable = true;
    ledge = platforms.create(740, 100, '70step');
    ledge.body.immovable = true;
    ledge = platforms.create(250, 90, '70step');
    ledge.body.immovable = true;

    buttonleft = game.add.button(0, 270, 'buttonL', null, this, 0, 1, 0, 1);
    buttonleft.fixedToCamera = true;
    buttonleft.events.onInputOver.add(function(){left=true;});
    buttonleft.events.onInputOut.add(function(){left=false;});
    buttonleft.events.onInputDown.add(function(){left=true;});
    buttonleft.events.onInputUp.add(function(){left=false;});

    buttonright = game.add.button(100, 270, 'buttonR', null, this, 0, 1, 0, 1);
    buttonright.fixedToCamera = true;
    buttonright.events.onInputOver.add(function(){right=true;});
    buttonright.events.onInputOut.add(function(){right=false;});
    buttonright.events.onInputDown.add(function(){right=true;});
    buttonright.events.onInputUp.add(function(){right=false;});

    buttonup = game.add.button(520, 270, 'buttonU', null, this, 0, 1, 0, 1);
    buttonup.fixedToCamera = true;
    buttonup.events.onInputOver.add(function(){up=true;});
    buttonup.events.onInputOut.add(function(){up=false;});
    buttonup.events.onInputDown.add(function(){up=true;});
    buttonup.events.onInputUp.add(function(){up=false;});

    player = game.add.sprite(32, game.world.height - 150, 'minion');
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;
    player.animations.add('left',[0,1,2,3], 10, true);
    player.animations.add('right',[5,6,7,8], 10, true);

    box1 = game.add.sprite(290,1000, 'box');
    game.physics.arcade.enable(box1);
    box1.body.bounce.y = 0.2;
    box1.body.gravity.y = 600;
    box1.body.collideWorldBounds = true;
    game.physics.enable([player,box1], Phaser.Physics.ARCADE);

    box2 = game.add.sprite(420,900, 'box2');
    game.physics.arcade.enable(box2);
    box2.body.bounce.y = 0.2;
    box2.body.gravity.y = 600;
    box2.body.collideWorldBounds = true;
    game.physics.enable([player,box2], Phaser.Physics.ARCADE);

    bananas = game.add.group();
    bananas.enableBody = true;
    for (var i = 0; i < itemsAmount; i++)
    {
        var banana = bananas.create(i * 50, 375, 'banana');
        banana.body.gravity.y = 250;
        banana.body.bounce.y = 0.4 + Math.random() * 0.1;
    }

    for (var j = 0; j < extraItems; j++)
    {
        banana = bananas.create(j * Math.floor(Math.random()*(52-48) + 48), 0, 'banana');
        banana.body.gravity.y = 250;
        banana.body.bounce.y = 0.4 + Math.random() * 0.1;
    }

    soundClick('source/sounds/tadaaa.mp3');
    soundClick('source/sounds/Minion.mp3');
    timerText = game.add.text(480, 0, 'Time: 80', {fontSize:'32px', fill: '#CCC'});
    timerText.fixedToCamera = true;
    scoreText = game.add.text(0,0, 'Score: 0', {fontSize:'32px', fill: '#CCC'});
    scoreText.fixedToCamera = true;
    game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);

    cursors = game.input.keyboard.createCursorKeys();
    game.world.camera.width = 600;
    game.world.camera.height = 350;
    game.camera.follow(player);
}
function update() {
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(bananas, platforms);
    game.physics.arcade.collide(bananas, obstacle);
    game.physics.arcade.collide(player, obstacle, touchObstacle, null, this);
    game.physics.arcade.overlap(player, bananas, collectStar, null, this);
    game.physics.arcade.collide(box1, platforms);
    game.physics.arcade.collide(box1, obstacle);
    game.physics.arcade.collide(player, box1, function boxStop(){box1.body.velocity.x = 0},null, this);
    game.physics.arcade.collide(box2, platforms);
    game.physics.arcade.collide(box2, obstacle);
    game.physics.arcade.collide(box2, box1);
    game.physics.arcade.collide(player, box2, function boxStop(){box2.body.velocity.x = 0},null, this);

    player.body.velocity.x = 0;

    if (cursors.left.isDown || left) {
        player.body.velocity.x = -150;
        player.animations.play('left');
    }
    else if (cursors.right.isDown || right) {
        player.body.velocity.x = 150;
        player.animations.play('right');
    }
    else {
        player.animations.stop();
        player.frame = 4;
    }

    if (cursors.up.isDown && player.body.touching.down || up && player.body.touching.down) {
        player.body.velocity.y = -250;
    }
}
function changeLevel(str){
    document.location.href=str;
}


function collectStar (player, banana) {
    banana.kill();
    score+=10;
    scoreText.text = 'Score: ' + score;
    if (score === (itemsAmount + extraItems) * 10){
        scoreText.text = 'You win!';
        setTimeout(changeLevel('http://captainblack.epizy.com/levels/10mobile.html'),3000);
    }
}

function updateCounter() {
    if (time == 0) {
        scoreText.text = 'You lose!';
        setTimeout(changeLevel('http://captainblack.epizy.com/levels/9mobile.html'),3000);
    }
    else {
        time--;
        timerText.setText('Time: ' + time);
    }
}

function soundClick(str) {
    var audio = new Audio();
    audio.src = str;
    audio.autoplay = true;
}

function touchObstacle(){
    changeLevel('http://captainblack.epizy.com/levels/9mobile.html')
}