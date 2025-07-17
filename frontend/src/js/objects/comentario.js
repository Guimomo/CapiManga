import { getData } from "../../helpers/auth";
import Swal from 'sweetalert2';

export const comentario = async (tipo, objetivo, Contenedor, usuarioId) => {

    const { accessToken } = getData();

    const comentario = document.createElement('div');
    comentario.classList.add('comentario_cont');

    const areaTexto = document.createElement('textarea');
    areaTexto.classList.add('comentario_textarea');
    areaTexto.placeholder = 'Escribe un comentario...';

    const btnEnviar = document.createElement('button');
    btnEnviar.innerHTML = '<i class="ri-send-plane-fill"></i>';
    btnEnviar.classList.add('btn_enviar_comentario');

    comentario.append(areaTexto, btnEnviar);
    Contenedor.appendChild(comentario);

    try {
        
        
        btnEnviar.addEventListener('click', async () => {
            
            const data = {
                id_Usuario: usuarioId,
                tipo_objetivo: tipo,
                id_objetivo: objetivo,
                contenido: areaTexto.value.trim()
            }
            
            const response = await fetch('http://localhost:3000/api/comentarios', {
    
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(data)
            });
    
            const resultado = await response.json();

            if (resultado.success) {
                areaTexto.value = ''; // Limpiar el área de texto
                Swal.fire({
                    title: 'Comentario enviado',
                    text: 'Tu comentario ha sido enviado correctamente.',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                });
            } else {
                Swal.fire({
                    title: 'Error',
                    // text: resultado.message || 'No se pudo enviar el comentario.',
                        text: Array.isArray(resultado.message)
                        ? resultado.message.map(e => e.message).join(', ')
                        : resultado.message || 'No se pudo enviar el comentario.',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            }

        });
        
        

    } catch (error) {
        console.error('Error al crear el comentario:', error);
    }
}