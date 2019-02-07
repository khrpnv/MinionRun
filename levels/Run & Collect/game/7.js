var game = new Phaser.Game(
    900,
    750,
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
var pause_label;
var menu;
var w = 900, h = 750;
var bananas;
var score;
var scoreText;
var timerText;
var itemsAmount = 25;
var extraItems = Math.floor(itemsAmount*0.5 + 1);
function preload(){
    game.load.image('sky', 'source/bg6-7.jpg');
    game.load.image('menu', 'source/menu.png');
    game.load.image('ground','source/5-Ground.png');
    game.load.image('ground','source/underground.png');
    game.load.image('step','source/ground.png');
    game.load.image('100step','source/100ground.png');
    game.load.image('30step','source/30ground.png');
    game.load.image('200step','source/200ground.png');
    game.load.image('70step','source/70ground.png');
    game.load.image('banana','source/apple.png');
    game.load.spritesheet('minion', 'source/minion2.png', 48, 48)
}
function create(){
    score = 0;

    game.add.tileSprite(0, 0, 900, 900, 'sky');
    game.world.setBounds(0, 0, 900, 900);

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

    var ledge = platforms.create(350, 580, '200step');
    ledge.body.immovable = true;
    ledge = platforms.create(-170, 580, 'step');
    ledge.body.immovable = true;
    ledge = platforms.create(320, 660, '100step');
    ledge.body.immovable = true;
    ledge = platforms.create(230, 750, '70step');
    ledge.body.immovable = true;
    ledge = platforms.create(-120, 720, 'step');
    ledge.body.immovable = true;
    ledge = platforms.create(840, 570, '200step');
    ledge.body.immovable = true;
    ledge = platforms.create(550, 760, 'step');
    ledge.body.immovable = true;
    ledge = platforms.create(800, 660, '200step');
    ledge.body.immovable = true;
    ledge = platforms.create(610, 490, '100step');
    ledge.body.immovable = true;
    ledge = platforms.create(610, 650, '70step');
    ledge.body.immovable = true;
    ledge = platforms.create(670, 400, '70step');
    ledge.body.immovable = true;
    ledge = platforms.create(680, 230, '70step');
    ledge.body.immovable = true;
    ledge = platforms.create(830, 325, 'step');
    ledge.body.immovable = true;
    ledge = platforms.create(350, 420, '100step');
    ledge.body.immovable = true;
    ledge = platforms.create(180, 500, '70step');
    ledge.body.immovable = true;
    ledge = platforms.create(0, 395, '30step');
    ledge.body.immovable = true;
    ledge = platforms.create(284, 230, '200step');
    ledge.body.immovable = true;
    ledge = platforms.create(-140, 250, 'step');
    ledge.body.immovable = true;
    ledge = platforms.create(-170, 144, 'step');
    ledge.body.immovable = true;
    ledge = platforms.create(150, 320, '70step');
    ledge.body.immovable = true;
    ledge = platforms.create(190, 100, '100step');
    ledge.body.immovable = true;
    ledge = platforms.create(430, 95, '70step');
    ledge.body.immovable = true;
    ledge = platforms.create(600, 90, '100step');
    ledge.body.immovable = true;
    ledge = platforms.create(840, 100, '70step');
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
        var banana = bananas.create(i * Math.floor(Math.random()*(35-30) + 30), 340, 'banana');
        banana.body.gravity.y = 250;
        banana.body.bounce.y = 0.4 + Math.random() * 0.1;
    }

    for (var j = 0; j < extraItems; j++)
    {
        banana = bananas.create(j * Math.floor(Math.random()*(70-68) + 68), 0, 'banana');
        banana.body.gravity.y = 250;
        banana.body.bounce.y = 0.4 + Math.random() * 0.1;
    }

    soundClick('source/sounds/tadaaa.mp3');
    soundClick('source/sounds/Minion.mp3');

    menu = game.add.sprite(200, 150, 'menu');
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
                    changeLevel('7.html');
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


    timerText = game.add.text(780, 0, 'Time: 60', {fontSize:'32px', fill: '#000'});
    timerText.fixedToCamera = true;
    scoreText = game.add.text(0,0, 'Score: 0', {fontSize:'32px', fill: '#CCC'});
    scoreText.fixedToCamera = true;
    game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);

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
        setTimeout(changeLevel('8.html'),3000);
    }
}
function changeLevel(str){
    document.location.href=str;
}
function updateCounter() {
    if (time == 0) {
        scoreText.text = 'You lose!';
        setTimeout(changeLevel('7.html'),5000);
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