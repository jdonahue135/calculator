function add(x, y) { return x + y; }

function subtract(x, y) { return x - y;}

function multiply(x, y) { return x * y;}

function divide(x, y) { return x / y; }

function operate(operator, x, y) {
    switch(operator) {
        case '+': return add(x, y);
        case '-': return subtract(x, y);
        case '*': return multiply(x, y);
        case '/': return divide(x, y);
    }
}

//Organizes numbers by order of operations
function format(Numbers) {
    for (each in Numbers) {
        number = Numbers[each];
        operator = number.operator
        if (operator == "*" || operator == "/") {
            indexOfNext = Numbers.indexOf(number) + 1;
            result = operate(number.operator, number.value, Numbers[indexOfNext].value);
            Numbers[indexOfNext].value = result;
            Numbers.splice(Numbers.indexOf(number), 1);
            format(Numbers);
        }
    }
    for (each in Numbers) {
        number = Numbers[each];
        operator = number.operator
        if (number.operator == "+" || number.operator == "-") {
            indexOfNext = Numbers.indexOf(number) + 1;
            result = operate(number.operator, number.value, Numbers[indexOfNext].value);
            Numbers[indexOfNext].value = result;
            Numbers.splice(Numbers.indexOf(number), 1);
            format(Numbers);
        }
        if (operator == "=") {
            display.textContent = result;
        }
    }
    //resets display
    Numbers = [];
    displayNumbers = [];
    currentNumber = result;
    displayNumbers.push(currentNumber);
}

const numbers = document.querySelectorAll('input.number');
const display = document.querySelector('div.display');
const operators = document.querySelectorAll('input.operator');
const clear = document.querySelector('input.clear');

function resetData() {
    Numbers= [];
    total = 0;
    displayNumbers = [];
    currentNumber = '';
    display.textContent = 0;
}

// set default display value to 0
var Numbers= [];
var total = 0;
var displayNumbers = [];
var currentNumber = '';

//Create class for digits
class Digit {
    constructor(value, operator) {
        this.value = value;
        this.operator = operator;
    }
}

// populate calculator display
function populateDisplay() {

    //configure clear button
    clear.addEventListener('click', (e) => {
        resetData();
    })
    
    //configure number buttons
    numbers.forEach(number => {
        number.addEventListener('click', (e) => {
            if (number.value == '.') {
                if (currentNumber.includes('.')) {
                    return;
                }
            }
            currentNumber = currentNumber + number.value;
            displayNumbers.push(number.value);
            valueNumbers(displayNumbers);
        })
    })
    
    //configure operator buttons
    operators.forEach(operator => {
        operator.addEventListener('click', (e) => {
            if (currentNumber == '') {
                return;
            }
            var number = new Digit(parseFloat(currentNumber, 10), operator.value);
            Numbers.push(number);
            if (operator.value == '=' && Numbers.length < 2) {
                //don't compute if there isn't a full equation
                Numbers.pop();
                return;
            }
            currentNumber = '';
            if (operator.value == '=') {
                format(Numbers);
            }
            else {
                displayNumbers.push(operator.value);
                valueNumbers(displayNumbers);
            }
        })
    })
}

//Convert arrays to a string for display
function valueNumbers(x) {
    var displayValue = x[0];
    for (y = 1; y < x.length; y++) {
        displayValue = displayValue + x[y];
    }
    display.textContent = displayValue;
}
resetData();
populateDisplay();