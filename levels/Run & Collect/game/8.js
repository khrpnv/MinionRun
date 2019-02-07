var game = new Phaser.Game(
    1000,
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
var box;
var pause_label;
var menu;
var w = 1000, h = 750;
var score;
var scoreText;
var timerText;
var itemsAmount = 25;
var extraItems = Math.floor(itemsAmount*0.5 + 1);
console.log(extraItems);
function preload(){
    game.load.image('sky', 'source/bg8-9(2).jpg');
    game.load.image('menu', 'source/menu.png');
    game.load.image('ground','source/5-Ground.png');
    game.load.image('underground','source/underground.png');
    game.load.image('step','source/ground.png');
    game.load.image('100step','source/100ground.png');
    game.load.image('30step','source/30ground.png');
    game.load.image('200step','source/200ground.png');
    game.load.image('70step','source/70ground.png');
    game.load.image('banana','source/apple.png');
    game.load.spritesheet('minion', 'source/minion2.png', 48, 48);
    game.load.image('box','source/box.png');
}
function create(){
    score = 0;
    
    game.add.tileSprite(0, 0, 1000, 1000, 'sky');
    game.world.setBounds(0, 0, 1000, 1000);

    game.physics.startSystem(Phaser.Physics.ARCADE);

    platforms = game.add.group();
    platforms.enableBody = true;
    var ground = platforms.create(0, game.world.height - 64, 'ground');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(250, game.world.height - 64, 'ground');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(500, game.world.height - 64, 'ground');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(750, game.world.height - 64, 'ground');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;
    ground = platforms.create(900, game.world.height - 64, 'ground');
    ground.scale.setTo(1,1);
    ground.body.immovable = true;

    var ledge = platforms.create(438, 537, '200step');
    ledge.body.immovable = true;
    ledge = platforms.create(755, 435, '100step');
    ledge.body.immovable = true;
    ledge = platforms.create(-100, 790, 'step');
    ledge.body.immovable = true;
    ledge = platforms.create(200, 690, '100step');
    ledge.body.immovable = true;
    ledge = platforms.create(450, 860, 'step');
    ledge.body.immovable = true;
    ledge = platforms.create(800, 800, '100step');
    ledge.body.immovable = true;
    ledge = platforms.create(960, 700, 'step');
    ledge.body.immovable = true;
    ledge = platforms.create(580, 670, '100step');
    ledge.body.immovable = true;
    ledge = platforms.create(-100, 790, 'step');
    ledge.body.immovable = true;
    ledge = platforms.create(810, 600, '70step');
    ledge.body.immovable = true;
    ledge = platforms.create(-30, 600, '100step');
    ledge.body.immovable = true;
    ledge = platforms.create(250, 450, '70step');
    ledge.body.immovable = true;
    ledge = platforms.create(-200, 500, 'step');
    ledge.body.immovable = true;
    ledge = platforms.create(120, 100, '70step');
    ledge.body.immovable = true;
    ledge = platforms.create(500, 400, '30step');
    ledge.body.immovable = true;
    ledge = platforms.create(610, 370, '30step');
    ledge.body.immovable = true;
    ledge = platforms.create(810, 330, '70step');
    ledge.body.immovable = true;
    ledge = platforms.create(300, 280, '200step');
    ledge.body.immovable = true;
    ledge = platforms.create(50, 250, '100step');
    ledge.body.immovable = true;
    ledge = platforms.create(350, 120, '70step');
    ledge.body.immovable = true;
    ledge = platforms.create(670, 280, '30step');
    ledge.body.immovable = true;
    ledge = platforms.create(600, 130, '200step');
    ledge.body.immovable = true;
    ledge = platforms.create(950, 230, 'step');
    ledge.body.immovable = true;
    ledge = platforms.create(930, 90, '70step');
    ledge.body.immovable = true;
    ledge = platforms.create(-230, 370, 'step');
    ledge.body.immovable = true;
    ledge = platforms.create(-220, 70, 'step');
    ledge.body.immovable = true;

    player = game.add.sprite(32, game.world.height - 150, 'minion');
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;
    player.animations.add('left',[0,1,2,3], 10, true);
    player.animations.add('right',[5,6,7,8], 10, true);

    box = game.add.sprite(550,game.world.height - 350, 'box');
    game.physics.arcade.enable(box);
    box.body.bounce.y = 0.2;
    box.body.gravity.y = 600;
    box.body.collideWorldBounds = true;

    game.physics.enable([player,box], Phaser.Physics.ARCADE);
    game.camera.follow(player);

    bananas = game.add.group();
    bananas.enableBody = true;
    for (var i = 0; i < itemsAmount; i++)
    {
        var banana = bananas.create(i * Math.floor(Math.random()*(40-37) + 37), 300, 'banana');
        banana.body.gravity.y = 250;
        banana.body.bounce.y = 0.4 + Math.random() * 0.1;
    }

    for (var j = 0; j < extraItems; j++)
    {
        banana = bananas.create(j * Math.floor(Math.random()*(80-75) + 75), 0, 'banana');
        banana.body.gravity.y = 250;
        banana.body.bounce.y = 0.4 + Math.random() * 0.1;
    }

    menu = game.add.sprite(250, 150, 'menu');
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
                    changeLevel('8.html');
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
    soundClick('source/sounds/bapa.mp3');
    soundClick('source/sounds/Minion.mp3');

    timerText = game.add.text(880, 0, 'Time: 70', {fontSize:'32px', fill: '#CCC'});
    scoreText = game.add.text(0,0, 'Score: 0', {fontSize:'32px', fill: '#CCC'});
    game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);

    cursors = game.input.keyboard.createCursorKeys();
    game.world.camera.height = 750;
    game.camera.follow(player);
}
function update(){
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(bananas, platforms);
    game.physics.arcade.collide(box, platforms);
    game.physics.arcade.collide(player, box, function boxStop(){box.body.velocity.x = 0},null, this);
    game.physics.arcade.overlap(player, bananas, collectStar, null, this);

    player.body.velocity.x = 0;

    if (cursors.left.isDown){
        player.body.velocity.x = -150;
        player.animations.play('left');
    }
    else if (cursors.right.isDown){
        player.body.velocity.x = 150;
        player.animations.play('right');
    }
    else{
        player.animations.stop();
        player.frame = 4;
    }

    if (cursors.up.isDown && player.body.touching.down){
        player.body.velocity.y = -250;
    }
}
function collectStar (player, banana) {
    banana.kill();
    soundClick('source/sounds/Minion Apple Sound Effect.mp3');
    score+=10;
    scoreText.text = 'Score: ' + score;
    if (score === (itemsAmount + extraItems) * 10){
        scoreText.text = 'You win!';
        setTimeout(changeLevel('9.html'),3000);
    }
}
function changeLevel(str){
    document.location.href=str;
}
function updateCounter() {
    if (time == 0) {
        scoreText.text = 'You lose!';
        setTimeout(changeLevel('8.html'),5000);
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