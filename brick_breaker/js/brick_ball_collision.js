function BrickBallCollision(bricks) {
    let ballLeft = ballX;
    let ballRight = ballX + 20;
    let ballTop = ballY;
    let ballBottom = ballY + 20;
    
    bricks.forEach((brickObj, index) => {
        let brick = brickObj.brick;
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
            brick.count--;
            
            // Determine bounce direction
            if (ballBottom - ballSpeedY <= brickTop || ballTop - ballSpeedY >= brickBottom) {
                ballSpeedY *= -1; // Bounce vertically
            } else {
                ballSpeedX *= -1; // Bounce horizontally
            }
            
            // Remove brick if count reaches 0
            if (brick.count <= 0) {
                document.getElementById(`brick-${brickObj.ID}`).style.visibility = "hidden";
                bricks.splice(index, 1); // Remove from array
            }
        }
    });
}
