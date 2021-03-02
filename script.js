function add(x, y)
{
    return x + y;
}
function subtract(x, y)
{
    return x - y;
}
function multiply(x, y)
{
    return x * y;
}
function divide(x,  y)
{
    return x / y;
}
function operate(x, y, op)
{
    const decider = {
        '+': add, 
        '-': subtract,
        '*': multiply,
        '/': divide
    }
    return decider[op](x, y);
}
const display = document.getElementById("display");
function opDisplay(e)
{
    console.log(e.target.innerText);
    display.innerText = display.innerText.concat(e.target.innerText);
}
const operators = document.querySelectorAll('button[class="op"]');
operators.forEach(op => op.addEventListener("click", opDisplay));