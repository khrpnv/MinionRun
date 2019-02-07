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
var chrtree;
var spike;
var emitter;
var pause_label;
var menu;
var w = 1200, h = 750;
var aim;
var move1;
var move2;
var spikeBall1;
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
    game.load.image('sky', 'source/bgSnow.png');
    game.load.image('menu', 'source/menu.png');
    game.load.spritesheet('chrTree', 'source/christmastree1.png', 114, 114);
    game.load.spritesheet('lava', 'source/lava.png', 300, 69);
    game.load.image('banana','source/ice-cream.png');
    game.load.image('step','source/snow.png');
    game.load.image('step150','source/snow150.png');
    game.load.image('step100','source/snow100.png');
    game.load.image('step70','source/snow70.png');
    game.load.image('thorn','source/obstacle1.png');
    game.load.image('spike','source/axe.png');
    game.load.image('spikeBall','source/axe.png');
    game.load.image('snowLeft', 'source/ice-platform-left.png');
    game.load.image('snowCenter', 'source/ice-platform-center.png');
    game.load.image('snowRight', 'source/ice-platform-right.png');
    game.load.image('coler', 'source/coler.png');
    game.load.spritesheet('wallSpike', 'source/spikesBoard Animate.png', 32, 32);
    game.load.spritesheet('cannon', 'source/cannon (2).png', 124, 124);
    game.load.image('wallspikeleft', 'source/spikesBoardLeft.png');
    game.load.image('bullet', 'source/bomb.png');
    game.load.image('wallspikeright', 'source/spikesBoardRight.png');
    game.load.image('snowSpike', 'source/spikesBottomAlt2.png');
    game.load.spritesheet('minion', 'source/minion2.png', 48, 48)
}
function create(){
    score = 0;

    game.add.tileSprite(0, 0, 1200, 1600, 'sky');
    game.world.setBounds(0, 0, 1200, 1600);

    game.physics.startSystem(Phaser.Physics.ARCADE);


    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;

    bullets.createMultiple(900, 'bullet');
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);
    sprite = game.add.sprite(1170, 670, 'cannon');
    sprite.animations.add('shoot');
    sprite.anchor.set(0.725);
    game.physics.enable(sprite, Phaser.Physics.ARCADE);
    sprite.animations.play('shoot', 15, false);
    game.time.events.loop(Phaser.Timer.SECOND*4, function animate(){sprite.animations.play('shoot', 15, false)}, this);
    aim = game.add.sprite(-150,670,'aim');

    // emitter = game.add.emitter(Math.floor(Math.random()*1300), 0);
    // emitter.makeParticles('spikeBall', [0,1,2], 4, true, true);
    // emitter.minParticleSpeed.setTo(-200, -300);
    // emitter.maxParticleSpeed.setTo(200, -400);
    // emitter.gravity = 150;
    // emitter.bounce.setTo(0.1, 0.1);
    // emitter.angularDrag = 30;
    // emitter.start(false, 10000, Math.floor(Math.random()*(10000-6000) + 6000));


    platforms = game.add.group();
    platforms.enableBody = true;

    lava = game.add.group();
    lava.enableBody = true;

    var ground = platforms.create(-175, game.world.height - 64, 'snowLeft');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(35, game.world.height - 64, 'snowLeft');
    ground.scale.setTo(1,1);
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
    ground = platforms.create(900, game.world.height - 64, 'snowCenter');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(1005, game.world.height - 64, 'snowCenter');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(1300, game.world.height - 64, 'snowCenter');
    ground.scale.setTo(1,1);


    obstacle = game.add.group();
    obstacle.enableBody = true;

    chrtree = game.add.sprite(1100, 1425, 'chrTree');
    chrtree.animations.add('lights');
    chrtree.animations.play('lights', 8, true);

    var wall = obstacle.create(996, 1505,'wallSpike');
    wall.body.immovable = true;
    wall.animations.add('spikeUp');
    wall.animations.play('spikeUp', 8, true);
    wall = obstacle.create(964, 1505,'wallSpike');
    wall.body.immovable = true;
    wall.animations.add('spikeUp');
    wall.animations.play('spikeUp', 8, true);
    wall = obstacle.create(932, 1505,'wallSpike');
    wall.body.immovable = true;
    wall.animations.add('spikeUp');
    wall.animations.play('spikeUp', 8, true);
    wall = obstacle.create(900, 1505,'wallSpike');
    wall.body.immovable = true;
    wall.animations.add('spikeUp');
    wall.animations.play('spikeUp', 8, true);
    wall = obstacle.create(1028, 1505,'wallSpike');
    wall.body.immovable = true;
    wall.animations.add('spikeUp');
    wall.animations.play('spikeUp', 8, true);
    wall = obstacle.create(1060, 1505,'wallSpike');
    wall.body.immovable = true;
    wall.animations.add('spikeUp');
    wall.animations.play('spikeUp', 8, true);
    wall = obstacle.create(542.5, 1160,'wallSpike');
    wall.body.immovable = true;
    wall.animations.add('spikeUp');
    wall.animations.play('spikeUp', 8, true);


    var thorns = obstacle.create(-3, 1188, 'thorn');
    thorns.body.immovable = true;
    thorns = obstacle.create(24, 1188, 'thorn');
    thorns.body.immovable = true;


    move2 = platforms.create(150, 670, 'step150');
    move2.body.immovable = true;
    move2.body.velocity.y = 60;
    move2.body.collideWorldBounds = true;
    move2.body.bounce.set(1);
    game.time.events.loop(Phaser.Timer.SECOND*4, function changeDirection(){move2.body.velocity.y *= (-1);}, this);
    move1 = platforms.create(270, 1350, 'step');
    move1.body.immovable = true;
    move1.body.velocity.x = 80;
    move1.body.collideWorldBounds = true;
    move1.body.bounce.set(1);
    game.time.events.loop(Phaser.Timer.SECOND*3, function changeDirection(){move1.body.velocity.x *= (-1);}, this);
    var ledge = platforms.create(-110, 1430, 'step');
    ledge.body.immovable = true;
    ledge = platforms.create(900, 1300, 'step');
    ledge.body.immovable = true;
    ledge = platforms.create(1120, 1390, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(500, 1190, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(965, 1200, 'step70');
    ledge.body.immovable = true;
    ledge = platforms.create(700, 1100, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(230, 1090, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(0, 1220, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(400, 990, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(450, 850, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(-60, 800, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(700, 940, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(1100, 700, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(1050, 550, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(940, 990, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(1150, 890, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(1050, 550, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(450, 700, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(750, 725, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(0, 580, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(250, 480, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(500, 400, 'step');
    ledge.body.immovable = true;
    ledge = platforms.create(100, 380, 'step70');
    ledge.body.immovable = true;
    ledge = platforms.create(790, 550, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(250, 280, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(0, 190, 'step70');
    ledge.body.immovable = true;
    ledge = platforms.create(200, 100, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(450, 100, 'step70');
    ledge.body.immovable = true;
    ledge = platforms.create(650, 100, 'step70');
    ledge.body.immovable = true;
    ledge = platforms.create(850, 100, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(1130, 190, 'step70');
    ledge.body.immovable = true;
    ledge = platforms.create(880, 280, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(900, 450, 'step70');
    ledge.body.immovable = true;
    ledge = platforms.create(1090, 380, 'step150');
    ledge.body.immovable = true;


    spike = game.add.sprite(600, 240, 'spike');
    spike.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(spike);
    spike.body.immovable = true;


    player = game.add.sprite(88, game.world.height - 150, 'minion');
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
    banana = bananas.create(1150, 1300, 'banana');
    banana.body.gravity.y = 250;
    banana.body.bounce.y = 0.1 + Math.random() * 0.05;
    banana = bananas.create(1150, 720, 'banana');
    banana.body.gravity.y = 250;
    banana.body.bounce.y = 0.1 + Math.random() * 0.05;

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
                    changeLevel('13.html');
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

    soundClick('source/sounds/ahahaha.mp3');
    soundClick('source/sounds/Minion.mp3');

    timerText = game.add.text(1080, 0, 'Time: 90', {fontSize:'32px', fill: '#000'});
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


    player.body.velocity.x = 0;

    spike.angle -= 1;


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

    fire();
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
        setTimeout(changeLevel('14.html'),3000);
    }
}

function updateCounter() {
    if (time == 0) {
        scoreText.text = 'You lose!';
        setTimeout(changeLevel('13.html'),3000);
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
    changeLevel('13.html')
}
function fire() {

    if (game.time.now > nextFire && bullets.countDead() > 0)
    {
        nextFire = game.time.now + fireRate;

        var bullet = bullets.getFirstDead();

        bullet.reset(sprite.x - 8, sprite.y - 8);

        game.physics.arcade.moveToObject(bullet, aim, 300);

        soundClick('source/sounds/cannon.mp3');

    }

}