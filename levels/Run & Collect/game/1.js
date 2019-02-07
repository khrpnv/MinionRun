var game = new Phaser.Game(
    600,
    600,
    Phaser.AUTO,
    'game',
    {
        preload: preload,
        create: create,
        update: update
    }
);


var time = 30;
var platforms;
var player;
var cursors;
var bananas;
var score;
var map;
var left=false;
var right=false;
var up=false;
var pause_label;
var menu;
var w = 600, h = 600;
var timerText;
var scoreText;
var itemsAmount = Math.floor(Math.random()*(10 - 7) + 7);
function preload(){
    game.load.image('sky', 'source/Background01.png');
    game.load.image('ground','source/5-Ground.png');
    game.load.image('step','source/ground.png');
    game.load.image('banana','source/banana.gif');
    game.load.image('buttonL','source/buttonLeft.png');
    game.load.image('buttonR','source/buttonRight.png');
    game.load.image('buttonU','source/buttonUp.png');
    game.load.image('menu', 'source/menu.png');
    game.load.spritesheet('minion', 'source/minion2.png', 48, 48)
}
function create() {
    score = 0;

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0, 0, 'sky');

    platforms = game.add.group();
    platforms.enableBody = true;
    var ground = platforms.create(0, game.world.height - 64, 'ground');
    ground.scale.setTo(1, 1);
    ground.body.immovable = true;
    ground = platforms.create(250, game.world.height - 64, 'ground');
    ground.scale.setTo(1, 1);
    ground.body.immovable = true;
    ground = platforms.create(500, game.world.height - 64, 'ground');
    ground.scale.setTo(1, 1);
    ground.body.immovable = true;

    var ledge = platforms.create(400, 400, 'step');
    ledge.body.immovable = true;
    ledge = platforms.create(-100, 100, 'step');
    ledge.body.immovable = true;
    ledge = platforms.create(-50, 350, 'step');
    ledge.body.immovable = true;
    ledge = platforms.create(350, 200, 'step');
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
        var banana = bananas.create(i * 60, 0, 'banana');
        banana.body.gravity.y = 250;
        banana.body.bounce.y = 0.4 + Math.random() * 0.1;
    }

    soundClick('source/sounds/banana (1).mp3');
    soundClick('source/sounds/Minion.mp3');
    timerText = game.add.text(480, 0, 'Time: 30', {fontSize:'32px', fill: '#000'});
    scoreText = game.add.text(0,0, 'Score: 0', {fontSize:'32px', fill: '#000'});
    pause_label = game.add.text(w/2-40, 0, 'Pause', {fontSize:'32px', fill: '#000'});
    pause_label.inputEnabled = true;
    pause_label.events.onInputUp.add(function () {
        game.paused = true;
        menu = game.add.sprite(w / 2, h / 2, 'menu');
        menu.anchor.setTo(0.5, 0.5);
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

                var choise = Math.floor(x / 250) + 3 * Math.floor(y / 250);
                if (choisemap[choise] == 'one'){
                    changeLevel('1.html');
                }
                else if (choisemap[choise] == 'two'){
                    changeLevel('LevelsPage.html');
                }
            }
            else {
                menu.destroy();
                game.paused = false;
            }
        }
    }

    game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);

    cursors = game.input.keyboard.createCursorKeys();
    game.camera.follow(player);
}
function update() {
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(bananas, platforms);
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
    else {
        player.animations.stop();
        player.frame = 4;
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.body.velocity.y = -310;
    }
}
function changeLevel(str){
    document.location.href=str;
}


function collectStar (player, banana) {
    banana.kill();
    score+=10;
    scoreText.text = 'Score: ' + score;
    if (score === itemsAmount*10){
        scoreText.text = 'You win!';
        setTimeout(changeLevel('2.html'),3000);
    }
}

function updateCounter() {
    if (time == 0) {
        scoreText.text = 'You lose!';
        setTimeout(changeLevel('1.html'),3000);
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
