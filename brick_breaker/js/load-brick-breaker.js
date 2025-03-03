
export function loadBrickBreaker() {
  const gameContainer = document.getElementById("game-container");
  // Create paddle
  window.paddle = document.createElement("div"); // Make global
  paddle.id = "paddle";
  gameContainer.appendChild(paddle);
  // Create ball
  window.ball = document.createElement("div"); // Make global
  ball.id = "ball";
  ball.style.transform=`translate(235px,550px)`
  gameContainer.appendChild(ball);

  // Load the game logic
  const script1 = document.createElement("script");
  const script2 = document.createElement("script");
  script1.src = "brick_breaker/js/brick_breaker.js";
  script2.src = "brick_breaker/js/brick_ball_collision.js";
  script1.defer = true;
  script1.type = "module";
  script2.defer = true;
  script2.type = "module";
  document.body.appendChild(script1);
  document.body.appendChild(script1);
}
