function right() {
    // Extract current position of paddle from css applied in 'left' attribute
    var paddleRight = parseInt(window.getComputedStyle(paddle).getPropertyValue("left"));

    // Revise value of left attribute to move paddle to the right
    if (paddleRight < 450) {
        document.getElementById('paddle').style.left = paddleRight + 150 + "px";
    }
}

function left() {
    // Extract current position of paddle from css applied in 'left' attribute
    var paddleRight = parseInt(window.getComputedStyle(paddle).getPropertyValue("left"));

    // Revise value of left attribute to move paddle to the left
    if (paddleRight > 70) {
        document.getElementById('paddle').style.left = paddleRight - 150 + "px";
    }
}

function up() {
    ballMovement = document.getElementById("ball");
    if (ballMovement.classList == 'up') {
        return;
    }

    ballMovement.classList.add("up");

    setTimeout(function(){
        ballMovement.classList.remove("up");
    }, 300);
}

document.addEventListener("keydown", event => {
    if (event.key == "ArrowLeft") {
        left();
    }
    if (event.key == "ArrowRight") {
        right();
    }
    if (event.key == "ArrowUp") {
        up();
    }
})