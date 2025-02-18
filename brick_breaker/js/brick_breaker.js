let gameContainer = document.getElementById("game-container");
let paddle = document.getElementById("paddle");
let containerWidth = gameContainer.clientWidth; // 600px
let paddleWidth = paddle.clientWidth;
let ballX = 300;
let ballY = -30;
let paddleX = (containerWidth - paddleWidth) / 2;
let paddleY = -30; // Adjusted to ensure the paddle is at the correct position
let paddleHeight = 30; // Paddle height needed for collision
let ballSpeedX = Math.random() > 0.5 ? 2 : -2;
let ballSpeedY = -2;
let topWall = -570;
let bottomWall = topWall + containerWidth -20;
let leftWall = -60;
let rightWall = leftWall + containerWidth;
let paddleLeftWall = paddleX;
let paddleRightWall = paddleLeftWall + paddleWidth;
let paddleTopWall = -30;

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
    if (ballY <= topWall) { 
        ballSpeedY *= -1;
    }

    // //**Paddle Collision (Ball hits the paddle)**
    if (
        ballY + 20 >= paddleY &&
        ballX >= paddleLeftWall &&
        ballX <= paddleRightWall
    ) {
        ballSpeedY *= -1; // Reverse direction
    } 
    
    // **Game Over Check: Ball falls below the paddle**
    if (ballY >= bottomWall) {  // Since container height is 60px
        ballSpeedY *= -1;
        // alert("Game Over!");
        // resetGame();
    }

    // Update ball position in the DOM
    document.getElementById("ball").style.top = ballY + "px";
    document.getElementById("ball").style.left = ballX + "px";
}


// **Move Paddle Left & Right**
document.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft" && paddleX > 0) {
        paddleX -= 150;
    }
    if (event.key === "ArrowRight" && paddleX < 450) {
        paddleX += 150;
    }
    
    document.getElementById("paddle").style.left = paddleX + "px";
});

// Update ball movement every 16ms (~60 FPS)
setInterval(updateBallPosition, 16);