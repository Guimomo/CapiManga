let currentIndex = 0;

document.addEventListener('DOMContentLoaded', () => {

    const dots = document.querySelectorAll('.dot');
    dots[0].classList.add('active');

    document.querySelector('.prev').addEventListener('click', () => {
        navigate(-1);
        resetSlide();
    });

    document.querySelector('.next').addEventListener('click', () => {
        navigate(1);
        resetSlide();
    });

    document.querySelector

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

    const gallCont = document.querySelector('.overflow-slider');
    const gallItems = document.querySelectorAll('.slider-item'); 
    const totalItems = gallItems.length;

    currentIndex = (currentIndex + direction + totalItems) % totalItems;
    
    const offset = -currentIndex * 100;
    gallCont.style.transform = `translateX(${offset}%)`;

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

indicadores();


function startSlideInterval() {
    slideInterval = setInterval(() => {
        navigate(1);
    }, 9000);
}

function resetSlide() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
        navigate(1);
    }, 9000);
};
