
$(document).ready(init);
window.addEventListener("resize", handleResize);

//Provide a ParamsI interface
(function(gameParams) {

  //defaults
  var rows = 4, columns = 6;
  var shuffledImages=[];
  var shuffledImagesMap={};
  var sortedImages=[];
  var swapStack = [];

  gameParams.columns = function() { return columns },
  gameParams.setColumns= function(numColumns) { columns = numColumns; },

  gameParams.rows = function() { return rows },
  gameParams.setRows = function(numRows) { rows = numRows; },

  gameParams.shuffledImages = shuffledImages,

  gameParams.shuffledImagesMap = shuffledImagesMap,

  gameParams.sortedImages = sortedImages,

  gameParams.swapStack = swapStack

})(this.ParamsI={});
//ParamsI is a property of the global scope object. It serves as the interface to this js module.

function getImages() {
  for (var i = 0; i < ParamsI.rows()*ParamsI.columns(); i++) {
    image = 'url(tiles/tile_'+i+'.jpg)'
    ParamsI.sortedImages.push(image);
    ParamsI.shuffledImages.push(image);
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
  for (var i = 0; i < ParamsI.rows(); i++) {
  
    $('#board').append('<div id="row'+ i +'"></div>');
  
    for(var j = 0; j < ParamsI.columns(); j++) {
      $('#board').append('<div id="box'+ boxCounter +'" class="box"></div>');
      $('#box'+boxCounter).css('background-image', ParamsI.shuffledImages[boxCounter]);
      ParamsI.shuffledImagesMap['#box'+boxCounter] = ParamsI.shuffledImages[boxCounter];
      boxCounter++;
    }
  }
}


//shuffle the images
function shuffleImages() {
  ParamsI.shuffledImages.sort(function() { return 0.5 -Math.random() });
  for (boxCounter = 0; boxCounter < ParamsI.shuffledImages.length; boxCounter++) {
    $('#box'+boxCounter).css('background-image', ParamsI.shuffledImages[boxCounter]);
  }
  handleResize();
}


function init() {
  handleResize();
  generateHTML();
  $('#shuffle').click(function(event) {
      shuffleImages(); 
    }
  )
$('.box').click(handleClick);
}


function handleClick() {
  $('#win').css('visibility', 'hidden');
  ParamsI.swapStack.push('#'+$(this).attr('id'));
  console.log(ParamsI.swapStack);
  if (ParamsI.swapStack.length == 2) {
    bgImage0 = $(ParamsI.swapStack[0]).css('background-image');
    bgImage1 = $(ParamsI.swapStack[1]).css('background-image');
    if (bgImage0 != bgImage1) {
      $(ParamsI.swapStack[0]).css('background-image', bgImage1);
      $(ParamsI.swapStack[1]).css('background-image', bgImage0);

      temp = ParamsI.shuffledImagesMap[ParamsI.swapStack[0]];
      ParamsI.shuffledImagesMap[ParamsI.swapStack[0]] = ParamsI.shuffledImagesMap[ParamsI.swapStack[1]];
      ParamsI.shuffledImagesMap[ParamsI.swapStack[1]] = temp;

      checkWin();
    }
    ParamsI.swapStack=[];
  }
}


function checkWin() {
  gameImages = [];
  for (key in ParamsI.shuffledImagesMap) {
    gameImages.push(ParamsI.shuffledImagesMap[key]);
  }
  if (gameImages.toString()==ParamsI.sortedImages.toString()) {
    console.log("WIN!");
    $('#win').css('visibility', 'visible');
  }
}


function handleResize() {
  $('.box').css('width', $('#board').width() / ParamsI.columns());
  $('.box').css('height', $('#board').height() / ParamsI.rows());
}
