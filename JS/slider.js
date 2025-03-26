const initializeSlider = async () => {
    const sliderContainer = document.querySelector(".slider");
    const thumbnailContainer = document.querySelector(".thumbnail"); // Contenedor de miniaturas

    try {
        const response = await fetch("../JSON/itemSlider.json");
        const data = await response.json();

        const fragment = document.createDocumentFragment();
        const thumbnailFragment = document.createDocumentFragment();

        data.forEach((item, index) => {
            // Crear el slide principal
            const slide = document.createElement("a");
            slide.href = item.enlace;
            slide.classList.add("slide-item");

            const slideContent = document.createElement("div");
            slideContent.classList.add("slide-content");

            const slideImg = document.createElement("img");
            slideImg.src = item.imgItem;
            slideImg.alt = item.titulo;
            slideImg.classList.add("slide-image"); // Nueva clase para manejar imágenes

            const slideInfo = document.createElement("div");
            slideInfo.classList.add("slide-info");

            const logo = document.createElement("img");
            logo.src = item.logo;
            logo.alt = `${item.titulo} Logo`;
            logo.classList.add("slide-logo");

            const title = document.createElement("h2");
            title.textContent = item.titulo;
            title.classList.add("slide-title");

            const genre = document.createElement("p");
            genre.textContent = item.genero;
            genre.classList.add("slide-genre", item.generoClass);

            const subgenre = document.createElement("p");
            subgenre.textContent = item.subgenero;
            subgenre.classList.add("slide-subgenre", item.SubgeneroClass);

            slideInfo.append(logo, title, genre, subgenre);
            slideContent.append(slideImg, slideInfo);
            slide.appendChild(slideContent);
            fragment.appendChild(slide);

            // Crear miniaturas
            const thumbnailItem = document.createElement("div");
            thumbnailItem.classList.add("item");
            thumbnailItem.dataset.index = index;

            const thumbnailImg = document.createElement("img");
            thumbnailImg.src = item.thumbnail || item.imgItem;
            thumbnailImg.alt = item.titulo;

            const thumbnailContent = document.createElement("div");
            thumbnailContent.classList.add("content");

            const thumbnailTitle = document.createElement("div");
            thumbnailTitle.classList.add("title");
            thumbnailTitle.textContent = item.titulo;

            thumbnailContent.appendChild(thumbnailTitle);
            thumbnailItem.append(thumbnailImg, thumbnailContent);
            thumbnailFragment.appendChild(thumbnailItem);

            // Evento para cambiar el slider al hacer clic en la miniatura
            thumbnailItem.addEventListener("click", () => {
                document.querySelectorAll(".slide-item").forEach(slide => slide.classList.remove("active"));
                slide.classList.add("active");
            });
        });

        sliderContainer.appendChild(fragment);
        thumbnailContainer.appendChild(thumbnailFragment);

    } catch (error) {
        console.error("Error cargando el JSON:", error);
    }
};


initializeSlider();
