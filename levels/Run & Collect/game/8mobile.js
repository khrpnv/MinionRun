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
var time = 75;
var platforms;
var player;
var cursors;
var bananas;
var box;
var score;
var left=false;
var right=false;
var up=false;
var buttonright;
var buttonleft;
var buttonup;
var scoreText;
var timerText;
var itemsAmount = 25;
var extraItems = Math.floor(itemsAmount*0.5 + 1);
console.log(extraItems);
function preload(){
    game.load.image('sky', 'source/bg8-9(2).jpg');
    game.load.image('ground','source/5-Ground.png');
    game.load.image('underground','source/underground.png');
    game.load.image('step','source/ground.png');
    game.load.image('100step','source/100ground.png');
    game.load.image('30step','source/30ground.png');
    game.load.image('200step','source/200ground.png');
    game.load.image('70step','source/70ground.png');
    game.load.image('banana','source/apple.png');
    game.load.image('buttonL','source/buttonLeft.png');
    game.load.image('buttonR','source/buttonRight.png');
    game.load.image('buttonU','source/buttonUp.png');
    game.load.spritesheet('minion', 'source/minion2.png', 48, 48);
    game.load.image('box','source/box.png');
}
function create(){
    score = 0;

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.tileSprite(0, 0, 1000, 1000, 'sky');
    game.world.setBounds(0, 0, 1000, 1000);

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

    var ledge = platforms.create(438, 537, '200step');
    ledge.body.immovable = true;
    ledge = platforms.create(755, 435, '100step');
    ledge.body.immovable = true;
    ledge = platforms.create(-100, 790, 'step');
    ledge.body.immovable = true;
    ledge = platforms.create(200, 690, '100step');
    ledge.body.immovable = true;
    ledge = platforms.create(450, 860, 'step');
    ledge.body.immovable = true;
    ledge = platforms.create(800, 800, '100step');
    ledge.body.immovable = true;
    ledge = platforms.create(960, 700, 'step');
    ledge.body.immovable = true;
    ledge = platforms.create(580, 670, '100step');
    ledge.body.immovable = true;
    ledge = platforms.create(-100, 790, 'step');
    ledge.body.immovable = true;
    ledge = platforms.create(810, 600, '70step');
    ledge.body.immovable = true;
    ledge = platforms.create(-30, 600, '100step');
    ledge.body.immovable = true;
    ledge = platforms.create(250, 450, '70step');
    ledge.body.immovable = true;
    ledge = platforms.create(-200, 500, 'step');
    ledge.body.immovable = true;
    ledge = platforms.create(120, 100, '70step');
    ledge.body.immovable = true;
    ledge = platforms.create(500, 400, '30step');
    ledge.body.immovable = true;
    ledge = platforms.create(610, 370, '30step');
    ledge.body.immovable = true;
    ledge = platforms.create(810, 330, '70step');
    ledge.body.immovable = true;
    ledge = platforms.create(300, 280, '200step');
    ledge.body.immovable = true;
    ledge = platforms.create(50, 250, '100step');
    ledge.body.immovable = true;
    ledge = platforms.create(350, 120, '70step');
    ledge.body.immovable = true;
    ledge = platforms.create(670, 280, '30step');
    ledge.body.immovable = true;
    ledge = platforms.create(600, 130, '200step');
    ledge.body.immovable = true;
    ledge = platforms.create(950, 230, 'step');
    ledge.body.immovable = true;
    ledge = platforms.create(930, 90, '70step');
    ledge.body.immovable = true;
    ledge = platforms.create(-230, 370, 'step');
    ledge.body.immovable = true;
    ledge = platforms.create(-220, 70, 'step');
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

    box = game.add.sprite(550,game.world.height - 350, 'box');
    game.physics.arcade.enable(box);
    box.body.bounce.y = 0.2;
    box.body.gravity.y = 600;
    box.body.collideWorldBounds = true;

    game.physics.enable([player,box], Phaser.Physics.ARCADE);
    game.world.camera.width = 600;
    game.world.camera.height = 350;
    game.camera.follow(player);

    bananas = game.add.group();
    bananas.enableBody = true;
    for (var i = 0; i < itemsAmount; i++)
    {
        var banana = bananas.create(i * Math.floor(Math.random()*(40-37) + 37), 300, 'banana');
        banana.body.gravity.y = 250;
        banana.body.bounce.y = 0.4 + Math.random() * 0.1;
    }

    for (var j = 0; j < extraItems; j++)
    {
        banana = bananas.create(j * Math.floor(Math.random()*(80-75) + 75), 0, 'banana');
        banana.body.gravity.y = 250;
        banana.body.bounce.y = 0.4 + Math.random() * 0.1;
    }

    soundClick('source/sounds/bapa.mp3');
    soundClick('source/sounds/Minion.mp3');

    timerText = game.add.text(480, 0, 'Time: 75', {fontSize:'32px', fill: '#CCC'});
    timerText.fixedToCamera = true;
    scoreText = game.add.text(0,0, 'Score: 0', {fontSize:'32px', fill: '#CCC'});
    scoreText.fixedToCamera = true;
    game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);

    cursors = game.input.keyboard.createCursorKeys();
}
function update(){
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(bananas, platforms);
    game.physics.arcade.collide(box, platforms);
    game.physics.arcade.collide(player, box, function boxStop(){box.body.velocity.x = 0},null, this);
    game.physics.arcade.overlap(player, bananas, collectStar, null, this);

    player.body.velocity.x = 0;

    if (cursors.left.isDown || left){
        player.body.velocity.x = -150;
        player.animations.play('left');
    }
    else if (cursors.right.isDown || right){
        player.body.velocity.x = 150;
        player.animations.play('right');
    }
    else{
        player.animations.stop();
        player.frame = 4;
    }

    if (cursors.up.isDown && player.body.touching.down || up && player.body.touching.down){
        player.body.velocity.y = -250;
    }
}
function collectStar (player, banana) {
    banana.kill();
    soundClick('source/sounds/Minion Apple Sound Effect.mp3');
    score+=10;
    scoreText.text = 'Score: ' + score;
    if (score === (itemsAmount + extraItems) * 10){
        scoreText.text = 'You win!';
        setTimeout(changeLevel('http://captainblack.epizy.com/levels/9mobile.html'),3000);
    }
}
function changeLevel(str){
    document.location.href=str;
}
function updateCounter() {
    if (time == 0) {
        scoreText.text = 'You lose!';
        setTimeout(changeLevel('http://captainblack.epizy.com/levels/8mobile.html'),5000);
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