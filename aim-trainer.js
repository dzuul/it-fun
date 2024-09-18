// index.js
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
    const startButton = document.getElementById('start-button');
    const target = document.getElementById('target');
    const result = document.getElementById('result');
    const restartButton = document.getElementById('restart-button');
    const timerElement = document.getElementById('timer');
    const averageTimeElement = document.getElementById('average-time');

    let gameStartTime, targetAppearanceTime, totalReactionTime = 0, numShots = 0, gameInterval;

    function startGame() {
        startButton.classList.add('hidden');
        target.classList.remove('hidden');
        result.classList.add('hidden');
        numShots = 0;
        totalReactionTime = 0;
        timerElement.textContent = 'Time Left: 30s';

        gameStartTime = Date.now(); // Record the time when the game starts
        targetAppearanceTime = gameStartTime; // Record target appearance time when game starts
        gameInterval = setInterval(updateTimer, 1000);

        // Use 'mousedown' event for registering shots
        target.addEventListener('mousedown', handleShot);

        // Position the target within canvas bounds initially
        repositionTarget();
    }

    function handleShot(event) {
        // Ensure that the event is from a left mouse button press
        if (event.button === 0) {
            const endTime = Date.now();
            const reactionTime = endTime - targetAppearanceTime;
            totalReactionTime += reactionTime;
            numShots++;

            // Reposition target
            repositionTarget();

            // Update the time when the target appears again
            targetAppearanceTime = Date.now();
        }
    }

    function repositionTarget() {
        const gameArea = document.getElementById('aim-trainer-game');
        const maxX = gameArea.clientWidth - 120; // Adjust based on target size
        const maxY = gameArea.clientHeight - 120; // Adjust based on target size
        const x = Math.random() * maxX;
        const y = Math.random() * maxY;
        target.style.left = `${x}px`;
        target.style.top = `${y}px`;
    }

    function updateTimer() {
        const elapsedTime = Math.floor((Date.now() - gameStartTime) / 1000);
        const timeLeft = Math.max(0, 30 - elapsedTime); // Corrected to 30 seconds
        timerElement.textContent = `Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(gameInterval);
            endGame();
        }
    }

    function endGame() {
        target.classList.add('hidden');
        result.classList.remove('hidden');
        averageTimeElement.textContent = `Average Reaction Time: ${Math.round(totalReactionTime / numShots)} ms`;
        saveScore();
    }

    function saveScore() {
        const username = 'Dzul'; // You can get this from localStorage or another source
        const game = 'Aim Trainer'; // Game name
        const score = Math.round(totalReactionTime / numShots) + "ms" // Calculate average reaction time
        const time = new Date().toLocaleTimeString();

        // Save the score to localStorage
        const scores = JSON.parse(localStorage.getItem('scores')) || [];
        scores.push({ username, game, score, time });
        localStorage.setItem('scores', JSON.stringify(scores));
    }

    function restartGame() {
        startGame();
    }

    startButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', restartGame);
});
