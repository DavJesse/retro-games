import { brickPositions } from "./brickmaker.js";
import { BrickBallCollision } from "./brick_ball_collision.js";
import { generateBricks } from "./brickmaker.js";
import {Gamepaused} from "./menu.js"

let paused = true;
let started = false;
let animationID = null;
let gameSpeed = 4;
export let level = 1

// Extract dimentions
let gameContainer = document.getElementById("game-container");
let paddle = document.getElementById("paddle");

// Determine widths of variables
let containerWidth = gameContainer.clientWidth; // 600px
let paddleWidth = paddle.clientWidth;
let topWall = 0;
let outOfBounds = containerWidth + 20;
let leftWall = -60;
let rightWall = leftWall + containerWidth;

// initialize positions of ball and paddle
let ballX = ((containerWidth - 20) / 2) - 60;
let ballY = 550;
let paddleX = (containerWidth - paddleWidth) / 2;
let paddleY = 580; // Adjusted to ensure the paddle is at the correct position
let paddleHeight = 30; // Paddle height needed for collision
let paddleLeft = paddleX - (paddleWidth / 2);
let paddleRight = paddleLeft + paddleWidth;

// Initialize ball speed
let ballSpeedX = Math.random() > 0.5 ? gameSpeed : -gameSpeed;
let ballSpeedY = -gameSpeed;

// Initialize paddle position at center of game container
paddle.style.left = paddleX + "px";

function updateBallPosition() {
    // Move ball horizontally and vertically
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // **Bounce off left & right walls**
    if (ballX <= leftWall || ballX + 20 >= rightWall) { // 20 is ball width
        ballSpeedX *= -1; // Reverse direction
    }
   
    // **Bounce off the top wall**
    if (ballY >= outOfBounds) { 
        alert("Game Over!");
        resetGame();
    }

    // paddle collision
    let paddleBounds = paddle.getBoundingClientRect();
    let ballBounds = window.ball.getBoundingClientRect();

    if (
    //   ballBounds.bottom >= paddleBounds.top &&
      ballBounds.bottom >= paddleBounds.top &&
      ballBounds.bottom <= paddleBounds.top + (0.5 * paddleHeight) &&
      ballBounds.top <= paddleBounds.bottom &&
      ballBounds.right >= paddleBounds.left &&
      ballBounds.left <= paddleBounds.right &&
      ballSpeedY > 0  // Only bounce when ball is moving downward
    ) {
      ballSpeedY *= -1; // Reverse vertical direction
      
      // angle variation based on where ball hits paddle
        if(ballBounds.right == paddleBounds.left || ballBounds.left == paddleBounds.right) {
            ballSpeedX *= -1;
        } 
    }
    
    // **Game Over Check: Ball falls below the paddle**
    if (ballY <= topWall) {  // Since container height is 60px
        ballSpeedY *= -1;
    }

    const collision = BrickBallCollision(ballX, ballY, ballSpeedX, ballSpeedY, brickPositions);
    if (collision) {
        ballSpeedX = collision.ballSpeedX;
        ballSpeedY = collision.ballSpeedY;
    }

    // Reset game when player wins
    if (brickPositions.length === 0) {
        if (level < 5) {
            alert(`You Won level ${level}! Proceed to level ${level + 1}`);
        }
        nextLevel();
    }
    console.log(gameSpeed)

    // Update ball position in the DOM
    window.ball.style.top = ballY + "px";
    window.ball.style.left = ballX + "px";

    animationID = requestAnimationFrame(updateBallPosition);
}

export function resetGame() {
    // Reset ball position to the center-bottom of the game container
    ballX = (containerWidth - 20) / 2; // Center horizontally
    ballY = 550; // Near the bottom

    // Reset paddle position to the center
    paddleX = (containerWidth - paddleWidth) / 2;
    document.getElementById("paddle").style.left = paddleX + "px";

    // Set random initial ball direction
    ballSpeedX = Math.random() > 0.5 ? gameSpeed : -gameSpeed; // Random left or right
    ballSpeedY = -gameSpeed; // Move upwards

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Update ball position in the DOM
    window.ball.style.left = ballX + "px";
    window.ball.style.top = ballY + "px";
}

function nextLevel() {
    level++;
    gameSpeed ++;

    if (level == 6) {
        alert("Contratulation! You Beat the Game!");
        level = 1;
        gameSpeed = 4;
    }

    // Reset ball position to the center-bottom of the game container
    ballX = (containerWidth - 20) / 2; // Center horizontally
    ballY = 550; // Near the bottom

    // Reset paddle position to the center
    paddleX = (containerWidth - paddleWidth) / 2;
    document.getElementById("paddle").style.left = paddleX + "px";

    // Set random initial ball direction
    ballSpeedX = Math.random() > 0.5 ? gameSpeed : -gameSpeed; // Random left or right
    ballSpeedY = -gameSpeed; // Move upwards

    ballX += ballSpeedX;
    ballY += ballSpeedY;
   const brickContainer = document.getElementById("brick-container");
    if (brickContainer) {
        brickContainer.remove();
    }
    generateBricks(level)

    // Update ball position in the DOM
    window.ball.style.left = ballX + "px";
    window.ball.style.top = ballY + "px";
}


document.addEventListener("keydown", e => {
    arrows(e);
});



export function arrows(e) {
    switch (e.key) {
        // case " ":
        case " ": // PAUSE OR PLAY
            paused = !paused;
            // set started to true once the space is clicked first time
            if (!started) {
                started = true;
            }
            if (!paused) { // play
                if (!animationID) {
                    animationID = requestAnimationFrame(updateBallPosition);
                    Gamepaused(false);
                }
            } else { // pause
                // cancel the current animation frame
                if (animationID) {
                    cancelAnimationFrame(animationID);
                    animationID = null;
                    Gamepaused(paused);
                }
            }
            break;
        case "ArrowLeft": // PADDLE LEFT
            if (paddleX > 0) {
                if (started && paused) {
                    // do not allow user to move the paddle when they pause once the game has started
                } else {
                    paddleX -= 75;
                    paddle.style.left = `${paddleX}px`;
                }

                if (paused && !started && ballY == 550) {
                    ballX -= 75;
                    ball.style.left = `${ballX}px`;
                }
            }
            break;
        case "ArrowRight": // PADDLE RIGHT
            if (paddleX < 450) {
                if (started && paused) {
                    // do not allow user to move the paddle when they pause once the game has started
                } else {
                    paddleX += 75;
                    paddle.style.left = `${paddleX}px`;
                }

                if (paused && !started && ballY == 550) {
                    ballX += 75;
                    ball.style.left = `${ballX}px`;
                }
            }
            break;
    }
}

// Update ball movement every 16ms (~60 FPS)
// setInterval(updateBallPosition, 16);
function init() {
    requestAnimationFrame(updateBallPosition);
}