document.addEventListener("DOMContentLoaded", async () => {
    const scoreBoard = document.getElementById("score-board");
    const gameSelection = document.getElementById("game-selection");
    const gameContainer = document.getElementById("game-container");

    function getGameFromURL() {
        const params = new URLSearchParams(window.location.search);
        return params.get("game");
    }

    const game = getGameFromURL();

    if (!game) {
        scoreBoard.style.display = "none";
        gameSelection.style.display = "block";
        gameContainer.style.display = "none";
        return;
    } 

    scoreBoard.style.display = "block";
    gameSelection.style.display = "none";
    gameContainer.style.display = "block";
    

    try {
        if (game === "brickBreaker") {
            const { loadBrickBreaker } = await import("./brick_breaker/js/load-brick-breaker.js");
            loadBrickBreaker();
            const { MakebrickLv1 } = await import("./brick_breaker/js/brickmaker.js");
            MakebrickLv1()
        } else {
            console.error("unknown game: ", game);
        }
    } catch (error) {
        console.error("error loading game: ", error);
    }
});