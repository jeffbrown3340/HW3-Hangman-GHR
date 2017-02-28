      var gameState = "Not Started"
      var puzzleDisplaytext = document.getElementById("puzzle-state-text");


      var famoKyians = ["j", "e", "n", "n", "i", "f", "e", "r"];
      var userGuess = "";
      var arrayIndex = -1;
      var userGuessLower = "";
      document.onkeyup = function(event) {
      	if (gameState === "Not Started") {
      		console.log("82-85 Fired");
          gameState = "MidGame";
		      puzzleDisplaytext.textContent = "Guess a letter now, we'll see if its in the puzzle.";
        } else {
        	console.log("87 Fired");
        	userGuess = event.key;
        	userGuessLower = userGuess.toLowerCase();
            puzzleDisplaytext.textContent = event.key;
        	arrayIndex = famoKyians.indexOf(userGuessLower);
            if (arrayIndex === -1) {
	            alert("index is negative one");
	        } else {
	            alert("index is " + arrayIndex);
	        }
	     }
      }