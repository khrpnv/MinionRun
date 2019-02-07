var game = new Phaser.Game(
    1200,
    750,
    Phaser.AUTO,
    'game',
    {
        preload: preload,
        create: create,
        update: update
    }
);

var time = 90;
var platforms;
var player;
var cursors;
var bananas;
var score;
var coler;
var pause_label;
var menu;
var w = 1200, h = 750;
var spike;
var part;
var pillar;
var emitter;
var line;
var move1;
var move2;
var move3;
var vanish;
var spikeBall1;
var spikeBall3;
var spikeBall4;
var machineGun;
var sprite;
var bullets;
var trampoline1;
var trampoline2;
var trampoline3;
var wooden1;
var wooden2;
var fireRate = 2000;
var nextFire = 0;
var spikeBall2;
var timerText;
var scoreText;
var lava;
var obstacle;
var itemsAmount = 20;
var extraItems = 30;
function preload(){
    game.load.image('sky', 'source/bg19.jpg');
    game.load.spritesheet('chrTree', 'source/christmastree1.png', 114, 114);
    game.load.spritesheet('lava', 'source/lava.png', 300, 69);
    game.load.image('banana','source/cherry.png');
    game.load.spritesheet('trampoline','source/spring.png', 64, 46);
    game.load.image('stone','source/stone.png');
    game.load.image('step','source/stone250.png');
    game.load.image('step150','source/stone150.png');
    game.load.image('step100','source/stone100.png');
    game.load.image('step70','source/stone70.png');
    game.load.image('step200','source/stone200.png');
    game.load.image('thorn','source/obstacle1.png');
    game.load.image('spike','source/axe.png');
    game.load.image('spikeBall1','source/obstacle4.png');
    game.load.image('spikeBall2','source/obstacle5.png');
    game.load.image('spikeBall3','source/obstacle8.png');
    game.load.image('snowLeft', 'source/ice-platform-left.png');
    game.load.image('snowCenter', 'source/ice-platform-center.png');
    game.load.image('snowRight', 'source/ice-platform-right.png');
    game.load.image('coler', 'source/coler.png');
    game.load.spritesheet('wallSpike', 'source/spikesBoardWave.png', 48, 48);
    game.load.spritesheet('cannon', 'source/cannon (2).png', 124, 124);
    game.load.spritesheet('machineGun', 'source/machinegun1.png', 110, 72);
    game.load.image('wallspikeleft', 'source/spikesBoardLeft.png');
    game.load.image('spiketop', 'source/SpikeGroundTrap.png');
    game.load.image('bullet', 'source/bullet.png');
    game.load.image('bomb', 'source/bomb.png');
    game.load.image('wooden', 'source/woodenSpike.png');
    game.load.image('pillarMid', 'source/midPillar.png');
    game.load.image('blade', 'source/blade.png');
    game.load.image('blade2', 'source/blade2.png');
    game.load.image('spikeBall','source/SawBig.png');
    game.load.image('spikeBall2_2','source/SawSmall.png');
    game.load.image('3', 'source/nut.png');
    game.load.image('line', 'source/line.png');
    game.load.image('lineV', 'source/lineVertical.png');
    game.load.image('wallspikeright', 'source/spikesBoardRight.png');
    game.load.image('snowSpike', 'source/spikesBottomAlt2.png');
    game.load.image('menu', 'source/menu.png');
    game.load.spritesheet('minion', 'source/minion2.png', 48, 48)
}
function create(){
    score = 0;

    game.add.tileSprite(0, 0, 1200, 1800, 'sky');
    game.world.setBounds(0, 0, 1200, 1800);


    game.physics.startSystem(Phaser.Physics.ARCADE);

    platforms = game.add.group();
    platforms.enableBody = true;

    var ground = platforms.create(0, game.world.height - 80, 'stone');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(300, game.world.height - 80, 'stone');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(600, game.world.height - 80, 'stone');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(900, game.world.height - 80, 'stone');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(1200, game.world.height - 80, 'stone');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;

    obstacle = game.add.group();
    obstacle.enableBody = true;

    var wall = obstacle.create(550, 1289,'spiketop');
    wall.body.immovable = true;
    wall = obstacle.create(-25, 637,'wallspikeleft');
    wall.body.immovable = true;
    wall = obstacle.create(1160, 637,'wallspikeright');
    wall.body.immovable = true;
    wall = obstacle.create(527, 1672,'wallSpike');
    wall.body.immovable = true;
    wall.animations.add('spikeUp');
    wall.animations.play('spikeUp', 12, true);
    wall = obstacle.create(575, 1672,'wallSpike');
    wall.body.immovable = true;
    wall.animations.add('spikeUp');
    wall.animations.play('spikeUp', 12, true);
    wall = obstacle.create(623, 1672,'wallSpike');
    wall.body.immovable = true;
    wall.animations.add('spikeUp');
    wall.animations.play('spikeUp', 12, true);

    wooden1 = obstacle.create(40, 1185,'wooden');
    game.physics.arcade.enable(wooden1);
    wooden1.body.setSize(40, 90, 5, 12);
    wooden1.body.immovable = true;

    wooden2 = obstacle.create(1110, 1185,'wooden');
    game.physics.arcade.enable(wooden2);
    wooden2.body.setSize(40, 90, 5, 12);
    wooden2.body.immovable = true;

    trampoline1 = game.add.sprite(292.5, 1475, 'trampoline');
    game.physics.arcade.enable(trampoline1);
    trampoline1.body.setSize(64, 46, 0, 12);
    trampoline1.animations.add('jump');
    trampoline1.body.immovable = true;
    trampoline1.body.bounce.set(1);

    trampoline2 = game.add.sprite(842.5, 1475, 'trampoline');
    game.physics.arcade.enable(trampoline2);
    trampoline2.body.setSize(64, 46, 0, 12);
    trampoline2.animations.add('jump');
    trampoline2.body.immovable = true;
    trampoline2.body.bounce.set(1);

    trampoline3 = game.add.sprite(570, 254, 'trampoline');
    game.physics.arcade.enable(trampoline3);
    trampoline3.body.setSize(64, 46, 0, 12);
    trampoline3.animations.add('jump');
    trampoline3.body.immovable = true;
    trampoline3.body.bounce.set(1);

    move1 = platforms.create(300, 970, 'step100');
    move1.body.immovable = true;
    move1.body.velocity.y = 80;
    move1.body.collideWorldBounds = true;
    move1.body.bounce.set(1);
    game.time.events.loop(Phaser.Timer.SECOND*3, function changeDirection(){move1.body.velocity.y *= (-1);}, this);

    move2 = platforms.create(800, 970, 'step100');
    move2.body.immovable = true;
    move2.body.velocity.y = 80;
    move2.body.collideWorldBounds = true;
    move2.body.bounce.set(1);
    game.time.events.loop(Phaser.Timer.SECOND*3, function changeDirection(){move2.body.velocity.y *= (-1);}, this);

    move3 = platforms.create(200, 500, 'step150');
    move3.body.immovable = true;
    move3.body.velocity.x = 80;
    move3.body.collideWorldBounds = true;
    move3.body.bounce.set(1);
    game.time.events.loop(Phaser.Timer.SECOND*8, function changeDirection(){move3.body.velocity.x *= (-1);}, this);

    vanish = game.add.sprite(525, 1620, 'step150');
    game.physics.enable(vanish, Phaser.Physics.ARCADE);
    vanish.body.immovable = true;
    vanish.enableBody = true;

    var ledge = platforms.create(275, 1520, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(825, 1520, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(40, 1300, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(1010, 1300, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(550, 1250, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(40, 1145, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(1060, 1145, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(523, 900, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(550, 720, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(250, 800, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(850, 800, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(-30, 700, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(1130, 700, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(-60, 600, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(1160, 600, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(250, 400, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(850, 400, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(525, 300, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(350, 100, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(750, 100, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(70, 200, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(1030, 200, 'step100');
    ledge.body.immovable = true;

    spikeBall3 = game.add.sprite(600.5, 815, 'blade2');
    spikeBall3.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(spikeBall3);
    spikeBall3.body.immovable = true;

    spikeBall1 = game.add.sprite(300, 620, 'spikeBall1');
    spikeBall1.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(spikeBall1);
    spikeBall1.body.immovable = true;

    spikeBall2 = game.add.sprite(900, 620, 'spikeBall1');
    spikeBall2.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(spikeBall2);
    spikeBall2.body.immovable = true;

    pillar = game.add.sprite(580.5, 765, 'pillarMid');
    game.physics.arcade.enable(pillar);
    pillar.body.immovable = true;

    part = game.add.sprite(591, 805, '3');

    player = game.add.sprite(50, game.world.height - 150, 'minion');
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
        var banana = bananas.create(i * 60, 920, 'banana');
        banana.body.gravity.y = 250;
        banana.body.bounce.y = 0.05 + Math.random() * 0.01;
    }

    for (var j = 0; j < extraItems; j++)
    {
        banana = bananas.create(j * 40, 0, 'banana');
        banana.body.gravity.y = 250;
        banana.body.bounce.y = 0.05 + Math.random() * 0.01;
    }
    banana = bananas.create(585, 670, 'banana');
    banana.body.gravity.y = 250;
    banana.body.bounce.y = 0.05 + Math.random() * 0.01;

    soundClick('source/sounds/minion_elo.mp3');
    soundClick('source/sounds/Minion Rush.mp3');

    timerText = game.add.text(1080, 0, 'Time: 90', {fontSize:'32px', fill: '#000'});
    timerText.fixedToCamera = true;
    scoreText = game.add.text(0,0, 'Score: 0', {fontSize:'32px', fill: '#000'});
    scoreText.fixedToCamera = true;
    game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);

    menu = game.add.sprite(350, 150, 'menu');
    menu.visible = false;
    menu.fixedToCamera = true;

    pause_label = game.add.text(w/2-40, 0, 'Pause', {fontSize:'32px', fill: '#000'});
    pause_label.fixedToCamera = true;
    pause_label.inputEnabled = true;
    pause_label.events.onInputUp.add(function () {
        game.paused = true;
        menu.visible = true;
    });

    game.input.onDown.add(unpause, self);
    function unpause(event) {
        if (game.paused) {
            var x1 = w / 2 - 500 / 2, x2 = w / 2 + 500 / 2,
                y1 = h / 2 - 381 / 2, y2 = h / 2 + 381 / 2;


            if (event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2) {
                var choisemap = ['one', 'two'];

                var x = event.x - x1,
                    y = event.y - y1;

                var choise = Math.floor(x / 250) + 3 * Math.floor(y / 300);
                if (choisemap[choise] == 'one'){
                    changeLevel('19.html');
                }
                else if (choisemap[choise] == 'two'){
                    changeLevel('LevelsPage3.html');
                }
            }
            else {
                menu.visible = false;
                game.paused = false;
            }
        }
    }


    cursors = game.input.keyboard.createCursorKeys();
    game.world.camera.height = 750;
    game.camera.follow(player);
}
function update() {
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(player, vanish, platformVanish, null, this);
    game.physics.arcade.collide(player, trampoline1, bouncing1, null, this);
    game.physics.arcade.collide(player, trampoline2, bouncing2, null, this);
    game.physics.arcade.collide(player, trampoline3, bouncing3, null, this);
    game.physics.arcade.collide(bananas, platforms);
    game.physics.arcade.collide(bananas, trampoline1);
    game.physics.arcade.collide(bananas, trampoline2);
    game.physics.arcade.collide(bananas, trampoline3);
    game.physics.arcade.collide(bananas, vanish);
    game.physics.arcade.collide(emitter, platforms);
    game.physics.arcade.collide(bananas, obstacle);
    game.physics.arcade.collide(player, obstacle, touchObstacle, null, this);
    game.physics.arcade.collide(player, spike, touchObstacle, null, this);
    game.physics.arcade.collide(player, spikeBall1, touchObstacle, null, this);
    game.physics.arcade.collide(player, spikeBall3, touchObstacle, null, this);
    game.physics.arcade.collide(player, spikeBall4, touchObstacle, null, this);
    game.physics.arcade.collide(player, spikeBall2, touchObstacle, null, this);
    game.physics.arcade.collide(player, emitter, touchObstacle, null, this);
    game.physics.arcade.overlap(player, bananas, collectStar, null, this);
    game.physics.arcade.collide(player, bullets, touchObstacle, null, this);

    player.body.velocity.x = 0;

    spikeBall3.angle += 3;
    spikeBall1.angle += 5;
    spikeBall2.angle -= 5;

    if (cursors.left.isDown) {
        player.body.velocity.x = -150;
        player.animations.play('left');
    }
    else if (cursors.right.isDown) {
        player.body.velocity.x = 150;
        player.animations.play('right');
    }
    else {
        player.animations.stop();
        player.frame = 4;
    }

    if (cursors.up.isDown && player.body.touching.down) {
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
    if (score === (itemsAmount + extraItems + 1) * 10){
        scoreText.text = 'You win!';
        setTimeout(changeLevel('20.html'),3000);
    }
}

function updateCounter() {
    if (time == 0) {
        scoreText.text = 'You lose!';
        setTimeout(changeLevel('19.html'),3000);
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
    changeLevel('19.html')
}

function bouncing1(){
    trampoline1.animations.play('jump', 30, false);
    player.body.velocity.y = -350;
    soundClick('source/sounds/spring.mp3');
}

function bouncing2(){
    trampoline2.animations.play('jump', 30, false);
    player.body.velocity.y = -350;
    soundClick('source/sounds/spring.mp3');
}

function bouncing3(){
    trampoline3.animations.play('jump', 30, false);
    player.body.velocity.y = -350;
    soundClick('source/sounds/spring.mp3');
}

function platformVanish(){
    game.time.events.loop(Phaser.Timer.SECOND*15, function(){vanish.kill();}, this);
}