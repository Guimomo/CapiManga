import Swal from "sweetalert2";
import { getData } from "../../helpers/auth";

export const enviarReacciones = async (tipo_objetivo, id_objetivo, contenedorDestino, idUsuarioActual) => {
    const { accessToken } = getData();
    let reacciones = [];
    try {
        const response = await fetch(`http://localhost:3000/api/reacciones/${tipo_objetivo}/${id_objetivo}`, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        if (response.ok) {
            const json = await response.json();
            reacciones = json.data || [];
        }
    } catch {}

    const iconosReaccion = {
        me_gusta: 'src/assets/img/page_elements/reacciones_elements/me_gusta.png',
        me_encanta: 'src/assets/img/page_elements/reacciones_elements/me_encanta.png',
        muy_divertido: 'src/assets/img/page_elements/reacciones_elements/muy_divertido.png',
        que_increible: 'src/assets/img/page_elements/reacciones_elements/que_increible.png',
        que_triste: 'src/assets/img/page_elements/reacciones_elements/que_triste.png',
        no_me_parece: 'src/assets/img/page_elements/reacciones_elements/no_me_parece.png',
    };

    contenedorDestino.innerHTML = "";
    const divReacciones = document.createElement('div');
    divReacciones.classList.add('reacciones_lista');

    Object.entries(iconosReaccion).forEach(([tipo, rutaIcono]) => {
        const buttonReaccion = document.createElement('button');
        buttonReaccion.classList.add('reaccion_button_item');
        // Verifica si el usuario actual tiene esta reacción
        const reaccionDelUsuario = reacciones.find(r => r.id_Usuario === idUsuarioActual && r.tipo_Reaccion === tipo);
        // Si existe, guarda el id de la reacción para eliminarla
        const reaccionId = reaccionDelUsuario ? reaccionDelUsuario.id : null;
        if (reaccionDelUsuario) {
            buttonReaccion.classList.add('activa');
        }

        const iconoImg = document.createElement('img');
        iconoImg.classList.add('icono_reaccion');
        iconoImg.src = rutaIcono;
        iconoImg.alt = tipo;

        const reaccionNombre = document.createElement('span');
        reaccionNombre.textContent = tipo.replace(/_/g, ' ');

        // El conteo muestra el total de reacciones por tipo
        const count = reacciones.filter(r => r.tipo_Reaccion === tipo).length;
        const countSpan = document.createElement('span');
        countSpan.classList.add('reaccion_count');
        countSpan.textContent = count > 0 ? count : '';

        buttonReaccion.append(iconoImg, reaccionNombre, countSpan);

        buttonReaccion.onclick = async () => {
            
            // Validación de datos antes de enviar

            if (!tipo || !idUsuarioActual || !tipo_objetivo || !id_objetivo) {
                Swal.fire('Error', `Datos de reacción incompletos. No se puede guardar.\n\nValores:\nTipo: ${tipo}\nUsuario: ${idUsuarioActual}\nObjetivo: ${tipo_objetivo}\nID Objetivo: ${id_objetivo}`, 'error');
                return;
            }

            try {

                // Solo modifica la reacción del usuario actual
                if (reaccionDelUsuario && reaccionId) {

                    // Eliminar reacción propia usando el id correcto
                    const response = await fetch(`http://localhost:3000/api/reacciones`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            id: reaccionId,
                            id_Usuario: idUsuarioActual
                        })
                    });

                    if (!response.ok) {
                        let errorMsg = 'No se pudo borrar la reacción.';
                        try {
                            const errorData = await response.json();
                            if (errorData && errorData.message) {
                                // Si la reacción no existe, solo refresca la lista sin mostrar error
                                if (errorData.message === 'Reacción no encontrada') {

                                    enviarReacciones(tipo_objetivo, id_objetivo, contenedorDestino, idUsuarioActual);
                                    return;
                                } else {
                                    errorMsg += `\nMotivo: ${errorData.message}`;
                                }
                            }
                        } catch {}
                        Swal.fire('Error', errorMsg, 'error');
                    }

                // Si la reacción se eliminó correctamente, actualiza la lista
                } else {
                    // Crear o actualizar reacción propia
                    const response = await fetch(`http://localhost:3000/api/reacciones`, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            tipo_Reaccion: tipo,
                            id_Usuario: idUsuarioActual,
                            tipo_objetivo,
                            id_objetivo
                        })
                    });

                    if (!response.ok) {
                        let errorMsg = 'No se pudo guardar la reacción.';
                        try {
                            const errorData = await response.json();
                            if (errorData && errorData.message) errorMsg += `\nMotivo: ${errorData.message}`;
                        } catch {}
                        Swal.fire('Error', errorMsg, 'error');
                    }

                }

                
                // Refresca la lista de reacciones
                enviarReacciones(tipo_objetivo, id_objetivo, contenedorDestino, idUsuarioActual);
            } catch {
                Swal.fire('Error', 'Error de red al guardar la reacción.', 'error');
            }
        };
        divReacciones.appendChild(buttonReaccion);
    });
    contenedorDestino.appendChild(divReacciones);
};
