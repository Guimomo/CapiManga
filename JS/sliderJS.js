import { initializeSlider } from "./Transition.js";

const OverlaySlider = document.querySelector('.overflow-slider'); 
const Indicators = document.querySelector('.slider-indicators');

const SliderItem = async () => {
    
    try {

        if (!OverlaySlider) {
            console.error("No se encontró el contenedor .overflow-slider");
            return;
        }

        const items = await fetch("../JSON/slider.json");
        const sliderItems = await items.json();
        console.log(sliderItems);

        const itemFragment = document.createDocumentFragment();

        const dotFragment = document.createDocumentFragment(); 

        sliderItems.forEach(item => {
            
            const sliderItem = document.createElement("div");
            sliderItem.classList.add("slider-item"); // Agrega la clase del género

            const link = document.createElement("a");
            link.href = item.enlace;
            link.classList.add("contenido-slider-item");

            // Imagen principal
            if (item.imagenPrincipal) {
                const backgroundPng = document.createElement("div");
                backgroundPng.classList.add("background-png");

                const imgPrincipal = document.createElement("img");
                imgPrincipal.src = item.imagenPrincipal;
                imgPrincipal.alt = item.titulo;
                imgPrincipal.loading = "lazy";

                backgroundPng.appendChild(imgPrincipal);
                link.appendChild(backgroundPng);
            }

            // Imagen secundaria
            if (item.imagenSecundaria) {
                const backgroundPng2 = document.createElement("div");
                backgroundPng2.classList.add("background-png-2")

                const imgSecundaria = document.createElement("img");
                imgSecundaria.src = item.imagenSecundaria;
                imgSecundaria.alt = item.titulo;
                imgSecundaria.loading = "lazy";

                backgroundPng2.appendChild(imgSecundaria);
                link.appendChild(backgroundPng2);
            }

            const sliderInfo = document.createElement("div");
            sliderInfo.classList.add("sliderInfo");

            const logoManga = document.createElement("div");
            logoManga.classList.add("logo--manga");

            const logoImg = document.createElement("img");
            logoImg.src = item.logo;
            logoImg.alt = `${item.titulo} Logo`;
            logoImg.loading = "lazy";

            logoManga.appendChild(logoImg);

            const generoManga = document.createElement("div");
            generoManga.classList.add("genero-manga", item.generoClass);

            const generoTexto = document.createElement("p");
            generoTexto.textContent = item.genero;

            generoManga.appendChild(generoTexto);
            sliderInfo.appendChild(logoManga);
            sliderInfo.appendChild(generoManga);

            link.appendChild(sliderInfo);
            sliderItem.appendChild(link);
            itemFragment.appendChild(sliderItem);

            const dot = document.createElement("span");
            dot.classList.add("dot");
            dotFragment.appendChild(dot);
        });

        OverlaySlider.appendChild(itemFragment);
        Indicators.appendChild(dotFragment);

        console.log("Datos cargados:", sliderItems);
        console.log("Elementos en OverlaySlider:", OverlaySlider.children.length);
        document.querySelector('.overflow-slider').innerHTML;
        
        initializeSlider();


    } catch (error) {
        console.error('Error al cargar JSON:', error);
    }
}

SliderItem();