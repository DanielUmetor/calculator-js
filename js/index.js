// Calculator logic
let currentNumber = '';
let previousNumber = '';
let operation = undefined;

const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

function clear() {
    currentNumber = '';
    previousNumber = '';
    operation = undefined;
    display.textContent = '0';
}

function deleteNumber() {
    currentNumber = currentNumber.toString().slice(0, -1);
    if (currentNumber === '') {
        display.textContent = '0';
    } else {
        display.textContent = currentNumber;
    }
}

function appendNumber(number) {
    if (number === '.' && currentNumber.includes('.')) return;
    currentNumber = currentNumber.toString() + number.toString();
    display.textContent = currentNumber;
}

function chooseOperation(op) {
    if (currentNumber === '') return;
    if (previousNumber !== '') {
        calculate();
    }
    operation = op;
    previousNumber = currentNumber;
    currentNumber = '';
}

function calculate() {
    let result;
    const prev = parseFloat(previousNumber);
    const curr = parseFloat(currentNumber);

    if (isNaN(prev) || isNaN(curr)) return;

    switch (operation) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '*':
            result = prev * curr;
            break;
        case '/':
            result = prev / curr;
            break;
        case '%':
            result = prev % curr;
            break;
        default:
            return;
    }

    currentNumber = result;
    operation = undefined;
    previousNumber = '';
    display.textContent = result;
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.dataset.number) {
            appendNumber(button.dataset.number);
        } else if (button.dataset.operation) {
            chooseOperation(button.dataset.operation);
        }
    });
});

document.getElementById('equals').addEventListener('click', calculate);
document.getElementById('clear').addEventListener('click', clear);
document.getElementById('delete').addEventListener('click', deleteNumber);
