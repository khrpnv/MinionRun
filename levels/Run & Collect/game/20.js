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

var time = 180;
var platforms;
var player;
var cursors;
var bananas;
var score;
var coler;
var spike;
var pause_label;
var menu;
var w = 1200, h = 750;
var part;
var pillar;
var emitter;
var line;
var move1;
var move2;
var move3;
var button;
var spikeBall1;
var spikeBall3;
var spikeBall4;
var machineGun;
var sprite;
var bullets;
var trampoline1;
var trampoline2;
var trampoline3;
var counter = 0;
var wooden2;
var fireRate = 2000;
var nextFire = 0;
var spikeBall2;
var timerText;
var scoreText;
var lever;
var obstacle;
var itemsAmount = 60;
var extraItems = 30;
function preload(){
    game.load.image('sky', 'source/bg20.jpg');
    game.load.image('menu', 'source/menu.png');
    game.load.spritesheet('chrTree', 'source/christmastree1.png', 114, 114);
    game.load.spritesheet('lava', 'source/lava.png', 300, 69);
    game.load.image('banana','source/cherry.png');
    game.load.spritesheet('trampoline','source/spring.png', 64, 46);
    game.load.spritesheet('lever','source/lever.png', 48, 48);
    game.load.spritesheet('switch','source/switchGreen.png', 48, 48);
    game.load.image('sand','source/sand.png');
    game.load.image('step150','source/sand150.png');
    game.load.image('step100','source/sand100.png');
    game.load.image('step200','source/sand200.png');
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
    game.load.image('spiketop', 'source/spikeGroundTrap.png');
    game.load.image('bullet', 'source/bullet.png');
    game.load.image('bomb', 'source/bomb.png');
    game.load.image('wooden', 'source/woodenSpike.png');
    game.load.image('pillarMid', 'source/midPillar.png');
    game.load.image('blade', 'source/blade.png');
    game.load.image('blade2', 'source/blade2.png');
    game.load.image('spikeBall','source/sawBig.png');
    game.load.image('spikeBall2_2','source/sawSmall.png');
    game.load.image('3', 'source/3.png');
    game.load.image('line', 'source/line.png');
    game.load.image('lineV', 'source/lineVertical.png');
    game.load.image('wallspikeright', 'source/spikesBoardRight.png');
    game.load.image('snowSpike', 'source/spikesBottomAlt2.png');
    game.load.spritesheet('minion', 'source/minion2.png', 48, 48)
}
function create(){
    score = 0;

    game.add.tileSprite(0, 0, 1600, 2400, 'sky');
    game.world.setBounds(0, 0, 1600, 2400);


    game.physics.startSystem(Phaser.Physics.ARCADE);

    platforms = game.add.group();
    platforms.enableBody = true;

    var ground = platforms.create(-40, game.world.height - 80, 'sand');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(216, game.world.height - 80, 'sand');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(600, game.world.height - 80, 'sand');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(856, game.world.height - 80, 'sand');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(1240, game.world.height - 80, 'sand');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;

    obstacle = game.add.group();
    obstacle.enableBody = true;

    var wall = obstacle.create(0, 2106,'wooden');
    wall.body.immovable = true;
    wall = obstacle.create(1554, 2106,'wooden');
    wall.body.immovable = true;
    // wall = obstacle.create(527, 1672,'wallSpike');
    // wall.body.immovable = true;
    // wall.animations.add('spikeUp');
    // wall.animations.play('spikeUp', 12, true);

    trampoline1 = game.add.sprite(292.5, 1922, 'trampoline');
    game.physics.arcade.enable(trampoline1);
    trampoline1.body.setSize(64, 46, 0, 12);
    trampoline1.animations.add('jump');
    trampoline1.body.immovable = true;
    trampoline1.body.bounce.set(1);

    trampoline2 = game.add.sprite(1252.5, 1922, 'trampoline');
    game.physics.arcade.enable(trampoline2);
    trampoline2.body.setSize(64, 46, 0, 12);
    trampoline2.animations.add('jump');
    trampoline2.body.immovable = true;
    trampoline2.body.bounce.set(1);

    trampoline3 = game.add.sprite(777.5, 1205, 'trampoline');
    game.physics.arcade.enable(trampoline3);
    trampoline3.body.setSize(64, 46, 0, 12);
    trampoline3.animations.add('jump');
    trampoline3.body.immovable = true;
    trampoline3.body.bounce.set(1);

    move1 = platforms.create(250, 1630, 'step150');
    move1.body.immovable = true;
    move1.body.collideWorldBounds = true;
    move1.body.bounce.set(1);

    move2 = platforms.create(1150, 2120, 'step150');
    move2.body.immovable = true;
    move2.body.collideWorldBounds = true;
    move2.body.bounce.set(1);

    move3 = platforms.create(1215, 1630, 'step150');
    move3.body.immovable = true;
    move3.body.collideWorldBounds = true;
    move3.body.bounce.set(1);

    var ledge = platforms.create(0, 2220, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(0, 2067, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(274, 1967, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(500, 1750, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(0, 1750, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(760, 1850, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(980, 1750, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(1450, 1750, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(1235, 1967, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(1450, 2220, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(1500, 2067, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(760, 1647, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(560, 1547, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(960, 1547, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(735, 1447, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(760, 1250, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(0, 1370, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(1500, 1370, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(500, 1350, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(1000, 1350, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(0, 1170, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(1500, 1170, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(500, 1020, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(950, 1020, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(380, 920, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(1110, 920, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(0, 800, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(1500, 800, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(1000, 820, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(750, 718, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(500, 820, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(430, 620, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(1070, 620, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(550, 520, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(990, 520, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(750, 420, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(0, 520, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(1450, 520, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(780, 320, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(580, 220, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(980, 220, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(300, 120, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(1200, 120, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(0, 150, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(1450, 150, 'step150');
    ledge.body.immovable = true;

    lever = game.add.sprite(70, 2173, 'lever');
    game.physics.enable(lever, Phaser.Physics.ARCADE);
    lever.body.immovable = true;
    lever.enableBody = true;
    lever.body.setSize(47, 39, 0, 10);
    lever.animations.add('pull',[1,2], 12, false);
    lever.animations.add('return',[4,5,6], 12, false);

    button = game.add.sprite(785, 1400, 'switch');
    game.physics.enable(button, Phaser.Physics.ARCADE);
    button.body.immovable = true;
    button.enableBody = true;
    button.body.setSize(46, 34, 0, 15);
    button.animations.add('pull',[0,1,2], 12, false);
    button.animations.add('return',[4], 12, false);
    button.animations.play('pull');

    spikeBall1 = game.add.sprite(825, 835, 'spikeBall1');
    spikeBall1.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(spikeBall1);
    spikeBall1.body.immovable = true;

    spikeBall2 = game.add.sprite(825, 540, 'spikeBall1');
    spikeBall2.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(spikeBall2);
    spikeBall2.body.immovable = true;


    player = game.add.sprite(100, game.world.height - 150, 'minion');
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;
    player.animations.add('left',[0,1,2,3], 10, true);
    player.animations.add('right',[5,6,7,8], 10, true);

    bananas = game.add.group();
    bananas.enableBody = true;
    for (var i = 0; i < itemsAmount/2; i++)
    {
        var banana = bananas.create(i * 60, 1250, 'banana');
        banana.body.gravity.y = 250;
        banana.body.bounce.y = 0.05 + Math.random() * 0.01;
    }

    for (var k = 0; k < itemsAmount/2; k++)
    {
        banana = bananas.create(k * 60, 600, 'banana');
        banana.body.gravity.y = 250;
        banana.body.bounce.y = 0.05 + Math.random() * 0.01;
    }

    for (var j = 0; j < extraItems; j++)
    {
        banana = bananas.create(j * 60, 0, 'banana');
        banana.body.gravity.y = 250;
        banana.body.bounce.y = 0.05 + Math.random() * 0.01;
    }
    banana = bananas.create(1500, 400, 'banana');
    banana.body.gravity.y = 250;
    banana.body.bounce.y = 0.05 + Math.random() * 0.01;
    banana = bananas.create(40, 400, 'banana');
    banana.body.gravity.y = 250;
    banana.body.bounce.y = 0.05 + Math.random() * 0.01;
    banana = bananas.create(40, 1000, 'banana');
    banana.body.gravity.y = 250;
    banana.body.bounce.y = 0.05 + Math.random() * 0.01;
    banana = bananas.create(1500, 1000, 'banana');
    banana.body.gravity.y = 250;
    banana.body.bounce.y = 0.05 + Math.random() * 0.01;

    soundClick('source/sounds/ahahaha.mp3');
    soundClick('source/sounds/Minion Rush.mp3');

    timerText = game.add.text(1070, 0, 'Time: 180', {fontSize:'32px', fill: '#CCC'});
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
                    changeLevel('20.html');
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
    game.physics.arcade.collide(player, lever);
    game.physics.arcade.collide(player, trampoline1, bouncing1, null, this);
    game.physics.arcade.collide(player, trampoline2, bouncing2, null, this);
    game.physics.arcade.collide(player, trampoline3, bouncing3, null, this);
    game.physics.arcade.collide(bananas, platforms);
    game.physics.arcade.collide(bananas, trampoline1);
    game.physics.arcade.collide(bananas, trampoline2);
    game.physics.arcade.collide(bananas, trampoline3);
    game.physics.arcade.collide(bananas, button);
    game.physics.arcade.collide(bananas, obstacle);
    game.physics.arcade.collide(player, obstacle, touchObstacle, null, this);
    game.physics.arcade.collide(player, spike, touchObstacle, null, this);
    game.physics.arcade.collide(player, spikeBall1, touchObstacle, null, this);
    game.physics.arcade.collide(player, spikeBall2, touchObstacle, null, this);
    game.physics.arcade.overlap(player, bananas, collectStar, null, this);

    player.body.velocity.x = 0;

    spikeBall1.angle += 5;
    spikeBall2.angle -= 5;

    if (game.physics.arcade.collide(player, button) && button.body.touching.up){
        buttonActions()
    }
    else {
        move1.body.velocity.y *= 0;
        move3.body.velocity.y *= 0;
        button.animations.play('pull');
    }


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

    if (game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).isDown && player.body.touching.right || game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).isDown && player.body.touching.left){
        movePlatform();
    }
}
function changeLevel(str){
    document.location.href=str;
}


function collectStar (player, banana) {
    banana.kill();
    score+=10;
    scoreText.text = 'Score: ' + score;
    if (score === (itemsAmount + extraItems + 4) * 10){
        scoreText.text = 'You win!';
        setTimeout(changeLevel('21.html'),3000);
    }
}

function updateCounter() {
    if (time == 0) {
        scoreText.text = 'You lose!';
        setTimeout(changeLevel('http://captainblack.epizy.com/levels20.html'),3000);
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
    changeLevel('20.html')
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

function movePlatform(){
    lever.animations.play('pull');
    game.time.events.add(Phaser.Timer.SECOND*22, function(){lever.animations.play('return');}, this);
    move2.body.velocity.x = -80;
    game.time.events.add(Phaser.Timer.SECOND*22, function(){move2.body.velocity.x = 0;}, this);
    game.time.events.add(Phaser.Timer.SECOND*11, function(){move2.body.velocity.x = 80;}, this);

}

function buttonActions(){
    button.animations.play('return');
    move1.body.velocity.y = -60;
    move3.body.velocity.y = -60;
}