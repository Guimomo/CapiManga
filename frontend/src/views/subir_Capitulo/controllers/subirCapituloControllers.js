import { getData } from "../../../helpers/auth";
import { paginasController } from "./paginasController.js";
import Swal from 'sweetalert2';


export const subirCapituloController = async (params) => {

    const { accessToken } = getData();

    const form = document.getElementById('formCrearCapitulo');
    const numeroCapitulo = document.getElementById('numero_Capitulo');
    const tituloCapitulo = document.getElementById('titulo_Historia');
    const argumentoCapitulo = document.getElementById('argumento_Capitulo');
    const iconoCapitulo = document.getElementById('portada_Capitulo');
    const contenedor = document.querySelector('.subir_paginas_capitulo');

    const historiaId = params.historiaId;

    const nombreHistoria = document.querySelector(".tituloHistoria_Capitulo");

    const responsePerfil = await fetch(`http://localhost:3000/api/usuarios/perfil`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    const { data: perfilData } = await responsePerfil.json();

    const responseHistoriasUsuario = await fetch(`http://localhost:3000/api/historias/autor/${perfilData.id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    const { data: historias } = await responseHistoriasUsuario.json();

    // Buscar la historia seleccionada por id
    const historiaSeleccionada = historias.find(historia => String(historia.id) === String(historiaId));

    nombreHistoria.textContent = historiaSeleccionada.titulo_Historia;

    // Inicializar el controlador de páginas
    const paginas = paginasController(contenedor);
    // Ahora puedes usar paginas.getPaginas() para obtener los archivos al enviar el formulario


    const guardarCapitulo = async (e) => {

        e.preventDefault();
        const formData = new FormData();
        formData.append('numero_Capitulo', Number(numeroCapitulo.value));
        formData.append('titulo_Capitulo', tituloCapitulo.value);
        formData.append('argumento_Capitulo', argumentoCapitulo.value);
        formData.append('id_Historia', Number(historiaId));
        // Adjuntar el título de la historia para la ruta en backend
        formData.append('titulo_Historia', historiaSeleccionada.titulo_Historia);
        // Adjuntar icono/portada
        if (iconoCapitulo.files[0]) {
            formData.append('icono_Capitulo', iconoCapitulo.files[0]);
        }
        // Log de depuración para ver los valores enviados en FormData
        console.log('FormData enviado:');
        for (let pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }
        try {
            const response = await fetch('http://localhost:3000/api/capitulos', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
                body: formData
            });
            const responseCapitulo = await response.json();
            if (responseCapitulo.success && responseCapitulo.data && responseCapitulo.data.id) {
                const idCapitulo = responseCapitulo.data.id;
                // Subir páginas
                const paginasArchivos = paginas.getPaginas();
                for (let i = 0; i < paginasArchivos.length; i++) {
                    const paginaForm = new FormData();
                    paginaForm.append('id_Capitulo', idCapitulo);
                    paginaForm.append('pagina_img', paginasArchivos[i]);
                    paginaForm.append('pagina_numero', i + 1);
                    await fetch('http://localhost:3000/api/paginas-capitulo', {
                        method: 'POST',
                        headers: { 'Authorization': `Bearer ${accessToken}` },
                        body: paginaForm
                    });
                }
                Swal.fire({
                    title: 'Éxito',
                    text: 'Capítulo creado exitosamente',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                });
                form.reset();
                paginas.limpiarPaginas();
            } else {
                Swal.fire('Error', responseCapitulo.message || 'No se pudo crear el capítulo', 'error');
            }
        } catch (error) {
            Swal.fire('Error', 'No se pudo conectar con el servidor', 'error');
        }
    }

    form.addEventListener('submit', guardarCapitulo);
}