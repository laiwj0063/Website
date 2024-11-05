"use strict";
let html = `<div id="start-screen">
        <h1>Welcome to the Game</h1>
        <p>Press "Start" to begin your adventure!</p>
        <button id="start-button">Start</button>
    </div>

    <!-- 遊戲畫面 -->
    <div id="game-screen">
        <h2>Game Screen</h2>
        <p>Now the game begins!</p>
    </div>`;

document.body.innerHTML = html;
// 獲取開始按鈕和畫面元素
const startButton = document.getElementById("start-button");
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");

// 添加點擊事件監聽器，隱藏開始畫面並顯示遊戲畫面
startButton.addEventListener("click", () => {
    startScreen.style.display = "none"; // 隱藏開始畫面
    gameScreen.style.display = "block"; // 顯示遊戲畫面
});
