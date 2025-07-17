import { getData } from "../../helpers/auth";

export const enviarReacciones = async (tipo_objetivo, id_objetivo, contenedorDestino) => {

    const { accessToken, id: idUsuarioActual } = getData();

    // 1. Obtener todas las reacciones asociadas al objetivo
    const responseReacciones = await fetch(`http://localhost:3000/api/reacciones/${tipo_objetivo}/${id_objetivo}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    const { data: reacciones } = await responseReacciones.json();

    // 2. Íconos para cada tipo de reacción
    const iconosReaccion = {
        me_gusta: 'src/assets/img/page_elements/reacciones_elements/me_gusta.png',
        me_encanta: 'src/assets/img/page_elements/reacciones_elements/me_encanta.png',
        muy_divertido: 'src/assets/img/page_elements/reacciones_elements/muy_divertido.png',
        que_increible: 'src/assets/img/page_elements/reacciones_elements/que_increible.png',
        me_triste: 'src/assets/img/page_elements/reacciones_elements/me_triste.png',
        no_me_parece: 'src/assets/img/page_elements/reacciones_elements/no_me_parece.png',
    };

    // 3. Contenedor principal
    contenedorDestino.innerHTML = ""; // Limpia contenido anterior
    const divReacciones = document.createElement('div');
    divReacciones.classList.add('reacciones_lista');

    // 4. Buscar si el usuario actual ya reaccionó
    const reaccionDelUsuario = reacciones.find(r => r.id_Usuario === idUsuarioActual);

    // 5. Crear botones de reacción
    Object.entries(iconosReaccion).forEach(([tipo, rutaIcono]) => {

        const buttonReaccion = document.createElement('button');

        buttonReaccion.classList.add('reaccion_button_item');

        if (reaccionDelUsuario?.tipo_Reaccion === tipo) {
            buttonReaccion.classList.add('activa');
        }

        const iconoImg = document.createElement('img');
        iconoImg.src = rutaIcono;
        iconoImg.alt = tipo;
        buttonReaccion.appendChild(iconoImg);

        buttonReaccion.onclick = async () => {
            await fetch(`http://localhost:3000/api/reacciones`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tipo_objetivo,
                    id_objetivo,
                    tipo_Reaccion: tipo
                })
            });

            // Refrescar reacciones
            enviarReacciones(tipo_objetivo, id_objetivo, contenedorDestino);
        };

        divReacciones.appendChild(buttonReaccion);
    });

}