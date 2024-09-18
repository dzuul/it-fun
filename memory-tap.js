// home.js
document.addEventListener("DOMContentLoaded", function () {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true") {
        alert("You need to log in first.");
        window.location.href = "login.html"; // Redirect to login page if not logged in
    }

    const gameCards = document.querySelectorAll(".game-card");
    gameCards.forEach(card => {
        card.addEventListener("click", function (event) {
            if (isLoggedIn !== "true") {
                event.preventDefault(); // Prevent default link behavior
                alert("You need to log in first.");
                window.location.href = "login.html"; // Redirect to login page if not logged in
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const colorButtons = document.querySelectorAll('.button');
    const startButton = document.getElementById('start-button');
    const messageElement = document.getElementById('message');
    const sounds = {
        red: new Audio('assets/red.wav'),
        yellow: new Audio('assets/yellow.wav'),
        green: new Audio('assets/green.wav'),
        blue: new Audio('assets/blue.wav')
    };

    let gameSequence = [];
    let playerSequence = [];
    let level = 0;
    let gameStarted = false;
    let gameOver = false;

    function playSound(color) {
        sounds[color].play();
    }

    function lightUpButton(color) {
        const button = document.querySelector(`.${color}`);
        button.classList.add('active');
        setTimeout(() => button.classList.remove('active'), 500);
    }

    function playSequence() {
        let delay = 0;
        gameSequence.forEach((color, index) => {
            setTimeout(() => {
                lightUpButton(color);
                playSound(color);
            }, (index + 1) * 1000);
        });
    }

    function nextLevel() {
        level++;
        messageElement.textContent = `Level ${level}`;
        playerSequence = [];
        const colors = ['red', 'yellow', 'green', 'blue'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        gameSequence.push(randomColor);
        playSequence();
    }

    function checkPlayerMove(color) {
        if (gameOver) return;

        playerSequence.push(color);
        playSound(color);
        const currentMoveIndex = playerSequence.length - 1;
        if (playerSequence[currentMoveIndex] !== gameSequence[currentMoveIndex]) {
            messageElement.textContent = 'Game Over! Press Start to try again.';
            gameSequence = [];
            gameStarted = false;
            gameOver = true;
            startButton.style.display = 'block';
            saveScore(); // Save the score to the scores page
            return;
        }
        if (playerSequence.length === gameSequence.length) {
            setTimeout(nextLevel, 1000);
        }
    }

    function saveScore() {
        const username = 'Dzul'; // You can get this from localStorage or another source
        const game = 'Memory Tap'; // Change this to the current game
        const score = level; // Use the actual score here
        const time = new Date().toLocaleTimeString();

        // Save the score to localStorage
        const scores = JSON.parse(localStorage.getItem('scores')) || [];
        scores.push({ username, game, score, time });
        localStorage.setItem('scores', JSON.stringify(scores));
        level = 0;
    }

    colorButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (gameStarted && !gameOver) {
                const color = button.getAttribute('data-color');
                checkPlayerMove(color);
                lightUpButton(color);
            }
        });
    });

    startButton.addEventListener('click', () => {
        if (!gameStarted) {
            messageElement.textContent = 'Good luck!';
            startButton.style.display = 'none';
            gameStarted = true;
            gameOver = false;
            nextLevel();
        }
    });
});
