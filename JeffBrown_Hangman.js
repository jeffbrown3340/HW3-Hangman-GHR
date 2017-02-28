// declare game variables and initialize
var gameState = "pregame"
var myNBSP = String.fromCharCode(160);
var puzzleDisplaytext = document.getElementById("puzzle-state-text");
var puzzleStatustext = document.getElementById("puzzle-status-text");
var puzzleSolution = ["j", "e", "n", "n", "i", "f", "e", "r", " ", "l", "a", "w", "r", "e", "n", "c", "e"];
var puzzleState = [];
var userInput = "";
var userTries = 0;
var userTriesAllowed = 12;

document.onkeyup = function(event) {
  userInput = event.key;
  gameHandler(userInput);
}

function isWinner(solution, state) {
  var tempBoo = true;
  for (i = 0; i < solution.length && tempBoo; i++) {
    tempBoo = tempBoo && state[i];
  }
  return tempBoo;
}

function solutionFormatter(solution) {
  // changes ascii 32 spaces to nbsp
  for (i = 0; i < solution.length; i++) {
    if (solution[i] === " ") {
      solution[i] = myNBSP;
    }
  }
  return solution;
}

function gameHandler(input) {
  if (gameState === "pregame") {
      gameState = "midgame";
      puzzleSolution = solutionFormatter(puzzleSolution);
      puzzleState = initState(puzzleSolution);
      puzzleStatustext.textContent = writePuzDisTxt(puzzleSolution, puzzleState);
      puzzleDisplaytext.textContent = "Start guessing letters now, we'll see if they're in the puzzle.";
  } else if (gameState === "midgame") {
      input = input.toLowerCase();
      if (checkInputAZ(input)) {
        puzzleState = puzzleHandler(puzzleSolution, puzzleState, input);
        puzzleStatustext.textContent = writePuzDisTxt(puzzleSolution, puzzleState);
        if (isWinner(puzzleSolution, puzzleState)) {
          puzzleDisplaytext.textContent = "Winner! Great job!";
        } else {
          puzzleDisplaytext.textContent = "Keep guessing ...";
        }
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
  // note -- solution must be already solutionFormatted
  tbufState = [];
  for (i = 0; i < solution.length; i++) {
    if (solution[i] === myNBSP) {
      tbufState.push(true);
    } else {
      tbufState.push(false);
    }
  }
  return tbufState;
}

function writePuzDisTxt(solution, state) {
    // return text representation of current puzzle state
    var tempBuffer = "";
    for (i = 0; i < solution.length; i++) {
      if (state[i]) {
        tempBuffer = tempBuffer + solution[i] + myNBSP;
      } else {
        tempBuffer = tempBuffer + "_" + myNBSP;
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