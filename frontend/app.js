import { Autenticado, getData } from "./src/helpers/auth.js";
import Header from "./src/js/dom/header.js";
import { historiasUsuario } from "./src/js/dom/historiasUsuario.js";
import { publicacion } from "./src/js/objects/publicacion.js";
import { router } from "./src/router/router.js";

const { accessToken, id } = getData();

const app = document.querySelector('#app');

Header();

const subir_crear = document.querySelector('.subir_crear');
const subir_capitulo = document.querySelector('.subir_capitulo');
const subir_publicacion = document.querySelector('.subir_publicacion');

if (!Autenticado()) {

    // subir_crear.style.display = 'none';
    subir_crear.remove();
}


const responsePerfil = await fetch(`http://localhost:3000/api/usuarios/perfil`, {
    headers: {
        Authorization: `Bearer ${accessToken}`
    }
});

const { data: perfilData } = await responsePerfil.json();


subir_capitulo.addEventListener('click', async (e) => {

    e.preventDefault(); 

    const responseHistoriasUsuario = await fetch(`http://localhost:3000/api/historias/autor/${perfilData.id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    
    const { data: historias } = await responseHistoriasUsuario.json();
    const backendUrl = 'http://localhost:3000';
    historiasUsuario(backendUrl, historias);
});

subir_publicacion.addEventListener('click', async (e) => {
    e.preventDefault();

    publicacion(perfilData.id);
});

window.addEventListener('hashchange', () => {

    router(app);
    
});

document.addEventListener("DOMContentLoaded", () => {
    
    router(app);
});