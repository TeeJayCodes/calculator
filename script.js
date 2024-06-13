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
    switch (operator) {
        case 'add':
            return add(firstNumber, secondNumber);
        case 'subtract':
            return subtract(firstNumber, secondNumber);
        case 'multiply':
            return multiply(firstNumber, secondNumber);
        case 'divide':
            return divide(firstNumber, secondNumber);
    }
}

//enable and disable buttons
function disableButton(button) {
    button.classList.add("disableButton");
    button.classList.remove("enableButton");
}

function enableButton(button) {
    button.classList.add("enableButton");
    button.classList.remove("disableButton");
}

//highlight selected operator button
function highlightButton(button) {
    button.classList.add("highlightButton");
}

function removeHighlight(button) {
    button.classList.remove("highlightButton");
}

//check if any operator button is highlighted
function checkForActiveOperator() {
    return operatorActive = PLUS.classList.contains("highlightButton") || MINUS.classList.contains("highlightButton") || MULTIPLY.classList.contains("highlightButton") || DIVIDE.classList.contains("highlightButton");
}

//clear the display
function clearDisplay() {
    displayValue.textContent = "";
}

//enable and disable buttons based on the display value
function disableOrEnableCBDButtons() {
    //display is empty
    if(displayValue.textContent == "") {
        disableButton(CLEAR);
        disableButton(BACKSPACE);
        enableButton(DECIMAL);
    //decimal has already been used while inputting the first number
    } else if ((displayValue.textContent.includes(".")) && operatorActive == false ) {
        enableButton(CLEAR);
        enableButton(BACKSPACE);
        disableButton(DECIMAL);
    //decimal has already been used while inputting the first number and an operator is selected
    } else if (displayValue.textContent.includes(".") && (secondNumber === "") && operatorActive == true) {
        enableButton(CLEAR);
        enableButton(BACKSPACE);
        enableButton(DECIMAL);
    //display is not blank and does not contain a decimal
    } else if (!(displayValue.textContent.includes(".")) && !(displayValue.textContent == "")) {
        enableButton(CLEAR);
        enableButton(BACKSPACE);
        enableButton(DECIMAL);
    } else if (displayValue.textContent.includes(".") && (!(secondNumber === "")) && (operatorActive == true)) {
        enableButton(CLEAR);
        enableButton(BACKSPACE);
        disableButton(DECIMAL);
    }
}

//update the display based on the button clicked
function updateDisplay() {
    disableOrEnableCBDButtons();
    numButton.forEach(button => button.addEventListener("click", function() {
        checkForActiveOperator();
        if (operatorActive == false) {
            displayValue.textContent += button.textContent;
            firstNumber = Number(displayValue.textContent);
        } else if ((operatorActive == true) && (secondNumber === "") ) {
            displayValue.textContent = button.textContent;
            secondNumber = Number(displayValue.textContent);
        } else if ((operatorActive == true) && (!(secondNumber === "")) ) {
            displayValue.textContent += button.textContent;
            secondNumber = Number(displayValue.textContent);
        }
        disableOrEnableCBDButtons();
    }));
    operatorButton.forEach(button => button.addEventListener("click", function() {
        //evaluate current expression if there is one, before changing operators
        if (operatorActive) {
            displayValue.textContent = operate(currentOperator, firstNumber, secondNumber);
            if (displayValue.textContent.includes(".")) {
                displayValue.textContent = Math.round((Number(displayValue.textContent) + Number.EPSILON) * 100000) / 100000;
            } 
            firstNumber = Number(displayValue.textContent);
            secondNumber = "";
        }

        switch (button.textContent) {
            case '+':
                currentOperator = 'add';
                break;
            case '-':
                currentOperator = 'subtract';
                break;
            case '*':
                currentOperator = 'multiply';
                break;
            case '÷':
                currentOperator = 'divide';
                break;
        }
        operatorButton.forEach(button => removeHighlight(button));
        highlightButton(button);
        checkForActiveOperator();
        disableOrEnableCBDButtons();
    }));
    EQUALS.addEventListener("click", function() {
        if (secondNumber == "") {
            //do nothing
        } else {
            operatorButton.forEach(button => removeHighlight(button));
            displayValue.textContent = operate(currentOperator, firstNumber, secondNumber);
            firstNumber = Number(displayValue.textContent);
            secondNumber = "";
            checkForActiveOperator();
            //limit decimal to 5 places
            if (displayValue.textContent.includes(".")) {
                displayValue.textContent = Math.round((Number(displayValue.textContent) + Number.EPSILON) * 100000) / 100000;
                firstNumber = Number(displayValue.textContent);
            } 
        }
        disableOrEnableCBDButtons();
    })
    DECIMAL.addEventListener("click", function() {
        checkForActiveOperator();
        if ((displayValue.textContent.includes(".")) ) {
            //do nothing
        } else {
            if (operatorActive == false) {
                displayValue.textContent += DECIMAL.textContent;
                firstNumber = Number(displayValue.textContent); 
            } else if ((operatorActive == true) && (secondNumber === "") ) {
                displayValue.textContent = DECIMAL.textContent;
                secondNumber = Number(displayValue.textContent);
            } else if ((operatorActive == true) && (!(secondNumber === "")) ) {
                displayValue.textContent += DECIMAL.textContent;
                secondNumber = Number(displayValue.textContent);
            }
        }
        disableOrEnableCBDButtons();
    });
    CLEAR.addEventListener("click", function() {
        clearDisplay();
        firstNumber = "";
        secondNumber = "";
        currentOperator = "";
        operatorButton.forEach(button => removeHighlight(button));
        checkForActiveOperator()
        disableOrEnableCBDButtons();
    });
    BACKSPACE.addEventListener("click", function() {
        displayValue.textContent = displayValue.textContent.substring(0, displayValue.textContent.length - 1); 
        disableOrEnableCBDButtons();
    });
}



//variables used to populate the display when a button is clicked
let firstNumber = "";
let secondNumber = "";
let currentOperator = "";
let displayValue = document.querySelector(".display > p");
let numButton = document.querySelectorAll(".numButton");
let operatorButton = document.querySelectorAll(".operatorButton");
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
let operatorActive = false;

//run updateDisplay function when page loads
updateDisplay();