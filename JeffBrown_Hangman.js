var gameState = "Not Started"
var puzzleDisplaytext = document.getElementById("puzzle-state-text");
var puzzleSolution = ["j", "e", "n", "n", "i", "f", "e", "r"];
var puzzleState = [];
var userGuess = "";
document.onkeyup = function(event) {
  if (gameState === "Not Started") {
    gameState = "MidGame";
    puzzleState = initState(puzzleSolution);
    puzzleDisplaytext.textContent = "Guess a letter now, we'll see if its in the puzzle.";
  } else {
    userGuess = event.key;
    userGuess = userGuess.toLowerCase();
    puzzleState = puzzleHandler(puzzleSolution, puzzleState, userGuess);
    puzzleDisplaytext.textContent = writePuzDisTxt(puzzleSolution, puzzleState);
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