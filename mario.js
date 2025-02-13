const mario = document.getElementById("mario");
const gravity = -1;

let marioPositionX = 100; // x-axis position
let marioPositionY = 0; // y-axis position
let marioSpeed = 5; // Movement speed
let marioVelocityY = 0;
let isJumping = false;
let movingLeft = false;
let movingRight = false;


// Listen for key press (set movement direction)
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") movingLeft = true;
    if (event.key === "ArrowRight") movingRight = true;

    // Jumping logic
    if (event.key === " " && !isJumping) {
        isJumping = true;
        marioVelocityY = 15; // Jumping intensity
    }
});

// Listen for key release (stop movement)
document.addEventListener("keyup", (event) => {
    if (event.key === "ArrowLeft") movingLeft = false;
    if (event.key === "ArrowRight") movingRight = false;
});

// Function to continuously move Mario
function moveMario() {
    // Horizontal movements
    if (movingLeft) marioPositionX -= marioSpeed;
    if (movingRight) marioPositionX += marioSpeed;

    // Gravity logic
    marioVelocityY += gravity;
    marioPositionY += marioVelocityY;

    // Prevent mario from falling out of bounds
    if (marioPositionY < 0) {
        marioPositionY = 0;
        marioVelocityY = 0;
        isJumping = false;
    };
    
    mario.style.left = marioPositionX + "px"; // Update position
    mario.style.bottom = marioPositionY + "px"; // Update position
    requestAnimationFrame(moveMario); // Repeat animation
}

// Start the movement loop
moveMario();
