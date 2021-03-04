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
function modolu(x, y)
{
    return x % y;
}
function operate(x, op, y)
{
    const decider = {
        '+': add, 
        '-': subtract,
        '×': multiply,
        '÷': divide,
        '%': modolu
    }
    return decider[op](x, y);
}
function opDisplay(e)
{
    
    let opRegex = /[-+%×\\.÷]/;
    let numRegex = /[0-9]/
    let str;
    (ansDisplay.innerHTML === '&nbsp;') 
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
    else if(ansDisplay.innerHTML !== '&nbsp;')
    {
        if(numRegex.test(str.slice(-1)))
        {
            str = '';
        }
    }
    expDisplay.textContent = str.concat(exp);
    ansDisplay.innerHTML = "&nbsp;";
}
function clearDisplay()
{
    expDisplay.innerHTML = '&nbsp;';
    ansDisplay.innerHTML = "&nbsp;";
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
        let regex = /[×÷%]|([0-9]+[.]?[0-9]?)/g
        if(x.match(regex).length >= 3)
        {
            console.log(nums);
            let arr = x.split(/(?=[×÷%])|(?<=[×÷%])/g);
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
    let str = expDisplay.innerText;
    ansDisplay.innerText = convertToMath(str);
}
function pressKey(e)
{
    console.log("bla");
    const key = document.querySelector(`button[data-key="${e.keyCode}"]`);
    key.click();
}
const expDisplay = document.getElementById("exp-display");
const ansDisplay = document.getElementById("ans-display");
const operators = document.querySelectorAll('button[class="exp"]');
operators.forEach(op => op.addEventListener("click", opDisplay));

const clear = document.getElementById("clear");
clear.addEventListener("click", clearDisplay);

const equal = document.getElementById("equal");
equal.addEventListener("click", giveResult);

window.addEventListener('keydown', pressKey)