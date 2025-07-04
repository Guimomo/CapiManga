// Carrusel simple, solo lógica de índice y clases, usando selectores
// No usa .style ni parámetro animate

let carruselIndex = 0;
let carruselInterval = null;

export const initCarrusel = () => {

    const carrusel = document.querySelector('.carrusel');

    const items = document.querySelectorAll('.carrusel--Img_item');
    const selectores = document.querySelectorAll('.carrusel--selector_item');
    const infoItems = document.querySelectorAll('.carrusel--info_item');
    const next = document.querySelector('.arrow_next');
    const prev = document.querySelector('.arrow_prev');

    const total = items.length;

    const updateCarrusel = (idx) => {

        carruselIndex = (idx + total) % total;

        items.forEach((item, i) => {
            item.classList.toggle('active', i === carruselIndex);
        });

        selectores.forEach((selector, i) => {
            selector.classList.toggle('active', i === carruselIndex);
        });

        infoItems.forEach((info, i) => {
            info.classList.toggle('active', i === carruselIndex);
        });

        carrusel.classList.add('next');
    };

    const navigate = (direction) => {
        updateCarrusel(carruselIndex + direction);
        resetCarruselInterval();
    };

    selectores.forEach((selector, i) => {
        selector.onclick = () => {
            updateCarrusel(i);
            resetCarruselInterval();
        };
    });

    if (next) next.onclick = () => {
        navigate(1);
        carrusel.classList.add('next');

        next.setAttribute('disabled', 'true');
        prev.setAttribute('disabled', 'true');

        selectores.forEach((selector) => {
            selector.setAttribute('disabled', 'true');
        });

        setTimeout(() => {
            carrusel.classList.remove('next');
            next.removeAttribute('disabled');
            prev.removeAttribute('disabled');

            selectores.forEach((selector) => {
                selector.removeAttribute('disabled');
            });

        }, 1000);

        resetCarruselInterval();
    }

    if (prev) prev.onclick = () => {

        navigate(-1);
        carrusel.classList.add('prev');

        next.setAttribute('disabled', 'true');
        prev.setAttribute('disabled', 'true');

        selectores.forEach((selector) => {
            selector.setAttribute('disabled', 'true');
        });

        setTimeout(() => {
            carrusel.classList.remove('prev');
            next.removeAttribute('disabled');
            prev.removeAttribute('disabled');

            selectores.forEach((selector, i) => {
                selector.removeAttribute('disabled')
            });
        }, 1000);

        resetCarruselInterval();
    }

    const startCarruselInterval = () => {
        carruselInterval = setInterval(() => {
            navigate(1);
        }, 7000);
    };

    const resetCarruselInterval = () => {
        if (carruselInterval) clearInterval(carruselInterval);
        startCarruselInterval();
    };

    // Inicializar
    updateCarrusel(0);
    startCarruselInterval();

};

// Llama a initCarrusel() después de que el DOM esté listo
// Ejemplo: import { initCarrusel } from './functionCarrusel.js';
// document.addEventListener('DOMContentLoaded', initCarrusel);
