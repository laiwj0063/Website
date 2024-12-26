"use strict";

let combo = 0;
let comboMax = 0;
let score = 0;
let perfectTotal = 0;
let greatTotal = 0;
let goodTotal = 0;
let badTotal = 0;
let missTatal = 0;
let currentSongIndex = 0;

let html = `
<div id="startScreen">
    <h1>Welcome to the Rhythm Game</h1>
    <div id="songSelector">
        <button id="prevButton">←</button>
        <div id="songInfo">
            <img id="songCover" src="" alt="Song Cover">
            <h2 id="songTitle">Song Title</h2>
        </div>
        <button id="nextButton">→</button>
    </div>
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
    <p>Good: <span id="badCount">0</span></p></br>
    <p>Miss: <span id="missCount">0</span></p></br>
    <button id="restartButton">Restart</button>
</div>`;
document.body.innerHTML = html;

const songs = [
    {
        title: "What To Raise",
        cover: "picture/what-to-raise.jpg",
        file: "music/what-to-raise-shin-kawasaki-temporary.mp3",
        tracks: {
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
        },
    },
    {
        title: "Love Circulation",
        cover: "picture/love-circulation.jpg",
        file: "music/love-circulation.mp3",
        tracks: {
            D: [800, 1600, 2400, 3200],
            F: [1200, 2000, 2800, 3600],
            J: [1000, 1800, 2600, 3400],
            K: [1400, 2200, 3000, 3800],
        },
    },
    {
        title: "Mayoiuta",
        cover: "picture/mayoiuta.jpg",
        file: "music/mayoiuta.mp3",
        tracks: {
            D: [0, 7600, 8700, 9800, 10800, 13800, 15150, 15850, 17400, 20000,
                20600, 23600, 23900, 25200, 29400, 31800, 32400, 33000, 33600, 36000,
                39300, 42600, 42900, 43500, 43800, 44400, 46200, 47600, 48900, 50300, 
                50900, 55100, 56900, 58100, 59600, 60500, 61700, 62900, 64100, 64700, 
                67100, 67400, 67700, 69800, 71600, 72800, 73100, 74300, 75600, 76900,
                78100, 78700, 79000, 79900, 80200, 81900
            ],
            F: [750, 4700, 5850, 12300, 12800, 14050, 16800, 18000, 18600, 23000,
                23600, 24800, 26400, 27000, 28800, 31200, 34200, 36300, 37200, 37800,
                39000, 40800, 41400, 43200, 45000, 45600, 45900, 47200, 47600, 48000, 
                48900, 49800, 52100, 53900, 55700, 57500, 58100, 59300, 60800, 62300, 
                63500, 64700, 65300, 66500, 66800, 68300, 68900, 69200, 71900, 73700, 
                75300, 77200, 77800, 79300, 80800, 81900
            ],
            J: [1500, 7600, 8700, 11800, 13800, 14800, 16200, 18000, 19200, 22400,
                23900, 24500, 27600, 28200, 28800, 30600, 33000, 34800, 35400, 36600,
                38700, 39600, 40200, 43500, 45000, 45600, 45900, 46800, 47200, 48000, 
                48600, 49200, 51500, 52700, 53300, 56300, 59300, 60200, 61100, 62300, 
                63800, 64100, 65900, 66500, 66800, 68600, 68900, 69200, 70400, 71900, 
                74000, 74300, 75600, 77200, 78100, 79300, 81900
            ],
            K: [2250, 4700, 5850, 9800, 10800, 12550, 14050, 15500, 17400, 21200,
                21800, 24500, 24800, 25800, 29400, 30000, 32400, 33600, 34200, 36900,
                38400, 42000, 42300, 43200, 43800, 44400, 46500, 46800, 48300, 50300, 
                51800, 53300, 54500, 58700, 59900, 61400, 61700, 63200, 65300, 65900, 
                67100, 67400, 68000, 71000, 71600, 72800, 73100, 75300, 76900, 77800,
                78700, 79000, 79900, 80200, 80800, 81900
            ],
        },
    },
    {
        title: "KING",
        cover: "picture/king gura.jpg",
        file: "music/king.mp4",
        tracks: {
            D: [2300, 3620, 5400, 6150, 7800, 8250, 10150, 10550, 11000, 14350,
                16000, 16800, 18100, 20000, 21000, 21700, 23500, 26700, 27550, 28100,
                31700, 34700, 35700, 40200, 41200, 42150, 42700, 46000, 48000, 50000,
                54000, 57000, 60000, 62500, 65500, 65900
            ],  
            F: [2300, 3950, 5800, 6900, 8700, 9800, 10150, 11500, 13800, 15200,
                17300, 19500, 22000, 24200, 26700, 28600, 29900, 32200, 33700, 39700,
                40200, 41700, 42150, 43200, 45200, 46500, 48500, 52000, 53000, 54000,
                58500, 60000, 63000, 65000, 65900
            ],
            J: [2300, 4250, 4800, 6500, 9100, 9400, 9800, 11800, 13230, 15200,
                17300, 18650, 20500, 24700, 27150, 29100, 30400, 33700, 37200, 38700,
                41700, 42150, 43700, 44700, 47000, 49000, 55000, 59000, 61000, 64000,
                65000, 65900
            ],
            K: [2300, 4600, 5050, 7500, 9400, 12200, 12800, 16000, 17650, 19000,
                21350, 21700, 22500, 23000, 25200, 26200, 27150, 27550, 31200, 34200,
                36700, 41200, 42150, 44200, 47500, 48000, 50500, 55000, 56500, 61000,
                63700, 65500, 65900
            ],
        },
    },
];

const dropDuration = 3000;
const barHeight = 700; 

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
    judge.showJudge("Bad");
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

function updateSongInfo() {
    const song = songs[currentSongIndex];
    document.getElementById("songTitle").textContent = song.title;
    document.getElementById("songCover").src = song.cover;
}

updateSongInfo();

function startGame(tracks){
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
    document.getElementById("badCount").textContent = badTotal;
    document.getElementById("missCount").textContent = missTatal;
}

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

document.getElementById("startButton").addEventListener("click", function(){
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "flex";
    const selectedSong = songs[currentSongIndex];
    const tracks = selectedSong.tracks;
    const audio = new Audio(selectedSong.file);
    startGame(tracks);

    setTimeout(function(){
        audio.play();
    },2000);
    audio.onended = endGame;

    document.addEventListener("keydown", function(e){
        const key = e.key.toUpperCase();
        if(!tracks[key]){
            console.log("${key}");
            return;
        }
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
});

document.getElementById("restartButton").addEventListener("click", function(){
    location.reload();
});

document.getElementById("prevButton").addEventListener("click", function(){
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    updateSongInfo();
});

document.getElementById("nextButton").addEventListener("click", function(){
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    updateSongInfo();
});