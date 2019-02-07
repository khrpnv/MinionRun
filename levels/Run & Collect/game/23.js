var game = new Phaser.Game(
    1200,
    750,
    Phaser.AUTO,
    'game',
    {
        preload: preload,
        create: create,
        update: update,
        render: render
    }
);

var time = 70;
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
var laser;
var button;
var bullet;
var spikeBall1;
var spikeBall3;
var spikeBall4;
var teleport;
var trampoline1;
var machineGun;
var sprite;
var telCounter = 0;
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
var sounds = ['source/sounds/minion_elo.mp3','source/sounds/bapa.mp3','source/sounds/laugh.mp3','source/sounds/Minion Ahahaha Sound Effect.mp3','source/sounds/minion_ojojojoj.mp3','source/sounds/tadaaa.mp3','source/sounds/Minion Hehehe Sound Effect.mp3'];
var index = Math.floor(Math.random()*sounds.length);
var itemsAmount = 43;
var ladder;
function preload(){
    game.load.image('sky', 'source/bg23_1.png');
    game.load.spritesheet('chrTree', 'source/christmastree1.png', 114, 114);
    game.load.spritesheet('lava', 'source/lava.png', 300, 69);
    game.load.image('banana','source/strawberry.png');
    game.load.spritesheet('trampoline','source/spring.png', 64, 46);
    game.load.spritesheet('lever','source/laserSwitch.png', 48, 48);
    game.load.spritesheet('switch','source/switchGreen.png', 48, 48);
    game.load.image('sand','source/jungleMain.png');
    game.load.image('jungle150','source/jungle.png');
    game.load.image('jungle100','source/jungle100.png');
    game.load.image('jungle100(2)','source/jungle100(2).png');
    game.load.image('jungleBlock','source/jungleBlock.png');
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
    game.load.image('ladder','source/ladder.png');
    game.load.spritesheet('rain', 'source/rain.png', 17, 17);
    game.load.spritesheet('minion', 'source/minion with climb.png', 48, 48)
}
function create(){
    score = 0;

    game.add.tileSprite(0, 0, 1920, 1080, 'sky');
    game.world.setBounds(0, 0, 1920, 1080);


    game.physics.startSystem(Phaser.Physics.ARCADE);

    var emitter = game.add.emitter(game.world.centerX, 0, 400);

    emitter.width = game.world.width;
    emitter.makeParticles('rain');
    emitter.minParticleScale = 0.1;
    emitter.maxParticleScale = 0.5;
    emitter.setYSpeed(300, 500);
    emitter.setXSpeed(-5, 5);
    emitter.minRotation = 0;
    emitter.maxRotation = 0;
    emitter.start(false, 1600, 5, 0);

    platforms = game.add.group();
    platforms.enableBody = true;

    var ground = platforms.create(0, game.world.height - 80, 'sand');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(300, game.world.height - 80, 'sand');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(600, game.world.height - 80, 'sand');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(900, game.world.height - 80, 'sand');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(1200, game.world.height - 80, 'sand');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(1400, game.world.height - 80, 'sand');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(1700, game.world.height - 80, 'sand');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(2000, game.world.height - 80, 'sand');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;

    ladder = game.add.group();
    ladder.enableBody = true;

    var section = ladder.create(643, 775, 'ladder');
    section.body.immovable = true;
    section = ladder.create(643, 817, 'ladder');
    section.body.immovable = true;
    section = ladder.create(643, 859, 'ladder');
    section.body.immovable = true;
    section = ladder.create(643, 903, 'ladder');
    section.body.immovable = true;
    section = ladder.create(643, 945, 'ladder');
    section.body.immovable = true;
    section = ladder.create(1250, 775, 'ladder');
    section.body.immovable = true;
    section = ladder.create(1250, 817, 'ladder');
    section.body.immovable = true;
    section = ladder.create(1250, 859, 'ladder');
    section.body.immovable = true;
    section = ladder.create(1250, 903, 'ladder');
    section.body.immovable = true;
    section = ladder.create(1250, 945, 'ladder');
    section.body.immovable = true;
    section = ladder.create(790, 435, 'ladder');
    section.body.immovable = true;
    section = ladder.create(790, 477, 'ladder');
    section.body.immovable = true;
    section = ladder.create(790, 519, 'ladder');
    section.body.immovable = true;
    section = ladder.create(790, 561, 'ladder');
    section.body.immovable = true;
    section = ladder.create(790, 603, 'ladder');
    section.body.immovable = true;
    section = ladder.create(790, 645, 'ladder');
    section.body.immovable = true;
    section = ladder.create(1113, 435, 'ladder');
    section.body.immovable = true;
    section = ladder.create(1113, 477, 'ladder');
    section.body.immovable = true;
    section = ladder.create(1113, 519, 'ladder');
    section.body.immovable = true;
    section = ladder.create(1113, 561, 'ladder');
    section.body.immovable = true;
    section = ladder.create(1113, 603, 'ladder');
    section.body.immovable = true;
    section = ladder.create(1113, 645, 'ladder');
    section.body.immovable = true;
    section = ladder.create(90, 285, 'ladder');
    section.body.immovable = true;
    section = ladder.create(90, 327, 'ladder');
    section.body.immovable = true;
    section = ladder.create(90, 369, 'ladder');
    section.body.immovable = true;
    section = ladder.create(90, 411, 'ladder');
    section.body.immovable = true;
    section = ladder.create(90, 453, 'ladder');
    section.body.immovable = true;
    section = ladder.create(90, 495, 'ladder');
    section.body.immovable = true;
    section = ladder.create(90, 537, 'ladder');
    section.body.immovable = true;
    section = ladder.create(90, 550, 'ladder');
    section.body.immovable = true;
    section = ladder.create(1772, 285, 'ladder');
    section.body.immovable = true;
    section = ladder.create(1772, 327, 'ladder');
    section.body.immovable = true;
    section = ladder.create(1772, 369, 'ladder');
    section.body.immovable = true;
    section = ladder.create(1772, 411, 'ladder');
    section.body.immovable = true;
    section = ladder.create(1772, 453, 'ladder');
    section.body.immovable = true;
    section = ladder.create(1772, 495, 'ladder');
    section.body.immovable = true;
    section = ladder.create(1772, 537, 'ladder');
    section.body.immovable = true;
    section = ladder.create(1772, 550, 'ladder');
    section.body.immovable = true;

    obstacle = game.add.group();
    obstacle.enableBody = true;

    var ledge = platforms.create(250, 700, 'jungle150');
    ledge.body.immovable = true;
    ledge = platforms.create(0, 800, 'jungle100(2)');
    ledge.body.immovable = true;
    ledge = platforms.create(550, 798, 'jungle100(2)');
    ledge.body.immovable = true;
    ledge.body.setSize(100,38,-2,0);
    ledge = platforms.create(790, 700, 'jungle100(2)');
    ledge.body.immovable = true;
    ledge = platforms.create(1067, 700, 'jungle100(2)');
    ledge.body.immovable = true;
    ledge = platforms.create(1300, 798, 'jungle100(2)');
    ledge.body.immovable = true;
    ledge = platforms.create(1530, 700, 'jungle150');
    ledge.body.immovable = true;
    ledge = platforms.create(1820, 800, 'jungle100(2)');
    ledge.body.immovable = true;
    ledge = platforms.create(900, 600, 'jungle150');
    ledge.body.immovable = true;
    ledge = platforms.create(700, 450, 'jungle100');
    ledge.body.immovable = true;
    ledge = platforms.create(1160, 450, 'jungle100');
    ledge.body.immovable = true;
    ledge = platforms.create(450, 350, 'jungle100(2)');
    ledge.body.immovable = true;
    ledge = platforms.create(1400, 350, 'jungle100(2)');
    ledge.body.immovable = true;
    ledge = platforms.create(0, 605, 'jungle150');
    ledge.body.immovable = true;
    ledge = platforms.create(0, 300, 'jungle100');
    ledge.body.immovable = true;
    ledge = platforms.create(1770, 605, 'jungle150');
    ledge.body.immovable = true;
    ledge = platforms.create(1820, 300, 'jungle100');
    ledge.body.immovable = true;
    ledge = platforms.create(1550, 200, 'jungle100');
    ledge.body.immovable = true;
    ledge = platforms.create(1700, 100, 'jungle100');
    ledge.body.immovable = true;
    ledge = platforms.create(1250, 200, 'jungle100');
    ledge.body.immovable = true;
    ledge = platforms.create(1100, 100, 'jungle100');
    ledge.body.immovable = true;
    ledge = platforms.create(630, 200, 'jungle100');
    ledge.body.immovable = true;
    ledge = platforms.create(280, 200, 'jungle100');
    ledge.body.immovable = true;
    ledge = platforms.create(130, 100, 'jungle100');
    ledge.body.immovable = true;
    ledge = platforms.create(780, 100, 'jungle100');
    ledge.body.immovable = true;

    player = game.add.sprite(100,game.world.height -150, 'minion');
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.2;
    player.body.collideWorldBounds = true;
    player.body.gravity.y = 300;
    player.animations.add('top',[11,12,13,14,15,16,17], 10, true);
    player.animations.add('right',[5,6,7,8], 10, true);
    player.animations.add('up',[9,10], 15, true);
    player.animations.add('left',[0,1,2,3], 10, true);

    teleport = game.add.sprite(905, 465, 'teleport');
    game.physics.arcade.enable(teleport);
    teleport.body.immovable = true;
    teleport.body.setSize(80, 30, 35, 110);
    teleport.animations.add('static',[0,1,2], 10, true);
    teleport.animations.add('teleport',[3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21], 10, false);
    teleport.animations.play('static');


    bananas = game.add.group();
    bananas.enableBody = true;
    for (var i = 0; i < itemsAmount; i++) {
            var banana = bananas.create(i * 45, 0, 'banana');
            banana.body.gravity.y = 250;
            banana.body.bounce.y = 0.05 + Math.random() * 0.01;
    }
    banana = bananas.create(50, 700, 'banana');
    banana.body.gravity.y = 250;
    banana.body.bounce.y = 0.05 + Math.random() * 0.01;
    banana = bananas.create(1870, 700, 'banana');
    banana.body.gravity.y = 250;
    banana.body.bounce.y = 0.05 + Math.random() * 0.01;
    banana = bananas.create(700, 400, 'banana');
    banana.body.gravity.y = 250;
    banana.body.bounce.y = 0.05 + Math.random() * 0.01;

    soundClick(sounds[index]);
    soundClick('source/sounds/Minion Rush.mp3');

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
                    changeLevel('23.html');
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

    timerText = game.add.text(1070, 0, 'Time: 180', {fontSize:'32px', fill: '#FFDC52'});
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
    game.physics.arcade.collide(player, teleport);
    game.physics.arcade.collide(bananas, platforms);
    game.physics.arcade.collide(bananas, teleport);
    game.physics.arcade.collide(bananas, obstacle);
    game.physics.arcade.collide(player, obstacle, touchObstacle, null, this);
    game.physics.arcade.overlap(player, laser, touchObstacle, null, this);
    game.physics.arcade.collide(player, bullets, touchObstacle, null, this);
    game.physics.arcade.overlap(player, bananas, collectStar, null, this);

    player.body.velocity.x = 0;

    if (cursors.left.isDown) {
        player.body.velocity.x = -150;
        player.animations.play('left');
    }
    else if (cursors.right.isDown) {
        player.body.velocity.x = 150;
        player.animations.play('right');
    }
    else if (game.physics.arcade.overlap(player, ladder) && cursors.up.isDown){
        player.animations.play('top');
        player.body.velocity.y = -50;
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
        soundClick('source/sounds/teleport.mp3');
        telCounter++;
        game.time.events.add(Phaser.Timer.SECOND*0.8, function(){player.kill();}, this);
        game.time.events.add(Phaser.Timer.SECOND*1, function(){changeLevel('23_teleport.html')}, this);

    }
}
function changeLevel(str){
    document.location.href=str;
}


function collectStar (player, banana) {
    banana.kill();
    score+=10;
    scoreText.text = 'Score: ' + score;
    if (score === (itemsAmount + 3) && telCounter > 0){
        scoreText.text = 'You win!';
        setTimeout(changeLevel('24.html'),3000);
    }
}

function updateCounter() {
    if (time == 0) {
        scoreText.text = 'You lose!';
        setTimeout(changeLevel('23.html'),3000);
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
    changeLevel('23.html')
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

function bouncing1(){
    trampoline1.animations.play('jump', 30, false);
    player.body.velocity.y = -350;
    soundClick('source/sounds/spring.mp3');
}

function render() {
    // game.debug.body(pillar);
}