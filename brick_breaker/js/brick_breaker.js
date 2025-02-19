// Extract dimentions
let gameContainer = document.getElementById("game-container");
let paddle = document.getElementById("paddle");

// Determine widths of varables
let containerWidth = gameContainer.clientWidth; // 600px
let paddleWidth = paddle.clientWidth;
let topWall = 0;
let outOfBounds = containerWidth + 20;
let leftWall = -60;
let rightWall = leftWall + containerWidth;

// initialize positions of ball and paddle
let ballX = (containerWidth - 20) / 2;
let ballY = 550;
let paddleX = (containerWidth - paddleWidth) / 2;
let paddleY = 580; // Adjusted to ensure the paddle is at the correct position
let paddleHeight = 30; // Paddle height needed for collision

// Initialize ball speed
let ballSpeedX = Math.random() > 0.5 ? 2 : -2;
let ballSpeedY = -2;

// Initialize paddle position at center of game container
document.getElementById("paddle").style.left = paddleX + "px";

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

    //**Paddle Collision (Ball hits the paddle)**
    if (
        ballY >= paddleY - 30 &&
        ballX >= paddleX - (paddleWidth / 2) &&
        ballX <= (paddleX - (paddleWidth / 2)) + paddleWidth
    ) {
        ballSpeedY *= -1; // Reverse direction
    } 
    
    // **Game Over Check: Ball falls below the paddle**
    if (ballY <= topWall) {  // Since container height is 60px
        ballSpeedY *= -1;
        
    }

    // Update ball position in the DOM
    document.getElementById("ball").style.top = ballY + "px";
    document.getElementById("ball").style.left = ballX + "px";
}

function resetGame() {
    // Reset ball position to the center-bottom of the game container
    ballX = (containerWidth - 20) / 2; // Center horizontally
    ballY = 550; // Near the bottom

    // Reset paddle position to the center
    paddleX = (containerWidth - paddleWidth) / 2;
    document.getElementById("paddle").style.left = paddleX + "px";

    // Set random initial ball direction
    ballSpeedX = Math.random() > 0.5 ? 2 : -2; // Random left or right
    ballSpeedY = -2; // Move upwards

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Update ball position in the DOM
    document.getElementById("ball").style.left = ballX + "px";
    document.getElementById("ball").style.top = ballY + "px";
}


// **Move Paddle Left & Right**
document.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft" && paddleX > 0) {
        paddleX -= 75;
    }
    if (event.key === "ArrowRight" && paddleX < 450) {
        paddleX += 75;
    }
    
    document.getElementById("paddle").style.left = paddleX + "px";
});

// Update ball movement every 16ms (~60 FPS)
setInterval(updateBallPosition, 16);