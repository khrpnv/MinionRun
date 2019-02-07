var game = new Phaser.Game(
    600,
    400,
    Phaser.AUTO,
    'game',
    {
        preload: preload,
        create: create,
        update: update
    }
);

var time = 100;
var platforms;
var player;
var cursors;
var bananas;
var score;
var coler;
var chrtree;
var spike;
var emitter;
var aim1;
var aim2;
var move1;
var move2;
var spikeBall1;
var left=false;
var right=false;
var up=false;
var buttonright;
var buttonleft;
var buttonup;
var machineGun;
var sprite;
var bullets;
var bombs;
var fireRate = 3000;
var fireRate2 = 5500;
var nextFire = 0;
var nextFire2 = 0;
var spikeBall2;
var timerText;
var scoreText;
var lava;
var obstacle;
var itemsAmount = 20;
var extraItems = 20;
function preload(){
    game.load.image('sky', 'source/bgLava.png');
    game.load.spritesheet('chrTree', 'source/christmastree1.png', 114, 114);
    game.load.spritesheet('lava', 'source/lava.png', 300, 69);
    game.load.image('banana','source/ice-cream.png');
    game.load.image('step','source/stone250.png');
    game.load.image('step150','source/stone150.png');
    game.load.image('step100','source/stone100.png');
    game.load.image('step70','source/stone70.png');
    game.load.image('step200','source/stone200.png');
    game.load.image('thorn','source/obstacle1.png');
    game.load.image('spike','source/axe.png');
    game.load.image('spikeBall','source/sawBig.png');
    game.load.image('spikeBall2','source/sawSmall.png');
    game.load.image('snowLeft', 'source/ice-platform-left.png');
    game.load.image('snowCenter', 'source/ice-platform-center.png');
    game.load.image('snowRight', 'source/ice-platform-right.png');
    game.load.image('coler', 'source/coler.png');
    game.load.spritesheet('wallSpike', 'source/spikesBoard Animate.png', 32, 32);
    game.load.spritesheet('cannon', 'source/cannon (2).png', 124, 124);
    game.load.spritesheet('machineGun', 'source/machinegun1.png', 110, 72);
    game.load.image('buttonR','source/buttonRight.png');
    game.load.image('buttonU','source/buttonUp.png');
    game.load.image('buttonL','source/buttonLeft.png');
    game.load.image('snowSpike', 'source/spikesBottomAlt2.png');
    game.load.image('wallspikeleft', 'source/spikesBoardLeft.png');
    game.load.image('bullet', 'source/bullet.png');
    game.load.image('bomb', 'source/bomb.png');
    game.load.image('wallspikeright', 'source/spikesBoardRight.png');
    game.load.image('snowSpike', 'source/spikesBottomAlt2.png');
    game.load.spritesheet('minion', 'source/minion2.png', 48, 48)
}
function create(){
    score = 0;

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.tileSprite(0, 0, 1200, 1600, 'sky');
    game.world.setBounds(0, 0, 1200, 1600);

    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;

    bullets.createMultiple(900, 'bullet');
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);
    machineGun = game.add.sprite(50, 855, 'machineGun');
    machineGun.animations.add('shoot');
    machineGun.anchor.set(0.35);
    game.physics.enable(machineGun, Phaser.Physics.ARCADE);
    machineGun.animations.play('shoot', 12, false);
    game.time.events.loop(Phaser.Timer.SECOND*3, function animate(){machineGun.animations.play('shoot', 15, false)}, this);
    aim1 = game.add.sprite(1350,855,'aim');

    bombs = game.add.group();
    bombs.enableBody = true;
    bombs.physicsBodyType = Phaser.Physics.ARCADE;

    bombs.createMultiple(300, 'bomb');
    bombs.setAll('checkWorldBounds', true);
    bombs.setAll('outOfBoundsKill', true);
    sprite = game.add.sprite(1170, 570, 'cannon');
    sprite.animations.add('shoot');
    sprite.anchor.set(0.725);
    game.physics.enable(sprite, Phaser.Physics.ARCADE);
    sprite.animations.play('shoot', 15, false);
    game.time.events.loop(Phaser.Timer.SECOND*5.5, function animate(){sprite.animations.play('shoot', 15, false)}, this);
    aim2 = game.add.sprite(-50,570,'aim');

    platforms = game.add.group();
    platforms.enableBody = true;

    lava = game.add.group();
    lava.enableBody = true;

    var ground = lava.create(0, game.world.height - 58, 'lava');
    ground.animations.add('lights');
    ground.enableBody = true;
    ground.animations.play('lights', 4, true);
    ground.body.immovable = true;
    ground = lava.create(300, game.world.height - 58, 'lava');
    ground.animations.add('lights');
    ground.enableBody = true;
    ground.animations.play('lights', 4, true);
    ground.body.immovable = true;
    ground = lava.create(600, game.world.height - 58, 'lava');
    ground.animations.add('lights');
    ground.enableBody = true;
    ground.animations.play('lights', 4, true);
    ground.body.immovable = true;
    ground = lava.create(900, game.world.height - 58, 'lava');
    ground.animations.add('lights');
    ground.enableBody = true;
    ground.animations.play('lights', 4, true);
    ground.body.immovable = true;
    ground = lava.create(1200, game.world.height - 58, 'lava');
    ground.animations.add('lights');
    ground.enableBody = true;
    ground.animations.play('lights', 4, true);
    ground.body.immovable = true;


    obstacle = game.add.group();
    obstacle.enableBody = true;

    var wall = obstacle.create(1014, 1460,'wallSpike');
    wall.body.immovable = true;
    wall.animations.add('spikeUp');
    wall.animations.play('spikeUp', 8, true);
    wall = obstacle.create(1046, 1460,'wallSpike');
    wall.body.immovable = true;
    wall.animations.add('spikeUp');
    wall.animations.play('spikeUp', 8, true);
    wall = obstacle.create(1078, 1460,'wallSpike');
    wall.body.immovable = true;
    wall.animations.add('spikeUp');
    wall.animations.play('spikeUp', 8, true);
    wall = obstacle.create(1110, 1460,'wallSpike');
    wall.body.immovable = true;
    wall.animations.add('spikeUp');
    wall.animations.play('spikeUp', 8, true);

    var thorns = obstacle.create(0, 1168, 'thorn');
    thorns.body.immovable = true;
    thorns = obstacle.create(25, 1168, 'thorn');
    thorns.body.immovable = true;

    move2 = platforms.create(265, 1100, 'step150');
    move2.body.immovable = true;
    move2.body.velocity.y = 60;
    move2.body.collideWorldBounds = true;
    move2.body.bounce.set(1);
    game.time.events.loop(Phaser.Timer.SECOND*4, function changeDirection(){move2.body.velocity.y *= (-1);}, this);
    move1 = platforms.create(600, 1100, 'step150');
    move1.body.immovable = true;
    move1.body.velocity.y = 80;
    move1.body.collideWorldBounds = true;
    move1.body.bounce.set(1);
    game.time.events.loop(Phaser.Timer.SECOND*3.9, function changeDirection(){move1.body.velocity.y *= (-1);}, this);

    var ledge = platforms.create(-110, 1430, 'step');
    ledge.body.immovable = true;
    ledge = platforms.create(-50, 900, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(1100, 600, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(900, 1490, 'step');
    ledge.body.immovable = true;
    ledge = platforms.create(1010, 1370, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(850, 1200, 'step200');
    ledge.body.immovable = true;
    ledge = platforms.create(1017, 1100, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(900, 1000, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(700, 900, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(450, 900, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(150, 1020, 'step200');
    ledge.body.immovable = true;
    ledge = platforms.create(0, 1200, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(225, 900, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(1017, 800, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(800, 700, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(475, 780, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(125, 750, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(-80, 650, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(170, 590, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(450, 600, 'step200');
    ledge.body.immovable = true;
    ledge = platforms.create(700, 500, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(900, 400, 'step200');
    ledge.body.immovable = true;
    ledge = platforms.create(500, 400, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(700, 300, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(270, 300, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(50, 200, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(220, 110, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(450, 150, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(700, 150, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(950, 100, 'step150');
    ledge.body.immovable = true;

    buttonleft = game.add.button(0, 320, 'buttonL', null, this, 0, 1, 0, 1);
    buttonleft.fixedToCamera = true;
    buttonleft.events.onInputOver.add(function(){left=true;});
    buttonleft.events.onInputOut.add(function(){left=false;});
    buttonleft.events.onInputDown.add(function(){left=true;});
    buttonleft.events.onInputUp.add(function(){left=false;});

    buttonright = game.add.button(100, 320, 'buttonR', null, this, 0, 1, 0, 1);
    buttonright.fixedToCamera = true;
    buttonright.events.onInputOver.add(function(){right=true;});
    buttonright.events.onInputOut.add(function(){right=false;});
    buttonright.events.onInputDown.add(function(){right=true;});
    buttonright.events.onInputUp.add(function(){right=false;});

    buttonup = game.add.button(520, 320, 'buttonU', null, this, 0, 1, 0, 1);
    buttonup.fixedToCamera = true;
    buttonup.events.onInputOver.add(function(){up=true;});
    buttonup.events.onInputOut.add(function(){up=false;});
    buttonup.events.onInputDown.add(function(){up=true;});
    buttonup.events.onInputUp.add(function(){up=false;});

    spike = game.add.sprite(1000, 240, 'spike');
    spike.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(spike);
    spike.body.immovable = true;

    spikeBall1 = game.add.sprite(1210, 780, 'spikeBall');
    spikeBall1.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(spikeBall1);
    spikeBall1.body.immovable = true;
    spikeBall1.body.velocity.y = 150;
    spikeBall1.body.bounce.set(1);
    game.time.events.loop(Phaser.Timer.SECOND*3.1, function changeDirection(){spikeBall1.body.velocity.y *= (-1);}, this);

    spikeBall2 = game.add.sprite(0, 540, 'spikeBall2');
    spikeBall2.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(spikeBall2);
    spikeBall2.body.immovable = true;
    spikeBall2.body.velocity.y = -200;
    spikeBall2.body.bounce.set(1);
    game.time.events.loop(Phaser.Timer.SECOND*2.1, function changeDirection(){spikeBall2.body.velocity.y *= (-1);}, this);


    player = game.add.sprite(50, game.world.height - 250, 'minion');
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;
    player.animations.add('left',[0,1,2,3], 10, true);
    player.animations.add('right',[5,6,7,8], 10, true);

    bananas = game.add.group();
    bananas.enableBody = true;
    for (var i = 0; i < itemsAmount; i++)
    {
        var banana = bananas.create(i * 56, 720, 'banana');
        banana.body.gravity.y = 250;
        banana.body.bounce.y = 0.1 + Math.random() * 0.05;
    }

    for (var j = 0; j < extraItems; j++)
    {
        banana = bananas.create(j * Math.floor(Math.random()*(60-58) + 58), 0, 'banana');
        banana.body.gravity.y = 250;
        banana.body.bounce.y = 0.1 + Math.random() * 0.05;
    }
    banana = bananas.create(70, 1150, 'banana');
    banana.body.gravity.y = 250;
    banana.body.bounce.y = 0.1 + Math.random() * 0.05;
    banana = bananas.create(970, 1300, 'banana');
    banana.body.gravity.y = 250;
    banana.body.bounce.y = 0.1 + Math.random() * 0.05;

    soundClick('source/sounds/tadaaa.mp3');
    soundClick('source/sounds/Minion.mp3');

    timerText = game.add.text(480, 0, 'Time: 100', {fontSize:'32px', fill: '#CCC'});
    timerText.fixedToCamera = true;
    scoreText = game.add.text(0,0, 'Score: 0', {fontSize:'32px', fill: '#CCC'});
    scoreText.fixedToCamera = true;
    game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);

    cursors = game.input.keyboard.createCursorKeys();
    game.world.camera.width = 600;
    game.world.camera.height = 400;
    game.camera.follow(player);
}
function update() {
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(bananas, platforms);
    game.physics.arcade.collide(bananas, lava);
    game.physics.arcade.collide(emitter, lava);
    game.physics.arcade.collide(emitter, platforms);
    game.physics.arcade.collide(bananas, obstacle);
    game.physics.arcade.collide(player, obstacle, touchObstacle, null, this);
    game.physics.arcade.collide(player, lava, touchObstacle, null, this);
    game.physics.arcade.collide(player, spike, touchObstacle, null, this);
    game.physics.arcade.collide(player, lava, touchObstacle, null, this);
    game.physics.arcade.collide(player, spikeBall1, touchObstacle, null, this);
    game.physics.arcade.collide(player, spikeBall2, touchObstacle, null, this);
    game.physics.arcade.collide(player, emitter, touchObstacle, null, this);
    game.physics.arcade.overlap(player, bananas, collectStar, null, this);
    game.physics.arcade.overlap(player, bullets, touchObstacle, null, this);
    game.physics.arcade.overlap(player, bombs, touchObstacle, null, this);


    player.body.velocity.x = 0;

    spike.angle -= 1;
    spikeBall1.angle -= 4;
    spikeBall2.angle += 5;


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

    fireMachineGun();
    fireCannon()
}
function changeLevel(str){
    document.location.href=str;
}


function collectStar (player, banana) {
    banana.kill();
    score+=10;
    scoreText.text = 'Score: ' + score;
    if (score === (itemsAmount + extraItems + 2) * 10){
        scoreText.text = 'You win!';
        setTimeout(changeLevel('http://captainblack.epizy.com/levels/15mobile.html'),3000);
    }
}

function updateCounter() {
    if (time == 0) {
        scoreText.text = 'You lose!';
        setTimeout(changeLevel('http://captainblack.epizy.com/levels/14mobile.html'),3000);
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
    changeLevel('http://captainblack.epizy.com/levels/14mobile.html')
}
function fireMachineGun() {

    if (game.time.now > nextFire && bullets.countDead() > 0)
    {
        nextFire = game.time.now + fireRate;

        var bullet = bullets.getFirstDead();

        bullet.reset(machineGun.x - 8, machineGun.y - 8);

        game.physics.arcade.moveToObject(bullet, aim1, 600);

        soundClick('source/sounds/gun.mp3');

    }

}
function fireCannon() {

    if (game.time.now > nextFire2 && bombs.countDead() > 0)
    {
        nextFire2 = game.time.now + fireRate2;

        var bomb = bombs.getFirstDead();

        bomb.reset(sprite.x - 8, sprite.y - 8);

        game.physics.arcade.moveToObject(bomb, aim2, 300);

        soundClick('source/sounds/cannon.mp3');

    }


}