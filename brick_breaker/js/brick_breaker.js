const mario = document.getElementById("mario");
const platforms = document.querySelectorAll(".platform");
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

// detect collition
function checkPlatformCollision() {
    platforms.forEach(platform => {
        const platformTop = platform.offsetTop;
        const platformLeft = platform.offsetLeft;
        const platformRight = platformLeft + platform.offsetWidth;

        const marioBottom = marioPositionY;
        const marioTop = marioBottom + mario.offsetHeight;
        const marioLeft = marioPositionX;
        const marioRight = marioLeft + mario.offsetWidth;

        // Check if Mario lands on top of the platform
        if (
            marioPositionY != 0 && marioBottom <= platformTop && // Mario is above platform
            marioTop + marioVelocityY <= platformTop && // Mario is falling onto platform
            marioRight > platformLeft && marioLeft < platformRight // Mario is inside platform width
        ) {
            isJumping = false; // Allow jumping again
            marioPositionY = platformTop - mario.offsetHeight; // Place Mario on platform
        }
    });
}

// Function to continuously move Mario
function moveMario() {
    // Horizontal movement
    if (movingLeft) marioPositionX -= marioSpeed;
    if (movingRight) marioPositionX += marioSpeed;

    // Gravity effect
    marioVelocityY += gravity;
    marioPositionY += marioVelocityY;

    // Check ground collision (prevents falling below ground)
    if (marioPositionY < 0) {
        marioPositionY = 0;
        marioVelocityY = 0;
        isJumping = false;
    }

    // Check platform collision
    checkPlatformCollision();

    // Apply new positions
    mario.style.left = marioPositionX + "px";
    mario.style.bottom = marioPositionY + "px";

    requestAnimationFrame(moveMario);
}

// Start the movement loop
moveMario();
