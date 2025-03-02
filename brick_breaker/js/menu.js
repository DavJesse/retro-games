import { nextLevel, resetGame } from "./brick_breaker.js";
import { arrows } from "./brick_breaker.js";
import domCache from "../../game_loader.js";


export function GameMenu(isPaused, menuState = "paused") {
    const menuTitleMap = {
        "paused": "GAME PAUSED",
        "gameover": "GAME OVER!",
        "nextLevel": "Level Completed"
    };

    const pauseMenu = domCache.get("pauseMenu");
    const pauseOverlay = domCache.get("PauseOverlay");
    const pauseTitle = domCache.get("pauseTitle");
    const resumeBtn = domCache.get("resumeBtn");
    const restartBtn = domCache.get("restartBtn");
    const currentscore=domCache.get("currentscore")
    const currenttime=domCache.get("currenttime")

    if (isPaused) {
        pauseTitle.textContent = menuTitleMap[menuState];
        pauseOverlay.style.display = "block";
        pauseMenu.style.display = "flex";

                 if(menuState === "paused"){
                       domCache.get("currentscoreclass").style.display="none";
                       domCache.get("currenttimeclass").style.display="none";
                }else{
                     currentscore.textContent=domCache.getScoreBoardElements("score").textContent;
                     currenttime.textContent=domCache.getScoreBoardElements("time").textContent;
                    
                 }
        // Adjust resume button for different states
        if (menuState === "paused") {
            resumeBtn.textContent = "Resume Game";
            resumeBtn.onclick = () => arrows({ key: " " }, "paused");
            resumeBtn.style.display = "block";
        } else if (menuState === "nextLevel") {
            resumeBtn.textContent = "Next Level";
            resumeBtn.onclick = () => RestartButton(menuState);
            resumeBtn.style.display = "block";
        } else {
            resumeBtn.style.display = "none"; // Hide if not needed
        }

        restartBtn.onclick = () => RestartButton(menuState);
    } else {
        pauseOverlay.style.display = "none";
        pauseMenu.style.display = "none";
    }
}


export function RestartButton(menuState) {
    
    let currentLevel = domCache.getScoreBoardElements("level").textContent;
    arrows({ key: " " }, menuState);
    resetGame();
    
    
    if(menuState === "nextLevel") {
        let newlevel=updatelevel();
        let gamespeed=IncreaseGameSpeed();
        nextLevel(newlevel,gamespeed)
    }else {
        resetToLevelOne(parseInt(currentLevel)) 
    }
}

export function Updatelive() {
    let livesElement = domCache.getScoreBoardElements("lives");
    let remainingLives = parseInt(livesElement.textContent);
    
    if (remainingLives > 0) {
        remainingLives -= 1;
    }
    
    livesElement.textContent = remainingLives;
    return remainingLives === 0;
}

function updatelevel(){
    let LevelElement=domCache.getScoreBoardElements("level")
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
    let LevelElement = domCache.getScoreBoardElements("level");
    LevelElement.textContent = 1;  

    let livesElement = domCache.getScoreBoardElements("lives");
    livesElement.textContent = 3;  

    let scores=domCache.getScoreBoardElements("score");
    scores.textContent=0;

    const speedMap = {
        1: 0,
        2: -1,
        3: -2,
        4: -3
    };
    
    let gamespeed = speedMap[level] ?? -4;
//reset to level one
    nextLevel(1, gamespeed); 
    window.location.reload()
}
