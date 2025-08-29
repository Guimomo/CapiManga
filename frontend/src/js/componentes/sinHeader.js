export const gestionarHeader = () => {

    const rutasSinHeader = ['#login', '#register'];

    const header = document.querySelector(".header");

    if (rutasSinHeader.includes(location.hash)) {
        // header.remove();
        header.classList.add('oculto-header');
    } else {
        // header; // o "block", según tu diseño
        header.classList.remove('oculto-header');
    }
};