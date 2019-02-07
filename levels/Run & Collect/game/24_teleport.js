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
var bridge;
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
    game.load.image('sky', 'source/bg24_2.jpg');
    game.load.image('menu', 'source/menu.png');
    game.load.spritesheet('chrTree', 'source/christmastree1.png', 114, 114);
    game.load.spritesheet('lava', 'source/lava.png', 300, 69);
    game.load.image('banana','source/strawberry.png');
    game.load.spritesheet('trampoline','source/spring.png', 64, 46);
    game.load.spritesheet('lever','source/laserSwitch.png', 48, 48);
    game.load.spritesheet('switch','source/switchGreen.png', 48, 48);
    game.load.image('sand','source/grass.png');
    game.load.image('grass150','source/grass150.png');
    game.load.image('grass100','source/grass100.png');
    game.load.image('grass100(2)','source/grass100(2).png');
    game.load.image('grass150(2)','source/grass150(2).png');
    game.load.image('grassMid','source/grassPart.png');
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
    game.load.image('tree', 'source/tree.png');
    game.load.image('snowRight', 'source/ice-platform-right.png');
    game.load.image('bridge', 'source/bridge1.png');
    game.load.image('bridgeFront', 'source/bridge2.png');
    game.load.image('bush', 'source/green.png');
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
    game.load.image('pillarMid', 'source/midPillar.png');
    game.load.image('smallTree', 'source/smalltree.png');
    game.load.image('sea1', 'source/water2_transp.png');
    game.load.image('sea2', 'source/water1_transp.png');
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
    game.load.image('ladder','source/ladder.png');
    game.load.spritesheet('rain', 'source/rain.png', 17, 17);
    game.load.spritesheet('minion', 'source/minion with climb.png', 48, 48)
}
function create(){
    score = 0;

    game.add.tileSprite(0, 0, 1920, 977, 'sky');
    game.world.setBounds(0, 0, 1920, 977);


    game.physics.startSystem(Phaser.Physics.ARCADE);

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

    game.add.sprite(210, 120, 'tree');
    game.add.sprite(685, -2, 'smallTree');
    game.add.sprite(1205, -2, 'smallTree');
    game.add.sprite(1565, 514, 'bush');

    var section = ladder.create(298, 674, 'ladder');
    section.body.immovable = true;
    section = ladder.create(298, 716, 'ladder');
    section.body.immovable = true;
    section = ladder.create(298, 758, 'ladder');
    section.body.immovable = true;
    section = ladder.create(298, 800, 'ladder');
    section.body.immovable = true;
    section = ladder.create(298, 842, 'ladder');
    section.body.immovable = true;
    section = ladder.create(146, 560, 'ladder');
    section.body.immovable = true;
    section = ladder.create(146, 602, 'ladder');
    section.body.immovable = true;
    section = ladder.create(146, 630, 'ladder');
    section.body.immovable = true;
    section = ladder.create(428, 560, 'ladder');
    section.body.immovable = true;
    section = ladder.create(428, 602, 'ladder');
    section.body.immovable = true;
    section = ladder.create(428, 630, 'ladder');
    section.body.immovable = true;
    section = ladder.create(-3, 403, 'ladder');
    section.body.immovable = true;
    section = ladder.create(-3, 431, 'ladder');
    section.body.immovable = true;
    section = ladder.create(-3, 473, 'ladder');
    section.body.immovable = true;
    section = ladder.create(-3, 515, 'ladder');
    section.body.immovable = true;
    section = ladder.create(575, 403, 'ladder');
    section.body.immovable = true;
    section = ladder.create(575, 431, 'ladder');
    section.body.immovable = true;
    section = ladder.create(575, 473, 'ladder');
    section.body.immovable = true;
    section = ladder.create(575, 515, 'ladder');
    section.body.immovable = true;
    section = ladder.create(778, 740, 'ladder');
    section.body.immovable = true;
    section = ladder.create(778, 783, 'ladder');
    section.body.immovable = true;
    section = ladder.create(778, 827, 'ladder');
    section.body.immovable = true;
    section = ladder.create(778, 842, 'ladder');
    section.body.immovable = true;
    section = ladder.create(1187, 740, 'ladder');
    section.body.immovable = true;
    section = ladder.create(1187, 783, 'ladder');
    section.body.immovable = true;
    section = ladder.create(1187, 827, 'ladder');
    section.body.immovable = true;
    section = ladder.create(1187, 842, 'ladder');
    section.body.immovable = true;
    section = ladder.create(833, 595, 'ladder');
    section.body.immovable = true;
    section = ladder.create(833, 637, 'ladder');
    section.body.immovable = true;
    section = ladder.create(833, 679, 'ladder');
    section.body.immovable = true;
    section = ladder.create(833, 694, 'ladder');
    section.body.immovable = true;
    section = ladder.create(1132, 595, 'ladder');
    section.body.immovable = true;
    section = ladder.create(1132, 637, 'ladder');
    section.body.immovable = true;
    section = ladder.create(1132, 679, 'ladder');
    section.body.immovable = true;
    section = ladder.create(1132, 694, 'ladder');
    section.body.immovable = true;
    section = ladder.create(880, 348, 'ladder');
    section.body.immovable = true;
    section = ladder.create(880, 390, 'ladder');
    section.body.immovable = true;
    section = ladder.create(880, 432, 'ladder');
    section.body.immovable = true;
    section = ladder.create(880, 474, 'ladder');
    section.body.immovable = true;
    section = ladder.create(880, 516, 'ladder');
    section.body.immovable = true;
    section = ladder.create(880, 543, 'ladder');
    section.body.immovable = true;
    section = ladder.create(1075, 348, 'ladder');
    section.body.immovable = true;
    section = ladder.create(1075, 390, 'ladder');
    section.body.immovable = true;
    section = ladder.create(1075, 432, 'ladder');
    section.body.immovable = true;
    section = ladder.create(1075, 474, 'ladder');
    section.body.immovable = true;
    section = ladder.create(1075, 516, 'ladder');
    section.body.immovable = true;
    section = ladder.create(1075, 543, 'ladder');
    section.body.immovable = true;
    section = ladder.create(1870, 760, 'ladder');
    section.body.immovable = true;
    section = ladder.create(1870, 802, 'ladder');
    section.body.immovable = true;
    section = ladder.create(1870, 844, 'ladder');
    section.body.immovable = true;
    section = ladder.create(1510, 590, 'ladder');
    section.body.immovable = true;
    section = ladder.create(1510, 632, 'ladder');
    section.body.immovable = true;
    section = ladder.create(1510, 674, 'ladder');
    section.body.immovable = true;
    section = ladder.create(1510, 716, 'ladder');
    section.body.immovable = true;
    section = ladder.create(1660, 446, 'ladder');
    section.body.immovable = true;
    section = ladder.create(1660, 486, 'ladder');
    section.body.immovable = true;
    section = ladder.create(1660, 528, 'ladder');
    section.body.immovable = true;
    section = ladder.create(1660, 544, 'ladder');
    section.body.immovable = true;

    obstacle = game.add.group();
    obstacle.enableBody = true;

    var ledge = platforms.create(150, 685, 'grass150(2)');
    ledge.body.immovable = true;
    ledge = platforms.create(353, 685, 'grass150(2)');
    ledge.body.immovable = true;
    ledge = platforms.create(480, 570, 'grass150');
    ledge.body.immovable = true;
    ledge = platforms.create(0, 570, 'grass150');
    ledge.body.immovable = true;
    ledge = platforms.create(50, 415, 'grass100');
    ledge.body.immovable = true;
    ledge = platforms.create(480, 415, 'grass100');
    ledge.body.immovable = true;
    ledge = platforms.create(245, 315, 'grass150');
    ledge.body.immovable = true;
    ledge = platforms.create(830, 750, 'grass150(2)');
    ledge.body.immovable = true;
    ledge = platforms.create(1040, 750, 'grass150(2)');
    ledge.body.immovable = true;
    ledge = platforms.create(950, 750, 'grassMid');
    ledge.body.immovable = true;
    ledge = platforms.create(885, 600, 'grass150(2)');
    ledge.body.immovable = true;
    ledge = platforms.create(986, 600, 'grass150(2)');
    ledge.body.immovable = true;
    ledge = platforms.create(950, 600, 'grassMid');
    ledge.body.immovable = true;
    ledge = platforms.create(930, 358, 'grass150');
    ledge.body.immovable = true;
    ledge = platforms.create(700, 258, 'grass100');
    ledge.body.immovable = true;
    ledge = platforms.create(1220, 258, 'grass100');
    ledge.body.immovable = true;
    ledge = platforms.create(1720, 770, 'grass150(2)');
    ledge.body.immovable = true;
    ledge = platforms.create(1485, 770, 'grass100(2)');
    ledge.body.immovable = true;
    ledge = platforms.create(1560, 600, 'grass150');
    ledge.body.immovable = true;
    ledge = platforms.create(1710, 450, 'grass150');
    ledge.body.immovable = true;
    ledge = platforms.create(1510, 350, 'grass100');
    ledge.body.immovable = true;
    ledge = platforms.create(1730, 250, 'grass100');
    ledge.body.immovable = true;
    ledge = platforms.create(1600, 150, 'grass100');
    ledge.body.immovable = true;
    ledge = platforms.create(120, 220, 'grass100');
    ledge.body.immovable = true;
    ledge = platforms.create(420, 220, 'grass100');
    ledge.body.immovable = true;
    ledge = platforms.create(955, 170, 'grass100');
    ledge.body.immovable = true;

    bridge = game.add.sprite(1565, 730, 'bridge');
    game.physics.arcade.enable(bridge);
    bridge.body.immovable = true;
    bridge.body.setSize(170,10,0,44);


    player = game.add.sprite(1800,game.world.height - 150, 'minion');
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.2;
    player.body.collideWorldBounds = true;
    player.body.gravity.y = 300;
    player.animations.add('top',[11,12,13,14,15,16,17], 10, true);
    player.animations.add('right',[5,6,7,8], 10, true);
    player.animations.add('up',[9,10], 15, true);
    player.animations.add('left',[0,1,2,3], 10, true);

    game.add.sprite(900, 405, 'tree');

    bananas = game.add.group();
    bananas.enableBody = true;
    for (var i = 0; i < itemsAmount; i++) {
        var banana = bananas.create(i * 45, 0, 'banana');
        banana.body.gravity.y = 250;
        banana.body.bounce.y = 0.05 + Math.random() * 0.01;
    }
    banana = bananas.create(900, 700, 'banana');
    banana.body.gravity.y = 250;
    banana.body.bounce.y = 0.05 + Math.random() * 0.01;
    banana = bananas.create(1000, 700, 'banana');
    banana.body.gravity.y = 250;
    banana.body.bounce.y = 0.05 + Math.random() * 0.01;
    banana = bananas.create(1100, 700, 'banana');
    banana.body.gravity.y = 250;
    banana.body.bounce.y = 0.05 + Math.random() * 0.01;

    soundClick(sounds[index]);
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
                    changeLevel('24.html');
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

    timerText = game.add.text(1070, 0, 'Time: 180', {fontSize:'32px', fill: '#000'});
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
    game.physics.arcade.collide(player, bridge);
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
    if (score === (itemsAmount + 3)*10){
        scoreText.text = 'You win!';
        setTimeout(changeLevel('25.html'),3000);
    }
}

function updateCounter() {
    if (time == 0) {
        scoreText.text = 'You lose!';
        setTimeout(changeLevel('24.html'),3000);
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
    changeLevel('24.html')
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
    // game.debug.body(bridge);
}