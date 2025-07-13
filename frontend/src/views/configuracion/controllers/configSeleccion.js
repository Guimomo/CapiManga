export const configSeleccion = () => {
    const botones = document.querySelectorAll('.btn_opcion');
    const secciones = document.querySelectorAll('.config_item');

    const clases = [
        'editar_perfil',
        'config_DatosPersonales',
        'privacidad_perfil'
    ];

    botones.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            secciones.forEach(seccion => seccion.classList.remove('active'));
            const seccionActiva = document.querySelector(`.${clases[index]}`);
            if (seccionActiva) {
                seccionActiva.classList.add('active');
            }
        });
    });
};