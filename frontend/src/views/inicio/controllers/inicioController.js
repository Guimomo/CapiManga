export const inicioController = async () => {

    const next = document.querySelector(".arrow_next");
const prev = document.querySelector(".arrow_prev");
const carrusel = document.querySelector('.carrusel');
const carruselImg = document.querySelector('.carrusel .carrusel_content .carrusel--Img');
const carruselInfo = document.querySelector('.carrusel--info');

next.onclick = () => {
    showCarrusel('next');
};

prev.onclick = () => {
    showCarrusel('prev');
};

const showCarrusel = (type) => {
    const ImgItems = document.querySelectorAll('.carrusel--Img_item');
    const InfoItems = document.querySelectorAll('.carrusel--info_item');

    if (type === 'next') {
        carruselImg.appendChild(ImgItems[0]);
        carruselInfo.appendChild(InfoItems[0]);
        carrusel.classList.add('next');

        next.setAttribute('disabled', 'true');
        prev.setAttribute('disabled', 'true');

        setTimeout(() => {
            carrusel.classList.remove('next');
            next.removeAttribute('disabled');
            prev.removeAttribute('disabled');
        }, 1000);

    } else if (type === 'prev') {
        carruselImg.insertBefore(ImgItems[ImgItems.length - 1], ImgItems[0]);
        carruselInfo.insertBefore(InfoItems[InfoItems.length - 1], InfoItems[0]);
        carrusel.classList.add('prev');

        next.setAttribute('disabled', 'true');
        prev.setAttribute('disabled', 'true');

        setTimeout(() => {
            carrusel.classList.remove('prev');
            next.removeAttribute('disabled');
            prev.removeAttribute('disabled');
        }, 1000);
    }
};
}