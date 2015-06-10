
$(document).ready(init);
window.addEventListener("resize", handleResize);

//namespace for game parameters abd values
var gameParams = function() {

  //defaults
  var rows = 4, columns = 6;
  var shuffledImages=[];
  var shuffledImagesMap={};
  var sortedImages=[];
  var swapStack = [];

  return {

    "columns": function() { return columns },
    "setColumns": function(numColumns) { columns = numColumns; },

    "rows": function() { return rows },
    "setRows": function(numRows) { rows = numRows; },

    "shuffledImages" : shuffledImages,

    "shuffledImagesMap" : shuffledImagesMap,

    "sortedImages" : sortedImages,

    "swapStack" : swapStack
  }

}();


function getImages() {
  for (var i = 0; i < gameParams.rows()*gameParams.columns(); i++) {
    image = 'url(tiles/tile_'+i+'.jpg)'
    gameParams.sortedImages.push(image);
    gameParams.shuffledImages.push(image);
  }
}


function generateHTML() {
  $(document.body).append('<div id="board"></div>');
  $('#board').append('<div id="win"></div>');
  $('#board').append('<div id="mouseover"></div>');
  $('#mouseover').append('<a href="#" id="shuffle">Shuffle</a><a href="#" id="undo">Undo</a>');
  $('#win').append('<div id="win_text">YOU WIN!</div>');
  getImages();
  generateGrid();
  shuffleImages();
}


function generateGrid() {
  var boxCounter = 0;
  for (var i = 0; i < gameParams.rows(); i++) {
  
    $('#board').append('<div id="row'+ i +'"></div>');
  
    for(var j = 0; j < gameParams.columns(); j++) {
      $('#board').append('<div id="box'+ boxCounter +'" class="box"></div>');
      $('#box'+boxCounter).css('background-image', gameParams.shuffledImages[boxCounter]);
      gameParams.shuffledImagesMap['#box'+boxCounter] = gameParams.shuffledImages[boxCounter];
      boxCounter++;
    }
  }
}


//shuffle the images
function shuffleImages() {
  gameParams.shuffledImages.sort(function() { return 0.5 -Math.random() });
  for (boxCounter = 0; boxCounter < gameParams.shuffledImages.length; boxCounter++) {
    $('#box'+boxCounter).css('background-image', gameParams.shuffledImages[boxCounter]);
  }
  handleResize();
}


function init() {
  console.log("dbg 1");
  generateHTML();
  console.log("dbg 2");
  handleResize();
  console.log("dbg 3");
  $('#shuffle').click(function(event) {
      shuffleImages(); 
    }
  )
$('.box').click(handleClick);
}


function handleClick() {
  $('#win').css('visibility', 'hidden');
  gameParams.swapStack.push('#'+$(this).attr('id'));
  console.log(gameParams.swapStack);
  if (gameParams.swapStack.length == 2) {
    bgImage0 = $(gameParams.swapStack[0]).css('background-image');
    bgImage1 = $(gameParams.swapStack[1]).css('background-image');
    if (bgImage0 != bgImage1) {
      $(gameParams.swapStack[0]).css('background-image', bgImage1);
      $(gameParams.swapStack[1]).css('background-image', bgImage0);

      temp = gameParams.shuffledImagesMap[gameParams.swapStack[0]];
      gameParams.shuffledImagesMap[gameParams.swapStack[0]] = gameParams.shuffledImagesMap[gameParams.swapStack[1]];
      gameParams.shuffledImagesMap[gameParams.swapStack[1]] = temp;

      checkWin();
    }
    gameParams.swapStack=[];
  }
}


function checkWin() {
  gameImages = [];
  for (key in gameParams.shuffledImagesMap) {
    gameImages.push(gameParams.shuffledImagesMap[key]);
  }
  if (gameImages.toString()==gameParams.sortedImages.toString()) {
    console.log("WIN!");
    $('#win').css('visibility', 'visible');
  }
}


function handleResize() {
  $('.box').css('width', $('#board').width() / gameParams.columns());
  $('.box').css('height', $('#board').height() / gameParams.rows());
}

