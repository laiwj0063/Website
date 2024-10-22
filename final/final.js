"use strict";
let html = `<div class="container">
    <!-- 左邊區塊（現在為空） -->
    <div class="left-column">
        <!-- 左邊區塊留白或放置其他內容 -->
    </div>
    <div class="right-column">
    <h1>RhythmGame</h1>
    <article>
    <p>根據下落的音符打擊鍵盤!<br></p>
    <input type= "button" value= "答案">
    </article>`;

html += '</div></div>';
document.body.innerHTML = html;