const mario = document.getElementById("mario");

let marioSpeed = 5; // Movement speed
let marioPosition = 100; // Initial position
let movingLeft = false;
let movingRight = false;

// Listen for key press (set movement direction)
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") movingLeft = true;
    if (event.key === "ArrowRight") movingRight = true;
});

// Listen for key release (stop movement)
document.addEventListener("keyup", (event) => {
    if (event.key === "ArrowLeft") movingLeft = false;
    if (event.key === "ArrowRight") movingRight = false;
});

// Function to continuously move Mario
function moveMario() {
    if (movingLeft) marioPosition -= marioSpeed;
    if (movingRight) marioPosition += marioSpeed;

    mario.style.left = marioPosition + "px"; // Update position
    requestAnimationFrame(moveMario); // Repeat animation
}

// Start the movement loop
moveMario();
