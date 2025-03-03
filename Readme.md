# Brick Breaker - JavaScript Game
## Overview

Brick Breaker is a classic arcade-style game where the player controls a paddle to bounce a ball and break bricks. The objective is to clear all the bricks while ensuring the ball does not fall below the paddle. This game is built using plain JavaScript and the DOM, following strict performance guidelines to maintain 50-60 FPS.

### How to Run
1. Clone repository from gitea or github.

From gitea:
```
git clone https://learn.zone01kisumu.ke/git/tesiaka/make-your-game.git
cd make-your-game
```

From github:
```
git clone https://github.com/DavJesse/retro-games.git
cd retro-games
```

2. Run program
```
python 3 -m http.server
```

### Requirement
For better performance, turn-off your system's GPU

### Features

- Runs at 60 FPS with smooth animations using requestAnimationFrame.
- Keyboard-controlled movement with smooth responsiveness (no jank or stutter).
- Pause menu with options to:
        Continue
        Restart
- Scoreboard displaying:
        Timer (counting elapsed game time)
        Score (points earned from breaking bricks)
        Lives (remaining chances)
- Optimized rendering with minimal layers for better performance.
- No external libraries or frameworks used (pure JavaScript and DOM-based rendering).

### Controls

- Left Arrow (←) - Move paddle left
- Right Arrow (→) - Move paddle right
- Spacebar (Space) - Launch the ball
- spacebar  - Pause/Resume game

### Game Rules

- The player starts with a set number of lives.
- Use the paddle to bounce the ball and break bricks.
- Breaking bricks earns points or extra life.
- If the ball falls below the paddle, a life is lost.
- The game ends when all bricks are destroyed (win) or when all lives are lost (lose).

### How to Play

Simply open with live server the file index.html

### Contributors
1. [David Jesse](https://learn.zone01kisumu.ke/git/davodhiambo)
2. [Antony Odour](https://learn.zone01kisumu.ke/git/anoduor)
3. [Teddy Siaka](https://learn.zone01kisumu.ke/git/tesiaka)