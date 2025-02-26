export function BrickBallCollision(ballX, ballY, ballSpeedX, ballSpeedY, bricks) {
    let ballLeft = ballX;
    let ballRight = ballX + 20;
    let ballTop = ballY;
    let ballBottom = ballY + 20;
    
    let collided = false;
    
    for (let i = bricks.length - 1; i >= 0; i--) {
        const brick = bricks[i];
        let brickLeft = brick.left - 420;
        let brickRight = brick.right - 415;
        let brickTop = brick.top - 50;
        let brickBottom = brick.bottom - 40;
        
        // Check if ball collides with brick
        if (
            ballRight > brickLeft &&
            ballLeft < brickRight &&
            ballBottom > brickTop &&
            ballTop < brickBottom
        ) {
            // Ball hit the brick
            brick.numberofhits--;
            brick. OnBallhitHardBrick();
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
            if (brick.numberofhits <= 0) {
                brick.Destroy();
                bricks.splice(i, 1); // Remove from array
            }
            
            break; // Exit the loop after handling one collision
        }
    }
    
    return collided ? { ballSpeedX, ballSpeedY } : null;
}