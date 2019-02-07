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

var button;
var text;
var title1;
var title2;

function preload() {
    game.load.image('main', 'source/menuBackground.jpg');
    game.load.image('minions', 'source/minionspng.png');
    game.load.image('gru', 'source/gru.png');
    game.load.spritesheet('start', 'source/Button.png', 129, 138);
}

function create(){
    game.stage.backgroundColor = '#EAB237';
    game.add.sprite(300, 0, 'main');
    game.add.sprite(50, 200, 'minions');
    game.add.sprite(950, 200, 'gru');

    game.physics.startSystem(Phaser.Physics.ARCADE);

    text = game.add.text(790, 720, '\u00A92018 ALL RIGHTS RESERVED', {fontSize:'16px', fill: '#000'});
    text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);

    title1 = game.add.text(0,0, 'Travel    Run    Collect');
    var grd = text.context.createLinearGradient(0, 0, 0, title1.height);
    grd.addColorStop(0, '#6ACDA2');
    grd.addColorStop(1, '#21AA6C');
    title1.font = 'Arial Black';
    title1.fontSize = 100;
    title1.fontWeight = 'bold';
    title1.fill = grd;
    title1.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);

    button = game.add.button(game.world.centerX - 50, 550, 'start', actionOnClick, this, 0, 1, 2);
    game.physics.arcade.enable(button);
    button.onInputOver.add(over, this);
    button.onInputOut.add(out, this);
    button.onInputUp.add(up, this);
    
    soundClick('source/sounds/tadaaa.mp3');


}

function update(){
}

function actionOnClick () {
    changeLevel('LevelsPage.html');
}

function up() {
    console.log('button up', arguments);
}

function over() {
    console.log('button over');
}

function out() {
    console.log('button out');
}

function changeLevel(str){
    document.location.href=str;
}

function soundClick(str) {
    var audio = new Audio();
    audio.src = str;
    audio.autoplay = true;
}