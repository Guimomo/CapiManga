let currentIndex = 0;
let slideInterval;

document.addEventListener('DOMContentLoaded', () => {

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

    
});

function navigate(direction) {

    // const gallCont = document.querySelector('.overflow-slider');
    const gallItems = document.querySelectorAll('.slider-item'); 
    const totalItems = gallItems.length;

    //Se asegura que la clase "active" solo este en el indice actual
    gallItems[currentIndex].classList.remove('active');

    currentIndex = (currentIndex + direction + totalItems) % totalItems;
    
    gallItems[currentIndex].classList.add('active');

    indicadores();
}

function indicadores() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot,index)=>{
        dot.classList.remove('active');
        if (index === currentIndex) {
            dot.classList.add('active');
        }
    })
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
