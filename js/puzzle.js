
$(document).ready(handleResize);

function handleResize() {
  //console.log($('#board').width());
  $('.box').css('width', $('#board').width() / horizontalBoxNum);
  $('.box').css('height', $('#board').height() / verticalBoxNum);
}

verticalBoxNum = 4;
horizontalBoxNum = 6;

var randomImages=[];
for (var i = 0; i < verticalBoxNum*horizontalBoxNum; i++) {
  randomImages.push('url(../tiles/tile_'+i+'.jpg)');
}
randomImages.sort(function() { return 0.5 -Math.random() });

$(document.body).append('<div id="board"></div>');

var boxCounter = 0;
for (var i = 0; i < verticalBoxNum; i++) {

  $('#board').append('<div id="row'+ i +'"></div>');

  for(var j = 0; j < horizontalBoxNum; j++) {
    $('#board').append('<div id="box'+ boxCounter +'" class="box"></div>');
    $('#box'+boxCounter).css('background-image', randomImages[boxCounter]);
    boxCounter++;
  }
}

$('.box').click(handleClick);

var swapStack = [];

function handleClick() {
  console.log($(this).attr('id'));
  swapStack.push('#'+$(this).attr('id'));
  console.log(swapStack);
  if (swapStack.length == 2) {
    bgImage0 = $(swapStack[0]).css('background-image');
    bgImage1 = $(swapStack[1]).css('background-image');
    if (bgImage0 != bgImage1) {
      console.log(bgImage0);
      console.log(bgImage1);
      $(swapStack[0]).css('background-image', bgImage1);
      $(swapStack[1]).css('background-image', bgImage0);
      console.log($(swapStack[0]).css('background-image'));
      console.log($(swapStack[1]).css('background-image'));
    }
    swapStack=[];
  }
}

window.addEventListener("resize", handleResize);
