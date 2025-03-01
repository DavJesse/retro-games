class DomCache {
  constructor() {
      this.MenuElements = {}; 
      this.gameConAndPaddle = {};
      this.ScoreboardElement = {};
      this.brickElements = {};
  }

  creatbrickelements() {
      let brickWrapper = document.getElementById("brick-wrapper");
      if (!brickWrapper) {
          console.error("Error: 'brick-wrapper' not found in DOM.");
          return null;
      }

      let brickcontainer = document.createElement("div");
      brickcontainer.id = "brick-container";
      brickWrapper.appendChild(brickcontainer);
      

      return brickcontainer;
  }
  createBricks(brickcontainer) {
    const brickContainer = brickcontainer;
    if (!brickContainer) {
        console.error("Error: BrickContainer not found!");
        return [];
    }
    const fragment = document.createDocumentFragment();
    const bricks = [];

    for (let i = 0; i < 35; i++) {
        const brick = document.createElement("div");
        brick.classList.add("brick");
       // brick.style.display="none"
        brick.id=i
        bricks.push(brick);
        fragment.appendChild(brick);
    }

    brickContainer.appendChild(fragment); // Append all bricks at once
    return bricks;
}

  

  init() {
      // Menu elements
      this.MenuElements.pauseMenu = document.getElementById("pause-menu");
      this.MenuElements.PauseOverlay = document.getElementById("pause-overlay");
      this.MenuElements.pauseTitle = document.getElementById("pause-title");
      this.MenuElements.resumeBtn = document.getElementById("resume-btn");
      this.MenuElements.restartBtn = document.getElementById("restart-btn");

      // Scoreboard elements
      this.ScoreboardElement.time = document.getElementById("time");
      this.ScoreboardElement.score = document.getElementById("scores");
      this.ScoreboardElement.level = document.getElementById("level");
      this.ScoreboardElement.lives = document.getElementById("lives");

      // Game container and paddle
      this.gameConAndPaddle.gamecontainer = document.getElementById("game-container");
      this.gameConAndPaddle.paddle = document.getElementById("paddle");

      // Brick container and bricks
      this.brickElements.BrickContainer = this.creatbrickelements();
      this.brickElements.bricks=this.createBricks(this.brickElements.BrickContainer);
  }

  get(id) {
      return this.MenuElements[id] || null;
  }

  getScoreBoardElements(id) {
      return this.ScoreboardElement[id] || null;
  }

  getgamecontainer(id) {
      return this.gameConAndPaddle[id] || null;
  }

  getbrickElement(id) {
      return this.brickElements[id] || null;
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
        domCache.init();
        const { generateBricks } = await import("./brick_breaker/js/brickmaker.js");
        generateBricks();
    } else {
        console.error("Unknown game: ", game);
    }
} catch (error) {
    console.error("Error loading game: ", error);
}

  });
  