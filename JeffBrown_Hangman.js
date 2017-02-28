var arrayIndex = -1;
var famoKyians = [];
var gameState = "Not Started"
var puzzleDisplaytext = document.getElementById("puzzle-state-text");
var puzzleSolution = ["j", "e", "n", "n", "i", "f", "e", "r"];
var puzzleState = [];
var userGuess = "";
var userGuessLower = "";
document.onkeyup = function(event) {
  if (gameState === "Not Started") {
    gameState = "MidGame";
    puzzleState = initState(puzzleSolution);
    puzzleDisplaytext.textContent = "Guess a letter now, we'll see if its in the puzzle.";
  } else {
    userGuess = event.key;
    userGuessLower = userGuess.toLowerCase();
    puzzleState = puzzleHandler(puzzleSolution, puzzleState, userGuessLower);
    puzzleDisplaytext.textContent = writePuzDisTxt(puzzleSolution, puzzleState);
    arrayIndex = famoKyians.indexOf(userGuessLower);
    if (arrayIndex === -1) {
      console.log("index is negative one");
    } else {
      console.log("index is " + arrayIndex);
    }
  }
}

function initState(solution) {
  tbufState = [];
  for (i = 0; i < solution.length; i++) {tbufState.push(false)}
  return tbufState;
}

function writePuzDisTxt(solution, state) {
    var tempBuffer = "";
    console.log("36 state.length = " + state.length);
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