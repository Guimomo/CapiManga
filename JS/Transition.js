let currentIndex = 0;  // Asegúrate de definir currentIndex aquí
let slideInterval;

export function initializeSlider() {
    const dots = document.querySelectorAll('.dot');
    const gallItems = document.querySelectorAll('.slider-item');

    dots[0].classList.add('active');
    gallItems[0].classList.add('active');

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            const direction = index - currentIndex;
            navigate(direction);
            resetSlide();
        });
    });

    startSlideInterval();
}

function navigate(direction) {
    const gallItems = document.querySelectorAll('.slider-item'); 
    const totalItems = gallItems.length;

    gallItems[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + direction + totalItems) % totalItems;
    gallItems[currentIndex].classList.add('active');

    updateIndicators();
}

function updateIndicators() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.remove('active');
        if (index === currentIndex) {
            dot.classList.add('active');
        }
    });
}

function startSlideInterval() {
    slideInterval = setInterval(() => {
        navigate(1);
    }, 7000);
}

function resetSlide() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
        navigate(1);
    }, 7000);
};
