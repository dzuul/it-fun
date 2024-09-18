// login.js
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("loginForm");
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (username === "Dzul" && password === "12345") {
            localStorage.setItem("isLoggedIn", "true");
            alert("Login successful!");
            window.location.href = "index.html"; // Redirect to index page
        } else {
            alert("Invalid username or password");
        }
    });
});
