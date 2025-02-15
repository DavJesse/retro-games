export function loadBrickBreaker() {
    const scoreBoard = document.getElementById("score-board");
    const gameContainer = document.getElementById("game-container");

    // Create scoreboard
    const counter = document.createElement("div")
    counter.id = "counter"
    scoreBoard.appendChild(counter);


    // Create paddle
    const paddle = document.createElement("div");
    paddle.id = "paddle";
    gameContainer.appendChild(paddle);

    // Create ball move
    const ball = document.createElement("div");
    ball.id = "ball";
    paddle.appendChild(ball);

     // Create bricks
     const bricks = document.createElement("div");
     bricks.id = "bricks";
     gameContainer.appendChild(bricks);

      // Create paddle
    const script = document.createElement("script");
    script.src = "brick_breaker/js/brick_breaker.js";
    script.defer = true;
    document.body.appendChild(script);
}