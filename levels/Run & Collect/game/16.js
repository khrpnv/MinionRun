var game = new Phaser.Game(
    1100,
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
var pause_label;
var menu;
var w = 1100, h = 750;
var coler;
var spike;
var emitter;
var line;
var move1;
var move2;
var vanish;
var spikeBall1;
var spikeBall3;
var spikeBall4;
var machineGun;
var sprite;
var bullets;
var fireRate = 2000;
var nextFire = 0;
var spikeBall2;
var timerText;
var scoreText;
var lava;
var obstacle;
var itemsAmount = 22;
var extraItems = 22;
function preload(){
    game.load.image('sky', 'source/bg16.png');
    game.load.image('menu', 'source/menu.png');
    game.load.spritesheet('chrTree', 'source/christmastree1.png', 114, 114);
    game.load.spritesheet('lava', 'source/lava.png', 300, 69);
    game.load.image('banana','source/ice-cream.png');
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
    game.load.image('bullet', 'source/bullet.png');
    game.load.image('bomb', 'source/bomb.png');
    game.load.image('wooden', 'source/woodenSpike.png');
    game.load.image('line', 'source/line.png');
    game.load.image('lineV', 'source/lineVertical.png');
    game.load.image('wallspikeright', 'source/spikesBoardRight.png');
    game.load.image('snowSpike', 'source/spikesBottomAlt2.png');
    game.load.spritesheet('minion', 'source/minion2.png', 48, 48)
}
function create(){
    score = 0;

    game.add.tileSprite(0, 0, 1100, 1700, 'sky');
    game.world.setBounds(0, 0, 1100, 1700);

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

    var wall = obstacle.create(-20, 1245,'wallspikeleft');
    wall.body.immovable = true;
    wall = obstacle.create(-20, 335,'wallspikeleft');
    wall.body.immovable = true;
    wall = obstacle.create(-20, 1043,'wallspikeleft');
    wall.body.immovable = true;
    wall = obstacle.create(1055, 1245,'wallspikeright');
    wall.body.immovable = true;
    wall = obstacle.create(1055, 335,'wallspikeright');
    wall.body.immovable = true;
    wall = obstacle.create(1055, 1043,'wallspikeright');
    wall.body.immovable = true;

    move1 = platforms.create(510, 900, 'step100');
    move1.body.immovable = true;
    move1.body.velocity.y = -80;
    move1.body.collideWorldBounds = true;
    move1.body.bounce.set(1);
    game.time.events.loop(Phaser.Timer.SECOND*3, function changeDirection(){move1.body.velocity.y *= (-1);}, this);

    vanish = game.add.sprite(100, 1410, 'step150');
    game.physics.enable(vanish, Phaser.Physics.ARCADE);
    vanish.body.immovable = true;
    vanish.enableBody = true;
    vanish.body.velocity.x = 100;
    vanish.body.collideWorldBounds = true;
    vanish.body.bounce.set(1);
    game.time.events.loop(Phaser.Timer.SECOND*8, function changeDirection(){vanish.body.velocity.x *= (-1);}, this);

    var ledge = platforms.create(480, 1515, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(0, 1310, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(1000, 1310, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(250, 1205, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(510, 1150, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(720, 1205, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(0, 1105, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(1000, 1105, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(100, 1000, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(900, 1000, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(300, 900, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(707, 900, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(300, 750, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(657, 750, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(300, 600, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(707, 600, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(-50, 895, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(1050, 895, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(100, 790, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(-50, 685, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(900, 790, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(1050, 685, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(70, 500, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(930, 500, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(-30, 400, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(200, 300, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(500, 200, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(800, 300, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(1030, 400, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(300, 100, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(700, 100, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(-60, 200, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(1060, 200, 'step100');
    ledge.body.immovable = true;

    spikeBall1 = game.add.sprite(1310, 180, 'spikeBall1');
    spikeBall1.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(spikeBall1);
    spikeBall1.body.immovable = true;
    spikeBall1.body.velocity.y = 150;
    spikeBall1.body.bounce.set(1);
    game.time.events.loop(Phaser.Timer.SECOND*3.1, function changeDirection(){spikeBall1.body.velocity.y *= (-1);}, this);

    line = game.add.sprite(240, 440, 'line');
    line = game.add.sprite(440, 440, 'line');
    line = game.add.sprite(640, 440, 'line');
    line = game.add.sprite(240, 1040, 'line');
    line = game.add.sprite(440, 1040, 'line');
    line = game.add.sprite(640, 1040, 'line');
    line = game.add.sprite(240, 450, 'lineV');
    line = game.add.sprite(240, 650, 'lineV');
    line = game.add.sprite(240, 850, 'lineV');
    line = game.add.sprite(825, 450, 'lineV');
    line = game.add.sprite(825, 650, 'lineV');
    line = game.add.sprite(825, 850, 'lineV');

    spikeBall2 = game.add.sprite(320, 460, 'spikeBall2');
    spikeBall2.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(spikeBall2);
    spikeBall2.body.immovable = true;
    spikeBall2.body.velocity.x = 200;
    spikeBall2.body.bounce.set(1);
    game.time.events.loop(Phaser.Timer.SECOND*2.5, function changeDirection(){spikeBall2.body.velocity.x *= (-1);}, this);

    spikeBall3 = game.add.sprite(260, 520, 'spikeBall3');
    spikeBall3.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(spikeBall3);
    spikeBall3.body.immovable = true;
    spikeBall3.body.velocity.y = 200;
    spikeBall3.body.bounce.set(1);
    game.time.events.loop(Phaser.Timer.SECOND*2.2, function changeDirection(){spikeBall3.body.velocity.y *= (-1);}, this);

    spikeBall4 = game.add.sprite(845, 950, 'spikeBall3');
    spikeBall4.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(spikeBall4);
    spikeBall4.body.immovable = true;
    spikeBall4.body.velocity.y = -200;
    spikeBall4.body.bounce.set(1);
    game.time.events.loop(Phaser.Timer.SECOND*2.2, function changeDirection(){spikeBall4.body.velocity.y *= (-1);}, this);

    spikeBall1 = game.add.sprite(820, 1060, 'spikeBall2');
    spikeBall1.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(spikeBall1);
    spikeBall1.body.immovable = true;
    spikeBall1.body.velocity.x = -200;
    spikeBall1.body.bounce.set(1);
    game.time.events.loop(Phaser.Timer.SECOND*2.5, function changeDirection(){spikeBall1.body.velocity.x *= (-1);}, this);

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
        var banana = bananas.create(i * 50, 780, 'banana');
        banana.body.gravity.y = 250;
        banana.body.bounce.y = 0.05 + Math.random() * 0.01;
    }

    for (var j = 0; j < extraItems; j++)
    {
        banana = bananas.create(j * 50, 0, 'banana');
        banana.body.gravity.y = 250;
        banana.body.bounce.y = 0.05 + Math.random() * 0.01;
    }
    banana = bananas.create(540, 1100, 'banana');
    banana.body.gravity.y = 250;
    banana.body.bounce.y = 0.1 + Math.random() * 0.05;
    banana = bananas.create(50, 1200, 'banana');
    banana.body.gravity.y = 250;
    banana.body.bounce.y = 0.1 + Math.random() * 0.05;
    banana = bananas.create(1010, 1200, 'banana');
    banana.body.gravity.y = 250;
    banana.body.bounce.y = 0.1 + Math.random() * 0.05;
    banana = bananas.create(20, 500, 'banana');
    banana.body.gravity.y = 250;
    banana.body.bounce.y = 0.1 + Math.random() * 0.05;
    banana = bananas.create(1050, 500, 'banana');
    banana.body.gravity.y = 250;
    banana.body.bounce.y = 0.1 + Math.random() * 0.05;

    menu = game.add.sprite(300, 150, 'menu');
    menu.visible = false;
    menu.fixedToCamera = true;

    pause_label = game.add.text(w/2-40, 0, 'Pause', {fontSize:'32px', fill: '#CCC'});
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
                    changeLevel('16.html');
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

    soundClick('source/sounds/laugh.mp3');
    soundClick('source/sounds/Minion Rush.mp3');

    timerText = game.add.text(980, 0, 'Time: 90', {fontSize:'32px', fill: '#000'});
    timerText.fixedToCamera = true;
    scoreText = game.add.text(0,0, 'Score: 0', {fontSize:'32px', fill: '#CCC'});
    scoreText.fixedToCamera = true;
    game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);

    cursors = game.input.keyboard.createCursorKeys();
    game.world.camera.height = 750;
    game.camera.follow(player);
}
function update() {
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(bananas, platforms);
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
    game.physics.arcade.collide(player, vanish, platformVanish, null, this);
    game.physics.arcade.collide(player, bullets, touchObstacle, null, this);

    player.body.velocity.x = 0;

    spikeBall1.angle -= 5;
    spikeBall2.angle += 5;
    spikeBall3.angle += 5;
    spikeBall4.angle -= 5;



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
    if (score === (itemsAmount + extraItems + 5) * 10){
        scoreText.text = 'You win!';
        setTimeout(changeLevel('17.html'),3000);
    }
}

function updateCounter() {
    if (time == 0) {
        scoreText.text = 'You lose!';
        setTimeout(changeLevel('16.html'),3000);
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
    changeLevel('16.html')
}

function platformVanish(){
    game.time.events.loop(Phaser.Timer.SECOND*30, function(){vanish.kill();}, this);
}