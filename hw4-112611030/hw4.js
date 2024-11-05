"use strict";

let html = `
<header>
    <h1>樂透開獎</h1>
</header>
<main>
`;

for(let i = 0; i < 6; i++){
    html += `<div id="ball${i + 1}" class="ball">00</div>`;
}

html += `</main>`;
document.write(html);

let aBall = document.getElementsByClassName("ball");
let number = [];

for(let i = 0; i < 6; i++){
    let timer = setInterval(function(){
        let ball;

        do{
            ball = Math.ceil(Math.random() * 49);
        }while(number.includes(ball));

        number[i] = ball;
        aBall[i].innerText = ball < 10 ? '0' + ball : ball;
    }, 50);

    setTimeout(function(){
        clearInterval(timer);
        aBall[i].style.backgroundColor = '#dc5f00';
    }, 5000 + i * 1000);
}
