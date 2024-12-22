"use strict";

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
    <div id="judgementResultDisplay"></div>
</div>`;
document.body.innerHTML = html;

// 音符的時間設定
const tracks = {
    D: [1000, 2000, 3000, 4000],
    F: [1500, 2500, 3500, 4500],
    J: [1200, 2200, 3200, 4200],
    K: [1800, 2800, 3800, 4800],
};

// 遊戲參數設定
const dropDuration = 3000; // 方塊下降到底部的時間 (毫秒)
const barHeight = 700;     // 音軌高度 (需與 CSS 一致)
const audio_WhatToRaise = new Audio("music/what-to-raise-shin-kawasaki-temporary.mp3");

// 生成音符方塊
function createBlock(barId, delay) {
    const bar = document.getElementById(barId);
    const block = document.createElement("div");
    block.className = "moving-block";
    bar.appendChild(block);

    // 設定方塊動畫
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
            if (!hit) {
                judge.showJudge("Miss");
            }
            bar.removeChild(block); // 動畫結束後移除方塊
        };
    }, delay);

    block.hit = function () {
        hit = true;
        block.remove();
    };
}

// 遊戲主邏輯
function startGame() {
    for (const [key, blocktime] of Object.entries(tracks)) {
        const barId = `bar${key}`;
        blocktime.forEach(function(time){
            createBlock(barId, time);
        });
    }
}

// 事件監聽器：按下 Start 按鈕時開始遊戲
document.getElementById("startButton").addEventListener("click", function(){
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "flex";
    startGame();

    setTimeout(function(){
        audio_WhatToRaise.play();
    },1000);
});

function Judge() {
    const display = document.getElementById("judgementResultDisplay");

    function showJudge(result) {
        display.textContent = result;
        display.style.opacity = 1;
        setTimeout(function(){
            display.style.opacity = 0;
        }, 500);
    }

    return { showJudge };
}

const judge = Judge();

// 判定功能
document.addEventListener("keydown", function(e){
    const key = e.key.toUpperCase();
    if (!tracks[key]) return; // 如果按鍵無對應音軌，退出
    const bar = document.getElementById(`bar${key}`);
    const blocks = bar.querySelectorAll(".moving-block");
    if (blocks.length === 0) return;

    const block = blocks[0];
    const blockRect = block.getBoundingClientRect();
    const judgementLineY = document.querySelector(".judgement-line").getBoundingClientRect().top;

    if (blockRect.bottom >= judgementLineY - 30 && blockRect.bottom <= judgementLineY + 30) {
        judge.showJudge("Perfect");
        block.hit();
    } else if (blockRect.bottom >= judgementLineY - 60 && blockRect.bottom <= judgementLineY + 60) {
        judge.showJudge("Good");
        block.hit();
    } else {
        judge.showJudge("Miss");
    }
});