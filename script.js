let num1, operator, num2;

// Arithmetic operators
function add(a, b) {
    // console.log(a + b);
    return (a + b);
}

function subtract(a, b) {
    // console.log(a - b);
    return (a - b);
}

function multiply(a, b) {
    // console.log(a * b);
    return (a * b);
}

function divide(a, b) {
    // console.log(a / b);
    return (a / b);
}

// Initiator
function operate(num1, operator, num2) {
    if (operator === '+'){
        add(num1, num2);       
    } else if (operator === '-'){
        subtract(num1, num2)
    } else if (operator === '*'){
        multiply(num1, num2)
    } else if (operator === '/'){
        divide(num1, num2)
    }
}