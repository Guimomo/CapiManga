document.addEventListener("DOMContentLoaded", () => {

    const loginButton = document.querySelector(".login-button");
    const menuLogin = document.querySelector(".menu-login");

    loginButton.addEventListener("click", () => {
        menuLogin.classList.toggle("menu-visible"); // Alterna la clase "menu-visible"
    });
    
});