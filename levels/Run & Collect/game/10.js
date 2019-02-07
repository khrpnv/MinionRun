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

var time = 85;
var platforms;
var player;
var cursors;
var bananas;
var score;
var box1;
var box5;
var pause_label;
var menu;
var w = 1200, h = 750;
var coler;
var chrtree;
var box3;
var spike;
var emitter;
var spikeBall1;
var spikeBall2;
var timerText;
var scoreText;
var obstacle;
var itemsAmount = 23;
var extraItems = 23;
function preload(){
    game.load.image('menu', 'source/menu.png');
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
    game.load.image('wallspikeleft', 'source/spikesBoardLeft.png');
    game.load.image('wallspikeright', 'source/spikesBoardRight.png');
    game.load.image('snowSpike', 'source/spikesBottomAlt2.png');
    game.load.spritesheet('minion', 'source/minion2.png', 48, 48)
}
function create(){
    score = 0;

    game.add.tileSprite(0, 0, 1300, 1400, 'sky');
    game.world.setBounds(0, 0, 1300, 1400);

    game.physics.startSystem(Phaser.Physics.ARCADE);

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

    chrtree = game.add.sprite(-10,1087,'chrTree');
    game.physics.arcade.enable(chrtree);
    chrtree.body.immovable = true;

    coler = game.add.sprite(0,1265,'coler');

    var wall = obstacle.create(1268,1104,'wallspike');
    wall.body.immovable = true;
    wall = obstacle.create(1268,1076,'wallspike');
    wall.body.immovable = true;
    wall = obstacle.create(1245,846,'wallspikeright');
    wall.body.immovable = true;
    wall = obstacle.create(-10,980,'wallspikeleft');
    wall.body.immovable = true;

    var thorns = obstacle.create(-3, 819, 'thorn');
    thorns.body.immovable = true;
    thorns = obstacle.create(23, 819, 'thorn');
    thorns.body.immovable = true;
    thorns = obstacle.create(320, 698, 'thorn');
    thorns.body.immovable = true;
    thorns = obstacle.create(346, 698, 'thorn');
    thorns.body.immovable = true;
    thorns = obstacle.create(462, 428, 'thorn');
    thorns.body.immovable = true;

    var ledge = platforms.create(0, 1200, 'step');
    ledge.body.immovable = true;
    ledge = platforms.create(1100, 1150, 'step');
    ledge.body.immovable = true;
    ledge = platforms.create(1000, 1050, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(1000, 950, 'step70');
    ledge.body.immovable = true;
    ledge = platforms.create(0, 1050, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(400, 1200, 'step');
    ledge.body.immovable = true;
    ledge = platforms.create(750, 1100, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(170, 950, 'step70');
    ledge.body.immovable = true;
    ledge = platforms.create(550, 880, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(-90, 850, 'step');
    ledge.body.immovable = true;
    ledge = platforms.create(-110, 700, 'step');
    ledge.body.immovable = true;
    ledge = platforms.create(240, 730, 'step');
    ledge.body.immovable = true;
    ledge = platforms.create(300, 620, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(860, 855, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(1000, 755, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(1200, 910, 'step');
    ledge.body.immovable = true;
    ledge = platforms.create(670, 710, 'step');
    ledge.body.immovable = true;
    ledge = platforms.create(1250, 660, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(900, 560, 'step');
    ledge.body.immovable = true;
    ledge = platforms.create(650, 470, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(420, 460, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(370, 300, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(120, 540, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(-50, 440, 'step');
    ledge.body.immovable = true;
    ledge = platforms.create(170, 340, 'step70');
    ledge.body.immovable = true;
    ledge = platforms.create(700, 300, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(1000, 255, 'step70');
    ledge.body.immovable = true;
    ledge = platforms.create(1250, 250, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(1050, 160, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(875, 110, 'step70');
    ledge.body.immovable = true;
    ledge = platforms.create(645, 110, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(420, 120, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(220, 200, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(-30, 150, 'step150');
    ledge.body.immovable = true;


    spike = game.add.sprite(1210, 990, 'spike');
    spike.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(spike);
    spike.body.immovable = true;

    spikeBall1 = game.add.sprite(300, 970, 'spikeBall');
    spikeBall1.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(spikeBall1);
    spikeBall1.body.immovable = true;

    spikeBall2 = game.add.sprite(1250, 450, 'spikeBall');
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

    box1 = game.add.sprite(1000,1200, 'box');
    game.physics.arcade.enable(box1);
    box1.body.bounce.y = 0.2;
    box1.body.gravity.y = 600;
    box1.body.collideWorldBounds = true;

    box3 = game.add.sprite(120,1000, 'box2');
    game.physics.arcade.enable(box3);
    box3.body.bounce.y = 0.2;
    box3.body.gravity.y = 600;
    box3.body.collideWorldBounds = true;

    box5 = game.add.sprite(1000,1100, 'box');
    game.physics.arcade.enable(box5);
    box5.body.bounce.y = 0.2;
    box5.body.gravity.y = 600;
    box5.body.collideWorldBounds = true;

    bananas = game.add.group();
    bananas.enableBody = true;
    for (var i = 0; i < itemsAmount; i++)
    {
        var banana = bananas.create(i * 50, 580, 'banana');
        banana.body.gravity.y = 250;
        banana.body.bounce.y = 0.4 + Math.random() * 0.1;
    }

    for (var j = 0; j < extraItems; j++)
    {
        banana = bananas.create(j * Math.floor(Math.random()*(56-54) + 54), 0, 'banana');
        banana.body.gravity.y = 250;
        banana.body.bounce.y = 0.4 + Math.random() * 0.1;
    }


    soundClick('source/sounds/Minion Water Sound Effect.mp3');
    soundClick('source/sounds/Minion.mp3');
    timerText = game.add.text(1080, 0, 'Time: 85', {fontSize:'32px', fill: '#CCC'});
    timerText.fixedToCamera = true;
    scoreText = game.add.text(0,0, 'Score: 0', {fontSize:'32px', fill: '#CCC'});
    scoreText.fixedToCamera = true;
    game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);

    menu = game.add.sprite(350, 150, 'menu');
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
                    changeLevel('10.html');
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

    cursors = game.input.keyboard.createCursorKeys();
    game.world.camera.height = 750;
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
    game.physics.arcade.collide(player, emitter, touchObstacle, null, this);
    game.physics.arcade.overlap(player, bananas, collectStar, null, this);
    game.physics.arcade.collide(box1, platforms);
    game.physics.arcade.collide(box5, platforms);
    game.physics.arcade.collide(box3, platforms);
    game.physics.arcade.collide(box1, spike);
    game.physics.arcade.collide(box1, spikeBall1);
    game.physics.arcade.collide(box1, spikeBall2);
    game.physics.arcade.collide(box5, spikeBall1);
    game.physics.arcade.collide(box5, spikeBall2);
    game.physics.arcade.collide(box1, obstacle);
    game.physics.arcade.collide(box5, obstacle);
    game.physics.arcade.collide(player, box1, function boxStop(){box1.body.velocity.x = 0},null, this);
    game.physics.arcade.collide(player, box3, function boxStop(){box3.body.velocity.x = 0},null, this);
    game.physics.arcade.collide(player, box5, function boxStop(){box5.body.velocity.x = 0},null, this);
    game.physics.arcade.collide(box5, box1);
    game.physics.arcade.collide(box3, box1);
    game.physics.arcade.collide(box5, box3);


    player.body.velocity.x = 0;

    spike.angle += 1;
    spikeBall1.angle += 1;
    spikeBall2.angle += 1;

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
        setTimeout(changeLevel('11.html'),3000);
    }
}

function updateCounter() {
    if (time == 0) {
        scoreText.text = 'You lose!';
        setTimeout(changeLevel('10.html'),3000);
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
    changeLevel('10.html')
}