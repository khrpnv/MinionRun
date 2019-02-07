var game = new Phaser.Game(
    900,
    750,
    Phaser.AUTO,
    'game',
    {
        preload: preload,
        create: create,
        update: update
    }
);

var time = 75;
var aim;
var box3;
var platforms;
var player;
var cursors;
var bananas;
var score;
var box1;
var box5;
var coler;
var chrtree;
var pause_label;
var menu;
var w = 900, h = 750;
var bullets;
var fireRate = 5000;
var sprite;
var spike;
var emitter1;
var emitter2;
var spikeBall1;
var spikeBall2;
var timerText;
var scoreText;
var moving;
var obstacle;
var itemsAmount = 15;
var extraItems = 15;
function preload(){
    game.load.image('sky', 'source/bgWinter.png');
    game.load.image('menu', 'source/menu.png');
    game.load.spritesheet('chrTree', 'source/christmastree1.png', 114, 114);
    game.load.image('banana','source/pineapple.png');
    game.load.image('step','source/snow.png');
    game.load.image('step150','source/snow150.png');
    game.load.image('step100','source/snow100.png');
    game.load.image('step70','source/snow70.png');
    game.load.image('thorn','source/obstacle1.png');
    game.load.image('box','source/box3.png');
    game.load.image('box2','source/box2.png');
    game.load.image('spike','source/rotate.png');
    game.load.image('spikeBall','source/mace.png');
    game.load.image('snowLeft', 'source/ice-platform-left.png');
    game.load.image('snowCenter', 'source/ice-platform-center.png');
    game.load.image('snowRight', 'source/ice-platform-right.png');
    game.load.image('coler', 'source/coler.png');
    game.load.image('wallspike', 'source/spikesBoard.png');
    game.load.image('wallspiketop', 'source/spikesBoardTop.png');
    game.load.image('wallspikeleft', 'source/spikesBoardLeft.png');
    game.load.image('wallspikeright', 'source/spikesBoardRight.png');
    game.load.image('snowSpike', 'source/spikesBottomAlt2.png');
    game.load.image('launch', 'source/badMinion.png');
    game.load.image('aim', 'source/launch.png');
    game.load.image('rocket', 'source/rocket.png');
    game.load.image('minionAlarm', 'source/BeeDo.png');
    game.load.spritesheet('minion', 'source/minion2.png', 48, 48)
}
function create(){
    score = 0;

    game.add.tileSprite(0, 0, 900, 1500, 'sky');
    game.world.setBounds(0, 0, 900, 1500);

    game.physics.startSystem(Phaser.Physics.ARCADE);


    emitter1 = game.add.emitter(300, 0);
    emitter1.makeParticles('spikeBall', 0, 100, true, true);
    emitter1.minParticleSpeed.setTo(0, 0);
    emitter1.maxParticleSpeed.setTo(0, 0);
    emitter1.gravity.y = 150;
    emitter1.bounce.setTo(0.2, 0.2);
    emitter1.start(false, 6500, 10000);

    emitter2 = game.add.emitter(550, 0);
    emitter2.makeParticles('spikeBall', 0, 100, true, true);
    emitter2.minParticleSpeed.setTo(0, 0);
    emitter2.maxParticleSpeed.setTo(0, 0);
    emitter2.gravity.y = 150;
    emitter2.bounce.setTo(0.2, 0.2);
    emitter2.start(false, 5000, 10000);


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

    chrtree = game.add.sprite(800, 1320, 'chrTree');
    chrtree.animations.add('lights');
    chrtree.animations.play('lights', 8, true);


    coler = game.add.sprite(0,1370,'minionAlarm');
    game.physics.arcade.enable(coler);
    coler.body.immovable = true;

    var wall = obstacle.create(0,1080,'wallspikeleft');
    wall.body.immovable = true;
    wall = obstacle.create(862,877,'wallspiketop');
    wall.body.immovable = true;
    wall = obstacle.create(829,877,'wallspiketop');
    wall.body.immovable = true;
    wall = obstacle.create(468,1033,'wallspiketop');
    wall.body.immovable = true;
    wall = obstacle.create(500,1033,'wallspiketop');
    wall.body.immovable = true;
    wall = obstacle.create(532,1033,'wallspiketop');
    wall.body.immovable = true;
    wall = obstacle.create(845,355,'wallspikeright');
    wall.body.immovable = true;

    var thorns = obstacle.create(517, 1238, 'thorn');
    thorns.body.immovable = true;
    thorns = obstacle.create(544, 1238, 'thorn');
    thorns.body.immovable = true;


    var ledge = platforms.create(420, 710, 'step150');
    ledge.body.immovable = true;
    ledge.body.velocity.x = 60;
    ledge.body.collideWorldBounds = true;
    ledge.body.bounce.set(1);
    ledge = platforms.create(170, 1270, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(420, 1270, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(670, 1270, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(590, 1115, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(250, 1110, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(80, 1010, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(10, 1150, 'step70');
    ledge.body.immovable = true;
    ledge = platforms.create(770, 1010, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(825, 845, 'step70');
    ledge.body.immovable = true;
    ledge = platforms.create(525, 870, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(20, 910, 'step70');
    ledge.body.immovable = true;
    ledge = platforms.create(160, 810, 'step70');
    ledge.body.immovable = true;
    ledge = platforms.create(0, 610, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(750, 620, 'step70');
    ledge.body.immovable = true;
    ledge = platforms.create(650, 520, 'step70');
    ledge.body.immovable = true;
    ledge = platforms.create(380, 420, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(100, 330, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(380, 230, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(-80, 230, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(800, 425, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(620, 325, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(850, 130, 'step');
    ledge.body.immovable = true;
    ledge = platforms.create(655, 230, 'step70');
    ledge.body.immovable = true;
    ledge = platforms.create(100, 130, 'step70');
    ledge.body.immovable = true;
    ledge = platforms.create(360, 120, 'step70');
    ledge.body.immovable = true;
    ledge = platforms.create(460, 1000, 'step100');
    ledge.body.immovable = true;

    player = game.add.sprite(150, game.world.height - 150, 'minion');
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;
    player.animations.add('left',[0,1,2,3], 10, true);
    player.animations.add('right',[5,6,7,8], 10, true);

    box1 = game.add.sprite(200,1320, 'box');
    game.physics.arcade.enable(box1);
    box1.body.bounce.y = 0.2;
    box1.body.gravity.y = 600;
    box1.body.collideWorldBounds = true;

    box3 = game.add.sprite(765,930, 'box2');
    game.physics.arcade.enable(box3);
    box3.body.bounce.y = 0.2;
    box3.body.gravity.y = 600;
    box3.body.collideWorldBounds = true;

    box5 = game.add.sprite(415,1200, 'box2');
    game.physics.arcade.enable(box5);
    box5.body.bounce.y = 0.2;
    box5.body.gravity.y = 600;
    box5.body.collideWorldBounds = true;

    bananas = game.add.group();
    bananas.enableBody = true;
    for (var i = 0; i < itemsAmount; i++)
    {
        var banana = bananas.create(i * Math.floor(Math.random()*(53-48) + 48), 500, 'banana');
        banana.body.gravity.y = 250;
        banana.body.collideWorldBounds = true;
        banana.body.bounce.y = 0.4 + Math.random() * 0.1;
    }

    for (var j = 0; j < extraItems; j++)
    {
        banana = bananas.create(j * 58, 0, 'banana');
        banana.body.gravity.y = 250;
        banana.body.collideWorldBounds = true;
        banana.body.bounce.y = 0.4 + Math.random() * 0.1;
    }

    menu = game.add.sprite(200, 150, 'menu');
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
                    changeLevel('12.html');
                }
                else if (choisemap[choise] == 'two'){
                    changeLevel('LevelsPage2.html');
                }
            }
            else {
                menu.visible = false;
                game.paused = false;
            }
        }
    }

    soundClick('source/sounds/Minion.mp3');
    game.time.events.loop(Phaser.Timer.SECOND * 10, alarm , this);

    timerText = game.add.text(780, 0, 'Time: 75', {fontSize:'32px', fill: '#CCC'});
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
    game.physics.arcade.collide(bananas, box1);
    game.physics.arcade.collide(bananas, box3);
    game.physics.arcade.collide(bananas, box5);
    game.physics.arcade.collide(emitter1, platforms);
    game.physics.arcade.collide(emitter1, box1);
    game.physics.arcade.collide(emitter1, box3);
    game.physics.arcade.collide(emitter1, box5);
    game.physics.arcade.collide(emitter2, platforms);
    game.physics.arcade.collide(emitter2, box3);
    game.physics.arcade.collide(emitter2, box1);
    game.physics.arcade.collide(emitter2, box5);
    game.physics.arcade.collide(bananas, obstacle);
    game.physics.arcade.collide(player, obstacle, touchObstacle, null, this);
    game.physics.arcade.collide(player, emitter1, touchObstacle, null, this);
    game.physics.arcade.collide(player, emitter2, touchObstacle, null, this);
    game.physics.arcade.overlap(player, bananas, collectStar, null, this);
    game.physics.arcade.collide(box1, platforms);
    game.physics.arcade.collide(box5, platforms);
    game.physics.arcade.collide(box3, platforms);
    game.physics.arcade.collide(box3, box1);
    game.physics.arcade.collide(box1, obstacle);
    game.physics.arcade.collide(platforms);
    game.physics.arcade.collide(platforms, obstacle);
    game.physics.arcade.collide(box3, obstacle);
    game.physics.arcade.collide(box5, obstacle);
    game.physics.arcade.collide(player, box1, function boxStop(){box1.body.velocity.x = 0},null, this);
    game.physics.arcade.collide(player, box3, function boxStop(){box3.body.velocity.x = 0},null, this);
    game.physics.arcade.collide(player, box5, function boxStop(){box5.body.velocity.x = 0},null, this);
    game.physics.arcade.collide(box5, box1);
    game.physics.arcade.collide(box3, box1);
    game.physics.arcade.collide(box5, box3);

    player.body.velocity.x = 0;


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
    if (score === (itemsAmount + extraItems) * 10){
        scoreText.text = 'You win!';
        setTimeout(changeLevel('13.html'),3000);
    }
}

function updateCounter() {
    if (time == 0) {
        scoreText.text = 'You lose!';
        setTimeout(changeLevel('12.html'),3000);
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
    changeLevel('12.html')
}

function alarm(){
    var audio = new Audio();
    audio.src = 'source/sounds/bee do.mp3';
    audio.autoplay = true;
}