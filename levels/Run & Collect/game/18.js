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

var time = 70;
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
var itemsAmount = 20;
var extraItems = 20;
function preload(){
    game.load.image('sky', 'source/bg18.jpg');
    game.load.image('menu', 'source/menu.png');
    game.load.spritesheet('chrTree', 'source/christmastree1.png', 114, 114);
    game.load.spritesheet('lava', 'source/lava.png', 300, 69);
    game.load.image('banana','source/cherry.png');
    game.load.image('stone','source/stone.png');
    game.load.image('step','source/stone250.png');
    game.load.image('step150','source/stone150.png');
    game.load.image('step100','source/stone100.png');
    game.load.image('step70','source/stone70.png');
    game.load.image('step200','source/stone200.png');
    game.load.image('thorn','source/obstacle1.png');
    game.load.image('spike','source/axe.png');
    game.load.image('spikeBall1','source/obstacle4.png');
    game.load.image('spikeEmitter','source/spikedball.png');
    game.load.image('spikeBall2','source/obstacle5.png');
    game.load.image('spikeBall3','source/obstacle8.png');
    game.load.image('snowLeft', 'source/ice-platform-left.png');
    game.load.image('snowCenter', 'source/ice-platform-center.png');
    game.load.image('snowRight', 'source/ice-platform-right.png');
    game.load.image('coler', 'source/coler.png');
    game.load.spritesheet('wallSpike', 'source/spikesBoardWave.png', 48, 48);
    game.load.spritesheet('cannon', 'source/cannon (2) (3).png', 204, 204);
    game.load.spritesheet('machineGun', 'source/machinegunMove.png', 150, 100);
    game.load.image('wallspikeleft', 'source/spikesBoardLeft.png');
    game.load.image('wallspiketop', 'source/spikesBoardTop.png');
    game.load.image('spiketop', 'source/SpikeGroundTrap.png');
    game.load.image('bullet', 'source/bullet.png');
    game.load.image('bomb', 'source/bomb.png');
    game.load.image('wooden', 'source/woodenSpike.png');
    game.load.image('line', 'source/line.png');
    game.load.image('lineV', 'source/lineVerticalThin.png');
    game.load.image('wallspikeright', 'source/spikesBoardRight.png');
    game.load.image('snowSpike', 'source/spikesBottomAlt2.png');
    game.load.spritesheet('minion', 'source/minion2.png', 48, 48)
}
function create(){
    score = 0;

    game.add.tileSprite(0, 0, 1500, 1500, 'sky');
    game.world.setBounds(0, 0, 1500, 1500);

    game.physics.startSystem(Phaser.Physics.ARCADE);

    platforms = game.add.group();
    platforms.enableBody = true;

    obstacle = game.add.group();
    obstacle.enableBody = true;

    line = game.add.group();
    line.enableBody = true;

    emitter1 = game.add.emitter(250, 450);
    emitter1.makeParticles('spikeEmitter', 0, 100, true, true);
    emitter1.minParticleSpeed.setTo(0, 0);
    emitter1.maxParticleSpeed.setTo(0, 0);
    emitter1.gravity.y = 150;
    emitter1.bounce.setTo(0.2, 0.2);
    emitter1.start(false, 5000, 6000);

    emitter2 = game.add.emitter(1250, 450);
    emitter2.makeParticles('spikeEmitter', 0, 100, true, true);
    emitter2.minParticleSpeed.setTo(0, 0);
    emitter2.maxParticleSpeed.setTo(0, 0);
    emitter2.gravity.y = 150;
    emitter2.bounce.setTo(0.2, 0.2);
    emitter2.start(false, 5000, 6000);

    var wall = obstacle.create(-20, 1015,'wallspikeleft');
    wall.body.immovable = true;
    wall = obstacle.create(450, 340,'spiketop');
    wall.body.immovable = true;
    wall = obstacle.create(948, 340,'spiketop');
    wall.body.immovable = true;
    wall = obstacle.create(-20, 685,'wallspikeleft');
    wall.body.immovable = true;
    wall = obstacle.create(1455, 1015,'wallspikeright');
    wall.body.immovable = true;
    wall = obstacle.create(1455, 685,'wallspikeright');
    wall.body.immovable = true;
    wall = obstacle.create(687, 740,'wallspiketop');
    wall.body.immovable = true;
    wall = obstacle.create(719, 740,'wallspiketop');
    wall.body.immovable = true;
    wall = obstacle.create(751, 740,'wallspiketop');
    wall.body.immovable = true;
    wall = obstacle.create(783, 740,'wallspiketop');
    wall.body.immovable = true;
    wall = obstacle.create(500, 690,'wooden');
    wall.body.immovable = true;
    wall = obstacle.create(950, 690,'wooden');
    wall.body.immovable = true;
    wall = obstacle.create(450, 1132,'wallSpike');
    wall.body.immovable = true;
    wall.animations.add('spikeUp');
    wall.animations.play('spikeUp', 12, true);
    wall = obstacle.create(980, 1132,'wallSpike');
    wall.body.immovable = true;
    wall.animations.add('spikeUp');
    wall.animations.play('spikeUp', 12, true);

    move1 = platforms.create(700, 1090, 'step100');
    move1.body.immovable = true;
    move1.body.velocity.y = -80;
    game.time.events.loop(Phaser.Timer.SECOND*3, function changeDirection(){move1.body.velocity.y *= (-1);}, this);

    move2 = platforms.create(500, 400, 'step100');
    move2.body.immovable = true;
    move2.body.velocity.x = 80;
    game.time.events.loop(Phaser.Timer.SECOND*5, function changeDirection(){move2.body.velocity.x *= (-1);}, this);


    var ledge = platforms.create(650, 1280, 'step200');
    ledge.body.immovable = true;
    ledge = platforms.create(400, 1180, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(930, 1180, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(150, 1280, 'step200');
    ledge.body.immovable = true;
    ledge = platforms.create(1180, 1280, 'step200');
    ledge.body.immovable = true;
    ledge = platforms.create(0, 1080, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(-40, 975, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(1400, 1080, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(1440, 975, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(400, 975, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(1400, 1080, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(975, 975, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(675, 700, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(900, 800, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(500, 800, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(350, 600, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(1010, 600, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(0, 750, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(-40, 875, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(1440, 875, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(1400, 750, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(570, 500, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(840, 500, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(150, 400, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(1200, 400, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(-30, 300, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(1430, 300, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(200, 200, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(450, 300, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(1200, 200, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(950, 300, 'step100');
    ledge.body.immovable = true;

    var linePart = line.create(0, 1400, 'line');
    linePart.body.immovable = true;
    linePart = line.create(200, 1400, 'line');
    linePart.body.immovable = true;
    linePart = line.create(400, 1400, 'line');
    linePart.body.immovable = true;
    linePart = line.create(600, 1400, 'line');
    linePart.body.immovable = true;
    linePart = line.create(800, 1400, 'line');
    linePart.body.immovable = true;
    linePart = line.create(1000, 1400, 'line');
    linePart.body.immovable = true;
    linePart = line.create(1200, 1400, 'line');
    linePart.body.immovable = true;
    linePart = line.create(1400, 1400, 'line');
    linePart.body.immovable = true;
    linePart = line.create(0, 100, 'line');
    linePart.body.immovable = true;
    linePart = line.create(200, 100, 'line');
    linePart.body.immovable = true;
    linePart = line.create(400, 100, 'line');
    linePart.body.immovable = true;
    linePart = line.create(600, 100, 'line');
    linePart.body.immovable = true;
    linePart = line.create(800, 100, 'line');
    linePart.body.immovable = true;
    linePart = line.create(1000, 100, 'line');
    linePart.body.immovable = true;
    linePart = line.create(1200, 100, 'line');
    linePart.body.immovable = true;
    linePart = line.create(1400, 100, 'line');
    linePart.body.immovable = true;

    spikeBall2 = game.add.sprite(1450, 1425, 'spikeBall2');
    spikeBall2.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(spikeBall2);
    spikeBall2.body.immovable = true;
    spikeBall2.body.velocity.x = -200;
    spikeBall2.body.bounce.set(1);
    game.time.events.loop(Phaser.Timer.SECOND*3.25, function changeDirection(){spikeBall2.body.velocity.x *= (-1);}, this);

    spikeBall3 = game.add.sprite(50, 125, 'spikeBall3');
    spikeBall3.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(spikeBall3);
    spikeBall3.body.immovable = true;
    spikeBall3.body.velocity.x = 200;
    spikeBall3.body.bounce.set(1);
    game.time.events.loop(Phaser.Timer.SECOND*3.25, function changeDirection(){spikeBall3.body.velocity.x *= (-1);}, this);

    spikeBall4 = game.add.sprite(1450, 125, 'spikeBall3');
    spikeBall4.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(spikeBall4);
    spikeBall4.body.immovable = true;
    spikeBall4.body.velocity.x = -200;
    spikeBall4.body.bounce.set(1);
    game.time.events.loop(Phaser.Timer.SECOND*3.25, function changeDirection(){spikeBall4.body.velocity.x *= (-1);}, this);

    spikeBall1 = game.add.sprite(50, 1425, 'spikeBall2');
    spikeBall1.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(spikeBall1);
    spikeBall1.body.immovable = true;
    spikeBall1.body.velocity.x = 200;
    spikeBall1.body.bounce.set(1);
    game.time.events.loop(Phaser.Timer.SECOND*3.25, function changeDirection(){spikeBall1.body.velocity.x *= (-1);}, this);

    player = game.add.sprite(750, game.world.height - 350, 'minion');
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
        if (i !== 8 && i !== 15) {
            var banana = bananas.create(i * 75, 780, 'banana');
            banana.body.gravity.y = 250;
            banana.body.bounce.y = 0.05 + Math.random() * 0.01;
        }
    }

    for (var j = 0; j < extraItems; j++)
    {
            banana = bananas.create(j * 75, 0, 'banana');
            banana.body.gravity.y = 250;
            banana.body.bounce.y = 0.05 + Math.random() * 0.01;
    }

    banana = bananas.create(410, 1000, 'banana');
    banana.body.gravity.y = 250;
    banana.body.bounce.y = 0.05 + Math.random() * 0.01;
    banana = bananas.create(1050, 1000, 'banana');
    banana.body.gravity.y = 250;
    banana.body.bounce.y = 0.05 + Math.random() * 0.01;
    banana = bananas.create(30, 850, 'banana');
    banana.body.gravity.y = 250;
    banana.body.bounce.y = 0.05 + Math.random() * 0.01;
    banana = bananas.create(1430, 850, 'banana');
    banana.body.gravity.y = 250;
    banana.body.bounce.y = 0.05 + Math.random() * 0.01;
    banana = bananas.create(1430, 700, 'banana');
    banana.body.gravity.y = 250;
    banana.body.bounce.y = 0.05 + Math.random() * 0.01;
    banana = bananas.create(1200, 300, 'banana');
    banana.body.gravity.y = 250;
    banana.body.bounce.y = 0.05 + Math.random() * 0.01;

    soundClick('source/sounds/song.mp3');
    soundClick('source/sounds/Minion Rush.mp3');

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
                    changeLevel('18.html');
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

    timerText = game.add.text(1080, 0, 'Time: 70', {fontSize:'32px', fill: '#000'});
    timerText.fixedToCamera = true;
    scoreText = game.add.text(0,0, 'Score: 0', {fontSize:'32px', fill: '#000'});
    scoreText.fixedToCamera = true;
    game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);

    cursors = game.input.keyboard.createCursorKeys();
    game.world.camera.height = 750;
    game.camera.follow(player);
}
function update() {
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(emitter1, platforms);
    game.physics.arcade.collide(emitter2, platforms);
    game.physics.arcade.collide(bananas, platforms);
    game.physics.arcade.collide(bananas, obstacle);
    game.physics.arcade.collide(player, obstacle, touchObstacle, null, this);
    game.physics.arcade.collide(player, emitter1, touchObstacle, null, this);
    game.physics.arcade.collide(player, emitter2, touchObstacle, null, this);
    game.physics.arcade.collide(player, spike, touchObstacle, null, this);
    game.physics.arcade.collide(player, spikeBall1, touchObstacle, null, this);
    game.physics.arcade.collide(player, spikeBall3, touchObstacle, null, this);
    game.physics.arcade.collide(player, spikeBall4, touchObstacle, null, this);
    game.physics.arcade.collide(player, spikeBall2, touchObstacle, null, this);
    game.physics.arcade.collide(player, emitter, touchObstacle, null, this);
    game.physics.arcade.overlap(player, bananas, collectStar, null, this);
    game.physics.arcade.collide(player, bullets, touchObstacle, null, this);
    game.physics.arcade.collide(player, bullets, touchObstacle, killBullets, this);

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
    if (score === (itemsAmount + extraItems + 4) * 10){
        scoreText.text = 'You win!';
        setTimeout(changeLevel('19.html'),3000);
    }
}

function updateCounter() {
    if (time == 0) {
        scoreText.text = 'You lose!';
        setTimeout(changeLevel('18.html'),3000);
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
    changeLevel('18.html')
}

function  killBullets() {
    bullet.kill();
}