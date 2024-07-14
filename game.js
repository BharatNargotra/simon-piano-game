var gamePatternstring = ['1','2','3','4','5','6','7','8','9']
var gamePattern = [];
var userPressedPattern = [];

var started = false;
var level = 0;

$(document).click(function() {
  if (!started) {
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }
});

document.addEventListener("keydown", function (event) {
  var keyPressed = event.key;
  console.log(event);
  console.log(event.key);
  userPressedPattern.push(keyPressed)
  animatePress(keyPressed);
  playSound(keyPressed);

  checkAnswer(userPressedPattern.length-1);
})

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] == userPressedPattern[currentLevel]) {
    if (userPressedPattern.length == gamePattern.length){
      console.log(userPressedPattern);
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    setTimeout(function (){
    startOver();
    })
    }
}

function nextSequence() {
  userPressedPattern = [];
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 9);
  var randomChosenString = gamePatternstring[randomNumber];
  gamePattern.push(randomChosenString);
  console.log(gamePattern);

  $("#" + randomChosenString).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenString);
}

function animatePress(key) {
  $("#" + key).addClass("pressed");
  setTimeout(function () {
  $("#" + key).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("./sounds/key0" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
