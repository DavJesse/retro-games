
export function loadBrickBreaker() {
  const scoreBoard = document.getElementById("score-board");
  const gameContainer = document.getElementById("game-container");

  // Create scoreboard
  const counter = document.createElement("div");
  counter.id = "counter";
  counter.textContent = "score: 0"; // Initialize score display
  scoreBoard.appendChild(counter);

  // Create paddle
  window.paddle = document.createElement("div"); // Make global
  paddle.id = "paddle";
  gameContainer.appendChild(paddle);
  // Create ball
  window.ball = document.createElement("div"); // Make global
  ball.id = "ball";
  gameContainer.appendChild(ball);

  // Load the game logic
  const script = document.createElement("script");
  script.src = "brick_breaker/js/brick_breaker.js";
  script.defer = true;
  document.body.appendChild(script);
}
