import { generateBricks } from "./brickmaker.js";
import { nextLevel, resetGame } from "./brick_breaker.js";
import { arrows } from "./brick_breaker.js";

function CreateOverlay(isPaused) {
    if (isPaused) {
        let overlayElement = document.createElement("div");
        overlayElement.setAttribute("id", "pause-overlay");
        document.getElementById("game-container").appendChild(overlayElement);
    } else {
        let existingOverlay = document.getElementById("pause-overlay");
        if (existingOverlay) {
            existingOverlay.remove();
        }
    }
}
// // <div id="pause-menu">
// <h2>GAME PAUSED</h2>
// <div class="pause-score">Score: <span id="pause-score">0</span></div>
// <button class="pause-btn resume" onclick="resumeGame()">Resume Game</button>
// <button class="pause-btn next-level" onclick="nextLevel()">Next Level</button>
// <button class="pause-btn" onclick="restartGame()">Restart Game</button>
// </div>

export function GameMenu(isPaused, menuState = "paused") {
    var menuTitleMap = {
        "paused": "GAME PAUSED",
        "gameover": "GAME OVER!",
        "nextLevel": "Level Completed"
    };
    
    if (isPaused) {
        CreateOverlay(isPaused);
        let pauseMenuElement = document.createElement("div");
        pauseMenuElement.setAttribute("id", "pause-menu");
        document.getElementById("game-container").appendChild(pauseMenuElement);

        let pauseTitleElement = document.createElement("h2");
        pauseTitleElement.textContent = menuTitleMap[menuState];
        pauseMenuElement.appendChild(pauseTitleElement);

        if (menuState === "paused" || menuState === "nextLevel") {
            let resumeButton = document.createElement("button");
            pauseMenuElement.appendChild(resumeButton);

            if (menuState === "paused") {
                resumeButton.setAttribute("class", "pause-btn resume");
                resumeButton.textContent = "Resume Game";
                resumeButton.onclick = () => {
                    arrows({ key: " " }, "paused");
                };
            } else {
                resumeButton.setAttribute("class", "pause-btn next-level");
                resumeButton.textContent = "Next Level";
                resumeButton.onclick = () => {
                    RestartButton(menuState);
                };
            }
        }

        let restartButton = document.createElement("button");
        restartButton.setAttribute("class", "pause-btn");
        restartButton.textContent = menuState === "gameover" ? "Restart Game" : menuState === "paused" ? "Restart the level" : "Replay the level";
        pauseMenuElement.appendChild(restartButton);
        restartButton.onclick = () => {
            RestartButton(menuState);
        };
    } else {
        CreateOverlay(isPaused);
        let existingPauseMenu = document.getElementById("pause-menu");
        if (existingPauseMenu) {
            existingPauseMenu.remove();
        }
    }
}

export function RestartButton(menuState) {
    const brickContainerElement = document.getElementById("brick-container");
    if (brickContainerElement) {
        brickContainerElement.remove();
    }
    let currentLevel = document.getElementById("level").textContent;
    arrows({ key: " " }, menuState);
    resetGame();
    
    if (menuState === "gameover") {
        resetToLevelOne(parseInt(currentLevel))
    }else if(menuState === "nextLevel") {
        let newlevel=updatelevel();
        let gamespeed=IncreaseGameSpeed();
           nextLevel(newlevel,gamespeed)
    }else {
        generateBricks(parseInt(currentLevel));
    }
}

export function Updatelive() {
    let livesElement = document.getElementById("lives");
    let remainingLives = parseInt(livesElement.textContent);
    
    if (remainingLives > 0) {
        remainingLives -= 1;
    }
    
    livesElement.textContent = remainingLives;
    return remainingLives === 0;
}

function updatelevel(){
    let LevelElement=document.getElementById("level")
    let Currentlevel=parseInt(LevelElement.textContent)

    Currentlevel+=1
    LevelElement.textContent=Currentlevel

    return Currentlevel;
}

let speed=0;
function IncreaseGameSpeed(){
    return speed+=1;  
}


function resetToLevelOne(level) {
    let LevelElement = document.getElementById("level");
    LevelElement.textContent = 1;  

    let livesElement = document.getElementById("lives");
    livesElement.textContent = 3;  

    let scores=document.getElementById("scores")
    scores.textContent=0;

    const speedMap = {
        1: 0,
        2: -1,
        3: -2,
        4: -3
    };
    
    let gamespeed = speedMap[level] ?? -4;
//reset to level one
  console.log(gamespeed)
    nextLevel(1, gamespeed); 
}
