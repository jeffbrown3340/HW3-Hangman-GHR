var dataKyans = [
  {"name":"Jennifer Lawrence", "hint":'Actress - Katness in "The Hunger Games"'},
  {"name":"Ashley Judd", "hint":'Actress - "Kiss the Girls" and "Double Jeopardy"'},
  {"name":"George Clooney", "hint":'Actor - Oceans Eleven and Gravity'},
  {"name":"Johnny Depp", "hint":'Actor - Captain Jack Sparrow'},
  {"name":"Mitch McConnell", "hint":'US Senate Majority Leader'},
  {"name":"Mohammed Ali", "hint":'Athlete - aka "The Greatest", Cassius Clay'},
  {"name":"Secretariat", "hint":'Triple Crown winner 1973, retired to stud at Claiborne Farm'},
  {"name":"Jim Bowie", "hint":'Hero of the Alamo, inventor of the Bowie Knife'},
  {"name":"Duncan Hines", "hint":'restaurant guide publisher, best known for cake mixes'},
  {"name":"Hunter S Thompson", "hint":'Founder of Gonzo Journalism'},
  {"name":"Diane Sawyer", "hint":'ABC Good Morning America host, television journalist'},
  {"name":"Abraham Lincoln", "hint":'Sixteenth US President, his visage is on the penny'},
  {"name":"Pat Riley", "hint":'Miami Heat former Head Coach and current Team President'}]
var gameState = "pregame";
var myNBSP = String.fromCharCode(160);
var priorGuesses = "";
var priorGuessesText = document.getElementById("prior-guesses-text");
var puzzleHintText = document.getElementById("puzzle-hint-text");
var puzzleDisplayText = document.getElementById("puzzle-state-text");
var puzzleState = [];
var puzzleStatusText = document.getElementById("puzzle-status-text");
var triesRemainingText = document.getElementById("tries-remaining-text");
var userInput = "";
var userLosses = 0;
var userTries = 12;
var userWins = 0;
var currSolution;

document.onkeyup = function(event) {
  var userInputKeyCode = event.keyCode;
  if (userInputKeyCode != 32 && (userInputKeyCode < 65 || userInputKeyCode > 90)) {return}
  if (gameState === "midgame" && userInputKeyCode === 32) {return}
  if (gameState === "pregame" && userInputKeyCode >= 65 && userInputKeyCode <= 90) {return}
  if (userInputKeyCode === 32) {
    gameState = "pregame";
    console.log("37");
    gameHandler();
  } else {
    userInput = String.fromCharCode(userInputKeyCode).toLowerCase();
    if (priorGuesses.length > 0 && priorGuesses.indexOf(userInput) >= 0) {return};
    if (userTries <= 0) {return}
    gameHandler(userInput);
  }
}

function stringToArray(solutionString) {
  var tempBuff0 = [];
  for (i = 0; i < solutionString.length; i++) {
    tempBuff0.push(solutionString.charAt(i).toLowerCase());
  }
  return tempBuff0;
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
    priorGuesses = "";
    userTries = 12;
    currSolution = dataKyans[Math.floor(Math.random() * dataKyans.length)]
    puzzleSolution = stringToArray(currSolution.name);
    puzzleSolution = solutionFormatter(puzzleSolution);
    puzzleState = initState(puzzleSolution);
    puzzleHintText.textContent = currSolution.hint;
    puzzleStatusText.textContent = writePuzDisTxt(puzzleSolution, puzzleState);
    puzzleDisplayText.textContent = "Start guessing letters now, we'll see if they're in the puzzle.";
    triesRemainingText.textContent = "Tries remaining = " + userTries
    gameState = "midgame";
  } else if (gameState === "midgame") {
    puzzleState = attemptHandler(puzzleSolution, puzzleState, input);
    puzzleStatusText.textContent = writePuzDisTxt(puzzleSolution, puzzleState);
    if (userTries <= 0) {
      puzzleStatusText.textContent = "Oops, you've run out of tries ... Game over.";
      puzzleDisplayText.textContent = "Correct answer = " + currSolution.name;
      userLosses++;
      triesRemainingText.textContent = "Wins = " + userWins + ", Losses = " + userLosses;
      priorGuessesText.textContent = "Hit the spacebar to play again";
      gameState = "pregame"
    } else {
      if (isWinner(puzzleSolution, puzzleState)) {
        puzzleDisplayText.textContent = "Winner! Great job!";
        puzzleStatusText.textContent = currSolution.name;
        userWins++;
        triesRemainingText.textContent = "Wins = " + userWins + ", Losses = " + userLosses;
        priorGuessesText.textContent = "Hit the spacebar to play again";
        gameState = "pregame"
      } else {
        puzzleDisplayText.textContent = "Keep guessing ...";
        triesRemainingText.textContent = "Tries remaining = " + userTries
        priorGuessesText.textContent = priorGuesses;
      }
    }
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

function attemptHandler(solution, state, guess) {
  // returns state of puzzle after choice
  // array of booleans equal length of solution
  // true if a letter has been matched, false if not
  // if passed state is empty, initialize all false length of solution
  var guessSuccess = false;
  for (i = 0; i < solution.length; i++) {
    if (solution[i] === guess) {
      if (state[i] === false) {
        state[i] = true;
      }
      guessSuccess = true;
    }
  }
  if (guessSuccess === false) {
    userTries--;
    priorGuesses = priorGuesses + myNBSP + guess + ",";
  }
  return state;
}