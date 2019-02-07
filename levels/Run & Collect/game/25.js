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
var enemy;
var platforms;
var player;
var cursors;
var bananas;
var enemy2;
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
var enemy3;
var counter = 0;
var fireRate = 3000;
var nextFire = 0;
var spikeBall2;
var pause_label;
var menu;
var w = 1200, h = 750;
var timerText;
var scoreText;
var lever;
var obstacle;
var sounds = ['source/sounds/minion_elo.mp3','source/sounds/bapa.mp3','source/sounds/laugh.mp3','source/sounds/Minion Ahahaha Sound Effect.mp3','source/sounds/minion_ojojojoj.mp3','source/sounds/tadaaa.mp3','source/sounds/Minion Hehehe Sound Effect.mp3'];
var index = Math.floor(Math.random()*sounds.length);
var itemsAmount = 43;
var ladder;
function preload(){
    game.load.image('sky', 'source/bg25.png');
    game.load.image('banana','source/pear.png');
    game.load.image('menu', 'source/menu.png');
    game.load.image('thorn','source/obstacle1.png');
    game.load.image('mid-grass','source/25-mid.png');
    game.load.image('step100','source/platform25-100.png');
    game.load.image('step150','source/platform25-150.png');
    game.load.image('mid-grass-down','source/25-mid-down.png');
    game.load.image('right-grass','source/25-right.png');
    game.load.image('left-grass','source/25-left.png');
    game.load.image('down-grass','source/25-grass.png');
    game.load.image('down-ground','source/25-right-d.png');
    game.load.image('down-ground2','source/25-gr.png');
    game.load.image('down-grass2','source/25-right-up.png');
    game.load.image('spike','source/steelSpike.png');
    game.load.image('topspike','source/topSpike.png');
    game.load.image('right-grass-down','source/25-right-down.png');
    game.load.image('left-grass-down','source/25-left-down.png');
    game.load.image('spikeBall1','source/obstacle4.png');
    game.load.image('spikeBall2','source/obstacle5.png');
    game.load.image('spikeBall3','source/obstacle8.png');
    game.load.image('tree', 'source/tree.png');
    game.load.image('smallTree', 'source/smalltree.png');
    game.load.image('bridge', 'source/bridge1.png');
    game.load.image('bridgeFront', 'source/bridge2.png');
    game.load.spritesheet('trampoline','source/spring.png', 64, 46);
    game.load.spritesheet('teleport', 'source/teleport.png', 150, 150);
    game.load.image('water1', 'source/water.png');
    game.load.image('water2', 'source/water2.png');
    game.load.image('ladder','source/ladder2.png');
    game.load.image('sign','source/signRight.png');
    game.load.spritesheet('minion', 'source/minion with climb.png', 48, 48);
    game.load.spritesheet('mummy', 'source/mumy.png', 72, 87);
    game.load.spritesheet('blobMan', 'source/blob minion walk.png', 72, 72);
    game.load.spritesheet('badTree', 'source/enemyTree.png', 100, 100);
}
function create(){
    score = 0;

    game.add.tileSprite(0, 0, 1920, 1080, 'sky');
    game.world.setBounds(0, 0, 1920, 1080);


    game.physics.startSystem(Phaser.Physics.ARCADE);

    platforms = game.add.group();
    platforms.enableBody = true;

    var ground = platforms.create(0, game.world.height - 128, 'mid-grass');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(64, game.world.height - 128, 'mid-grass');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(128, game.world.height - 128, 'mid-grass');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(192, game.world.height - 128, 'right-grass');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(192, game.world.height - 64, 'down-ground');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(0, game.world.height - 64, 'mid-grass-down');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(64, game.world.height - 64, 'mid-grass-down');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(128, game.world.height - 64, 'mid-grass-down');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(512, game.world.height - 192, 'left-grass');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(256, game.world.height - 64, 'down-grass');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(320, game.world.height - 64, 'mid-grass');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(384, game.world.height - 64, 'mid-grass');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(448, game.world.height - 64, 'down-grass2');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(512, game.world.height - 64, 'down-ground2');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(512, game.world.height - 128, 'left-grass-down');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(576, game.world.height - 192, 'mid-grass');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(640, game.world.height - 192, 'mid-grass');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(704, game.world.height - 192, 'mid-grass');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(768, game.world.height - 192, 'right-grass');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(768, game.world.height - 128, 'right-grass-down');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(768, game.world.height - 64, 'down-ground');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(832, game.world.height - 64, 'down-grass');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(896, game.world.height - 64, 'mid-grass');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(960, game.world.height - 64, 'mid-grass');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(990, game.world.height - 64, 'down-grass2');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(1054, game.world.height - 64, 'down-ground2');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(1054, game.world.height - 128, 'left-grass-down');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(1054, game.world.height - 192, 'left-grass-down');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(1054, game.world.height - 256, 'left-grass');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(1118, game.world.height - 256, 'mid-grass');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(1182, game.world.height - 256, 'mid-grass');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(1246, game.world.height - 256, 'right-grass');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(1310, game.world.height - 192, 'down-grass');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(1374, game.world.height - 192, 'down-grass2');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(1438, game.world.height - 192, 'down-ground2');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(1438, game.world.height - 256, 'left-grass');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(1246, game.world.height - 192, 'down-ground');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(1502, game.world.height - 256, 'right-grass');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(1502, game.world.height - 192, 'right-grass-down');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(1502, game.world.height - 128, 'down-ground');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(1566, game.world.height - 128, 'down-grass');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(1630, game.world.height - 128, 'mid-grass');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(1694, game.world.height - 128, 'mid-grass');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(1758, game.world.height - 128, 'mid-grass');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(1792, game.world.height - 128, 'down-grass2');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(1856, game.world.height - 128, 'down-ground2');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(1856, game.world.height - 192, 'left-grass-down');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(1856, game.world.height - 256, 'left-grass-down');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(1856, game.world.height - 320, 'left-grass-down');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(1856, game.world.height - 384, 'left-grass');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;

    ladder = game.add.group();
    ladder.enableBody = true;

    var section = ladder.create(456, 960, 'ladder');
    section.body.immovable = true;
    section = ladder.create(456, 910, 'ladder');
    section.body.immovable = true;
    section = ladder.create(456, 885, 'ladder');
    section.body.immovable = true;
    section = ladder.create(1800, 895, 'ladder');
    section.body.immovable = true;
    section = ladder.create(1800, 845, 'ladder');
    section.body.immovable = true;
    section = ladder.create(1800, 795, 'ladder');
    section.body.immovable = true;
    section = ladder.create(1800, 745, 'ladder');
    section.body.immovable = true;
    section = ladder.create(1800, 695, 'ladder');
    section.body.immovable = true;

    game.add.sprite(1435, 562, 'smallTree');

    obstacle = game.add.group();
    obstacle.enableBody = true;

    var spike = obstacle.create(835,957, 'spike');
    spike.body.immovable = true;
    spike = obstacle.create(859,957, 'spike');
    spike.body.immovable = true;
    spike = obstacle.create(883,957, 'spike');
    spike.body.immovable = true;
    spike = obstacle.create(907,957, 'spike');
    spike.body.immovable = true;
    spike = obstacle.create(931,957, 'spike');
    spike.body.immovable = true;
    spike = obstacle.create(955,957, 'spike');
    spike.body.immovable = true;
    spike = obstacle.create(979,957, 'spike');
    spike.body.immovable = true;
    spike = obstacle.create(1003,957, 'spike');
    spike.body.immovable = true;
    spike = obstacle.create(1027,957, 'spike');
    spike.body.immovable = true;
    spike = obstacle.create(1312,830, 'spike');
    spike.body.immovable = true;
    spike = obstacle.create(1336,830, 'spike');
    spike.body.immovable = true;
    spike = obstacle.create(1360,830, 'spike');
    spike.body.immovable = true;
    spike = obstacle.create(1384,830, 'spike');
    spike.body.immovable = true;
    spike = obstacle.create(1408,830, 'spike');
    spike.body.immovable = true;


    var ledge = platforms.create(0, 750, 'mid-grass');
    ledge.body.immovable = true;
    ledge = platforms.create(64, 750, 'mid-grass');
    ledge.body.immovable = true;
    ledge = platforms.create(128, 750, 'right-grass');
    ledge.body.immovable = true;
    ledge = platforms.create(1600, 600, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(1820, 500, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(1430, 500, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(1230, 400, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(1340, 200, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(1000, 500, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(820, 400, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(700, 200, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(600, 500, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(380, 600, 'step150');
    ledge.body.immovable = true;
    ledge = platforms.create(210, 500, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(410, 400, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(1630, 400, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(1120, 100, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(910, 100, 'step100');
    ledge.body.immovable = true;
    ledge = platforms.create(150, 200, 'step100');
    ledge.body.immovable = true;

    trampoline1 = game.add.sprite(1650, 355, 'trampoline');
    game.physics.arcade.enable(trampoline1);
    trampoline1.body.setSize(64, 46, 0, 12);
    trampoline1.animations.add('jump');
    trampoline1.body.immovable = true;
    trampoline1.body.bounce.set(1);

    trampoline2 = game.add.sprite(430, 355, 'trampoline');
    game.physics.arcade.enable(trampoline2);
    trampoline2.body.setSize(64, 46, 0, 12);
    trampoline2.animations.add('jump');
    trampoline2.body.immovable = true;
    trampoline2.body.bounce.set(1);

    game.add.sprite(0, 814, 'mid-grass-down');
    game.add.sprite(0, 888, 'mid-grass-down');
    game.add.sprite(0, 878, 'mid-grass-down');
    game.add.sprite(64, 814, 'mid-grass-down');
    game.add.sprite(64, 888, 'mid-grass-down');
    game.add.sprite(64, 878, 'mid-grass-down');
    game.add.sprite(576, game.world.height - 64, 'mid-grass-down');
    game.add.sprite(640, game.world.height - 64, 'mid-grass-down');
    game.add.sprite(704, game.world.height - 64, 'mid-grass-down');
    game.add.sprite(576, game.world.height - 128, 'mid-grass-down');
    game.add.sprite(640, game.world.height - 128, 'mid-grass-down');
    game.add.sprite(704, game.world.height - 128, 'mid-grass-down');
    game.add.sprite(128, 814, 'right-grass-down');
    game.add.sprite(128, 888, 'right-grass-down');
    game.add.sprite(128, 878, 'right-grass-down');
    game.add.sprite(1118, game.world.height - 128, 'mid-grass-down');
    game.add.sprite(1118, game.world.height - 64, 'mid-grass-down');
    game.add.sprite(1118, game.world.height - 192, 'mid-grass-down');
    game.add.sprite(1182, game.world.height - 192, 'mid-grass-down');
    game.add.sprite(1182, game.world.height - 128, 'mid-grass-down');
    game.add.sprite(1182, game.world.height - 192, 'mid-grass-down');
    game.add.sprite(1182, game.world.height - 64, 'mid-grass-down');
    game.add.sprite(1246, game.world.height - 64, 'mid-grass-down');
    game.add.sprite(1310, game.world.height - 64, 'mid-grass-down');
    game.add.sprite(1374, game.world.height - 64, 'mid-grass-down');
    game.add.sprite(1438, game.world.height - 64, 'mid-grass-down');
    game.add.sprite(1502, game.world.height - 64, 'mid-grass-down');
    game.add.sprite(1566, game.world.height - 64, 'mid-grass-down');
    game.add.sprite(1630, game.world.height - 64, 'mid-grass-down');
    game.add.sprite(1694, game.world.height - 64, 'mid-grass-down');
    game.add.sprite(1758, game.world.height - 64, 'mid-grass-down');
    game.add.sprite(1822, game.world.height - 64, 'mid-grass-down');
    game.add.sprite(1886, game.world.height - 64, 'mid-grass-down');
    game.add.sprite(1246, game.world.height - 128, 'mid-grass-down');
    game.add.sprite(1310, game.world.height - 128, 'mid-grass-down');
    game.add.sprite(1374, game.world.height - 128, 'mid-grass-down');
    game.add.sprite(1438, game.world.height - 128, 'mid-grass-down');
    game.add.sprite(220, 915, 'sign');

    game.add.sprite(680, 695, 'tree');

    enemy = game.add.sprite(1570,game.world.height - 215, 'mummy');
    game.physics.arcade.enable(enemy);
    enemy.body.collideWorldBounds = true;
    enemy.animations.add('right',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 15, true);
    enemy.animations.add('left',[16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32], 15, true);
    enemy.body.velocity.x = 60;
    game.time.events.loop(Phaser.Timer.SECOND*3.5, function changeDirecion() {enemy.body.velocity.x *= (-1);}, this);

    enemy2 = game.add.sprite(10,game.world.height - 400, 'blobMan');
    game.physics.arcade.enable(enemy2);
    enemy2.body.collideWorldBounds = true;
    enemy2.animations.add('left',[0,1,2,3,4,5,6], 8, true);
    enemy2.animations.add('right',[7,8,9,10,11,12,13], 8, true);
    enemy2.body.velocity.x = 70;
    game.time.events.loop(Phaser.Timer.SECOND*1.7, function changeDirection() {enemy2.body.velocity.x *= (-1);}, this);

    enemy3 = game.add.sprite(1000,game.world.height - 400, 'badTree');
    game.physics.arcade.enable(enemy3);
    enemy3.body.collideWorldBounds = true;
    enemy3.body.setSize(80,40,5,35);
    enemy3.animations.add('right',[0,1,2,3], 12, true);
    enemy3.animations.add('left',[4,5,6,7], 12, true);
    enemy3.body.velocity.x = 50;
    game.time.events.loop(Phaser.Timer.SECOND*9, function changeDirection() {enemy3.body.velocity.x *= (-1);}, this);

    player = game.add.sprite(50,game.world.height - 250, 'minion');
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.2;
    player.body.collideWorldBounds = true;
    player.body.gravity.y = 300;
    player.animations.add('top',[11,12,13,14,15,16,17], 10, true);
    player.animations.add('right',[5,6,7,8], 10, true);
    player.animations.add('up',[9,10], 15, true);
    player.animations.add('left',[0,1,2,3], 10, true);

    bananas = game.add.group();
    bananas.enableBody = true;
    for (var i = 0; i < itemsAmount; i++) {
        var banana = bananas.create(i * 45, 0, 'banana');
        banana.body.gravity.y = 250;
        banana.body.bounce.y = 0.05 + Math.random() * 0.01;
    }

    soundClick(sounds[index]);
    soundClick('source/sounds/Minion Rush.mp3');
    game.time.events.loop(Phaser.Timer.SECOND*20, function(){soundClick('source/sounds/dragon.mp3')}, this);
    game.time.events.loop(Phaser.Timer.SECOND*10, function(){soundClick('source/sounds/mummy.mp3')}, this);


    timerText = game.add.text(1070, 0, 'Time: 65', {fontSize:'32px', fill: '#000'});
    timerText.fixedToCamera = true;
    scoreText = game.add.text(0,0, 'Score: 0', {fontSize:'32px', fill: '#000'});
    scoreText.fixedToCamera = true;
    game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);

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
                    changeLevel('25.html');
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

    cursors = game.input.keyboard.createCursorKeys();
    game.world.camera.height = 750;
    game.camera.follow(player);
}
function update() {
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(bananas, platforms);
    game.physics.arcade.collide(player, trampoline1, bouncing1, null, this);
    game.physics.arcade.collide(player, trampoline2, bouncing2, null, this);
    game.physics.arcade.collide(bananas, obstacle);
    game.physics.arcade.collide(bananas, trampoline1);
    game.physics.arcade.collide(bananas, trampoline2);
    game.physics.arcade.collide(player, obstacle, touchObstacle, null, this);
    game.physics.arcade.collide(player, enemy, touchObstacle, null, this);
    game.physics.arcade.collide(player, enemy2, touchObstacle, null, this);
    game.physics.arcade.collide(player, enemy3, touchObstacle, null, this);
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
        game.time.events.add(Phaser.Timer.SECOND*1, function(){changeLevel('http://captainblack.epizy.com/levels/23_teleport.html')}, this);

    }
    if (enemy.body.velocity.x > 0){
        enemy.animations.play('right');
    }
    else {
        enemy.animations.play('left');
    }

    if (enemy2.body.velocity.x > 0){
        enemy2.animations.play('right');
    }
    else {
        enemy2.animations.play('left');
    }

    if (enemy3.body.velocity.x > 0){
        enemy3.animations.play('right');
    }
    else {
        enemy3.animations.play('left');
    }
}
function changeLevel(str){
    document.location.href=str;
}


function collectStar (player, banana) {
    banana.kill();
    score+=10;
    scoreText.text = 'Score: ' + score;
    if (score === (itemsAmount)*10){
        scoreText.text = 'You win!';
        setTimeout(changeLevel('26.html'),3000);
    }
}

function updateCounter() {
    if (time == 0) {
        scoreText.text = 'You lose!';
        setTimeout(changeLevel('25.html'),3000);
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
    changeLevel('25.html')
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

function bouncing2(){
    trampoline2.animations.play('jump', 30, false);
    player.body.velocity.y = -350;
    soundClick('source/sounds/spring.mp3');
}

function render() {
    // game.debug.body(enemy3);
}


