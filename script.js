function multiply(x, y)
{
    return x * y;
}
function divide(x,  y)
{
    return x / y;
}
function operate(x, op, y)
{
    console.log(x, op, y);
    const decider = {
        '×': multiply,
        '÷': divide
    }
    return decider[op](x, y);
}
function opDisplay(e)
{
    let opRegex = /[-+×\\.÷]/;
    let numRegex = /[0-9]/
    let str;
    (ansDisplay.textContent == "" || opRegex.test(expDisplay.textContent.slice(-1))) 
    ? 
        str = expDisplay.textContent 
    : 
        str = ansDisplay.textContent;
    let exp = e.target.textContent;
    if(opRegex.test(exp))
    {
        if(opRegex.test(str.slice(-1))){return;}
        if(str.length === 0){return;}   
        if(exp == ".")
        {
            if(/[0-9]+[\\.][0-9]+$/.test(str)){return;}
        }
    }
    else if(ansDisplay.textContent !== "")
    {
        if(numRegex.test(str.slice(-1)) || ansDisplay.textContent === "ERROR")
        {
            str = "";
        }
    }
    expDisplay.textContent = str.concat(exp);
    ansDisplay.textContent =  "";
}
function clearDisplay()
{
    expDisplay.textContent = "";
    ansDisplay.textContent = "";
}
function clearLast()
{   
    expDisplay.textContent = expDisplay.textContent.slice(0, -1);
}
function convertMultiplyDivide(arr)
{
    let res = 0;
    while(arr.length >= 3)
    {
        res = operate(arr.shift(), arr.shift(), arr.shift());
        arr.unshift(res);
    }
    if(res % 1 !== 0)
        res = +res.toFixed(10);
    return res;
}
function convertToMath(str)
{
    let nums = str.split(/[+]|(?=[-][0-9]+)/g);
    function mapper(x)
    {
        let regex = /[×÷]|([0-9]+[.]?[0-9]?)/g
        if(x.match(regex).length >= 3)
        {
            let arr = x.split(/(?=[×÷])|(?<=[×÷])/g);
            return convertMultiplyDivide(arr);
        }
        else
        {
            return x;
        }
    }
    let res = nums.map(mapper);
    console.log(res);
    return res.reduce((acc, x) => +acc + +x);
}
function giveResult()
{
    let str = expDisplay.textContent;
    let opRegex = /[-+×\\.÷]/;
    let zeroDivideRegex = /[÷][0]+/;
    if(zeroDivideRegex.test(str))
    {
        ansDisplay.textContent = "ERROR";
        return;
    }
    if(!opRegex.test(str.slice(-1)) && str.length !== 0)
    {
        let res = convertToMath(str);
        ansDisplay.textContent = res;
    }
}
function pressKey(e)
{
    if (e.keyCode === 13) {
        e.preventDefault();
    }
    const key = document.querySelector(`button[data-key="${e.keyCode}"]`);
    if(key)
    {
        key.click();
    }
}
const expDisplay = document.getElementById("exp-display");
const ansDisplay = document.getElementById("ans-display");
const operators = document.querySelectorAll('.exp');
operators.forEach(op => op.addEventListener("click", opDisplay));

const clear = document.getElementById("clear");
clear.addEventListener("click", clearDisplay);

const dlt = document.getElementById("delete");
dlt.addEventListener("click", clearLast);

const equal = document.getElementById("equal");
equal.addEventListener("click", giveResult);

window.addEventListener('keydown', pressKey);