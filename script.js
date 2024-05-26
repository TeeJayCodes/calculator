//basic math operator functions
function add(firstNumber, secondNumber) {
    return firstNumber + secondNumber;
}

function subtract(firstNumber, secondNumber) {
    return firstNumber - secondNumber;
}

function multiply(firstNumber, secondNumber) {
    return firstNumber * secondNumber;
}

function divide(firstNumber, secondNumber) {
    return firstNumber / secondNumber;
}

function operate(operator, firstNumber, secondNumber) {
    return operator(firstNumber, secondNumber);
}

//enable and disable buttons
function disableButton(button) {
    button.style.opacity = "0.33";
}

function enableButton(button) {
    button.style.opacity = "1";
}

//enable and disable buttons based on the display value
function checkForValue() {
    if(displayValue.textContent == "") {
        disableButton(CLEAR);
        disableButton(BACKSPACE);
        enableButton(DECIMAL);
    } else if ((displayValue.textContent.includes("."))) {
        enableButton(CLEAR);
        enableButton(BACKSPACE);
        disableButton(DECIMAL);
    } else if (!(displayValue.textContent.includes(".") && displayValue.textContent == "")) {
        enableButton(CLEAR);
        enableButton(BACKSPACE);
        enableButton(DECIMAL);
    }
}


//update the display based on the button clicked
function updateDisplay() {
    checkForValue();
    numButton.forEach(button => button.addEventListener("click", function() {
        displayValue.textContent += button.textContent;
        checkForValue();
    }));
    DECIMAL.addEventListener("click", function() {
        if(!(displayValue.textContent.includes("."))) {
            displayValue.textContent += ".";
            checkForValue();
        }
    });
    CLEAR.addEventListener("click", function() {
        displayValue.textContent = "";
        checkForValue();
    });
    BACKSPACE.addEventListener("click", function() {
        displayValue.textContent = displayValue.textContent.substring(0, displayValue.textContent.length - 1);
        checkForValue();
    });
}


//variables used to populate the display when a button is clicked
let displayValue = document.querySelector(".display > p");
let numButton = document.querySelectorAll(".numButton");
const ZERO = document.querySelector("#zero");
const DECIMAL = document.querySelector("#decimal");
const EQUALS = document.querySelector("#equals");
const PLUS = document.querySelector("#plus");
const ONE = document.querySelector("#one");
const TWO = document.querySelector("#two");
const THREE = document.querySelector("#three");
const MINUS = document.querySelector("#minus");
const FOUR = document.querySelector("#four");
const FIVE = document.querySelector("#five");
const SIX = document.querySelector("#six");
const MULTIPLY = document.querySelector("#multiply");
const SEVEN = document.querySelector("#seven");
const EIGHT = document.querySelector("#eight");
const NINE = document.querySelector("#nine");
const DIVIDE = document.querySelector("#divide");
const CLEAR = document.querySelector("#clear");
const BACKSPACE = document.querySelector("#backspace");


//run updateDisplay function when page loads
updateDisplay();

