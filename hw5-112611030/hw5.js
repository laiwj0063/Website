"use strict";
let html = '<div id="letterArea">';

for(let i = 0;i < 30;i++){
    html += `<div id="letter${i}" class="letter"></div>`;
}
html += '</div>';

html += '<div id="keyArea">';
for(let c of 'QWERTYUIOP-ASDFGHJKL=ZXCVBNM'){
    if(c === '-') html += `<button id="Backspace" class="key">&#x21a2</button><br>`;
    else if(c === '=') html += `<button id="Enter" class="key">&#x21a9</button><br>`;
    else html += `<button id="Key${c.toUpperCase()}" class="key">${c}</button>`;
}
html += '</div>';

document.getElementById("context").innerHTML = html;

let secret = DICTIONARY[Math.ceil(Math.random()*DICTIONARY.length)].toUpperCase();
console.log(secret);
let cursor = 0;
let aLetter = document.getElementsByClassName('letter');
let aButton = document.getElementsByClassName('key');
let Gameover = 0;

for(let i = 0;i < aButton.length;i++){
    aButton[i].addEventListener('click',function(e){
        if(Gameover == 0) keyProcess(e.target.id, e.target.innerText); 
    });
}

window.addEventListener('keydown',function(e){
    if(Gameover == 0) keyProcess(e.code, e.key);
})

function keyProcess(code, key){
    key = key.toUpperCase();
    if(code === 'Backspace'){
        if(aLetter[cursor].innerText === ''){
            if(cursor % 5 > 0) cursor--;
        }
        aLetter[cursor].innerText = '';
    }else if(code === 'Enter'){
        if(cursor % 5 === 4 && [...Array(5).keys()].every(i => aLetter[cursor - i].innerText !== '')){
            let guess = '';
            for(let i = cursor - 4; i <= cursor; i++){
                let ch = aLetter[i].innerText;
                let j = secret.indexOf(ch);
                if(j === -1){
                    aLetter[i].classList.add('letterGray');
                    document.getElementById('Key' + ch).classList.add('letterGray');
                }else if (j === i % 5){
                    aLetter[i].classList.add('letterGreen');
                    document.getElementById('Key' + ch).classList.add('letterGreen');
                }else{
                    aLetter[i].classList.add('letterYellow');
                    document.getElementById('Key' + ch).classList.add('letterYellow');
                }
                guess += ch;
            }
            console.log(guess);
            if(guess === secret){
                console.log('Congratulations!');
                Gameover = 1;
            }else{
                console.log('Sad...');
                if(cursor === 29) console.log('Game over...');
                else cursor++;
            }
        }
    }else{
        if(key >= 'A' && key <= 'Z'){
            aLetter[cursor].innerText = key.toUpperCase();
            if(cursor % 5 < 4)  cursor++;
        }
    }
}