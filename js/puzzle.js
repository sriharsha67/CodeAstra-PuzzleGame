
verticalBoxNum = 4;
horizontalBoxNum = 6;

$(document.body).append('<div id="board"></div>');

var boxCounter = 0;
for(var i = 0; i < verticalBoxNum; i++) {

  $('#board').append('<div id="row'+ i +'"></div>');

  for(var j = 0; j < horizontalBoxNum; j++) {
    $('#board').append('<div id="box'+ boxCounter +'" class="box"></div>');
    $('#box'+boxCounter).css('background-image', 'url(../tiles/tile_'+boxCounter+'.jpg)');
    $('#box'+boxCounter).css('background-repeat', 'no-repeat');
    $('#box'+boxCounter).css('background-size', '100% 100%');
    boxCounter++;
  }
}

$('.box').css('width', $('#board').width() / 6)
$('.box').css('height', $('#board').height() / 4)

