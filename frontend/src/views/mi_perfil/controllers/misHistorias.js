export const misHistorias = (historias, localhost, listaHistorias) => {

    historias.forEach(historia => {

        const historiaItem = document.createElement("a");
        historiaItem.classList.add("mi_historia_item");

        const historiaNombre = document.createElement("span");
        historiaNombre.textContent = historia.titulo_Historia;

        const historiaIcon = document.createElement("div");
        historiaIcon.classList.add("mi_historia_icon");

        const icono = document.createElement("img");
        icono.src = localhost + historia.icono_Historia;
        icono.classList.add("mi_historia_img_cont");
        
        const logo = document.createElement("img");
        logo.src = localhost + historia.logo_Historia;
        logo.classList.add("mi_historia_logo");


        historiaItem.onclick = () => {
            window.location.href = `/#mi_historia/${historia.id}`;
        };

        historiaIcon.append(icono, logo);
        historiaItem.append(historiaIcon, historiaNombre);
        listaHistorias.appendChild(historiaItem);
    });

}