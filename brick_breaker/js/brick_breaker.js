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

var Iterval1 = setInterval(function(){

    var random = Math.floor(Math.random()*4);
    var result = random * 150;
    document.getElementById('bricks').style.left = result + "px";
    document.getElementById('bricks').style.display = '';

    var brickTop = parseInt(window.getComputedStyle(bricks).getPropertyValue("top"));
    if (brickTop >= 500) {
        alert("Game Over! Your score is: " + counter);
        location.reload();
    }
}, 1500)

var counter = 0;

var interval2 = setInterval(function(){
    var brickValue = parseInt(window.getComputedStyle(bricks).getPropertyValue("left"));
    var paddleValue = parseInt(window.getComputedStyle(paddle).getPropertyValue("left"));
    var brickTop = parseInt(window.getComputedStyle(bricks).getPropertyValue("top"));

    var1 = document.querySelector('.up');
    var2 = window.getComputedStyle(var1);
    var3 = parseInt(var2.bottom);

    if (brickTop > 100 && var3 > 500 && brickValue == paddleValue) {
        counter ++;
        document.getElementById('bricks').style.display = 'none';
        document.getElementById('counter').textContent = `score: ${counter}`;
    }
}, 100)