//basic math operator functions
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, firstNumber, secondNumber) {
    return operator(firstNumber, secondNumber);
}

//variables for each part of the calculator operation
let firstNumber;
let operator;
let secondNumber;