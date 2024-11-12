"use strict";
let html = `<div id="start-screen">
        <h1>Welcome to the Game</h1>
        <p>Press "Start" to begin your adventure!</p>
        <button id="start-button">Start</button>
    </div>

    <!-- 遊戲畫面 -->
    <div id="game-screen">
        <div class="bar-container">
            <div class="bar"></div>
            <div class="label">D</div>
        </div>
        <div class="bar-container">
            <div class="bar"></div>
            <div class="label">F</div>
        </div>
        <div class="bar-container">
            <div class="bar"></div>
            <div class="label">space</div>
        </div>
        <div class="bar-container">
            <div class="bar"></div>
            <div class="label">J</div>
        </div>
        <div class="bar-container">
            <div class="bar"></div>
            <div class="label">K</div>
        </div>
    </div>`;

document.body.innerHTML = html;

// 獲取開始按鈕和畫面元素
const startButton = document.getElementById("start-button");
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");

// 設定每個 bar 的小方塊到達時間
const allTargetTimes = [
    [3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000], // 第一個 bar 的時間
    [2500, 4500, 3000, 2800, 3200, 3000, 3700, 2900, 3100, 3300], // 第二個 bar 的時間
    [2000, 3000, 2500, 3800, 3100, 2700, 3500, 2900, 3700, 3400], // 第三個 bar 的時間
    [2700, 3200, 3600, 4100, 2300, 3100, 2800, 3300, 2900, 3000], // 第四個 bar 的時間
    [2600, 3400, 4000, 2700, 3100, 3200, 2900, 3000, 3500, 3800]  // 第五個 bar 的時間
];

class FallingBlock {
    constructor(barElement, targetTime) {
        this.block = document.createElement("div");
        this.block.classList.add("moving-block");
        this.targetTime = targetTime; // 到達底部的時間
        this.barElement = barElement;
        barElement.appendChild(this.block);

        this.barHeight = barElement.clientHeight;
        this.targetPosition = this.barHeight - this.block.clientHeight;
    }

    startAnimation() {
        // 在指定的時間後顯示小方塊，並且進行等速降落
        setTimeout(() => {
            this.block.style.opacity = 1;  // 顯示小方塊
            this.block.animate(
                [{ top: `-${this.block.clientHeight}px` }, { top: `${this.targetPosition + this.block.clientHeight}px` }],{
                    duration: this.targetTime,
                    fill: 'forwards',
                    easing: 'linear'
                })
                .onfinish = () => {
                    // 動畫結束後隱藏小方塊
                    this.block.style.display = 'none';
                };
        }, this.targetTime);
    }
}

class FallingBar {
    constructor(barElement, targetTimes) {
        this.barElement = barElement;
        this.blocks = [];

        targetTimes.forEach(targetTime => {
            let block = new FallingBlock(barElement, targetTime);
            this.blocks.push(block);
        });
    }

    startAllBlocks() {
        this.blocks.forEach(block => block.startAnimation());
    }
}

startButton.addEventListener("click", () => {
    startScreen.style.display = "none";
    gameScreen.style.display = "flex";

    const barElements = document.querySelectorAll(".bar");
    barElements.forEach((barElement, index) => {
        const targetTimes = allTargetTimes[index];
        const fallingBar = new FallingBar(barElement, targetTimes);
        fallingBar.startAllBlocks();
    });
});