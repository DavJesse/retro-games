document.addEventListener("DOMContentLoaded", async () => {
    const gameSelection = document.getElementById("game-selection")
    const gameContainer = document.getElementById("game-container");

    function getGameFromURL() {
        const params = new URLSearchParams(window.location.search);
        return params.get("game");
    }

    const game = getGameFromURL();

    if (!game) {
        gameSelection.style.display = "block";
        gameContainer.style.display = "none";
        return;
    } 

    gameSelection.style.display = "none";
    gameContainer.style.display = "block";
    

    try {
        if (game === "brickBreaker") {
            const { loadBrickBreaker } = await import("./brick_breaker/js/load-brick-breaker.js");
            loadBrickBreaker();
        } else {
            console.error("unknown game: ", game);
        }
    } catch (error) {
        console.error("error loading game: ", error);
    }
});