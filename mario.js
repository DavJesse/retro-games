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
        const platformRect = platform.getBoundingClientRect();
        const marioRect = mario.getBoundingClientRect();

        // Check if Mario is above the platform and falling onto it
        if (
            marioRect.bottom >= platformRect.top && // Mario is landing
            marioRect.bottom <= platformRect.top + marioVelocityY && // Only lands if falling
            marioRect.right > platformRect.left && // Mario's right side is within platform
            marioRect.left < platformRect.right // Mario's left side is within platform
        ) {
            marioPositionY = platformRect.top - marioRect.height; // Place Mario on top
            marioVelocityY = 0; // Stop falling
            isJumping = false; // Allow jumping again
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
