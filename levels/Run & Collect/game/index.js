function getter(id){
    return document.getElementById(id);
}
function soundClick(str) {
    var audio = new Audio();
    audio.src = str;
    audio.volume = 0.2;
    audio.autoplay = true;
}
soundClick('source/soundtrack.mp3');
var ids = ['11m','21m','31m','41m','51m','61m','71m','12m','22m','32m','42m','52m','62m','72m','13m','23m','33m','43m','53m','63m','73m','14m','24m','34m','44m','54m','64m','74m'];
var counter = 0;
var amount = 9;
var colors = ['#9ED112','#50B517','#486EAF','#179067','#9F49AC','#CC42A2','#FF3BA7','#FF8100','#FF5800','#FEAC00','#FFCC01','#960E53','#5C1293','#F3796C','#658D3C','#1A4C8B','#93114C','#6775DD','#BCBD1A','#FED612','#990066','#660099','#336699','#008000','#CCCC00'];
getter('startGame').onclick = function play() {
    var copy = [];
    var combine = [];
    for (var i = 0; i < ids.length; i++){
        copy[i] = ids[i];
    }
    for (var j = 0; j < amount; j++){
        var num = Math.floor(Math.random()*copy.length);
        combine[j] = copy[num];
        copy.splice(num,1);
        getter(''+combine[j]).style.backgroundColor = '' + colors[num];
    }
};
setTimeout(function subs(){
    getter('main').style.display = 'none';
    getter('subs').style.display = 'block';
}, 4000);

var vid = getter('entrance');
var lose = getter('lose1');

$(".sub").click(function () {
    var id = $(this).attr('id');
    var id1 = '' + id + 'm';
    if ($("#" + id1).css("background-color") !== 'rgb(255, 255, 255)' && this.id[this.id.length-1] != '*') {
        $(this).css("background-color", $("#" + id1).css("background-color"));
        counter++;
        this.id +='*';
    }
    else if ($("#" + id1).css("background-color") == 'rgb(255, 255, 255)'){
        getter('lose1').style.display = 'block';
        getter('container').style.display = 'none';
        lose.autoplay = true;
        lose.load();
        setTimeout(function change(){getter('lose1').style.display = 'none';}, 6500);
        setTimeout(function change(){getter('container').style.display = 'block';}, 6500);
        getter('main').style.display = 'block';
        getter('subs').style.display = 'none';
    }
    if (counter === amount){
        getter('container').style.display = 'none';
        vid.autoplay = true;
        vid.load();
        getter('entrance').style.display = 'block';
        setTimeout(function change(){window.location.href = window.location.pathname + window.location.search + window.location.hash;}, 8000);
    }
});
getter('restartGame').onclick = function () {
    window.location.href = window.location.pathname + window.location.search + window.location.hash;
};