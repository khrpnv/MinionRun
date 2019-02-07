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
var enemy4;
var enemy5;
var score;
var sprite;
var enemy3;
var pause_label;
var menu;
var w = 1200, h = 750;
var timerText;
var scoreText;
var obstacle;
var sounds = ['source/sounds/minion_elo.mp3','source/sounds/bapa.mp3','source/sounds/laugh.mp3','source/sounds/Minion Ahahaha Sound Effect.mp3','source/sounds/minion_ojojojoj.mp3','source/sounds/tadaaa.mp3','source/sounds/Minion Hehehe Sound Effect.mp3'];
var index = Math.floor(Math.random()*sounds.length);
var itemsAmount = 43;
var ladder;
function preload(){
    game.load.image('sky', 'source/bg26.jpg');
    game.load.image('banana','source/halloween/pumpkin.png');
    game.load.image('mainMid','source/halloween/midMain.png');
    game.load.image('mainRight','source/halloween/rightMain.png');
    game.load.image('leftDown','source/halloween/leftPart.png');
    game.load.image('rightDown','source/halloween/rightPart.png');
    game.load.image('mainLeft','source/halloween/leftMain.png');
    game.load.image('down2','source/halloween/down2.png');
    game.load.image('down1','source/halloween/down1.png');
    game.load.image('platform150','source/halloween/platform150.png');
    game.load.image('platform100','source/halloween/platform100.png');
    game.load.image('mainMidDown','source/halloween/midMainDown.png');
    game.load.image('mainRightDown','source/halloween/rightMainDown.png');
    game.load.image('mainLeftDown','source/halloween/leftMainDown.png');
    game.load.image('menu', 'source/menu.png');
    game.load.image('ladder','source/ladder2.png');
    game.load.image('web','source/halloween/web.png');
    game.load.image('skeleton','source/halloween/Skeleton.png');
    game.load.image('bones1','source/halloween/Bone (3).png');
    game.load.image('bones2','source/halloween/Bone (4).png');
    game.load.spritesheet('minion', 'source/minion with climb.png', 48, 48);
    game.load.spritesheet('enemy1', 'source/halloween/evilPumpkin72x75.png', 72, 75);
    game.load.spritesheet('enemy2', 'source/halloween/goblin64x65.png', 64, 65);
    game.load.spritesheet('enemy3', 'source/halloween/ghost72x58.png', 120, 95);
    game.load.spritesheet('enemy4', 'source/halloween/bat32x32.png', 64, 64);
    game.load.spritesheet('spider', 'source/halloween/spider.png', 160, 160);
}
function create(){
    score = 0;

    game.add.tileSprite(0, 0, 1920, 1126, 'sky');
    game.world.setBounds(0, 0, 1920, 1126);


    game.physics.startSystem(Phaser.Physics.ARCADE);

    platforms = game.add.group();
    platforms.enableBody = true;

    var ground = platforms.create(0, game.world.height - 192, 'mainMid');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(64, game.world.height - 192, 'mainMid');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(128, game.world.height - 192, 'mainMid');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(192, game.world.height - 192, 'mainRight');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(256, game.world.height - 64, 'leftDown');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(256, game.world.height - 64, 'leftDown');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(320, game.world.height - 64, 'mainMid');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(384, game.world.height - 64, 'mainMid');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(448, game.world.height - 64, 'mainMid');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(512, game.world.height - 64, 'mainMid');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(576, game.world.height - 64, 'mainMid');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(640, game.world.height - 64, 'mainMid');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(704, game.world.height - 64, 'rightDown');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(192, game.world.height - 128, 'mainRightDown');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(768, game.world.height - 128, 'mainLeftDown');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(768, game.world.height - 192, 'mainLeftDown');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(768, game.world.height - 256, 'mainLeftDown');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(768, game.world.height - 320, 'mainLeftDown');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(768, game.world.height - 384, 'mainLeft');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(832, game.world.height - 384, 'mainMid');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(896, game.world.height - 384, 'mainRight');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(896, game.world.height - 320, 'mainRightDown');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(960, game.world.height - 256, 'leftDown');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(1004, game.world.height - 256, 'mainMid');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(1068, game.world.height - 256, 'mainMid');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(1132, game.world.height - 256, 'mainMid');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(1196, game.world.height - 256, 'mainMid');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(1260, game.world.height - 256, 'mainMid');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(1324, game.world.height - 256, 'mainMid');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(1388, game.world.height - 256, 'mainMid');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(1452, game.world.height - 256, 'mainMid');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(1516, game.world.height - 256, 'mainRight');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(1516, game.world.height - 192, 'mainRightDown');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(1580, game.world.height - 128, 'leftDown');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(1644, game.world.height - 128, 'mainMid');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(1708, game.world.height - 128, 'mainMid');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(1772, game.world.height - 128, 'mainMid');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(1836, game.world.height - 128, 'mainMid');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(1900, game.world.height - 128, 'mainMid');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;

    game.add.sprite(0, game.world.height - 128, 'mainMidDown');
    game.add.sprite(0, game.world.height - 64, 'mainMidDown');
    game.add.sprite(64, game.world.height - 64, 'mainMidDown');
    game.add.sprite(64, game.world.height - 128, 'mainMidDown');
    game.add.sprite(128, game.world.height - 64, 'mainMidDown');
    game.add.sprite(128, game.world.height - 128, 'mainMidDown');
    game.add.sprite(832, game.world.height - 128, 'mainMidDown');
    game.add.sprite(832, game.world.height - 192, 'mainMidDown');
    game.add.sprite(832, game.world.height - 256, 'mainMidDown');
    game.add.sprite(832, game.world.height - 320, 'mainMidDown');
    game.add.sprite(832, game.world.height - 64, 'mainMidDown');
    game.add.sprite(896, game.world.height - 64, 'mainMidDown');
    game.add.sprite(960, game.world.height - 64, 'mainMidDown');
    game.add.sprite(1004, game.world.height - 64, 'mainMidDown');
    game.add.sprite(1068, game.world.height - 64, 'mainMidDown');
    game.add.sprite(1132, game.world.height - 64, 'mainMidDown');
    game.add.sprite(1196, game.world.height - 64, 'mainMidDown');
    game.add.sprite(1260, game.world.height - 64, 'mainMidDown');
    game.add.sprite(1324, game.world.height - 64, 'mainMidDown');
    game.add.sprite(1388, game.world.height - 64, 'mainMidDown');
    game.add.sprite(1452, game.world.height - 64, 'mainMidDown');
    game.add.sprite(1516, game.world.height - 64, 'mainMidDown');
    game.add.sprite(1580, game.world.height - 64, 'mainMidDown');
    game.add.sprite(1644, game.world.height - 64, 'mainMidDown');
    game.add.sprite(1708, game.world.height - 64, 'mainMidDown');
    game.add.sprite(1772, game.world.height - 64, 'mainMidDown');
    game.add.sprite(1836, game.world.height - 64, 'mainMidDown');
    game.add.sprite(1900, game.world.height - 64, 'mainMidDown');
    game.add.sprite(896, game.world.height - 128, 'mainMidDown');
    game.add.sprite(960, game.world.height - 128, 'mainMidDown');
    game.add.sprite(1004, game.world.height - 128, 'mainMidDown');
    game.add.sprite(1068, game.world.height - 128, 'mainMidDown');
    game.add.sprite(1132, game.world.height - 128, 'mainMidDown');
    game.add.sprite(1196, game.world.height - 128, 'mainMidDown');
    game.add.sprite(1260, game.world.height - 128, 'mainMidDown');
    game.add.sprite(1324, game.world.height - 128, 'mainMidDown');
    game.add.sprite(1388, game.world.height - 128, 'mainMidDown');
    game.add.sprite(1452, game.world.height - 128, 'mainMidDown');
    game.add.sprite(1516, game.world.height - 128, 'mainMidDown');
    game.add.sprite(896, game.world.height - 192, 'mainMidDown');
    game.add.sprite(960, game.world.height - 192, 'mainMidDown');
    game.add.sprite(1004, game.world.height - 192, 'mainMidDown');
    game.add.sprite(1068, game.world.height - 192, 'mainMidDown');
    game.add.sprite(1132, game.world.height - 192, 'mainMidDown');
    game.add.sprite(1196, game.world.height - 192, 'mainMidDown');
    game.add.sprite(1260, game.world.height - 192, 'mainMidDown');
    game.add.sprite(1324, game.world.height - 192, 'mainMidDown');
    game.add.sprite(1388, game.world.height - 192, 'mainMidDown');
    game.add.sprite(1452, game.world.height - 192, 'mainMidDown');
    game.add.sprite(192, game.world.height - 64, 'down2');
    game.add.sprite(768, game.world.height - 64, 'down1');
    game.add.sprite(1516, game.world.height - 128, 'down2');
    game.add.sprite(896, game.world.height - 256, 'down2');

    ladder = game.add.group();
    ladder.enableBody = true;

    var section = ladder.create(712, 1005, 'ladder');
    section.body.immovable = true;
    section = ladder.create(712, 955, 'ladder');
    section.body.immovable = true;
    section = ladder.create(712, 905, 'ladder');
    section.body.immovable = true;
    section = ladder.create(712, 855, 'ladder');
    section.body.immovable = true;
    section = ladder.create(712, 805, 'ladder');
    section.body.immovable = true;
    section = ladder.create(712, 755, 'ladder');
    section.body.immovable = true;
    section = ladder.create(712, 730, 'ladder');
    section.body.immovable = true;
    section = ladder.create(1630, 295, 'ladder');
    section.body.immovable = true;
    section = ladder.create(1630, 245, 'ladder');
    section.body.immovable = true;
    section = ladder.create(1630, 195, 'ladder');
    section.body.immovable = true;
    section = ladder.create(1060, 295, 'ladder');
    section.body.immovable = true;
    section = ladder.create(1060, 245, 'ladder');
    section.body.immovable = true;
    section = ladder.create(1060, 195, 'ladder');
    section.body.immovable = true;

    obstacle = game.add.group();
    obstacle.enableBody = true;

    var spider = obstacle.create(1450, 100, 'spider');
    spider.body.immovable = true;
    spider.body.setSize(105,125,25,25);
    spider.animations.add('movement');
    spider.animations.play('movement',10, true);
    spider = obstacle.create(1100, 0, 'spider');
    spider.body.immovable = true;
    spider.body.setSize(105,125,25,25);
    spider.animations.add('movement');
    spider.animations.play('movement',10, true);
    spider = obstacle.create(30, 250, 'spider');
    spider.body.immovable = true;
    spider.body.setSize(105,125,25,25);
    spider.animations.add('movement');
    spider.animations.play('movement',10, true);

    game.add.sprite(1518,70,'web');
    game.add.sprite(1518,40,'web');
    game.add.sprite(1518,10,'web');
    game.add.sprite(1518,0,'web');
    game.add.sprite(99,0,'web');
    game.add.sprite(99,30,'web');
    game.add.sprite(99,60,'web');
    game.add.sprite(99,90,'web');
    game.add.sprite(99,120,'web');
    game.add.sprite(99,150,'web');
    game.add.sprite(99,180,'web');
    game.add.sprite(99,210,'web');
    game.add.sprite(99,240,'web');
    game.add.sprite(810,695,'skeleton');
    game.add.sprite(150,950,'bones1');
    game.add.sprite(50,1000,'bones2');

    var ledge = platforms.create(425, 850, 'platform150');
    ledge.body.immovable = true;
    ledge = platforms.create(1080, 650, 'platform100');
    ledge.body.immovable = true;
    ledge = platforms.create(1300, 550, 'platform150');
    ledge.body.immovable = true;
    ledge = platforms.create(1560, 650, 'platform100');
    ledge.body.immovable = true;
    ledge = platforms.create(1770, 550, 'platform150');
    ledge.body.immovable = true;
    ledge = platforms.create(810, 550, 'platform150');
    ledge.body.immovable = true;
    ledge = platforms.create(835, 450, 'platform100');
    ledge.body.immovable = true;
    ledge = platforms.create(1325, 450, 'platform100');
    ledge.body.immovable = true;
    ledge = platforms.create(1795, 450, 'platform100');
    ledge.body.immovable = true;
    ledge = platforms.create(1540, 350, 'platform150');
    ledge.body.immovable = true;
    ledge = platforms.create(1060, 350, 'platform150');
    ledge.body.immovable = true;
    ledge = platforms.create(1685, 195, 'platform100');
    ledge.body.immovable = true;
    ledge = platforms.create(960, 195, 'platform100');
    ledge.body.immovable = true;
    ledge = platforms.create(210, 750, 'platform150');
    ledge.body.immovable = true;
    ledge = platforms.create(0, 650, 'platform150');
    ledge.body.immovable = true;
    ledge = platforms.create(50, 550, 'platform100');
    ledge.body.immovable = true;
    ledge = platforms.create(250, 450, 'platform100');
    ledge.body.immovable = true;
    ledge = platforms.create(450, 350, 'platform100');
    ledge.body.immovable = true;
    ledge = platforms.create(300, 250, 'platform100');
    ledge.body.immovable = true;
    ledge = platforms.create(120, 150, 'platform100');
    ledge.body.immovable = true;
    ledge = platforms.create(600, 250, 'platform100');
    ledge.body.immovable = true;

    enemy = game.add.sprite(300,1000, 'enemy1');
    game.physics.arcade.enable(enemy);
    enemy.body.collideWorldBounds = true;
    enemy.body.setSize(52,60,10,6);
    enemy.animations.add('left',[0,1,2,3,4,5,6,7], 20, true);
    enemy.animations.add('right',[8,9,10,11,12,13], 20, true);
    enemy.body.velocity.x = 60;
    game.time.events.loop(Phaser.Timer.SECOND*6, function changeDirecion(){enemy.body.velocity.x *= (-1);}, this);

    enemy2 = game.add.sprite(980,806, 'enemy2');
    game.physics.arcade.enable(enemy2);
    enemy2.body.collideWorldBounds = true;
    enemy2.animations.add('left',[6,7,8,9,10,11], 20, true);
    enemy2.animations.add('right',[0,1,2,3,4,5], 20, true);
    enemy2.body.velocity.x = 90;
    game.time.events.loop(Phaser.Timer.SECOND*6, function changeDirecion(){enemy2.body.velocity.x *= (-1);}, this);

    enemy3 = game.add.sprite(1770,914, 'enemy3');
    game.physics.arcade.enable(enemy3);
    enemy3.body.collideWorldBounds = true;
    enemy3.animations.add('left',[0,1], 5, true);
    enemy3.animations.add('right',[2,3], 5, true);
    enemy3.body.velocity.x = -80;
    game.time.events.loop(Phaser.Timer.SECOND*2.5, function changeDirecion(){enemy3.body.velocity.x *= (-1);}, this);

    enemy4 = game.add.sprite(1770,585, 'enemy4');
    game.physics.arcade.enable(enemy4);
    enemy4.body.collideWorldBounds = true;
    enemy4.body.setSize(52,40,5,10);
    enemy4.animations.add('left',[0,1,2,3], 15, true);
    enemy4.animations.add('right',[4,5,6,7], 15, true);
    enemy4.body.velocity.x = -80;
    game.time.events.loop(Phaser.Timer.SECOND*13, function changeDirecion(){enemy4.body.velocity.x *= (-1);}, this);

    enemy5 = game.add.sprite(1000,485, 'enemy4');
    game.physics.arcade.enable(enemy5);
    enemy5.body.collideWorldBounds = true;
    enemy5.body.setSize(52,40,5,10);
    enemy5.animations.add('left',[0,1,2,3], 15, true);
    enemy5.animations.add('right',[4,5,6,7], 15, true);
    enemy5.body.velocity.x = 80;
    game.time.events.loop(Phaser.Timer.SECOND*10, function changeDirecion(){enemy5.body.velocity.x *= (-1);}, this);

    player = game.add.sprite(50,game.world.height - 300, 'minion');
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
    banana = bananas.create(1700, 900, 'banana');
    banana.body.gravity.y = 250;
    banana.body.bounce.y = 0.05 + Math.random() * 0.01;
    banana = bananas.create(1670, 900, 'banana');
    banana.body.gravity.y = 250;
    banana.body.bounce.y = 0.05 + Math.random() * 0.01;
    banana = bananas.create(300, 900, 'banana');
    banana.body.gravity.y = 250;
    banana.body.bounce.y = 0.05 + Math.random() * 0.01;
    banana = bananas.create(400, 900, 'banana');
    banana.body.gravity.y = 250;
    banana.body.bounce.y = 0.05 + Math.random() * 0.01;
    banana = bananas.create(500, 900, 'banana');
    banana.body.gravity.y = 250;
    banana.body.bounce.y = 0.05 + Math.random() * 0.01;
    banana = bananas.create(600, 900, 'banana');
    banana.body.gravity.y = 250;
    banana.body.bounce.y = 0.05 + Math.random() * 0.01;

    soundClick(sounds[index]);
    soundClick('source/halloween/sound.mp3');

    timerText = game.add.text(1070, 0, 'Time: 65', {fontSize:'32px', fill: '#FFF432'});
    timerText.fixedToCamera = true;
    scoreText = game.add.text(0,0, 'Score: 0', {fontSize:'32px', fill: '#FFF432'});
    scoreText.fixedToCamera = true;
    game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);

    menu = game.add.sprite(350, 150, 'menu');
    menu.visible = false;
    menu.fixedToCamera = true;

    pause_label = game.add.text(w/2-40, 0, 'Pause', {fontSize:'32px', fill: '#FFF432'});
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
                    changeLevel('26.html');
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
    game.physics.arcade.collide(player, enemy, touchObstacle, null, this);
    game.physics.arcade.collide(player, enemy2, touchObstacle, null, this);
    game.physics.arcade.collide(player, obstacle, touchObstacle, null, this);
    game.physics.arcade.collide(player, enemy3, touchObstacle, null, this);
    game.physics.arcade.collide(player, enemy4, touchObstacle, null, this);
    game.physics.arcade.collide(player, enemy5, touchObstacle, null, this);
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

    if (enemy4.body.velocity.x > 0){
        enemy4.animations.play('right');
    }
    else {
        enemy4.animations.play('left');
    }

    if (enemy5.body.velocity.x > 0){
        enemy5.animations.play('right');
    }
    else {
        enemy5.animations.play('left');
    }
}
function changeLevel(str){
    document.location.href=str;
}


function collectStar (player, banana) {
    banana.kill();
    score+=10;
    scoreText.text = 'Score: ' + score;
    if (score === (itemsAmount + 6)*10){
        scoreText.text = 'You win!';
        setTimeout(changeLevel('27.html'),3000);
    }
}

function updateCounter() {
    if (time == 0) {
        scoreText.text = 'You lose!';
        setTimeout(changeLevel('26.html'),3000);
    }
    else {
        time--;
        timerText.setText('Time: ' + time);
    }
}

function changeDirection(character){
    character.body.velocity.x *= (-1);
}

function soundClick(str) {
    var audio = new Audio();
    audio.src = str;
    audio.autoplay = true;
}

function touchObstacle(){
    changeLevel('26.html')
}

function render() {
    // game.debug.body(spider1);
}


