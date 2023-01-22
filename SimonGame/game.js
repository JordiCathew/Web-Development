var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var score = -1;

$(document).keydown(function() {
    // If the game hasn't started yet we start it.
    if (!gameStarted){
        gameStarted = true;
        /* Show sequence */
        nextSequence();
    }
});

// Adding event listener and triggering handler function.
$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    // Play the sound of the clicked button.
    playSound(userChosenColor);
    // Animate button
    animatePress(userChosenColor);

    //Check that the user didn't messed up.
    var last_index = userClickedPattern.lastIndexOf(userChosenColor);
    checkSequence(last_index);
});


function nextSequence() {
    // We increase the level (score)
    score += 1;
    $("h1").text("Score: " + score);
    
    // Choose new pattern
    var random = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[random];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    // Play the sound
    playSound(randomChosenColor);
}

function playSound(name) {
    var pathSound = "sounds/" + name + ".mp3";
    var audioColor = new Audio(pathSound);
    audioColor.play();
}

function animatePress(currentColor){
    $("." + currentColor).addClass("pressed");
    setTimeout(function(){
        $("." + currentColor).removeClass("pressed");
    }, 100);

}


function checkSequence(i){
    if (userClickedPattern[i] != gamePattern[i]) {
        failedSequence();
    }
    else {
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                userClickedPattern = [];
                nextSequence();
            }, 1000);
        }
    }
}

function failedSequence(){
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart.");
    startOver();
}

function startOver(){
    score = -1;
    gamePattern = [];
    gameStarted = false;
    userClickedPattern = [];
}