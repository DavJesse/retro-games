let ballX = 300;
let ballY = 30;
let paddleX = 300;
let paddleY = 30;
let paddleWidth = 150;
let ballSpeedX = Math.random() > 0.5 ? 2 : -2;
let ballSpeedY = -2;

function updateBallPosition() {
    // Move ball horizontally and vertically
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Update ball movement when colliding with left/right wall
    if (ballX <= 0 || ballX >= 600) {
        ballSpeedX *= -1; // reverse direction
    }

    // Update ball movement when colliding with top wall
    if (ballY <= 0) {
        ballSpeedY *= -1; // reverse direction
    }

    // Update ball movement when colliding with top wall
    if (ballY >= paddleY && ballY <= (paddleY + (paddleWidth / 2)) && ballY >= (paddleY + (paddleWidth / 2))) {
        ballSpeedY *= -1; // reverse direction
    }

    // Detect game over
    if (ballY >= 0) {
        alert("Game Over!");
        resetGame();
    }

    document.getElementById("ball").style.top = ballY + "px";
    document.getElementById("ball").style.left = ballX + "px";
}

setInterval(updateBallPosition, 16); // Runs ~60 times per second

document.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft" && paddleX > 0) {
        paddleX -= 20;
    }
    if (event.key === "ArrowRight" && paddleX < 500) {
        paddleX += 20;
    }
    
    document.getElementById("paddle").style.left = paddleX + "px";
});

