export function BrickBallCollision(ballX, ballY, ballSpeedX, ballSpeedY, bricks) {
    let ballLeft = ballX;
    let ballRight = ballX + 20;
    let ballTop = ballY;
    let ballBottom = ballY + 20;
    
    let collided = false;
    
    for (let i = bricks.length - 1; i >= 0; i--) {
        const brick = bricks[i];
        let brickLeft = brick.left - 400;
        let brickRight = brick.right - 400;
        let brickTop = brick.top - 25;
        let brickBottom = brick.bottom - 25;
        
        // Check if ball collides with brick
        if (
            ballRight > brickLeft &&
            ballLeft < brickRight &&
            ballBottom > brickTop &&
            ballTop < brickBottom
        ) {
            // Ball hit the brick
            brick.numberofhits--;
            collided = true;
            
            // Determine bounce direction
            let overlapLeft = ballRight - brickLeft;
            let overlapRight = brickRight - ballLeft;
            let overlapTop = ballBottom - brickTop;
            let overlapBottom = brickBottom - ballTop;

            // Find the smallest overlap
            let minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);

            if (minOverlap === overlapTop || minOverlap === overlapBottom) {
                ballSpeedY *= -1; // Bounce vertically
            } else {
                ballSpeedX *= -1; // Bounce horizontally
            }
            
            // Remove brick if count reaches 0
            if (brick.numberofhits <= 1) {
                brick.Destroy();
                console.log(`array index: ${i}`)
                console.log(brick)
                bricks.splice(i, 1); // Remove from array
            }
            
            break; // Exit the loop after handling one collision
        }
    }
    
    return collided ? { ballSpeedX, ballSpeedY } : null;
}