var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var click = 0; // number of times a color was clicked
var bool = false; // used to say if user input was correct or not

// game start from pressing any key
// using .one only takes in the first keypress
// but we need to restart when game over so we need to make an if statement and not use .one
$(document).on("keypress", function() {
  
  // if user keeps pressing buttons BEFORE they start or AFTER losing, statement will restart userClickedPattern
  if(userClickedPattern.length > 0){
    userClickedPattern = [];
  }
  
  if (!started) {
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// when a button is clicked it will save the id and put it in userClickedPattern
$(".btn").on("click", function(e) {
  var userChosenColor = (e.target.id);
  userClickedPattern.push(userChosenColor);
  click++;

  playSound(userChosenColor);
  animatePress(userChosenColor);


  // CHECKING
  // wait until user has finished inputting, then check
  if (gamePattern.length === click) {
    for (var i = 0; i < gamePattern.length; i++) {
      if (gamePattern[i] === userClickedPattern[i]) {
        console.log("success");
        bool = true;
      }
      else {
        console.log("wrong");
        bool = false;
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();

        // changes background color to red for a bit
        $("body").addClass("game-over");
        setTimeout(function() {
          $("body").removeClass("game-over");
        }, 200);

        // changes h1 to "game over"
        $("h1").text("Game Over, Press Any Key to Restart");

        startOver();
        break; // as soon as you mess up you stop the for loop
      }
    }
    // if completed correctly start new sequence
    if (bool === true) {
      setTimeout(nextSequence, 1000);
      userClickedPattern = []; // resets the user's sequence
    }
  }
});

function nextSequence() {
  level++;
  click = 0; // start counting number of clicks after the given
  $("h1").text("Level " + level);

  // chooses a random selection from buttonColors and puts it in gamePattern
  var randomChosenColor = buttonColors[Math.floor(Math.random() * 4)];
  gamePattern.push(randomChosenColor);

  // selects the button with the same id as randomChosenColor
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function playSound(name) {
  // plays audio when next sequence is chosen or when button is pressed
  var myAudio = new Audio("sounds/" + name + ".mp3");
  myAudio.play();
}

// adds the class "pressed" into the button being pressed, shades the color
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// RESTART
function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
  bool = false;
}
