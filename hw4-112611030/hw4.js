"use strict";

let html = `
<header>
    <h1>樂透開獎</h1>
</header>
<main>
`;

for (let i = 0; i < 6; i++) {
    html += `<div id="ball${i + 1}" class="ball">00</div>`;
}

html += `</main>`;
document.write(html);

let aBall = document.getElementsByClassName("ball");
let timers = [];

for (let i = 0; i < 6; i++) {
    timers[i] = setInterval(function () {
        let ball = Math.ceil(Math.random() * 49) + 1;
        aBall[i].innerText = ball < 10 ? '0' + ball : ball;
    }, 50);

    setTimeout(function () {
        clearInterval(timers[i]);
        aBall[i].style.backgroundColor = '#dc5f00';
    }, 5000 + i * 1000);
}
