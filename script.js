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
