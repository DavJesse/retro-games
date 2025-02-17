let ballX = 300;
let ballY = 30;
let paddleX = 300;
let paddleY = 50; // Adjusted to ensure the paddle is at the correct position
let paddleWidth = 150;
let paddleHeight = 10; // Paddle height needed for collision
let ballSpeedX = Math.random() > 0.5 ? 2 : -2;
let ballSpeedY = -2;

function updateBallPosition() {
    // Move ball horizontally and vertically
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // **Bounce off left & right walls**
    if (ballX <= 0 || ballX + 20 >= 600) { 
        ballSpeedX *= -1; // Reverse direction
    }

    // **Bounce off the top wall**
    if (ballY <= 0) { 
        ballSpeedY *= -1;
    }

    // **Paddle Collision (Ball hits the paddle)**
    if (
        ballY + 20 >= paddleY &&  // Ball's bottom reaches the paddle's top
        ballX + 20 >= paddleX &&  // Ball's right edge is past the paddle's left edge
        ballX <= paddleX + paddleWidth // Ball's left edge is before the paddle's right edge
    ) {
        ballSpeedY *= -1; // Reverse direction
    }

    // **Game Over Check: Ball falls below the paddle**
    if (ballY > 60) {  // Since container height is 60px
        alert("Game Over!");
        resetGame();
    }

    // Update ball position in the DOM
    document.getElementById("ball").style.top = ballY + "px";
    document.getElementById("ball").style.left = ballX + "px";
}

// Update ball movement every 16ms (~60 FPS)
setInterval(updateBallPosition, 16);

// **Move Paddle Left & Right**
document.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft" && paddleX > 0) {
        paddleX -= 20;
    }
    if (event.key === "ArrowRight" && paddleX < 450) {  // 600px - paddleWidth (150)
        paddleX += 20;
    }
    
    document.getElementById("paddle").style.left = paddleX + "px";
});
