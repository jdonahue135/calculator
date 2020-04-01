function add(x, y) { return x + y;}

function subtract(x, y) { return x - y;}

function multiply(x, y) { return x * y;}

function divide(x, y) { return x / y; }

function operate(operator, x, y) {
    if (operator == '+') return add(x, y);
    if (operator == '-') return subtract(x, y);
    if (operator == '*') return multiply(x, y);
    if (operator == '/') return divide(x, y);
}

const numbers = document.querySelectorAll('input.number');
const display = document.querySelector('div.display');

// set default display value to 0
var displayValue = 0;

// populate calculator display with numbers
function populateDisplay() {
    var displayNumbers = [];
    
    //make number buttons work
    numbers.forEach(number => {
        number.addEventListener('click', (e) => {
            displayNumbers.push(number.value);
            valueNumbers(displayNumbers);
        })
    })
}

//Convert user input to string for display
function valueNumbers(displayNumbers) {
    displayValue = displayNumbers[0];
    for (x = 1; x < displayNumbers.length; x++) {
        displayValue = displayValue + displayNumbers[x];
    }
    display.textContent = displayValue;
}

populateDisplay();