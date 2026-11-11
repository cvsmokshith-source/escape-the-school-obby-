const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const message = document.getElementById("message");

let x = 30;
let y = 30;
let stage = 1;
let lives = 3;
let jumping = false;
let gameWon = false;

function updatePlayer() {
    player.style.left = x + "px";
    player.style.bottom = y + "px";
}

function checkCollision() {
    if (gameWon) return;

    const p = player.getBoundingClientRect();
    const o = obstacle.getBoundingClientRect();
    const f = document.getElementById("finish")
        .getBoundingClientRect();

    // Check obstacle collision
    if (
        p.right > o.left &&
        p.left < o.right &&
        p.bottom > o.top &&
        p.top < o.bottom
    ) {
        lives--;

        document.getElementById("lives").textContent = lives;

        if (lives <= 0) {
            message.textContent = "GAME OVER! Press Restart.";
            gameWon = true;
            return;
        }

        x = 30;
        message.textContent = "Oops! Try again!";
        updatePlayer();
        return;
    }

    // Check finish line
    if (p.right > f.left && p.left < f.right) {
        stage++;

        if (stage > 25) {
            message.textContent =
                "🎉 YOU ESCAPED THE SCHOOL!";
            gameWon = true;
            return;
        }

        document.getElementById("stage").textContent = stage;

        x = 30;

        obstacle.style.left =
            (180 + Math.random() * 350) + "px";

        message.textContent =
            "Great! Welcome to Stage " + stage;

        updatePlayer();
    }
}

// Player controls
document.addEventListener("keydown", function(event) {

    if (gameWon) return;

    if (["ArrowLeft", "ArrowRight", " "].includes(event.key)) {
        event.preventDefault();
    }

    if (event.key === "ArrowRight") {
        x += 15;
    }

    if (event.key === "ArrowLeft") {
        x -= 15;
    }

    x = Math.max(0, Math.min(620, x));

    // Jump
    if (event.key === " " && !jumping) {
        jumping = true;
        y = 130;
        updatePlayer();

        setTimeout(function() {
            y = 30;
            jumping = false;
            updatePlayer();
            checkCollision();
        }, 500);
    }

    updatePlayer();
    checkCollision();
});

// Restart game
function restartGame() {
    x = 30;
    y = 30;
    stage = 1;
    lives = 3;
    jumping = false;
    gameWon = false;

    document.getElementById("stage").textContent = 1;
    document.getElementById("lives").textContent = 3;

    obstacle.style.left = "300px";

    message.textContent = "Use arrow keys to move!";

    updatePlayer();
}

updatePlayer();
