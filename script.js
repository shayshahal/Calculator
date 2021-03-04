function add(x, y)
{
    return +x + +y;
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
function operate(x, op, y)
{
    const decider = {
        '+': add, 
        '-': subtract,
        '×': multiply,
        '÷': divide
    }
    return decider[op](x, y);
}
function opDisplay(e)
{
    let regex = /[-+×\\.÷]/;
    let str = display.innerText;
    let exp = e.target.innerText;
    if(regex.test(exp))
    {
        if(regex.test(str.slice(-1))){return;}
        if(str.length === 0){return;}
        if(exp == ".")
            if(/[0-9]+[\\.][0-9]+$/.test(str)){console.log("bla"); return;}
    }
    display.innerText = display.innerText.concat(e.target.innerText);
}
function clearDisplay()
{
    display.innerText = "";
}
function convertMultiplyDivide(arr)
{
    let res = 0;
    while(arr.length >= 3)
    {
        res = operate(arr.shift(), arr.shift(), arr.shift());
        arr.unshift(res);
    }
    return res;
}
function convertToMath(str)
{
    let nums = str.split(/[+]|(?=[-][0-9]+)/g);
    console.log(nums);
    function mapper(x)
    {
        let regex = /[×÷]|([0-9]+[.]?[0-9]?)/g
        if(x.match(regex).length >= 3)
        {
            console.log(nums);
            let arr = x.split(/(?=[×÷])|(?<=[×÷])/g);
            return convertMultiplyDivide(arr);
        }
        else
        {
            return x;
        }
    }
    let res = nums.map(mapper);
    return res.reduce((acc, x) => +acc + +x);
}
function giveResult()
{
    let str = display.innerText;
    display.innerText = convertToMath(str);
}
const display = document.getElementById("display");

const operators = document.querySelectorAll('button[class="exp"]');
operators.forEach(op => op.addEventListener("click", opDisplay));

const clear = document.getElementById("clear");
clear.addEventListener("click", clearDisplay);

const equal = document.getElementById("equal");
equal.addEventListener("click", giveResult);