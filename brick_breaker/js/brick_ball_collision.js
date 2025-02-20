export function BrickBallCollision(ballX, ballY, ballSpeedX, ballSpeedY, bricks) {
    let ballLeft = ballX;
    let ballRight = ballX + 20;
    let ballTop = ballY;
    let ballBottom = ballY + 20;
    
    bricks.forEach((brick, index) => {
        let brickLeft = brick.left;
        let brickRight = brick.left + (560 / 7) - 10; // Approximate width from grid
        let brickTop = brick.top;
        let brickBottom = brick.top + 25;
        
        // Check if ball collides with brick
        if (
            ballRight > brickLeft &&
            ballLeft < brickRight &&
            ballBottom > brickTop &&
            ballTop < brickBottom
        ) {
            // Ball hit the brick
            brick.numberofhits--;
            
            // Determine bounce direction
            if (ballBottom - ballSpeedY <= brickTop || ballTop - ballSpeedY >= brickBottom) {
                ballSpeedY *= -1; // Bounce vertically
            } else {
                ballSpeedX *= -1; // Bounce horizontally
            }
            
            // Remove brick if count reaches 0
            if (brick.numberofhits <= 1) {
                // document.getElementById(`${brick.brickid}`).style.visibility = "hidden";
                brick.Destroy();
                bricks.splice(index, 1); // Remove from array
            }
        }
    });
}