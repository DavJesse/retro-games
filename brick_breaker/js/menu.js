import { generateBricks } from "./brickmaker.js";
import {resetGame } from "./brick_breaker.js"
import { arrows } from "./brick_breaker.js"

function CreateOverlay(paused) {
    if(paused){
      let overlay=document.createElement("div")
      overlay.setAttribute("id","pause-overlay")      
      document.getElementById("game-container").appendChild(overlay)
    }else{
        let k=document.getElementById("pause-overlay")
        if(k){
            k.remove();
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

export function Gamepaused(paused){
    if (paused){
          CreateOverlay(paused);
    let pausemenu=document.createElement("div");
    pausemenu.setAttribute("id","pause-menu");
    document.getElementById("game-container").appendChild(pausemenu);

    let pausetitle=document.createElement("h2");
    pausetitle.textContent="GAME PAUSED";
    pausemenu.appendChild(pausetitle);

    let resumebutton=document.createElement("button");
    resumebutton.setAttribute("class","pause-btn resume");
    resumebutton.textContent="Resume Game";
    pausemenu.appendChild(resumebutton);
    resumebutton.onclick=()=>{
        arrows({ key: " " });
    }

    let restartbutton=document.createElement("button");
    restartbutton.setAttribute("class","pause-btn");
    restartbutton.textContent="Restart Level";
    pausemenu.appendChild(restartbutton);
    restartbutton.onclick=()=>{
        Restartlevel();
        Gamepaused(false)
    }
      }else{
        CreateOverlay(paused)
        let m=document.getElementById("pause-menu")
        if(m){

            m.remove();
        }
      }

}

function Restartlevel(){
     const brickContainer = document.getElementById("brick-container");
        if (brickContainer) {
            brickContainer.remove();
        }
        let level=document.getElementById("level")
        

        arrows({ key: " " });
        resetGame();
        generateBricks(parseInt(level))
}
