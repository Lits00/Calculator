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

// Formula
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

// Operations/Steps
function count(){
    displayLength = currentDisplay.textContent.length;
}

function resetDisplay(){
    currentDisplay.textContent = '';
}

function clearDisplay(){
    overallDisplay.textContent = '';
    currentDisplay.textContent = '0';
    num1 = '';
    num2 = '';
    operator = null;
    solution = null;
}

function newSet(){
    overallDisplay.textContent = '';
    currentDisplay.textContent = '';
    num1 = '';
    num2 = '';
    operator = null;
    solution = null;
}

function deleteInput(){
    if(displayLength === 1 || currentDisplay.textContent == '0'){
        currentDisplay.textContent = '0';
    } else {
        currentDisplay.textContent = currentDisplay.textContent.slice(0, -1);
        count();
    }
}

function addNumber(number){
    if(currentDisplay.textContent === '0') resetDisplay();
    if(solution !== null) newSet();
    if (Number(currentDisplay.textContent) >= 1e10) return;
    if (Number(currentDisplay.textContent + number) >= 1e10 || Number(currentDisplay.textContent + number) <= -1e10) {
        currentDisplay.textContent = (Number(currentDisplay.textContent + number)).toExponential(6);
    } else {
        currentDisplay.textContent += number;
    }
    count();
}

function addOperator(sign){
    if(operator !== null) solve();
    num1 = currentDisplay.textContent;
    operator = convertKey(sign);
    overallDisplay.textContent = `${num1} ${operator}`;
    resetDisplay();
    solution = null;
}

function placeDot(){
    if(currentDisplay.textContent.includes('.')) return;
    currentDisplay.textContent += '.';
}

function solve(){  
    if(operator === null) return;
    num2 = currentDisplay.textContent;
    overallDisplay.textContent = `${num1} ${operator} ${num2}`;
    solution = operate(operator, num1, num2);
    resetDisplay();
    if (solution === Infinity || solution === -Infinity || isNaN(solution)) {
        currentDisplay.textContent = 'Error';
    } else if (solution >= 1e10 || solution <= -1e10) {
        currentDisplay.textContent = solution.toExponential(6);
    } else if (solution % 1 !== 0 || solution.toString().length > 12) {
        currentDisplay.textContent = Number(solution).toFixed(2);
    } else {
        currentDisplay.textContent = solution;
        
    }
    operator = null;
}

function convertKey(inputKey){
    if(inputKey === '*'){
        return 'x';
    } else if(inputKey === '/'){
        return '÷';
    } else {
        return inputKey;
    }
}

// Button click
clearBtn.addEventListener('click', clearDisplay);
deleteBtn.addEventListener('click', deleteInput);
dotBtn.addEventListener('click', placeDot);
equalsBtn.addEventListener('click', solve);


numBtns.forEach(btn => {
    btn.addEventListener('click', () => addNumber(btn.textContent));
});

operatorBtns.forEach(btn => {
    btn.addEventListener('click', () => addOperator(btn.textContent));
})

// Keyboard press
document.addEventListener('keydown', function(event) {
    if(event.key >= 0 && event.key <=9){
        addNumber(event.key);
    } else if(event.key == '+' || event.key == '-' || event.key == '*' || event.key == '/'){
        addOperator(event.key);
    } else if(event.key === 'Escape'){
        clearDisplay();
    } else if(event.key === 'Backspace'){
        deleteInput();
    } else if(event.key === '.'){
        placeDot();
    } else if(event.key === '=' || event.key === 'Enter'){
        solve();
    } else {
        return
    }
})