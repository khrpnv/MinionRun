var game = new Phaser.Game(
    1300,
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
var pause_label;
var menu;
var w = 1300, h = 750;
var cursors;
var bananas;
var score;
var coler;
var spike;
var emitter;
var aim1;
var line;
var move1;
var move2;
var vanish;
var spikeBall1;
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
var itemsAmount = 25;
var extraItems = 25;
function preload(){
    game.load.image('sky', 'source/bg15.png');
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
    game.load.spritesheet('cannon', 'source/cannon (2).png', 124, 124);
    game.load.spritesheet('machineGun', 'source/machinegun1.png', 110, 72);
    game.load.image('wallspikeleft', 'source/spikesBoardLeft.png');
    game.load.image('bullet', 'source/bullet.png');
    game.load.image('bomb', 'source/bomb.png');
    game.load.image('wooden', 'source/woodenSpike.png');
    game.load.image('line', 'source/line.png');
    game.load.image('wallspikeright', 'source/spikesBoardRight.png');
    game.load.image('snowSpike', 'source/spikesBottomAlt2.png');
    game.load.spritesheet('minion', 'source/minion2.png', 48, 48)
}
function create(){
    score = 0;

    game.add.tileSprite(0, 0, 1300, 1600, 'sky');
    game.world.setBounds(0, 0, 1300, 1600);

    game.physics.startSystem(Phaser.Physics.ARCADE);


    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;

    bullets.createMultiple(900, 'bullet');
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);
    machineGun = game.add.sprite(50, 800, 'machineGun');
    machineGun.animations.add('shoot');
    machineGun.anchor.set(0.35);
    game.physics.enable(machineGun, Phaser.Physics.ARCADE);
    machineGun.animations.play('shoot', 12, false);
    game.time.events.loop(Phaser.Timer.SECOND*2, function animate(){machineGun.animations.play('shoot', 15, false)}, this);
    aim1 = game.add.sprite(1350,800,'aim');

    platforms = game.add.group();
    platforms.enableBody = true;

    lava = game.add.group();
    lava.enableBody = true;

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

    var wall = obstacle.create(210, 1472,'wallSpike');
    wall.body.immovable = true;
    wall.animations.add('spikeUp');
    wall.animations.play('spikeUp', 12, true);
    wall = obstacle.create(258, 1472,'wallSpike');
    wall.body.immovable = true;
    wall.animations.add('spikeUp');
    wall.animations.play('spikeUp', 12, true);
    wall = obstacle.create(306, 1472,'wallSpike');
    wall.body.immovable = true;
    wall.animations.add('spikeUp');
    wall.animations.play('spikeUp', 12, true);
    wall = obstacle.create(354, 1472,'wallSpike');
    wall.body.immovable = true;
    wall.animations.add('spikeUp');
    wall.animations.play('spikeUp', 12, true);
    wall = obstacle.create(402, 1472,'wallSpike');
    wall.body.immovable = true;
    wall.animations.add('spikeUp');
    wall.animations.play('spikeUp', 12, true);
    wall = obstacle.create(450, 1472,'wallSpike');
    wall.body.immovable = true;
    wall.animations.add('spikeUp');
    wall.animations.play('spikeUp', 12, true);
    wall = obstacle.create(830, 1472,'wallSpike');
    wall.body.immovable = true;
    wall.animations.add('spikeUp');
    wall.animations.play('spikeUp', 12, true);
    wall = obstacle.create(878, 1472,'wallSpike');
    wall.body.immovable = true;
    wall.animations.add('spikeUp');
    wall.animations.play('spikeUp', 12, true);
    wall = obstacle.create(926, 1472,'wallSpike');
    wall.body.immovable = true;
    wall.animations.add('spikeUp');
    wall.animations.play('spikeUp', 12, true);
    wall = obstacle.create(974, 1472,'wallSpike');
    wall.body.immovable = true;
    wall.animations.add('spikeUp');
    wall.animations.play('spikeUp', 12, true);
    wall = obstacle.create(1022, 1472,'wallSpike');
    wall.body.immovable = true;
    wall.animations.add('spikeUp');
    wall.animations.play('spikeUp', 12, true);
    wall = obstacle.create(1070, 1472,'wallSpike');
    wall.body.immovable = true;
    wall.animations.add('spikeUp');
    wall.animations.play('spikeUp', 12, true);

    wall = obstacle.create(1255, 1285,'wallspikeright');
    wall.body.immovable = true;
    wall = obstacle.create(0, 200,'wooden');
    wall.body.immovable = true;

    move2 = platforms.create(345, 1315, 'step150');
    move2.body.immovable = true;
    move2.body.velocity.x = 85;
    move2.body.collideWorldBounds = true;
    move2.body.bounce.set(1);
    game.time.events.loop(Phaser.Timer.SECOND*4, function changeDirection(){move2.body.velocity.x *= (-1);}, this);
    move1 = platforms.create(1090, 400, 'step150');
    move1.body.immovable = true;
    move1.body.velocity.y = 80;
    move1.body.collideWorldBounds = true;
    move1.body.bounce.set(1);
    game.time.events.loop(Phaser.Timer.SECOND*4, function changeDirection(){move1.body.velocity.y *= (-1);}, this);

    vanish = game.add.sprite(100, 1415, 'step100');
    game.physics.enable(vanish, Phaser.Physics.ARCADE);
    vanish.body.immovable = true;
    vanish.enableBody = true;

    var ledge = platforms.create(1000, 1215, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(1220, 1350, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(700, 1115, 'step200');
    ledge.body.immovable = true;
    ledge = platforms.create(400, 1015, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(0, 1170, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(-10, 850, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(740, 915, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(1000, 825, 'step200');
    ledge.body.immovable = true;
    ledge = platforms.create(520, 825, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(300, 750, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(200, 650, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(450, 550, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(600, 600, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(750, 550, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(800, 650, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(800, 350, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(500, 300, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(200, 400, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(0, 312, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(-30, 170, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(200, 230, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(450, 130, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(700, 150, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(950, 100, 'step150');
    ledge.body.immovable = true;

    spikeBall1 = game.add.sprite(1310, 180, 'spikeBall');
    spikeBall1.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(spikeBall1);
    spikeBall1.body.immovable = true;
    spikeBall1.body.velocity.y = 150;
    spikeBall1.body.bounce.set(1);
    game.time.events.loop(Phaser.Timer.SECOND*3.1, function changeDirection(){spikeBall1.body.velocity.y *= (-1);}, this);

    line = game.add.sprite(440, 440, 'line');
    line = game.add.sprite(640, 440, 'line');

    spikeBall2 = game.add.sprite(440, 460, 'spikeBall2');
    spikeBall2.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(spikeBall2);
    spikeBall2.body.immovable = true;
    spikeBall2.body.velocity.x = 200;
    spikeBall2.body.bounce.set(1);
    game.time.events.loop(Phaser.Timer.SECOND*2.1, function changeDirection(){spikeBall2.body.velocity.x *= (-1);}, this);


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
        var banana = bananas.create(i * 52, 620, 'banana');
        banana.body.gravity.y = 250;
        banana.body.bounce.y = 0.05 + Math.random() * 0.01;
    }

    for (var j = 0; j < extraItems; j++)
    {
        banana = bananas.create(j * Math.floor(Math.random()*(52-50) + 50), 0, 'banana');
        banana.body.gravity.y = 250;
        banana.body.bounce.y = 0.05 + Math.random() * 0.01;
    }
    banana = bananas.create(1210, 1200, 'banana');
    banana.body.gravity.y = 250;
    banana.body.bounce.y = 0.1 + Math.random() * 0.05;
    banana = bananas.create(50, 1000, 'banana');
    banana.body.gravity.y = 250;
    banana.body.bounce.y = 0.1 + Math.random() * 0.05;

    soundClick('source/sounds/bapa.mp3');
    soundClick('source/sounds/Minion Rush.mp3');

    timerText = game.add.text(1180, 0, 'Time: 90', {fontSize:'32px', fill: '#000'});
    timerText.fixedToCamera = true;
    scoreText = game.add.text(0,0, 'Score: 0', {fontSize:'32px', fill: '#000'});
    scoreText.fixedToCamera = true;
    game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);

    menu = game.add.sprite(400, 150, 'menu');
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
                    changeLevel('15.html');
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
    game.physics.arcade.collide(bananas, platforms);
    game.physics.arcade.collide(bananas, vanish);
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
    game.physics.arcade.collide(player, vanish, platformVanish, null, this);
    game.physics.arcade.collide(player, bullets, touchObstacle, null, this);

    player.body.velocity.x = 0;

    spikeBall1.angle -= 4;
    spikeBall2.angle += 5;


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
    if (score === (itemsAmount + extraItems + 2) * 10){
        scoreText.text = 'You win!';
        setTimeout(changeLevel('16.html'),3000);
    }
}

function fadePicture() {
    game.add.tween(vanish).to( { alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
    vanish.enableBody = false;
}

function updateCounter() {
    if (time == 0) {
        scoreText.text = 'You lose!';
        setTimeout(changeLevel('15.html'),3000);
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
    changeLevel('15.html')
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
function platformVanish(){
    game.time.events.loop(Phaser.Timer.SECOND*5, function(){vanish.kill();}, this);
}