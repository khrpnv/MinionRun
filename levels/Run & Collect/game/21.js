var game = new Phaser.Game(
    1200,
    600,
    Phaser.AUTO,
    'game',
    {
        preload: preload,
        create: create,
        update: update
    }
);

var time = 60;
var platforms;
var player;
var cursors;
var bananas;
var score;
var pause_label;
var menu;
var w = 1200, h = 600;
var spike;
var part;
var emitter;
var line;
var move1;
var move2;
var move3;
var button;
var bullet;
var spikeBall1;
var spikeBall3;
var spikeBall4;
var spikeBall5;
var machineGun;
var sprite;
var bullets;
var box1;
var counter = 0;
var fireRate = 4000;
var nextFire = 0;
var spikeBall2;
var timerText;
var scoreText;
var lever;
var obstacle;
var itemsAmount = 60;
function preload(){
    game.load.image('sky', 'source/bg21.png');
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
    game.load.image('menu', 'source/menu.png');
    game.load.image('coler', 'source/coler.png');
    game.load.spritesheet('wallSpike', 'source/spikesBoardWave.png', 48, 48);
    game.load.spritesheet('cannon', 'source/cannon (2).png', 124, 124);
    game.load.spritesheet('machineGun', 'source/machinegun1.png', 110, 72);
    game.load.image('wallspikeleft', 'source/spikesBoardLeftMin.png');
    game.load.image('wallspikeright', 'source/spikesBoard.png');
    game.load.image('spiketop', 'source/spikeGroundTrap.png');
    game.load.image('bullet', 'source/bullet.png');
    game.load.image('bomb', 'source/bomb.png');
    game.load.image('wooden', 'source/woodenSpike.png');
    game.load.image('pillarMid', 'source/midPillar.png');
    game.load.image('blade', 'source/blade.png');
    game.load.image('blade2', 'source/blade2.png');
    game.load.image('spikeBall','source/sawBig.png');
    game.load.image('spikeBall2_2','source/sawSmall.png');
    game.load.image('moveDown','source/wallSpike.png');
    game.load.image('3', 'source/3.png');
    game.load.image('line', 'source/line.png');
    game.load.image('lineV', 'source/lineVertical.png');
    game.load.image('wallspikeright', 'source/spikesBoardRight.png');
    game.load.image('box','source/box.png');
    game.load.spritesheet('minion', 'source/minion2.png', 48, 48)
}
function create(){
    score = 0;

    game.add.tileSprite(0, 0, 2400, 600, 'sky');
    game.world.setBounds(0, 0, 2400, 600);


    game.physics.startSystem(Phaser.Physics.ARCADE);

    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;

    bullets.createMultiple(900, 'bomb');
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);
    sprite = game.add.sprite(2350, 520, 'cannon');
    sprite.animations.add('shoot');
    sprite.anchor.set(0.725);
    game.physics.enable(sprite, Phaser.Physics.ARCADE);
    sprite.animations.play('shoot', 15, false);
    game.time.events.loop(Phaser.Timer.SECOND*4, function animate(){sprite.animations.play('shoot', 15, false)}, this);
    aim = game.add.sprite(-150,520,'aim');


    platforms = game.add.group();
    platforms.enableBody = true;

    var ground = platforms.create(-40, game.world.height - 50, 'sand');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(216, game.world.height - 50, 'sand');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(600, game.world.height - 50, 'sand');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(856, game.world.height - 50, 'sand');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(1240, game.world.height - 50, 'sand');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(1624, game.world.height - 50, 'sand');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(2008, game.world.height - 50, 'sand');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(2392, game.world.height - 50, 'sand');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;

    obstacle = game.add.group();
    obstacle.enableBody = true;

    var wall = obstacle.create(145, 215,'wallspikeleft');
    wall.body.immovable = true;
    wall = obstacle.create(512, 125,'wallspikeright');
    wall.body.immovable = true;
    wall = obstacle.create(2267, 460,'wallspikeright');
    wall.body.immovable = true;

    move1 = platforms.create(300, 350, 'step150');
    move1.body.immovable = true;
    move1.body.collideWorldBounds = true;
    move1.body.bounce.set(1);

    move2 = platforms.create(800, -420, 'moveDown');
    move2.body.immovable = true;
    move2.body.velocity.y = 150;
    move2.body.bounce.set(1);
    game.time.events.loop(Phaser.Timer.SECOND*2.5, function(){move2.body.velocity.y *= -1;}, this);

    move3 = game.add.sprite(1600, -50, 'moveDown');
    move3.name = 'moveDown';
    game.physics.enable(move3, Phaser.Physics.ARCADE);

    vanish = game.add.sprite(2100, 400, 'step100');
    game.physics.enable(vanish, Phaser.Physics.ARCADE);
    vanish.body.immovable = true;
    vanish.enableBody = true;
    vanish.body.velocity.x = -70;
    vanish.body.velocity.y = -70;
    vanish.body.collideWorldBounds = true;
    vanish.body.bounce.set(1);
    game.time.events.loop(Phaser.Timer.SECOND*3, function changeDirection(){vanish.body.velocity.x *= (-1); vanish.body.velocity.y *= (-1);}, this);

    var ledge = platforms.create(0, 445, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(2250, 333, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(1050, 140, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(1200, 245, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(50, 215, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(550, 125, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(650, 250, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(-50, 100, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(700, 400, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(1300, 450, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(1100, 350, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(1500, 350, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(1400, 120, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(1850, 450, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(2050, 140, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(1850, 80, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(2300, 100, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(2300, 460, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(1850, 270, 'step100');
    ledge.body.immovable = true;

    lever = game.add.sprite(350, 305, 'lever');
    game.physics.enable(lever, Phaser.Physics.ARCADE);
    lever.body.immovable = true;
    lever.enableBody = true;
    lever.body.setSize(47, 39, 0, 10);
    lever.animations.add('pull',[1,2], 12, false);
    lever.animations.add('return',[4,5,6], 12, false);

    box1 = game.add.sprite(1100,70, 'box');
    game.physics.enable(box1, Phaser.Physics.ARCADE);
    box1.body.bounce.y = 0.2;
    box1.body.gravity.y = 600;
    box1.body.collideWorldBounds = true;

    button = game.add.sprite(1100, 305, 'switch');
    game.physics.enable(button, Phaser.Physics.ARCADE);
    button.body.immovable = true;
    button.enableBody = true;
    button.body.setSize(46, 17, 0, 30);
    button.animations.add('pull',[0,1,2], 12, false);
    button.animations.add('return',[4], 12, false);
    button.animations.play('pull');

    spikeBall1 = game.add.sprite(-12, 50, 'spikeBall1');
    game.physics.arcade.enable(spikeBall1);
    spikeBall1.anchor.setTo(0.5, 0.5);
    spikeBall1.body.velocity.y = 100;
    spikeBall1.body.immovable = true;
    game.time.events.loop(Phaser.Timer.SECOND*4.3, function(){spikeBall1.body.velocity.y *= -1;}, this);

    spikeBall2 = game.add.sprite(170, 0, 'spikeBall3');
    spikeBall2.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(spikeBall2);
    spikeBall2.body.velocity.x = 100;
    spikeBall2.body.immovable = true;
    game.time.events.loop(Phaser.Timer.SECOND*5.2, function(){spikeBall2.body.velocity.x *= -1;}, this);

    spikeBall3 = game.add.sprite(1100, 0, 'spikeBall2');
    spikeBall3.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(spikeBall3);
    spikeBall3.body.velocity.x = 150;
    spikeBall2.body.immovable = true;
    game.time.events.loop(Phaser.Timer.SECOND*3, function(){spikeBall3.body.velocity.x *= -1;}, this);

    spikeBall4 = game.add.sprite(1900, 0, 'spikeBall1');
    spikeBall4.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(spikeBall4);
    spikeBall4.body.velocity.x = 200;
    spikeBall4.body.immovable = true;
    game.time.events.loop(Phaser.Timer.SECOND*2.5, function(){spikeBall4.body.velocity.x *= -1;}, this);

    spikeBall5 = game.add.sprite(2415, 50, 'spikeBall3');
    game.physics.arcade.enable(spikeBall5);
    spikeBall5.anchor.setTo(0.5, 0.5);
    spikeBall5.body.velocity.y = 100;
    spikeBall5.body.immovable = true;
    game.time.events.loop(Phaser.Timer.SECOND*4.3, function(){spikeBall5.body.velocity.y *= -1;}, this);

    player = game.add.sprite(100, game.world.height - 150, 'minion');
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
        if (i !== 25 && i !== 45 && i !== 50 && i !== 49) {
            var banana = bananas.create(i * 40, 0, 'banana');
            banana.body.gravity.y = 250;
            banana.body.bounce.y = 0.05 + Math.random() * 0.01;
        }
    }
    banana = bananas.create(700, 350, 'banana');
    banana.body.gravity.y = 250;
    banana.body.bounce.y = 0.05 + Math.random() * 0.01;
    banana = bananas.create(2370, 200, 'banana');
    banana.body.gravity.y = 250;
    banana.body.bounce.y = 0.05 + Math.random() * 0.01;
    banana = bananas.create(2300, 200, 'banana');
    banana.body.gravity.y = 250;
    banana.body.bounce.y = 0.05 + Math.random() * 0.01;
    banana = bananas.create(2340, 200, 'banana');
    banana.body.gravity.y = 250;
    banana.body.bounce.y = 0.05 + Math.random() * 0.01;
    banana = bananas.create(2350, 400, 'banana');
    banana.body.gravity.y = 250;
    banana.body.bounce.y = 0.05 + Math.random() * 0.01;
    banana = bananas.create(1850, 200, 'banana');
    banana.body.gravity.y = 250;
    banana.body.bounce.y = 0.05 + Math.random() * 0.01;

    soundClick('source/sounds/bapa.mp3');
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
                    changeLevel('21.html');
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

    timerText = game.add.text(1070, 0, 'Time: 60', {fontSize:'32px', fill: '#000'});
    timerText.fixedToCamera = true;
    scoreText = game.add.text(0,0, 'Score: 0', {fontSize:'32px', fill: '#000'});
    scoreText.fixedToCamera = true;
    game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);

    cursors = game.input.keyboard.createCursorKeys();
    game.world.camera.height = 600;
    game.camera.follow(player);
}
function update() {
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(player, box1, function boxStop(){box1.body.velocity.x = 0},null, this);
    game.physics.arcade.collide(move3, platforms, function moveStop(){move3.body.velocity.y = 0},null, this);
    game.physics.arcade.collide(box1, platforms);
    game.physics.arcade.collide(player, lever);
    game.physics.arcade.collide(bananas, platforms);
    game.physics.arcade.collide(bananas, vanish);
    game.physics.arcade.collide(bananas, button);
    game.physics.arcade.collide(bananas, lever);
    game.physics.arcade.collide(bananas, obstacle);
    game.physics.arcade.collide(player, vanish, platformVanish, null, this);
    game.physics.arcade.collide(player, obstacle, touchObstacle, null, this);
    game.physics.arcade.collide(player, bullets, touchObstacle, null, this);
    game.physics.arcade.collide(player, spikeBall1, touchObstacle, null, this);
    game.physics.arcade.collide(player, spikeBall2, touchObstacle, null, this);
    game.physics.arcade.collide(player, spikeBall3, touchObstacle, null, this);
    game.physics.arcade.collide(player, spikeBall4, touchObstacle, null, this);
    game.physics.arcade.collide(box1, bullets, killBullets, null, this);
    game.physics.arcade.collide(button, bullets, killBullets, null, this);
    game.physics.arcade.collide(player, bullets, killBullets, null, this);
    game.physics.arcade.collide(player, move2, touchObstacle, null, this);
    game.physics.arcade.collide(player, move3, touchObstacle, null, this);
    game.physics.arcade.overlap(player, bananas, collectStar, null, this);

    player.body.velocity.x = 0;

    if (game.physics.arcade.collide(player, button) && button.body.touching.up || game.physics.arcade.collide(box1, button) && button.body.touching.up){
        buttonActions();
        counter++;
    }
    else if (counter > 0) {
        move3.body.velocity.y = 500;
        button.animations.play('pull');
    }

    spikeBall1.angle += 5;
    spikeBall2.angle += 5;
    spikeBall3.angle += 5;
    spikeBall4.angle += 5;
    spikeBall5.angle += 5;

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

    fire();
}
function changeLevel(str){
    document.location.href=str;
}


function collectStar (player, banana) {
    banana.kill();
    score+=10;
    scoreText.text = 'Score: ' + score;
    if (score === ((itemsAmount + 2)* 10)){
        scoreText.text = 'You win!';
        setTimeout(changeLevel('22.html'),3000);
    }
}

function updateCounter() {
    if (time == 0) {
        scoreText.text = 'You lose!';
        setTimeout(changeLevel('21.html'),3000);
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
    changeLevel('21.html')
}


function movePlatform(){
    lever.animations.play('pull');
    game.time.events.add(Phaser.Timer.SECOND*6, function(){lever.animations.play('return');}, this);
    move1.body.velocity.y = -80;
    lever.body.velocity.y = -80;
    game.time.events.add(Phaser.Timer.SECOND*6, function(){move1.body.velocity.y = 0;}, this);
    game.time.events.add(Phaser.Timer.SECOND*6, function(){lever.body.velocity.y = 0;}, this);
    game.time.events.add(Phaser.Timer.SECOND*3, function(){move1.body.velocity.y = 80;}, this);
    game.time.events.add(Phaser.Timer.SECOND*3, function(){lever.body.velocity.y = 80;}, this);

}

function buttonActions(){
    button.animations.play('return');
    move3.body.velocity.y = -100;
}

function fire() {

    if (game.time.now > nextFire && bullets.countDead() > 0)
    {
        nextFire = game.time.now + fireRate;

        bullet = bullets.getFirstDead();

        bullet.reset(sprite.x - 8, sprite.y - 8);

        game.physics.arcade.moveToObject(bullet, aim, 300);

        soundClick('source/sounds/cannon.mp3');

    }

}

function  killBullets() {
    bullet.kill();
}

function platformVanish(){
    game.time.events.loop(Phaser.Timer.SECOND*12, function(){vanish.kill();}, this);
}