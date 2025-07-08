import { Autenticado } from "./src/helpers/auth.js";
import Header from "./src/js/dom/header.js";
import { router } from "./src/router/router.js";


const app = document.querySelector('#app');

Header();

const subir_crear = document.querySelector('.subir_crear');

if (!Autenticado()) {

    // subir_crear.style.display = 'none';
    subir_crear.remove();
}


window.addEventListener('hashchange', () => {

    router(app);

});

document.addEventListener("DOMContentLoaded", () => {
    
    router(app);
});