let num1, num2, displayLength;
let operator = null;
let solution = null;

const overallDisplay = document.querySelector('.overall');
const currentDisplay = document.querySelector('.currentInput');
const numBtns = document.querySelectorAll('.num');
const operatorBtns = document.querySelectorAll('.operator');
const clearBtn = document.querySelector('.clr');
const deleteBtn = document.querySelector('.del');
const dotBtn = document.querySelector('.dot');
const equalsBtn = document.querySelector('.equals');

// Operation
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

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case 'x':
            return multiply(a, b);
        case '÷':
            if(b === 0) return 'Error';
            return divide(a, b);
        default:
            return null;
    }
}

// Functions
function count(){
    displayLength = currentDisplay.textContent.length;
}

function resetDisplay(){
    currentDisplay.textContent = ''
}

function clearDisplay(){
    overallDisplay.textContent = '';
    currentDisplay.textContent = '0';
    num1 = '';
    num2 = '';
    operator = null;
}

function deleteInput(){
    if(displayLength === 1){
        currentDisplay.textContent = '0'
    } else {
        currentDisplay.textContent = currentDisplay.textContent.slice(0, -1);
        count();
        // console.log(displayLength)
    }
}

function addNumber(number){
    if(currentDisplay.textContent === '0') resetDisplay();
    currentDisplay.textContent += number;
    count();
}

function addOperator(sign){
    num1 = currentDisplay.textContent;
    operator = sign;
    overallDisplay.textContent = `${num1} ${operator}`
    resetDisplay()
}

function solve(){
    num2 = currentDisplay.textContent;
    overallDisplay.textContent = `${num1} ${operator} ${num2}`
    solution = operate(operator, num1, num2);
    resetDisplay();
    currentDisplay.textContent = solution;
}

// Buttons
clearBtn.addEventListener('click', clearDisplay);
deleteBtn.addEventListener('click', deleteInput);

equalsBtn.addEventListener('click', solve)


numBtns.forEach(btn => {
    btn.addEventListener('click', () => addNumber(btn.textContent))
});

operatorBtns.forEach(btn => {
    btn.addEventListener('click', () => addOperator(btn.textContent))
})