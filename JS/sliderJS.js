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
            
            const sliderItem = document.createElement("a");
            sliderItem.href = item.enlace;
            sliderItem.classList.add("slider-item");

            const itemcontent = document.createElement("div");
            itemcontent.classList.add("contenido-slider-item"); // Agrega la clase del género

            if (item.background) {
                sliderItem.style.backgroundImage = `url(${item.background})`;
                sliderItem.style.backgroundSize = "cover";
                sliderItem.style.backgroundPosition = "center right";
            }

            const sliderPng = document.createElement("div");
            sliderPng.classList.add("slider--png");
            
            // Imagen principal
            if (item.imagenPrincipal) {
                const backgroundPng = document.createElement("div");
                backgroundPng.classList.add("background-png");

                const imgPrincipal = document.createElement("img");
                imgPrincipal.src = item.imagenPrincipal;
                imgPrincipal.alt = item.titulo;
                imgPrincipal.loading = "lazy";

                backgroundPng.appendChild(imgPrincipal);
                sliderPng.appendChild(backgroundPng);
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
                sliderPng.appendChild(backgroundPng2);
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

            itemcontent.append(sliderInfo, sliderPng);
            sliderItem.appendChild(itemcontent);
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