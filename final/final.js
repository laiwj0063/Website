"use strict";

let combo = 0;
let comboMax = 0;
let score = 0;
let perfectTotal = 0;
let greatTotal = 0;
let goodTotal = 0;
let badTotal = 0;
let missTatal = 0;

let html = `
<div id="startScreen">
    <h1>Welcome to the Rhythm Game</h1>
    <p>Press "Start" to begin the game!</p>
    <button id="startButton">Start</button>
</div>
<div id="gameScreen">
    <div id="barContainer">
        <div id="barD" class="bar"></div>
        <div id="barF" class="bar"></div>
        <div id="barJ" class="bar"></div>
        <div id="barK" class="bar"></div>
    </div>
    <div class="judgement-line"></div>
    <div id="judge"></div>
    <div id="combo">0</div>
    <div id="score">0</div>
</div>
<div id="endScreen">
    <h1><span id="finalScore">0</span></h1>
    <p>Combo: <span id="finalCombo">0</span></p></br>
    <p>Perfect: <span id="perfectCount">0</span></p></br>
    <p>Great: <span id="greatCount">0</span></p></br>
    <p>Good: <span id="goodCount">0</span></p></br>
    <p>Miss: <span id="missCount">0</span></p></br>
    <button id="restartButton">Restart</button>
</div>`;
document.body.innerHTML = html;

const tracks = {
    D: [100, 3100, 3950, 7100, 10000, 11125, 11500, 11875, 13375, 18050,
        21250, 24450, 26050, 26450, 28450, 29650, 32250, 36250, 36650, 38650,
        40200, 43000, 44200, 45800, 46200, 48200, 51000, 51400, 53400, 55000,
        59000, 61400, 61800, 63000, 64600, 67000, 69400, 72400, 77200, 81200,
        83200, 83600, 86000, 89200, 92400, 94800, 95600, 100400, 102800, 103200
        ],
    F: [1600, 4800, 5550, 7800, 9250, 11125, 13000, 14125, 16425, 19650,
        22050, 25250, 27650, 29250, 30850, 31850, 34650, 35450, 36250, 36650,
        37800, 41800, 43800, 45000, 47800, 48600, 51800, 55400, 56600, 57400,
        58200, 62200, 62600, 64200, 66200, 70200, 71600, 76800, 78000, 80400,
        83200, 85200, 87600, 88400, 90800, 93200, 94000, 97200, 101200, 102400
    ],
    J: [850, 4800, 5550, 8500, 9250, 11500, 12625, 15700, 17175, 20450,
        22850, 26850, 29650, 30050, 31850, 33050, 33850, 37050, 37450, 37800,
        41000, 42600, 45000, 46600, 47000, 48200, 52600, 54200, 55800, 57400,
        60600, 61400, 61800, 64200, 67800, 68600, 70500, 73200, 74800, 76400,
        79600, 82000, 83600, 90000, 92400, 94000, 98000, 98800, 102000,102400
    ],
    K: [2350, 3100, 3950, 6400, 10000, 11875, 12625, 13000, 13375, 14925,
        18850, 23650, 26050, 26450, 29250, 31450, 32250, 37050, 37450, 38650,
        39400, 43400, 44600, 47400, 47800, 49400, 51000, 51400, 56200, 58200,
        59800, 62200, 62600, 63800, 64600, 65400, 70800, 74000, 75600, 78800,
        82800, 84400, 86800, 91600, 93200, 94800, 96400, 99600, 102800, 103200
    ],
};

const dropDuration = 3000;
const barHeight = 700; 
const audio_WhatToRaise = new Audio("music/what-to-raise-shin-kawasaki-temporary.mp3");

function Perfect(block){
    judge.showJudge("Perfect");
    combo++;
    perfectTotal++;
    score += 100;
    block.hit();
    updateCombo();
}

function Great(block){
    judge.showJudge("Great");
    combo++;
    greatTotal++;
    score += 80;
    block.hit();
    updateCombo();
}

function Good(block){
    judge.showJudge("Good");
    combo = 0;
    goodTotal++;
    score += 60;
    block.hit();
    updateCombo();
}

function Bad(block){
    judge.showJudge("Good");
    combo = 0;
    badTotal++;
    score += 40;
    block.hit();
    updateCombo();
}

function Miss(){
    judge.showJudge("Miss");
    missTatal++;
    combo = 0;
    updateCombo();
}

function createBlock(barId, delay){
    const bar = document.getElementById(barId);
    const block = document.createElement("div");
    block.className = "moving-block";
    bar.appendChild(block);

    block.style.top = `-${block.offsetHeight}px`;
    block.style.opacity = "1";
    block.style.position = "absolute";
    let hit = false;

    setTimeout(function(){
        block.animate(
            [
                { transform: `translateY(0px)` },
                { transform: `translateY(${barHeight}px)` },
            ],
            {
                duration: dropDuration,
                easing: "linear",
                fill: "forwards",
            }
        ).onfinish = function(){
            if (!hit){
                Miss();
            }
            bar.removeChild(block);
        };
    }, delay);

    block.hit = function(){
        hit = true;
        block.remove();
    };
}

function startGame(){
    for(const [key, blocktime] of Object.entries(tracks)){
        const barId = `bar${key}`;
        blocktime.forEach(function(time){
            createBlock(barId, time);
        });
    }
}

function endGame() {
    document.getElementById("gameScreen").style.display = "none";
    document.getElementById("endScreen").style.display = "flex";

    document.getElementById("finalScore").textContent = score;
    document.getElementById("finalCombo").textContent = comboMax;
    document.getElementById("perfectCount").textContent = perfectTotal;
    document.getElementById("greatCount").textContent = greatTotal;
    document.getElementById("goodCount").textContent = goodTotal;
    document.getElementById("missCount").textContent = missTatal;
}

document.getElementById("startButton").addEventListener("click", function(){
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "flex";
    startGame();

    setTimeout(function(){
        audio_WhatToRaise.play();
    },2000);
    audio_WhatToRaise.onended = endGame;

});

function Judge(){
    const display = document.getElementById("judge");
    let timeout = null;
    
    if(timeout){
    
        clearTimeout(timeout);
    
    }

    function showJudge(result){

        display.textContent = result;
        display.style.opacity = 1;
        setTimeout(function(){
            display.style.opacity = 0;
        }, 2000);

    }

    return { showJudge };
}

const judge = Judge();

function updateCombo(){
    if(combo > comboMax) comboMax = combo;
    document.getElementById("combo").textContent = combo;
    document.getElementById("score").textContent = score;
}

document.addEventListener("keydown", function(e){
    const key = e.key.toUpperCase();
    if (!tracks[key]) return;
    const bar = document.getElementById(`bar${key}`);
    const blocks = bar.querySelectorAll(".moving-block");
    if (blocks.length === 0) return;

    const block = blocks[0];
    const blockRect = block.getBoundingClientRect();
    const judgementLineY = document.querySelector(".judgement-line").getBoundingClientRect().top;

    if (blockRect.bottom >= judgementLineY - 20 && blockRect.bottom <= judgementLineY + 20){
        Perfect(block);
    }else if(blockRect.bottom >= judgementLineY - 40 && blockRect.bottom <= judgementLineY + 40){
        Great(block);
    }else if (blockRect.bottom >= judgementLineY - 50 && blockRect.bottom <= judgementLineY + 50){
        Good(block);
    }else if (blockRect.bottom >= judgementLineY - 70 && blockRect.bottom <= judgementLineY + 70){
        Bad(block);
    }else{
        Miss();
    }
});

document.getElementById("restartButton").addEventListener("click", function(){
    location.reload();
});