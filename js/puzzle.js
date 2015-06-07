
$(document).ready(init);

function init() {
  handleResize();
  $('#shuffle').click(function(event) {
      shuffleImages(); 
    }
  )
}

$(document.body).append('<div id="board"></div>');
$('#board').append('<div id="win"></div>');
$('#board').append('<div id="mouseover"></div>');
$('#mouseover').append('<a href="#" id="shuffle">Shuffle</a><a href="#" id="undo">Undo</a>');
$('#win').append('<div id="win_text">YOU WIN!</div>');

window.addEventListener("resize", handleResize);

verticalBoxNum = 4;
horizontalBoxNum = 6;

var shuffledImages=[];
var shuffledImagesMap={};
var sortedImages=[];
var swapStack = [];

for (var i = 0; i < verticalBoxNum*horizontalBoxNum; i++) {
  image = 'url(tiles/tile_'+i+'.jpg)'
  sortedImages.push(image);
  shuffledImages.push(image);
}

shuffleImages();
$('.box').click(handleClick);

//shuffle the images
function shuffleImages() {
  shuffledImages.sort(function() { return 0.5 -Math.random() });
  
  var boxCounter = 0;
  for (var i = 0; i < verticalBoxNum; i++) {
  
    $('#board').append('<div id="row'+ i +'"></div>');
  
    for(var j = 0; j < horizontalBoxNum; j++) {
      $('#board').append('<div id="box'+ boxCounter +'" class="box"></div>');
      $('#box'+boxCounter).css('background-image', shuffledImages[boxCounter]);
      shuffledImagesMap['#box'+boxCounter] = shuffledImages[boxCounter];
      boxCounter++;
    }
  }
  handleResize();
}

function handleClick() {
  $('#win').css('visibility', 'hidden');
  swapStack.push('#'+$(this).attr('id'));
  console.log(swapStack);
  if (swapStack.length == 2) {
    bgImage0 = $(swapStack[0]).css('background-image');
    bgImage1 = $(swapStack[1]).css('background-image');
    if (bgImage0 != bgImage1) {
      $(swapStack[0]).css('background-image', bgImage1);
      $(swapStack[1]).css('background-image', bgImage0);

      temp = shuffledImagesMap[swapStack[0]];
      shuffledImagesMap[swapStack[0]] = shuffledImagesMap[swapStack[1]];
      shuffledImagesMap[swapStack[1]] = temp;

      checkWin();
    }
    swapStack=[];
  }
}

function checkWin() {
  gameImages = [];
  for (key in shuffledImagesMap) {
    gameImages.push(shuffledImagesMap[key]);
  }
  if (gameImages.toString()==sortedImages.toString()) {
    console.log("WIN!");
    $('#win').css('visibility', 'visible');
  }
}

function handleResize() {
  $('.box').css('width', $('#board').width() / horizontalBoxNum);
  $('.box').css('height', $('#board').height() / verticalBoxNum);
}

