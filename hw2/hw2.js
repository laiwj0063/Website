"use strict";
let html = `<h1>Object-Oriented(Javascript Version)</h1>
    <article>
    <p>心中默想一個1到63間的任一個數，不要讓我知道......<br>但要告訴我有在以下那些卡片中?我可以很快找出來喔<br><input type= "button" value= "答案"></p>
    </article>
    <div class="card_container">`;

for(let i=0;i<6;i++){
    html += '<table>';
    html += `<tr><td colspan="8">第 ${i+1}張卡片<input type ="checkbox"></td></tr>`; 
    let count=0;
    for(let j=0;j<64;j++){
        if(count%8 == 0) html += '<tr>';
        if((j&(2**i)) != 0){
            html += `<td> ${j} </td>`;
            count++;
        }
        if(count%8 == 0) html += '</tr>';
    }
    html += '</table>';
}
html += '</div>';
document.body.innerHTML = html;