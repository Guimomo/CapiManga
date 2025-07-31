import { Autenticado, getData } from "./src/helpers/auth.js";
import Header from "./src/js/dom/header.js";
import { historiasUsuario } from "./src/js/dom/historiasUsuario.js";
import { gestionarHeader } from "./src/js/dom/sinHeader.js";
import { crearHistoriaOverlay } from "./src/js/componentes/crearHistoria.js";
// import { publicacion } from "./src/js/objects/publicacion.js";
import { router } from "./src/router/router.js";

const { accessToken, id } = getData();

const app = document.querySelector('#app');

// Ejecutar gestión del header antes de mostrarlo
gestionarHeader();
Header();

const subir_crear = document.querySelector('.subir_crear');
const crearHistoria = document.querySelector('.crear_historia');
const subir_capitulo = document.querySelector('.subir_capitulo');
// const subir_publicacion = document.querySelector('.subir_publicacion');

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

// Mostrar overlay al hacer clic en el botón de crear historia
crearHistoria.addEventListener('click', (e) => {
    e.preventDefault();
    crearHistoriaOverlay();
});

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

// subir_publicacion.addEventListener('click', async (e) => {
//     e.preventDefault();

//     publicacion(perfilData.id);
// });

window.addEventListener('hashchange', () => {
    gestionarHeader();
    router(app);
    
});

document.addEventListener("DOMContentLoaded", () => {
    gestionarHeader();
    router(app);
});