class DomCache {
    constructor() {
      this.MenuElements = {}; // Store Menuelement references
      this.gameConAndPaddle={};
      this.ScoreboardElement={};
    }
  
    init() {
      // Menu elements
      this.MenuElements.pauseMenu = document.getElementById("pause-menu");
      this.MenuElements.PauseOverlay = document.getElementById("pause-overlay");
      this.MenuElements.pauseTitle = document.getElementById("pause-title");
      this.MenuElements.resumeBtn = document.getElementById("resume-btn");
      this.MenuElements.restartBtn = document.getElementById("restart-btn");

      //scoreboard elements
      this.ScoreboardElement.time=document.getElementById("time");
      this.ScoreboardElement.score=document.getElementById("scores");
      this.ScoreboardElement.level=document.getElementById("level")
      this.ScoreboardElement.lives=document.getElementById("lives")

      //game container and paddle
      this.gameConAndPaddle.gamecontainer=document.getElementById("game-container")
      this.gameConAndPaddle.paddle=document.getElementById("paddle")
      
    }
  
    get(id) {
      return this.MenuElements[id] || null; // Return element or null if not found
    }
    getScoreBoardElements(id){
        return this.ScoreboardElement[id] || null;
    }
    getgamecontainer(id){
        return this.gameConAndPaddle[id] || null;
    }
  }
  
  // Create a single instance and export it
  const domCache = new DomCache();
  export default domCache;
  
  // Ensure the DOM is fully loaded before accessing elements
  document.addEventListener("DOMContentLoaded", async () => {
    // Initialize the cached elements
    
    const scoreBoard = document.getElementById("score-board");
    const gameSelection = document.getElementById("game-selection");
    const gameContainer = document.getElementById("game-container");
  
    function getGameFromURL() {
        const params = new URLSearchParams(window.location.search);
        return params.get("game");
    }
    
    const game = getGameFromURL();
    
    if (!game) {
        scoreBoard.style.display = "none";
      gameSelection.style.display = "block";
      gameContainer.style.display = "none";
      return;
    }
  
    scoreBoard.style.display = "block";
    gameSelection.style.display = "none";
    gameContainer.style.display = "block";
    
    try {
        if (game === "brickBreaker") {
        const { loadBrickBreaker } = await import("./brick_breaker/js/load-brick-breaker.js");
        loadBrickBreaker();
        const { generateBricks } = await import("./brick_breaker/js/brickmaker.js");
        generateBricks();
    } else {
        console.error("Unknown game: ", game);
    }
} catch (error) {
    console.error("Error loading game: ", error);
}

domCache.init();
  });
  