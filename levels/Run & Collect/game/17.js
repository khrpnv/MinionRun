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

var time = 75;
var platforms;
var pillar;
var player;
var cursors;
var bananas;
var score;
var pause_label;
var menu;
var w = 1200, h = 750;
var coler;
var part;
var bullet;
var spike;
var emitter;
var lineCannon;
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
var fireRate = 4000;
var nextFire = 0;
var spikeBall2;
var timerText;
var scoreText;
var lava;
var obstacle;
var itemsAmount = 20;
var extraItems = 20;
function preload(){
    game.load.image('sky', 'source/bg17.png');
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
    game.load.image('spikeBall','source/SawBig.png');
    game.load.image('spikeBall2','source/SawSmall.png');
    game.load.image('snowLeft', 'source/ice-platform-left.png');
    game.load.image('snowCenter', 'source/ice-platform-center.png');
    game.load.image('snowRight', 'source/ice-platform-right.png');
    game.load.image('coler', 'source/coler.png');
    game.load.spritesheet('wallSpike', 'source/spikesBoardWave.png', 48, 48);
    game.load.spritesheet('cannon', 'source/cannon (2) (3).png', 204, 204);
    game.load.spritesheet('machineGun', 'source/machinegun1.png', 110, 72);
    game.load.image('wallspikeleft', 'source/spikesBoardLeft.png');
    game.load.image('bullet', 'source/bullet.png');
    game.load.image('bomb', 'source/bomb.png');
    game.load.image('wooden', 'source/woodenSpike.png');
    game.load.image('line', 'source/line.png');
    game.load.image('pillar', 'source/pillar.png');
    game.load.image('pillarMid', 'source/midPillar.png');
    game.load.image('blade', 'source/blade.png');
    game.load.image('blade2', 'source/blade2.png');
    game.load.image('3', 'source/nut.png');
    game.load.image('line2', 'source/cannonLine.png');
    game.load.image('wallspikeright', 'source/spikesBoardRight.png');
    game.load.image('snowSpike', 'source/spikesBottomAlt2.png');
    game.load.spritesheet('minion', 'source/minion2.png', 48, 48)
}
function create(){
    score = 0;

    game.add.tileSprite(0, 0, 1200, 1600, 'sky');
    game.world.setBounds(0, 0, 1200, 1600);

    game.physics.startSystem(Phaser.Physics.ARCADE);

    lineCannon = game.add.sprite(0, 150, 'line2');
    lineCannon = game.add.sprite(300, 150, 'line2');
    lineCannon = game.add.sprite(600, 150, 'line2');
    lineCannon = game.add.sprite(900, 150, 'line2');

    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;

    bullets.createMultiple(900, 'bomb');
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);
    game.physics.enable(bullets, Phaser.Physics.ARCADE);
    sprite = game.add.sprite(-5, 0, 'cannon');
    sprite.anchor.setTo(0.7, 0.7);
    game.physics.enable(sprite, Phaser.Physics.ARCADE);
    sprite.animations.add('shoot');
    sprite.body.velocity.x = 150;
    sprite.body.collideWorldBounds = true;
    sprite.body.bounce.set(1);
    sprite.animations.play('shoot', 15, false);
    game.time.events.loop(Phaser.Timer.SECOND*4, function animate(){sprite.animations.play('shoot', 17, false)}, this);


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

    lava = game.add.group();
    lava.enableBody = true;

    obstacle = game.add.group();
    obstacle.enableBody = true;

    var wall = obstacle.create(406, 1472,'wallSpike');
    wall.body.immovable = true;
    wall.animations.add('spikeUp');
    wall.animations.play('spikeUp', 12, true);
    wall = obstacle.create(454, 1472,'wallSpike');
    wall.body.immovable = true;
    wall.animations.add('spikeUp');
    wall.animations.play('spikeUp', 12, true);
    wall = obstacle.create(502, 1472,'wallSpike');
    wall.body.immovable = true;
    wall.animations.add('spikeUp');
    wall.animations.play('spikeUp', 12, true);
    wall = obstacle.create(702, 1472,'wallSpike');
    wall.body.immovable = true;
    wall.animations.add('spikeUp');
    wall.animations.play('spikeUp', 12, true);
    wall = obstacle.create(750, 1472,'wallSpike');
    wall.body.immovable = true;
    wall.animations.add('spikeUp');
    wall.animations.play('spikeUp', 12, true);
    wall = obstacle.create(798, 1472,'wallSpike');
    wall.body.immovable = true;
    wall.animations.add('spikeUp');
    wall.animations.play('spikeUp', 12, true);

    move2 = platforms.create(0, 710, 'step150');
    move2.body.immovable = true;
    move2.body.velocity.x = 85;
    move2.body.collideWorldBounds = true;
    move2.body.bounce.set(1);
    game.time.events.loop(Phaser.Timer.SECOND*4, function changeDirection(){move2.body.velocity.x *= (-1);}, this);
    move1 = platforms.create(1100, 710, 'step150');
    move1.body.immovable = true;
    move1.body.velocity.x = -85;
    move1.body.collideWorldBounds = true;
    move1.body.bounce.set(1);
    game.time.events.loop(Phaser.Timer.SECOND*4, function changeDirection(){move1.body.velocity.x *= (-1);}, this);

    // vanish = game.add.sprite(100, 1415, 'step100');
    // game.physics.enable(vanish, Phaser.Physics.ARCADE);
    // vanish.body.immovable = true;
    // vanish.enableBody = true;

    var ledge = platforms.create(-5, 1415, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(545, 1215, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(250, 1315, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(1105, 1415, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(855, 1315, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(275, 1115, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(880, 1115, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(100, 1015, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(450, 1015, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(1055, 1015, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(545, 913, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(690, 1015, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(570, 812, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(300, 608, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(800, 608, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(50, 506, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(1000, 506, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(55, 316, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(1050, 316, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(355, 406, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(750, 406, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(540, 306, 'step150');
    ledge.body.immovable = true;

    spikeBall1 = game.add.sprite(618, 1030, 'blade');
    spikeBall1.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(spikeBall1);
    spikeBall1.body.immovable = true;

    spikeBall2 = game.add.sprite(618, 1130, 'blade');
    spikeBall2.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(spikeBall2);
    spikeBall2.body.immovable = true;

    spikeBall3 = game.add.sprite(125, 400, 'blade2');
    spikeBall3.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(spikeBall3);
    spikeBall3.body.immovable = true;

    spikeBall4 = game.add.sprite(1074, 400, 'blade2');
    spikeBall4.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(spikeBall4);
    spikeBall4.body.immovable = true;

    pillar = game.add.sprite(600, 953, 'pillar');
    game.physics.arcade.enable(pillar);
    pillar.body.immovable = true;
    pillar = game.add.sprite(105, 368, 'pillarMid');
    game.physics.arcade.enable(pillar);
    pillar.body.immovable = true;
    pillar = game.add.sprite(1055, 368, 'pillarMid');
    game.physics.arcade.enable(pillar);
    pillar.body.immovable = true;
    part = game.add.sprite(610, 1020, '3');
    part = game.add.sprite(610, 1120, '3');
    part = game.add.sprite(115, 390, '3');
    part = game.add.sprite(1065, 390, '3');

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
        var banana = bananas.create(i * 54, 550, 'banana');
        banana.body.gravity.y = 250;
        banana.body.bounce.y = 0.05 + Math.random() * 0.01;
    }

    for (var j = 0; j < extraItems; j++)
    {
        banana = bananas.create(j * Math.floor(Math.random()*(60-55) + 55), 0, 'banana');
        banana.body.gravity.y = 250;
        banana.body.bounce.y = 0.05 + Math.random() * 0.01;
    }
    banana = bananas.create(150, 800, 'banana');
    banana.body.gravity.y = 250;
    banana.body.bounce.y = 0.1 + Math.random() * 0.05;
    banana = bananas.create(1050, 800, 'banana');
    banana.body.gravity.y = 250;
    banana.body.bounce.y = 0.1 + Math.random() * 0.05;
    banana = bananas.create(300, 800, 'banana');
    banana.body.gravity.y = 250;
    banana.body.bounce.y = 0.1 + Math.random() * 0.05;

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
                    changeLevel('17.html');
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

    soundClick('source/sounds/minion_ojojojoj.mp3');
    soundClick('source/sounds/Minion Rush.mp3');

    timerText = game.add.text(1080, 0, 'Time: 75', {fontSize:'32px', fill: '#CCC'});
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
    game.physics.arcade.collide(player, pillar);
    game.physics.arcade.collide(bananas, pillar);
    game.physics.arcade.collide(bullets, platforms, killBullets, null, this);
    game.physics.arcade.collide(bananas, platforms);
    game.physics.arcade.collide(emitter, lava);
    game.physics.arcade.collide(emitter, platforms);
    game.physics.arcade.collide(bananas, obstacle);
    game.physics.arcade.collide(player, obstacle, touchObstacle, null, this);
    game.physics.arcade.collide(player, lava, touchObstacle, null, this);
    game.physics.arcade.collide(player, spike, touchObstacle, null, this);
    game.physics.arcade.collide(player, lava, touchObstacle, null, this);
    game.physics.arcade.collide(player, spikeBall1, touchObstacle, null, this);
    game.physics.arcade.collide(player, spikeBall3, touchObstacle, null, this);
    game.physics.arcade.collide(player, spikeBall4, touchObstacle, null, this);
    game.physics.arcade.collide(player, spikeBall2, touchObstacle, null, this);
    game.physics.arcade.collide(player, emitter, touchObstacle, null, this);
    game.physics.arcade.overlap(player, bananas, collectStar, null, this);
    game.physics.arcade.collide(player, vanish, platformVanish, null, this);
    game.physics.arcade.collide(player, bullets, touchObstacle, killBullets, this);

    player.body.velocity.x = 0;

    sprite.rotation = game.physics.arcade.angleBetween(player, sprite, false);

    spikeBall1.angle -= 3;
    spikeBall3.angle += 3;
    spikeBall2.angle += 3;
    spikeBall4.angle -= 3;


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

    fireMachineGun();
}
function changeLevel(str){
    document.location.href=str;
}


function collectStar (player, banana) {
    banana.kill();
    score+=10;
    scoreText.text = 'Score: ' + score;
    if (score === (itemsAmount + extraItems + 3) * 10){
        scoreText.text = 'You win!';
        setTimeout(changeLevel('18.html'),3000);
    }
}

function updateCounter() {
    if (time == 0) {
        scoreText.text = 'You lose!';
        setTimeout(changeLevel('17.html'),3000);
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
    changeLevel('17.html')
}
function fireMachineGun() {

    if (game.time.now > nextFire && bullets.countDead() > 0)
    {
        nextFire = game.time.now + fireRate;

        bullet = bullets.getFirstDead();

        bullet.reset(sprite.x - 8, sprite.y - 8);

        game.physics.arcade.moveToObject(bullet, player, 600);

        soundClick('source/sounds/cannon.mp3');

        if (game.physics.arcade.collide(platforms, bullet) === true){
            bullet.kill();
        }

    }

}
function platformVanish() {
    game.time.events.loop(Phaser.Timer.SECOND * 5, function () {
        vanish.kill();
    }, this);
}

function  killBullets() {
    bullet.kill();
}