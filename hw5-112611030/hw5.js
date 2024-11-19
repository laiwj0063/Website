"use strict";
let html = '<div id="letterArea">';

for(let i = 0;i < 30;i++){
    html += `<div id="letter${i}" class="letter"></div>`;
}
html += '</div>';

html += '<div id="keyArea">';
for(let c of 'QWERTYUIOP-ASDFGHJKL=ZXCVBNM'){
    if(c === '-') html += `<button id="BaskSpace" class="key">&#x21a2</button><br>`;
    else if(c === '=') html += `<button id="Enter" class="key">&#x21a9</button><br>`;
    else html += `<button id="Key${c.toUpperCase()}" class="key">${c}</button>`;
}
html += '</div>';

document.getElementById("context").innerHTML = html;

let secret = DICTIONARY[Math.ceil(Math.random()*DICTIONARY.length)].toUpperCase();
let cursor = 0;
let aLetter = document.getElementsByClassName('letter');
let aButton = document.getElementsByClassName('key');

for(let i = 0;i < aButton.length;i++){
    aButton[i].addEventListener('click',function(e){
        aLetter[cursor].innerText = e.target.innerText;
        cursor++;
    })
}

window.addEventListener('keydown',function(e){
    keyProcess(e.code, e.key);
})

function keyProcess(code, key){
    if(code == 'Backspace'){
        aLetter[cursor].innerText = ' ';
        if(cursor % 5 > 0) cursor--;
    } else if(code == 'Enter'){
        if((cursor % 5 == 4) && (!aLetter[cursor] === ' ')){
            let guess;
            for(let i = cursor - 4,ch,j; i < cursor;i++){
                ch = aLetter[i].innerText;
                j = secret.indexOf(ch);
                if(j == -1) document.getElementById('Key'+ch).classList.add('letterGray');
                else if(j == cursor % 5) document.getElementById('Key'+ch).classList.add('letterGreen');
                else document.getElementById('Key'+ch).classList.add('letterYellow');
                guess += ch;
            }console.log(guess);
            if(guess == secret) console.log('Congradulation!');
            else{
                this.console.log('Sad...');
                if(cursor == 29) console.log('Game over...')
            }
        }
    }else{
        aLetter[cursor].innerText = key.toUpperCase();
        cursor++;
    }
}