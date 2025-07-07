import { getData } from "../../../helpers/auth";
import { initCarrusel } from "./functionCarrusel"

export const inicioController = async () => {

    let { accessToken } = getData();

    initCarrusel();

}

/**
 * Esta parte comentada corresponde a la funcion anterior del carrusel
 * esta funcion se basaba es cambiar el siguiente item como sifuese el primer hijo del carrusel
 * y el anterior como el ultimo hijo, esto generaba un efecto de carrusel infinito.
 */
    // const next = document.querySelector(".arrow_next");
    // const prev = document.querySelector(".arrow_prev");
    // const carrusel = document.querySelector('.carrusel');
    // const carruselImg = document.querySelector('.carrusel .carrusel_content .carrusel--Img');
    // const carruselInfo = document.querySelector('.carrusel--info');
    // const selectorContainer = document.querySelector('.carrusel_selector--icon');
    // let selectorItems = document.querySelectorAll('.carrusel--selector_item');
    // let currentIndex = 0;
    // const totalItems = selectorItems.length;

    // next.onclick = () => {
    //     showCarrusel('next');
    // };

    // prev.onclick = () => {
    //     showCarrusel('prev');
    // };

    // const showCarrusel = (type) => {

    //     const ImgItems = document.querySelectorAll('.carrusel--Img_item');
    //     const InfoItems = document.querySelectorAll('.carrusel--info_item');
    //     selectorItems = document.querySelectorAll('.carrusel--selector_item');
    //     if (type === 'next') {
    //         carruselImg.appendChild(ImgItems[0]);
    //         carruselInfo.appendChild(InfoItems[0]);
    //         selectorContainer.appendChild(selectorItems[0]);
    //         carrusel.classList.add('next');

    //         next.setAttribute('disabled', 'true');
    //         prev.setAttribute('disabled', 'true');

    //         setTimeout(() => {
    //             carrusel.classList.remove('next');
    //             next.removeAttribute('disabled');
    //             prev.removeAttribute('disabled');
    //         }, 1000);

    //     } else if (type === 'prev') {
    //         carruselImg.insertBefore(ImgItems[ImgItems.length - 1], ImgItems[0]);
    //         carruselInfo.insertBefore(InfoItems[InfoItems.length - 1], InfoItems[0]);
    //         selectorContainer.insertBefore(selectorItems[selectorItems.length - 1], selectorItems[0]);
    //         carrusel.classList.add('prev');

    //         next.setAttribute('disabled', 'true');
    //         prev.setAttribute('disabled', 'true');

    //         setTimeout(() => {
    //             carrusel.classList.remove('prev');
    //             next.removeAttribute('disabled');
    //             prev.removeAttribute('disabled');
    //         }, 1000);
    //     }
    //     actualizarSelector();
    // };

    // selectorItems.forEach((item, index) => {
        
    //     item.addEventListener('click', () => {

    //         if (index !== 0) {

    //             navigate(index);
    //         }

    //     });
    // });

    // const navigate = (direccion) => {

    //     const ImgItems = document.querySelectorAll('.carrusel--Img_item');
    //     const InfoItems = document.querySelectorAll('.carrusel--info_item');
    //     selectorItems = document.querySelectorAll('.carrusel--selector_item');
    //     for (let i = 0; i < direccion; i++) {
    //         carruselImg.appendChild(ImgItems[0]);
    //         carruselInfo.appendChild(InfoItems[0]);
    //         selectorContainer.appendChild(selectorItems[0]);
    //     }
    //     currentIndex = 0;
    //     actualizarSelector();
    // }

    // const actualizarSelector = () => {

    //     selectorItems = document.querySelectorAll('.carrusel--selector_item');

    //     selectorItems.forEach((item, indexItem) => {
            
    //         item.classList.toggle('active', indexItem === 0);
    //     });
    // }