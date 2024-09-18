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
