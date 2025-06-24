import Header from "./src/js/dom/header.js";
import { router } from "./src/router/router.js";


const app = document.querySelector('#app');

Header();


window.addEventListener('hashchange', () => {

    router(app);

});

document.addEventListener("DOMContentLoaded", () => {
    
    router(app);
});