const next = document.getElementById("next");
const prev = document.getElementById("prev");
const slider = document.querySelector('.slider');
const list = document.querySelector('.slider .list');
const thumbnail = document.querySelector('.slider .thumbnail');

let currentIndex = 0;

next.onclick = () => {
    showSlider('next');
}

prev.onclick = () => {
    showSlider('prev');
}

const showSlider = (type) => {
    const sliderItems = document.querySelectorAll('.slide-item');
    const thumbnailItems = document.querySelectorAll('.thumbnail .item');

    if (type === 'next') {
        // Mover el primer elemento al final
        list.appendChild(sliderItems[0]);
        thumbnail.appendChild(thumbnailItems[0]);
        slider.classList.add('next');

        next.setAttribute('disabled', 'disabled');
        prev.setAttribute('disabled', 'disabled');
        
        // Quitar la clase 'next' después de la animación
        setTimeout(() => {
            slider.classList.remove('next');
            next.removeAttribute('disabled', 'disabled');
            prev.removeAttribute('disabled', 'disabled');
        }, 700);

    } else if (type === 'prev') {
        
        // Mover el último elemento al principio
        list.insertBefore(sliderItems[sliderItems.length - 1], sliderItems[0]);
        thumbnail.insertBefore(thumbnailItems[thumbnailItems.length - 1], thumbnailItems[0]);
        slider.classList.add('prev');

        next.setAttribute('disabled', 'disabled');
        prev.setAttribute('disabled', 'disabled');
        
        // Quitar la clase 'prev' después de la animación
        setTimeout(() => {
            slider.classList.remove('prev');
            next.removeAttribute('disabled', 'disabled');
            prev.removeAttribute('disabled', 'disabled');
        }, 700);
    }
}