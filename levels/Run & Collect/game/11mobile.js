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

var time = 95;
var aim;
var box3;
var platforms;
var player;
var cursors;
var bananas;
var score;
var box1;
var coler;
var chrtree;
var left=false;
var right=false;
var up=false;
var buttonright;
var buttonleft;
var buttonup;
var bullets;
var fireRate = 5000;
var nextFire = 0;
var sprite;
var spike;
var emitter;
var spikeBall1;
var spikeBall2;
var timerText;
var scoreText;
var obstacle;
var itemsAmount = 15;
var extraItems = 20;
function preload(){
    game.load.image('sky', 'source/bg9-10.jpg');
    game.load.image('chrTree', 'source/christmastree.png');
    game.load.image('banana','source/pineapple.png');
    game.load.image('step','source/snow.png');
    game.load.image('step150','source/snow150.png');
    game.load.image('step100','source/snow100.png');
    game.load.image('step70','source/snow70.png');
    game.load.image('thorn','source/obstacle1.png');
    game.load.image('box','source/box.png');
    game.load.image('box2','source/box2.png');
    game.load.image('spike','source/rotate.png');
    game.load.image('spikeBall','source/minions-ball-of-death.png');
    game.load.image('snowLeft', 'source/ice-platform-left.png');
    game.load.image('snowCenter', 'source/ice-platform-center.png');
    game.load.image('snowRight', 'source/ice-platform-right.png');
    game.load.image('coler', 'source/coler.png');
    game.load.image('wallspike', 'source/spikesBoard.png');
    game.load.image('wallspiketop', 'source/spikesBoardTop.png');
    game.load.image('wallspikeleft', 'source/spikesBoardLeft.png');
    game.load.image('wallspikeright', 'source/spikesBoardRight.png');
    game.load.image('buttonL','source/buttonLeft.png');
    game.load.image('buttonR','source/buttonRight.png');
    game.load.image('buttonU','source/buttonUp.png');
    game.load.image('snowSpike', 'source/spikesBottomAlt2.png');
    game.load.image('launch', 'source/badMinion.png');
    game.load.image('aim', 'source/launch.png');
    game.load.image('rocket', 'source/rocket.png');
    game.load.spritesheet('minion', 'source/minion2.png', 48, 48)
}
function create(){
    score = 0;

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.tileSprite(0, 0, 1000, 1400, 'sky');
    game.world.setBounds(0, 0, 1000, 1400);

    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;

    bullets.createMultiple(30, 'rocket');
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);
    sprite = game.add.sprite(15, 720, 'launch');
    sprite.anchor.set(0.2);
    game.physics.enable(sprite, Phaser.Physics.ARCADE);

    platforms = game.add.group();
    platforms.enableBody = true;

    var ground = platforms.create(0, game.world.height - 64, 'snowLeft');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(258, game.world.height - 64, 'snowCenter');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(463, game.world.height - 64, 'snowCenter');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(668, game.world.height - 64, 'snowCenter');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(873, game.world.height - 64, 'snowCenter');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(1078, game.world.height - 64, 'snowCenter');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(1283, game.world.height - 64, 'snowCenter');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;


    obstacle = game.add.group();
    obstacle.enableBody = true;

    chrtree = game.add.sprite(1300,1100,'chrTree');
    game.physics.arcade.enable(chrtree);
    chrtree.body.immovable = true;

    coler = game.add.sprite(0,1222,'chrTree');
    aim = game.add.sprite(1100,720,'aim');

    var wall = obstacle.create(-20,880,'wallspikeleft');
    wall.body.immovable = true;
    wall = obstacle.create(920,800,'wallspike');
    wall.body.immovable = true;
    wall = obstacle.create(720,-10,'wallspiketop');
    wall.body.immovable = true;
    wall = obstacle.create(752,-10,'wallspiketop');
    wall.body.immovable = true;
    wall = obstacle.create(688,-10,'wallspiketop');
    wall.body.immovable = true;
    wall = obstacle.create(370,503,'wallspiketop');
    wall.body.immovable = true;
    wall = obstacle.create(452,503,'wallspiketop');
    wall.body.immovable = true;
    wall = obstacle.create(5,432,'wallspiketop');
    wall.body.immovable = true;
    wall = obstacle.create(37,432,'wallspiketop');
    wall.body.immovable = true;
    wall = obstacle.create(69,432,'wallspiketop');
    wall.body.immovable = true;
    wall = obstacle.create(101,432,'wallspiketop');
    wall.body.immovable = true;
    wall = obstacle.create(133,432,'wallspiketop');
    wall.body.immovable = true;
    wall = obstacle.create(155,432,'wallspiketop');
    wall.body.immovable = true;


    var thorns = obstacle.create(747, 1138, 'thorn');
    thorns.body.immovable = true;
    thorns = obstacle.create(773, 1138, 'thorn');
    thorns.body.immovable = true;
    thorns = obstacle.create(445, 729, 'thorn');
    thorns.body.immovable = true;
    thorns = obstacle.create(470, 729, 'thorn');
    thorns.body.immovable = true;
    thorns = obstacle.create(740, 369, 'thorn');
    thorns.body.immovable = true;
    thorns = obstacle.create(715, 369, 'thorn');
    thorns.body.immovable = true;


    var ledge = platforms.create(750, 1170, 'step');
    ledge.body.immovable = true;
    ledge = platforms.create(400, 1170, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(180, 1170, 'step70');
    ledge.body.immovable = true;
    ledge = platforms.create(230, 1070, 'step');
    ledge.body.immovable = true;
    ledge = platforms.create(0, 950, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(300, 970, 'step70');
    ledge.body.immovable = true;
    ledge = platforms.create(570, 970, 'step70');
    ledge.body.immovable = true;
    ledge = platforms.create(840, 880, 'step70');
    ledge.body.immovable = true;
    ledge = platforms.create(950, 800, 'step70');
    ledge.body.immovable = true;
    ledge = platforms.create(720, 700, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(-20, 770, 'step70');
    ledge.body.immovable = true;
    ledge = platforms.create(600, 600, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(300, 760, 'step');
    ledge.body.immovable = true;
    ledge = platforms.create(-60, 610, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(370, 470, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(650, 400, 'step');
    ledge.body.immovable = true;
    ledge = platforms.create(300, 640, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(-10, 400, 'step');
    ledge.body.immovable = true;
    ledge = platforms.create(200, 295, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(0, 220, 'step70');
    ledge.body.immovable = true;
    ledge = platforms.create(180, 120, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(465, 100, 'step70');
    ledge.body.immovable = true;
    ledge = platforms.create(665, 80, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(850, 240, 'step150');
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

    spike = game.add.sprite(900, 1000, 'spikeBall');
    spike.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(spike);
    spike.body.immovable = true;

    spikeBall1 = game.add.sprite(80, 1070, 'spikeBall');
    spikeBall1.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(spikeBall1);
    spikeBall1.body.immovable = true;

    spikeBall2 = game.add.sprite(550, 230, 'spikeBall');
    spikeBall2.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(spikeBall2);
    spikeBall2.body.immovable = true;

    player = game.add.sprite(88, game.world.height - 150, 'minion');
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;
    player.animations.add('left',[0,1,2,3], 10, true);
    player.animations.add('right',[5,6,7,8], 10, true);

    box1 = game.add.sprite(500,1200, 'box');
    game.physics.arcade.enable(box1);
    box1.body.bounce.y = 0.2;
    box1.body.gravity.y = 600;
    box1.body.collideWorldBounds = true;

    box3 = game.add.sprite(650,450, 'box');
    game.physics.arcade.enable(box3);
    box3.body.bounce.y = 0.2;
    box3.body.gravity.y = 600;
    box3.body.collideWorldBounds = true;

    bananas = game.add.group();
    bananas.enableBody = true;
    for (var i = 0; i < itemsAmount; i++)
    {
        var banana = bananas.create(i * 60, 440, 'banana');
        banana.body.gravity.y = 250;
        banana.body.bounce.y = 0.4 + Math.random() * 0.1;
    }

    for (var j = 0; j < extraItems; j++)
    {
        banana = bananas.create(j * Math.floor(Math.random()*(50-48) + 48), 0, 'banana');
        banana.body.gravity.y = 250;
        banana.body.bounce.y = 0.4 + Math.random() * 0.1;
    }

    soundClick('source/sounds/bapa.mp3');
    soundClick('source/sounds/Minion.mp3');

    timerText = game.add.text(480, 0, 'Time: 95', {fontSize:'32px', fill: '#CCC'});
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
    game.physics.arcade.collide(player, platforms, function slide(){player.body.velocity.x = 5});
    game.physics.arcade.collide(bananas, platforms);
    game.physics.arcade.collide(emitter, platforms);
    game.physics.arcade.collide(bananas, obstacle);
    game.physics.arcade.collide(bananas, spike);
    game.physics.arcade.collide(player, obstacle, touchObstacle, null, this);
    game.physics.arcade.collide(player, spike, touchObstacle, null, this);
    game.physics.arcade.collide(player, spikeBall1, touchObstacle, null, this);
    game.physics.arcade.collide(player, spikeBall2, touchObstacle, null, this);
    game.physics.arcade.overlap(player, bananas, collectStar, null, this);
    game.physics.arcade.collide(box1, platforms);
    game.physics.arcade.collide(box3, platforms);
    game.physics.arcade.collide(box1, spike);
    game.physics.arcade.collide(box3, spike);
    game.physics.arcade.collide(box1, spikeBall1);
    game.physics.arcade.collide(box3, spikeBall1);
    game.physics.arcade.collide(box1, spikeBall2);
    game.physics.arcade.collide(box3, spikeBall2);
    game.physics.arcade.collide(box1, obstacle);
    game.physics.arcade.collide(box3, obstacle);
    game.physics.arcade.collide(box3, bananas);
    game.physics.arcade.collide(player, box1, function boxStop(){box1.body.velocity.x = 0},null, this);
    game.physics.arcade.collide(player, box3, function boxStop(){box3.body.velocity.x = 0},null, this);
    game.physics.arcade.collide(bullets, player, touchObstacle, null, this);


    player.body.velocity.x = 0;

    spike.angle += 1;
    spikeBall1.angle += 1;
    spikeBall2.angle += 1;

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

    fire();
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
        setTimeout(changeLevel('http://captainblack.epizy.com/levels/12mobile.html'),3000);
    }
}

function updateCounter() {
    if (time == 0) {
        scoreText.text = 'You lose!';
        setTimeout(changeLevel('http://captainblack.epizy.com/levels/11mobile.html'),3000);
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
    changeLevel('http://captainblack.epizy.com/levels/11mobile.html')
}

function fire() {

    if (game.time.now > nextFire && bullets.countDead() > 0)
    {
        nextFire = game.time.now + fireRate;

        var bullet = bullets.getFirstDead();

        bullet.reset(sprite.x - 15, sprite.y - 8);

        game.physics.arcade.moveToObject(bullet, aim, 300);
        soundClick('source/sounds/rocket.mp3');

    }

}