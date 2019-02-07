var game = new Phaser.Game(
    800,
    750,
    Phaser.AUTO,
    'game',
    {
        preload: preload,
        create: create,
        update: update
    }
);
var time = 40;
var platforms;
var player;
var cursors;
var bananas;
var left=false;
var right=false;
var up=false;
var pause_label;
var menu;
var w = 800, h = 800;
var buttonright;
var buttonleft;
var buttonup;
var score;
var scoreText;
var timerText;
var itemsAmount = 20;
function preload(){
    game.load.image('sky', 'source/bg5.jpg');
    game.load.image('ground','source/5-Ground.png');
    game.load.image('menu', 'source/menu.png');
    game.load.image('step','source/ground.png');
    game.load.image('middleStep','source/100ground.png');
    game.load.image('smallStep','source/30ground.png');
    game.load.image('200step','source/200ground.png');
    game.load.image('banana','source/banana.gif');
    game.load.image('buttonL','source/buttonLeft.png');
    game.load.image('buttonR','source/buttonRight.png');
    game.load.image('buttonU','source/buttonUp.png');
    game.load.spritesheet('minion', 'source/minion2.png', 48, 48)
}
function create(){
    score = 0;

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.tileSprite(0, 0, 800, 800, 'sky');
    game.world.setBounds(0, 0, 800, 800);

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

    var ledge = platforms.create(400, 590, '200step');
    ledge.body.immovable = true;
    ledge = platforms.create(200, 515, 'smallStep');
    ledge.body.immovable = true;
    ledge = platforms.create(-150, 440, 'step');
    ledge.body.immovable = true;
    ledge = platforms.create(200, 315, 'middleStep');
    ledge.body.immovable = true;
    ledge = platforms.create(250, 115, 'smallStep');
    ledge.body.immovable = true;
    ledge = platforms.create(400, 100, 'middleStep');
    ledge.body.immovable = true;
    ledge = platforms.create(600, 415, '200step');
    ledge.body.immovable = true;
    ledge = platforms.create(700, 165, 'step');
    ledge.body.immovable = true;
    ledge = platforms.create(510, 295, 'smallStep');
    ledge.body.immovable = true;
    ledge = platforms.create(0, 150, 'middleStep');
    ledge.body.immovable = true;

    player = game.add.sprite(32, game.world.height - 150, 'minion');
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
        var banana = bananas.create(i * Math.floor(Math.random()*(40-38) + 38), 0, 'banana');
        banana.body.gravity.y = 250;
        banana.body.bounce.y = 0.4 + Math.random() * 0.1;
    }

    soundClick('source/sounds/Minion Hehehe Sound Effect.mp3');
    soundClick('source/sounds/Minion.mp3');

    timerText = game.add.text(680, 0, 'Time: 40', {fontSize:'32px', fill: '#CCC'});
    timerText.fixedToCamera = true;
    scoreText = game.add.text(0,0, 'Score: 0', {fontSize:'32px', fill: '#CCC'});
    scoreText.fixedToCamera = true;
    game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);

    menu = game.add.sprite(160, 150, 'menu');
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
                    changeLevel('5.html');
                }
                else if (choisemap[choise] == 'two'){
                    changeLevel('LevelsPage.html');
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
function update(){
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(bananas, platforms);
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
        player.body.velocity.y = -310;
    }
}
function collectStar (player, banana) {
    banana.kill();
    score+=10;
    scoreText.text = 'Score: ' + score;
    if (score === itemsAmount*10){
        scoreText.text = 'You win!';
        setTimeout(changeLevel('6.html'),3000);
    }
}
function changeLevel(str){
    document.location.href=str;
}
function updateCounter() {
    if (time == 0) {
        scoreText.text = 'You lose!';
        setTimeout(changeLevel('5.html'),5000);
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

function gofull() { game.scale.startFullScreen(false);}