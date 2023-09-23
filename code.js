"use strict";


let curScreenText = '';
let lastScreenText = '';
let curOperator = null;

const numbersBtns = document.querySelectorAll('.number');
const operatorsBtns = document.querySelectorAll('.operator');
const curScreen = document.querySelector('#cur-screen');
const lastScreen = document.querySelector('#last-screen');
const dotBtn = document.querySelector('.dot');
const equalBtn = document.querySelector('.equal');
const deleteBtn = document.querySelector('#delete');
const clearBtn = document.querySelector('#clear');


numbersBtns.forEach(btn => btn.addEventListener('click' , clickNumBtn));
operatorsBtns.forEach(btn => btn.addEventListener('click' , clickOperatorBtn));
dotBtn.addEventListener('click' , clickDotBtn);
equalBtn.addEventListener('click' , clickEqualBtn);
clearBtn.addEventListener('click' , clearScreen);
deleteBtn.addEventListener('click' , deleteNum);


function clearScreen(){
    setDefaultCurScreen();
    setDefaultlastScreen();
}

function deleteNum(){
    let n = curScreenText.length ;
    if(n > 0){
        curScreenText = curScreenText.slice(0 , n - 1);
        curScreen.textContent = curScreenText;
    }
    else{
        setDefaultCurScreen();
    }
}



const operators = {
    '+' : (a , b) => String(a + b) ,
    '-' : (a , b) => String(a - b) ,
    '*' : (a , b) => String(a * b) ,
    '/' : (a , b) => String(a / b) ,
};

function setDefaultCurScreen(){
    curScreenText = '';
    curScreen.textContent = '0';
}

function setCurScreen(val){
    curScreenText += val;
    curScreen.textContent = curScreenText;
}

function clickNumBtn(){
    setCurScreen(this.id);
}


function forbidenOperation(){
    alert("can't Divide By Zero");
    setDefaultCurScreen();
    setDefaultlastScreen();
    curOperator = null;
}


function clickOperatorBtn(){
    if(curOperator !== null){
        let val = excuteExpression();
        
        if(val === null){
           forbidenOperation();
           return;
        }

        curScreenText = '';
        setCurScreen(val);
    }

    curOperator = this.id;
    setLastScreen();
}

function setDefaultlastScreen(){
    lastScreenText = '';
    lastScreen.textContent = lastScreenText;
}

function setLastScreen(){
    lastScreenText = curScreenText + ' ' + curOperator + ' ';
    lastScreen.textContent = lastScreenText;
    curScreenText = '';
    setCurScreen('');
}

function excuteExpression(){
    lastScreenText += curScreenText;
    let num = lastScreenText.split(` ${curOperator} `);

    if(curOperator === '/' && num[1] === '0'){
        return null;
    }
    else if(num.length === 1) return num[0];

    return operators[curOperator](Number(num[0]) , Number(num[1]));
}


function clickDotBtn(){
    if(!curScreenText.includes('.'))
        setCurScreen('.');
}

function clickEqualBtn(){

    let val = excuteExpression();
        
    if(val === null){
        forbidenOperation();
        return;
    }

    curOperator = null;
    curScreenText = '';
    setCurScreen(val);
    setDefaultlastScreen();

    if(val === '0')
        setDefaultCurScreen();
}










