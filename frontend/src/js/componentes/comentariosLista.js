import Swal from "sweetalert2";
import { getData } from "../../helpers/auth";
import { enviarReacciones } from "./reacciones";

export const comentariosLista = async (tipo_objetivo, objetivo, contenedor, autorId) => {

    const { accessToken } = getData();
    // Obtener el id del usuario logueado desde el perfil
    const ResponsePerfil = await fetch('http://localhost:3000/api/usuarios/perfil', {
        headers: { 'Authorization': `Bearer ${accessToken}` }
    });
    const { data: perfilUsuarioLogueado } = await ResponsePerfil.json();
    const idUsuarioLogueado = perfilUsuarioLogueado.id;

    const comentariosContenedor = document.createElement('div');
    comentariosContenedor.classList.add('comentarios_lista');

    contenedor.appendChild(comentariosContenedor);

    try {

        const responsePerfil = await fetch(`http://localhost:3000/api/usuarios`, {
            method: 'GET',
        });

        const { data: perfil } = await responsePerfil.json();

        const response = await fetch(`http://localhost:3000/api/comentarios/${tipo_objetivo}/${objetivo}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const { data:comentarios } = await response.json();

        // Separa comentarios del autor y del resto
        const comentariosAutor = comentarios.filter(c => c.id_Usuario === autorId);
        const comentariosUsuarios = comentarios.filter(c => c.id_Usuario !== autorId);



        [...comentariosAutor, ...comentariosUsuarios].forEach(comentario => {

            const comentarioDiv = document.createElement('div');

            comentarioDiv.classList.add('comentario_item');
            if (comentario.id_Usuario === autorId) {
                comentarioDiv.classList.add('comentario_autor');
            }

            const idUsuario = comentario.id_Usuario;

            const usuario = perfil.find(user => user.id === idUsuario);

            const usuarioCont = document.createElement('div');
            usuarioCont.classList.add('usuario_comentario');

            const nombreContenedor = document.createElement('div');
            nombreContenedor.classList.add('nombre_usuario_comentario');

            const nombreUsuario = document.createElement('span');
            nombreUsuario.textContent = usuario.nombre;
            const userName = document.createElement('span');
            userName.textContent = `@${usuario.user_Name}`;

            nombreContenedor.append(userName);

            // Header del comentario: datos usuario + menú
            const comentarioHeader = document.createElement('div');
            comentarioHeader.classList.add('comentario_header');

            if (comentario.id_Usuario === autorId) {
                const autorTag = document.createElement('span');
                autorTag.textContent = 'Autor';
                autorTag.classList.add('comentario_tag_autor');
                nombreContenedor.appendChild(autorTag);
            }

            const fotoPerfilContainer = document.createElement('div');
            fotoPerfilContainer.classList.add('foto_perfil_comentario');
            const fotoPerfilImg = document.createElement('img');
            fotoPerfilImg.src = `http://localhost:3000${usuario.foto_Perfil}`;
            fotoPerfilContainer.appendChild(fotoPerfilImg);

            // Menú de opciones (tres puntos) al lado de los datos usuario
            let menuCheckbox, menuLabel, menuDiv;
            if (comentario.id_Usuario === autorId) {
                // Checkbox para menú
                const menuId = `comentario-menu-${comentario.id}`;
                menuCheckbox = document.createElement('input');
                menuCheckbox.type = 'checkbox';
                menuCheckbox.id = menuId;
                menuCheckbox.classList.add('comentario_menu_checkbox');

                // Label con icono tres puntos
                menuLabel = document.createElement('label');
                menuLabel.setAttribute('for', menuId);
                menuLabel.classList.add('comentario_menu_label');
                menuLabel.innerHTML = '<i class="ri-more-2-fill"></i> <i class="ri-close-fill"></i>';

                // Menú de opciones
                menuDiv = document.createElement('div');
                menuDiv.classList.add('comentario_menu_opciones');
                // Opciones: Editar y Eliminar
                const editarOpcion = document.createElement('button');
                editarOpcion.textContent = 'Editar';
                editarOpcion.classList.add('comentario_menu_editar');
                const eliminarOpcion = document.createElement('button');
                eliminarOpcion.textContent = 'Eliminar';
                eliminarOpcion.classList.add('comentario_menu_eliminar');
                menuDiv.appendChild(editarOpcion);
                menuDiv.appendChild(eliminarOpcion);

                // Editar funcionalidad
                editarOpcion.addEventListener('click', () => {

                    menuCheckbox.checked = false;

                    const textarea = document.createElement('textarea');
                    textarea.value = comentario.contenido;
                    comentarioOpciones.appendChild(textarea);
                    const guardarBtn = document.createElement('button');
                    guardarBtn.textContent = 'Guardar';
                    guardarBtn.classList.add('comentario_guardar_btn');
                    const cancelarBtn = document.createElement('button');
                    cancelarBtn.textContent = 'Cancelar';
                    cancelarBtn.classList.add('comentario_cancelar_btn');
                    comentarioOpciones.appendChild(guardarBtn);
                    comentarioOpciones.appendChild(cancelarBtn);

                    cancelarBtn.addEventListener('click', () => {
                        comentarioOpciones.innerHTML = '';
                        comentarioOpciones.appendChild(comentarioContenido);
                    });

                    guardarBtn.addEventListener('click', async () => {
                        const nuevoContenido = textarea.value;
                        try {
                            const response = await fetch(`http://localhost:3000/api/comentarios/${comentario.id}`, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${accessToken}`
                                },
                                body: JSON.stringify({ contenido: nuevoContenido })
                            });
                            if (response.ok) {
                                comentarioContenido.textContent = nuevoContenido;
                                comentarioOpciones.innerHTML = '';
                                comentarioOpciones.appendChild(comentarioContenido);
                            } else {
                                Swal.fire({
                                    title: 'Error',
                                    text: 'No se pudo actualizar el comentario.',
                                    icon: 'error'
                                });
                            }
                        } catch (err) {
                            console.error('Error de red al actualizar el comentario');
                        }
                    });
                });

                // Eliminar funcionalidad
                eliminarOpcion.addEventListener('click', async () => {
                    menuCheckbox.checked = false;
                    // Usar SweetAlert para confirmar
                    
                    const result = await Swal.fire({
                        title: '¿Eliminar comentario?',
                        text: 'Esta acción no se puede deshacer.',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#d33',
                        cancelButtonColor: '#3085d6',
                        confirmButtonText: 'Sí, eliminar',
                        cancelButtonText: 'Cancelar'
                    });
                    if (result.isConfirmed) {
                        try {
                            const response = await fetch(`http://localhost:3000/api/comentarios/${comentario.id}`, {
                                method: 'DELETE',
                                headers: {
                                    'Authorization': `Bearer ${accessToken}`
                                }
                            });
                            if (response.ok) {
                                comentarioDiv.remove();
                                comentarioDiv.innerHTML = '';
                                Swal.fire('Eliminado', 'El comentario ha sido eliminado.', 'success');
                            } else {
                                Swal.fire('Error', 'No se pudo eliminar el comentario.', 'error');
                            }
                        } catch (err) {
                            Swal.fire('Error', 'Error de red al eliminar el comentario.', 'error');
                        }
                    }
                    
                });
            }

            usuarioCont.append(fotoPerfilContainer, nombreContenedor);
            // Agrega menú al header junto a usuarioCont
            comentarioHeader.append(usuarioCont);
            if (comentario.id_Usuario === autorId) {
                comentarioHeader.append(menuCheckbox, menuLabel, menuDiv);
            }

            // Contenido editable
            let comentarioOpciones;
            const comentarioContenido = document.createElement('p');
            comentarioContenido.textContent = comentario.contenido;
            if (comentario.id_Usuario === autorId) {
                comentarioOpciones = document.createElement('div');
                comentarioOpciones.classList.add('comentario_contenido_editable');
                comentarioOpciones.appendChild(comentarioContenido);
            } else {
                comentarioOpciones = comentarioContenido;
            }

            
            // Integrar reacciones debajo de cada comentario
            const reaccionesContenedor = document.createElement('div');
            reaccionesContenedor.classList.add('reacciones_comentario');
            // Obtener reacciones del comentario si existen
            const reacciones = comentario.reacciones || [];
            // Agrupar reacciones por tipo
            const reaccionesPorTipo = {};
            reacciones.forEach(r => {
                if (!reaccionesPorTipo[r.tipo_Reaccion]) reaccionesPorTipo[r.tipo_Reaccion] = [];
                reaccionesPorTipo[r.tipo_Reaccion].push(r);
            });
            // Mostrar conteo por tipo de reacción
            Object.entries(reaccionesPorTipo).forEach(([tipo, arr]) => {
                const tipoSpan = document.createElement('span');
                tipoSpan.classList.add('conteo_reaccion_tipo');
                tipoSpan.textContent = `${tipo.replace(/_/g, ' ')}: ${arr.length}`;
                // Tooltip con usuarios que reaccionaron
                tipoSpan.title = arr.map(r => {
                    const user = perfil.find(u => u.id === r.id_Usuario);
                    return user ? user.user_Name : r.id_Usuario;
                }).join(', ');
                reaccionesContenedor.appendChild(tipoSpan);
            });
            // Llama a enviarReacciones pasando el id del usuario actual
            enviarReacciones('comentario', comentario.id, reaccionesContenedor, idUsuarioLogueado);

            comentarioDiv.append(comentarioHeader, comentarioOpciones, reaccionesContenedor);
            comentariosContenedor.appendChild(comentarioDiv);
        });

    } catch (error) {
        console.error('Error al obtener los comentarios:', error);
    }
}