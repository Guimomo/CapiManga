export const misHistorias = (historias, localhost, listaHistorias) => {

    historias.forEach(Historia => {

        const historiaItem = document.createElement("a");
        historiaItem.classList.add("mi_historia_item");

        const historiaNombre = document.createElement("span");
        historiaNombre.textContent = Historia.titulo_Historia;

        const historiaIcon = document.createElement("div");
        historiaIcon.classList.add("mi_historia_icon");

        const icono = document.createElement("img");
        icono.src = localhost + Historia.icono_Historia;
        
        const logo = document.createElement("img");
        logo.src = localhost + Historia.logo_Historia;
        logo.classList.add("mi_historia_logo");


        historiaItem.onclick = () => {
            window.location.href = `/#mi_historia/${Historia.id}`;
        };

        historiaIcon.append(icono, logo);
        historiaItem.append(historiaIcon, historiaNombre);
        listaHistorias.appendChild(historiaItem);
    });

}