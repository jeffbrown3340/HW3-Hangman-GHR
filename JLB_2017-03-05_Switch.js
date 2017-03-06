var kcSpace = 32;
var kcA = 65;
var kcB = 66;
var kcC = 67;
var kcD = 68;
var kcE = 69;
var kcZ = 90;

var ctr = 0;

document.onkeyup = function(event) {
	var kc = event.keyCode;
	ctr++;
    str = "";
    switch(kc) {
    	case kcSpace:
    		str = "<b>Spacebar</b>";
    	case kcA:
            if (str === "") {str = "<b>A</b>"}
        case kcB:
            if (str === "") {str = "<b>B</b>"}
        case kcC:
        case kcD:
        case kcE:
            if (str === "") {str = "<b>(multi-case) C, D, or E</b>"}
    	case kcZ:
            if (str === "") {str = "<b>Z</b>"}
            str = str + " was pressed, taking advantage of non-breaking prior clauses"
    		break;
	    default:
		    str = "some other key pressed";
    }
  document.getElementById("div00").innerHTML = str + " (iteration #" + ctr + ")";
}