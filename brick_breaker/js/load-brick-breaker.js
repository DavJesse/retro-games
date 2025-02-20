
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
  const script1 = document.createElement("script");
  const script2 = document.createElement("script");
  script1.src = "brick_breaker/js/brick_breaker.js";
  script2.src = "brick_breaker/js/brick_ball_collision.js";
  script1.defer = true;
  script2.defer = true;
  document.body.appendChild(script1);
  document.body.appendChild(script1);
}
