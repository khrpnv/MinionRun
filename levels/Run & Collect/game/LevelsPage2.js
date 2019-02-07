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

var button1;
var button2;
var button3;
var button4;
var button5;
var button6;
var button7;
var buttonNext;
var buttonPrev;
var text;
var title1;
var title2;
var title3;
var title4;
var title5;
var title6;
var title7;
var bg;

function preload() {
    game.load.spritesheet('main', 'source/background2.png',1456, 749);
    game.load.image('gru', 'source/gru.png');
    game.load.spritesheet('btn', 'source/minionBtn.png', 200, 150);
    game.load.spritesheet('next', 'source/nextBtn.png', 70, 70);
    game.load.spritesheet('previous', 'source/btnPrev.png', 70, 70);
}

function create(){
    game.stage.backgroundColor = '#EAB237';

    soundClick('source/sounds/sound2.mp3');

    bg = game.add.sprite(0, 0, 'main');
    bg.animations.add('lights');
    bg.animations.play('lights', 12, true);

    button1 = game.add.button(0, 300, 'btn', function(){changeLevel('8.html')}, this, 0, 1, 2);
    game.physics.arcade.enable(button1);
    button1.onInputOver.add(over1, this);
    button1.onInputOut.add(out1, this);
    button1.onInputUp.add(up, this);

    button2 = game.add.button(250, 400, 'btn', function(){changeLevel('9.html')}, this, 0, 1, 2);
    game.physics.arcade.enable(button2);
    button2.onInputOver.add(over2, this);
    button2.onInputOut.add(out2, this);
    button2.onInputUp.add(up, this);

    button3 = game.add.button(250, 200, 'btn', function(){changeLevel('10.html')}, this, 0, 1, 2);
    game.physics.arcade.enable(button3);
    button3.onInputOver.add(over3, this);
    button3.onInputOut.add(out3, this);
    button3.onInputUp.add(up, this);

    button7 = game.add.button(1000, 300, 'btn', function(){changeLevel('14.html')}, this, 0, 1, 2);
    game.physics.arcade.enable(button7);
    button7.onInputOver.add(over7, this);
    button7.onInputOut.add(out7, this);
    button7.onInputUp.add(up, this);

    button6 = game.add.button(750, 200, 'btn', function(){changeLevel('13.html')}, this, 0, 1, 2);
    game.physics.arcade.enable(button6);
    button6.onInputOver.add(over6, this);
    button6.onInputOut.add(out6, this);
    button6.onInputUp.add(up, this);

    button5 = game.add.button(750, 400, 'btn', function(){changeLevel('12.html')}, this, 0, 1, 2);
    game.physics.arcade.enable(button5);
    button5.onInputOver.add(over5, this);
    button5.onInputOut.add(out5, this);
    button5.onInputUp.add(up, this);

    button4 = game.add.button(500, 300, 'btn', function(){changeLevel('11.html')}, this, 0, 1, 2);
    game.physics.arcade.enable(button4);
    button4.onInputOver.add(over4, this);
    button4.onInputOut.add(out4, this);
    button4.onInputUp.add(up, this);

    buttonNext = game.add.button(1120, 670, 'next', function(){changeLevel('LevelsPage3.html')}, this, 0, 1, 2);
    game.physics.arcade.enable(buttonNext);

    buttonPrev = game.add.button(10, 670, 'previous', function(){changeLevel('LevelsPage.html')}, this, 0, 1, 2);
    game.physics.arcade.enable(buttonPrev);

}

function update(){
}

function up() {
    console.log('button up', arguments);
}

function over1() {
    title1 = game.add.text(35,440,'Level 8');
    title1.font = 'Arial';
    title1.fontWeight = 'bold';
    title1.fontSize = 40;

    var grd = title1.context.createLinearGradient(0, 0, 0, title1.height);
    grd.addColorStop(0, '#50A8C3');
    grd.addColorStop(1, '#B7F7DB');

    title1.fill = grd;
}

function over2() {
    title2 = game.add.text(285,540,'Level 9');
    title2.font = 'Arial';
    title2.fontWeight = 'bold';
    title2.fontSize = 40;

    var grd = title2.context.createLinearGradient(0, 0, 0, title2.height);
    grd.addColorStop(0, '#EB3349');
    grd.addColorStop(1, '#F45C43');

    title2.fill = grd;
}

function over3() {
    title3 = game.add.text(285,340,'Level 10');
    title3.font = 'Arial';
    title3.fontWeight = 'bold';
    title3.fontSize = 40;

    var grd = title3.context.createLinearGradient(0, 0, 0, title3.height);
    grd.addColorStop(0, '#FE6404');
    grd.addColorStop(1, '#FF00AA');

    title3.fill = grd;
}

function over7() {
    title7 = game.add.text(1035,440,'Level 14');
    title7.font = 'Arial';
    title7.fontWeight = 'bold';
    title7.fontSize = 40;

    var grd = title7.context.createLinearGradient(0, 0, 0, title7.height);
    grd.addColorStop(0, '#FA7099');
    grd.addColorStop(1, '#FEE040');

    title7.fill = grd;
}

function over6() {
    title6 = game.add.text(785,340,'Level 13');
    title6.font = 'Arial';
    title6.fontWeight = 'bold';
    title6.fontSize = 40;

    var grd = title6.context.createLinearGradient(0, 0, 0, title6.height);
    grd.addColorStop(0, '#FF2EFE');
    grd.addColorStop(1, '#FE147E');

    title6.fill = grd;
}

function over5() {
    title5 = game.add.text(785,540,'Level 12');
    title5.font = 'Arial';
    title5.fontWeight = 'bold';
    title5.fontSize = 40;

    var grd = title5.context.createLinearGradient(0, 0, 0, title5.height);
    grd.addColorStop(0, '#F9E627');
    grd.addColorStop(1, '#FF7221');

    title5.fill = grd;
}

function over4() {
    title4 = game.add.text(535,440,'Level 11');
    title4.font = 'Arial';
    title4.fontWeight = 'bold';
    title4.fontSize = 40;

    var grd = title4.context.createLinearGradient(0, 0, 0, title4.height);
    grd.addColorStop(0, '#F9DF16');
    grd.addColorStop(1, '#FDFDF5 ');

    title4.fill = grd;
}

function out4() {
    title4.destroy();
}


function out5() {
    title5.destroy();
}

function out6() {
    title6.destroy();
}

function out7() {
    title7.destroy();
}

function out3() {
    title3.destroy();
}

function out1() {
    title1.destroy();
}

function out2() {
    title2.destroy();
}
function changeLevel(str){
    document.location.href=str;
}
function soundClick(str) {
    var audio = new Audio();
    audio.src = str;
    audio.autoplay = true;
}

