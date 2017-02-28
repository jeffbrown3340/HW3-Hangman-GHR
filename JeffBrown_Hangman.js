// declare game variables and initialize
var gameState = "pregame"
var puzzleDisplaytext = document.getElementById("puzzle-state-text");
var puzzleSolution = ["j", "e", "n", "n", "i", "f", "e", "r", " ", "l", "a", "w", "r", "e", "n", "c", "e"];
var puzzleState = [];
var userInput = "";
var userTries = 0;
var userTriesAllowed = 12;

document.onkeyup = function(event) {
  userInput = event.key;
  gameHandler(userInput);
}

function gameHandler(input) {
  if (gameState === "pregame") {
    gameState = "midgame";
    puzzleState = initState(puzzleSolution);
    puzzleDisplaytext.textContent = "Guess a letter now, we'll see if it's in the puzzle.";
  } else if (gameState === "midgame") {
    input = input.toLowerCase();
    if (checkInputAZ(input)) {
      puzzleState = puzzleHandler(puzzleSolution, puzzleState, input);
      puzzleDisplaytext.textContent = writePuzDisTxt(puzzleSolution, puzzleState);
    }
  }
}

function checkInputAZ(input) {
  if (input >= "a" && input <= "z") {
    return true;
  }

}

function initState(solution) {
  // initialize state with false, length of solution
  tbufState = [];
  for (i = 0; i < solution.length; i++) {tbufState.push(false)}
  return tbufState;
}

function writePuzDisTxt(solution, state) {
    // return text representation of current puzzle state
    var tempBuffer = "";
    for (i = 0; i < solution.length; i++) {
      if (state[i]) {
        tempBuffer = tempBuffer + solution[i] +" ";
      } else {
        tempBuffer = tempBuffer + "_ ";
      }
    }
    return tempBuffer;
}

function puzzleHandler(solution, state, guess) {
  // returns state of puzzle after choice
  // array of booleans equal length of solution
  // true if a letter has been matched, false if not
  // if passed state is empty, initialize all false length of solution
  for (i = 0; i < solution.length; i++) {
    if (solution[i] === guess) {
      state[i] = true;
    } 
  }
  return state;
}