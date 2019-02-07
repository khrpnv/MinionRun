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

var time = 300;
var platforms;
var player;
var cursors;
var bananas;
var pause_label;
var menu;
var w = 1200, h = 750;
var score;
var spike;
var part;
var emitter;
var line;
var move1;
var move2;
var move3;
var laser;
var button;
var bullet;
var sea;
var spikeBall1;
var spikeBall3;
var spikeBall4;
var teleport;
var pillar;
var trampoline1;
var machineGun;
var sprite;
var bullets;
var box1;
var counter = 0;
var fireRate = 3000;
var nextFire = 0;
var spikeBall2;
var timerText;
var scoreText;
var lever;
var obstacle;
var itemsAmount = 95;
function preload(){
    game.load.image('sky', 'source/bg22.jpg');
    game.load.spritesheet('chrTree', 'source/christmastree1.png', 114, 114);
    game.load.spritesheet('lava', 'source/lava.png', 300, 69);
    game.load.image('banana','source/strawberry.png');
    game.load.spritesheet('trampoline','source/spring.png', 64, 46);
    game.load.spritesheet('lever','source/laserSwitch.png', 48, 48);
    game.load.spritesheet('switch','source/switchGreen.png', 48, 48);
    game.load.image('sand','source/sand.png');
    game.load.image('step150','source/sand150.png');
    game.load.image('step100','source/sand100.png');
    game.load.image('step200','source/sand200.png');
    game.load.image('elevator','source/elevator.png');
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
    game.load.spritesheet('laserLeft', 'source/laserLeft.png', 400, 400);
    game.load.spritesheet('teleport', 'source/teleport.png', 150, 150);
    game.load.image('wallspikeleft', 'source/spikesBoardLeftMin.png');
    game.load.image('wallspikeright', 'source/spikesBoard.png');
    game.load.image('spiketop', 'source/spikeGroundTrap.png');
    game.load.image('bullet', 'source/bullet.png');
    game.load.image('bomb', 'source/bomb.png');
    game.load.image('wooden', 'source/woodenSpike.png');
    game.load.image('menu', 'source/menu.png');
    game.load.image('pillarMid', 'source/midPillar.png');
    game.load.image('sea1', 'source/water2_transp.png');
    game.load.image('sea2', 'source/water1_transp.png');
    game.load.image('blade', 'source/blade.png');
    game.load.image('blade2', 'source/blade2.png');
    game.load.image('spikeBall','source/sawBig.png');
    game.load.image('spikeBall2_2','source/sawSmall.png');
    game.load.image('moveDown','source/wallSpike.png');
    game.load.image('3', 'source/nut.png');
    game.load.image('line', 'source/line.png');
    game.load.image('lineV', 'source/lineVertical.png');
    game.load.image('wallspikeright', 'source/spikesBoardRight.png');
    game.load.image('box','source/box.png');
    game.load.spritesheet('minion', 'source/minion2.png', 48, 48)
}
function create(){
    score = 0;

    game.add.tileSprite(0, 0, 3840, 1200, 'sky');
    game.world.setBounds(0, 0, 3840, 1200);


    game.physics.startSystem(Phaser.Physics.ARCADE);

    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;

    bullets.createMultiple(900, 'bullet');
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);
    machineGun = game.add.sprite(1360, 486, 'machineGun');
    machineGun.animations.add('shoot');
    machineGun.anchor.set(0.35);
    game.physics.enable(machineGun, Phaser.Physics.ARCADE);
    machineGun.animations.play('shoot', 12, false);
    game.time.events.loop(Phaser.Timer.SECOND*3, function animate(){machineGun.animations.play('shoot', 15, false)}, this);
    aim = game.add.sprite(4000,486,'aim');

    platforms = game.add.group();
    platforms.enableBody = true;

    var ground = platforms.create(-40, game.world.height - 70, 'sand');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(216, game.world.height - 70, 'sand');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(1104, game.world.height - 70, 'sand');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(1488, game.world.height - 70, 'sand');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(1872, game.world.height - 70, 'sand');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(2256, game.world.height - 70, 'sand');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(2640, game.world.height - 70, 'sand');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(3653, game.world.height - 70, 'sand');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;

    obstacle = game.add.group();
    obstacle.enableBody = true;

    var wall = obstacle.create(600, 1199,'spikeBall1');
    wall.body.immovable = true;
    wall = obstacle.create(800, 1198,'spikeBall1');
    wall.body.immovable = true;
    wall = obstacle.create(1000, 1198,'spikeBall1');
    wall.body.immovable = true;
    wall = obstacle.create(1200, 1198,'spikeBall1');
    wall.body.immovable = true;
    wall = obstacle.create(3030, 1198,'spikeBall1');
    wall.body.immovable = true;
    wall = obstacle.create(3130, 1198,'spikeBall1');
    wall.body.immovable = true;
    wall = obstacle.create(3230, 1198,'spikeBall1');
    wall.body.immovable = true;
    wall = obstacle.create(3330, 1198,'spikeBall1');
    wall.body.immovable = true;
    wall = obstacle.create(3430, 1198,'spikeBall1');
    wall.body.immovable = true;
    wall = obstacle.create(3530, 1198,'spikeBall1');
    wall.body.immovable = true;

    move1 = platforms.create(0, 1030, 'elevator');
    move1.body.immovable = true;
    move1.body.collideWorldBounds = true;
    move1.body.bounce.set(1);

    var ledge = platforms.create(400, 800, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(300, 600, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(380, 400, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(580, 280, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(180, 300, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(0, 200, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(180, 100, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(700, 652, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(1000, 300, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(940, 800, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(700, 900, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(800, 100, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(1350, 150, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(1300, 530, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(1200, 875, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(1500, 875, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(1800, 775, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(1600, 675, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(2000, 1000, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(2200, 900, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(2400, 800, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(2150, 700, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(2350, 600, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(2500, 500, 'step200');
    ledge.body.immovable = true;
    ledge = platforms.create(2900, 500, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(2100, 500, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(1800, 500, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(3200, 500, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(1600, 400, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(1800, 300, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(2000, 200, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(2350, 270, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(2600, 170, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(2800, 70, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(3000, 100, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(3300, 300, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(3500, 530, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(3745, 400, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(3600, 300, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(3450, 200, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(3600, 100, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(3500, 900, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(3300, 800, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(3000, 700, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(2750, 800, 'step100');
    ledge.body.immovable = true;

    laser = game.add.sprite(395, 418, 'laserLeft');
    game.physics.enable(laser, Phaser.Physics.ARCADE);
    laser.body.immovable = true;
    laser.body.setSize(280, 20, 50, 190);
    laser.animations.add('shootLaser');
    laser.animations.play('shootLaser', 12, true);

    trampoline1 = game.add.sprite(597.5, 235, 'trampoline');
    game.physics.arcade.enable(trampoline1);
    trampoline1.body.setSize(64, 46, 0, 12);
    trampoline1.animations.add('jump');
    trampoline1.body.immovable = true;
    trampoline1.body.bounce.set(1);

    spikeBall1 = game.add.sprite(1375, 680, 'blade');
    game.physics.arcade.enable(spikeBall1);
    spikeBall1.anchor.setTo(0.5, 0.5);
    spikeBall1.body.immovable = true;

    pillar = game.add.sprite(1395, 705, 'pillarMid');
    game.physics.arcade.enable(pillar);
    pillar.angle = 180;

    part = game.add.sprite(1364, 665, '3');

    lever = game.add.sprite(50, 984, 'lever');
    game.physics.enable(lever, Phaser.Physics.ARCADE);
    lever.body.immovable = true;
    lever.enableBody = true;
    lever.body.setSize(47, 39, 0, 10);
    lever.animations.add('pull',[1,2], 12, false);
    lever.animations.add('return',[4,5,6], 12, false);

    box1 = game.add.sprite(1010,70, 'box');
    game.physics.enable(box1, Phaser.Physics.ARCADE);
    box1.body.bounce.y = 0.2;
    box1.body.gravity.y = 600;
    box1.body.collideWorldBounds = true;

    player = game.add.sprite(100,game.world.height - 150, 'minion');
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.2;
    player.body.collideWorldBounds = true;
    player.body.gravity.y = 300;
    player.animations.add('left',[0,1,2,3], 10, true);
    player.animations.add('right',[5,6,7,8], 10, true);

    sea = game.add.group();
    sea.enableBody = true;

    var wave = sea.create(3024, 1125, 'sea1');
    wave.body.immovable = true;
    wave.body.allowGravity = false;
    wave = sea.create(3149.8, 1082, 'sea2');
    wave.body.immovable = true;
    wave.body.allowGravity = false;
    wave = sea.create(3275.5, 1125, 'sea1');
    wave.body.immovable = true;
    wave.body.allowGravity = false;
    wave = sea.create(3401.2, 1082, 'sea2');
    wave.body.immovable = true;
    wave.body.allowGravity = false;
    wave = sea.create(3527.2, 1125, 'sea1');
    wave.body.immovable = true;
    wave.body.allowGravity = false;
    wave = sea.create(600, 1082, 'sea2');
    wave.body.immovable = true;
    wave.body.allowGravity = false;
    wave = sea.create(725.9, 1125, 'sea1');
    wave.body.immovable = true;
    wave.body.allowGravity = false;
    wave = sea.create(851.9, 1082, 'sea2');
    wave.body.immovable = true;
    wave.body.allowGravity = false;
    wave = sea.create(977.9, 1125, 'sea1');
    wave.body.immovable = true;
    wave.body.allowGravity = false;

    teleport = game.add.sprite(480, 995, 'teleport');
    game.physics.arcade.enable(teleport);
    teleport.body.immovable = true;
    teleport.body.setSize(80, 30, 35, 110);
    teleport.animations.add('static',[0,1,2], 10, true);
    teleport.animations.add('teleport',[3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21], 10, false);
    teleport.animations.play('static');


    bananas = game.add.group();
    bananas.enableBody = true;
    for (var i = 0; i < itemsAmount; i++) {
        if (i < 15 || i > 26 && i !== 79) {
            var banana = bananas.create(i * 40, 0, 'banana');
            banana.body.gravity.y = 250;
            banana.body.bounce.y = 0.05 + Math.random() * 0.01;
        }
    }
    for (var j = 0; j < (itemsAmount - 19); j++) {
        if (j < 12 || j > 26 && j !== 69 && j !== 68 && j !== 65 && j !== 64 && j !== 63) {
            banana = bananas.create(j * 50, 500, 'banana');
            banana.body.gravity.y = 250;
            banana.body.bounce.y = 0.05 + Math.random() * 0.01;
        }
    }
    banana = bananas.create(850, 0, 'banana');
    banana.body.gravity.y = 250;
    banana.body.bounce.y = 0.05 + Math.random() * 0.01;

    menu = game.add.sprite(350, 150, 'menu');
    menu.visible = false;
    menu.fixedToCamera = true;

    pause_label = game.add.text(w/2-40, 0, 'Pause', {fontSize:'32px', fill: '#FFDC52'});
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
                    changeLevel('22.html');
                }
                else if (choisemap[choise] == 'two'){
                    changeLevel('LevelsPage4.html');
                }
            }
            else {
                menu.visible = false;
                game.paused = false;
            }
        }
    }

    soundClick('source/sounds/minion_elo.mp3');
    soundClick('source/sounds/Minion Rush.mp3');

    timerText = game.add.text(1070, 0, 'Time: 300', {fontSize:'32px', fill: '#FFDC52'});
    timerText.fixedToCamera = true;
    scoreText = game.add.text(0,0, 'Score: 0', {fontSize:'32px', fill: '#FFDC52'});
    scoreText.fixedToCamera = true;
    game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);

    cursors = game.input.keyboard.createCursorKeys();
    game.world.camera.height = 750;
    game.camera.follow(player);
}
function update() {
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(player, box1, function boxStop(){box1.body.velocity.x = 0},null, this);
    game.physics.arcade.collide(box1, platforms);
    game.physics.arcade.collide(player, lever);
    game.physics.arcade.collide(player, teleport);
    game.physics.arcade.collide(bananas, platforms);
    game.physics.arcade.collide(bananas, teleport);
    game.physics.arcade.collide(bananas, obstacle);
    game.physics.arcade.collide(player, trampoline1, bouncing1, null, this);
    game.physics.arcade.collide(bananas, lever);
    game.physics.arcade.collide(player, obstacle, touchObstacle, null, this);
    game.physics.arcade.overlap(player, laser, touchObstacle, null, this);
    game.physics.arcade.collide(player, bullets, touchObstacle, null, this);
    game.physics.arcade.collide(player, bullets, killBullets, null, this);
    game.physics.arcade.collide(player, spikeBall1, touchObstacle, null, this);
    game.physics.arcade.collide(player, bullets, killBullets, null, this);
    game.physics.arcade.overlap(player, bananas, collectStar, null, this);

    player.body.velocity.x = 0;

    spikeBall1.angle += 5;

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
    if (game.input.keyboard.addKey(Phaser.Keyboard.ENTER).isDown && player.body.touching.down && teleport.body.touching.up){
        teleport.animations.play('teleport');
        soundClick('source/sounds/teleport.mp3')
        game.time.events.add(Phaser.Timer.SECOND*0.8, function(){player.kill();}, this);
        game.time.events.add(Phaser.Timer.SECOND*1, function(){player.reset(600, 100);}, this);

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
    if (score === ((itemsAmount - 13 + itemsAmount - 19 - 15 - 4)* 10)){
        scoreText.text = 'You win!';
        setTimeout(changeLevel('23.html'),3000);
    }
}

function updateCounter() {
    if (time == 0) {
        scoreText.text = 'You lose!';
        setTimeout(changeLevel('22.html'),3000);
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
    changeLevel('22.html')
}


function movePlatform(){
    lever.animations.play('pull');
    game.time.events.add(Phaser.Timer.SECOND*17, function(){lever.animations.play('return');}, this);
    move1.body.velocity.y = -80;
    lever.body.velocity.y = -80;
    game.time.events.add(Phaser.Timer.SECOND*17, function(){move1.body.velocity.y = 0;}, this);
    game.time.events.add(Phaser.Timer.SECOND*17, function(){lever.body.velocity.y = 0;}, this);
    game.time.events.add(Phaser.Timer.SECOND*8.5, function(){move1.body.velocity.y = 80;}, this);
    game.time.events.add(Phaser.Timer.SECOND*8.5, function(){lever.body.velocity.y = 80;}, this);

}


function fire() {

    if (game.time.now > nextFire && bullets.countDead() > 0)
    {
        nextFire = game.time.now + fireRate;

        bullet = bullets.getFirstDead();

        bullet.reset(machineGun.x - 3, machineGun.y - 9);

        game.physics.arcade.moveToObject(bullet, aim, 600);

        soundClick('source/sounds/gun.mp3');

    }

}

function  killBullets() {
    bullet.kill();
}


function bouncing1(){
    trampoline1.animations.play('jump', 30, false);
    player.body.velocity.y = -350;
    soundClick('source/sounds/spring.mp3');
}