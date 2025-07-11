export const historiasUsuario = (localhost, historias) => {

    const overlay = document.createElement("div");
    overlay.classList.add("overlay_historia_usuario");

    const contenedor = document.createElement("div");
    contenedor.classList.add("contenedor_historia_usuario");

    const buttonCerrar = document.createElement("button");
    buttonCerrar.classList.add("btn_cerrar_historia_usuario");
    buttonCerrar.innerHTML = '<i class="ri-close-line"></i>';

    const titulo = document.createElement("h2");
    titulo.textContent = "Mis Historias";
    titulo.classList.add("titulo_historia_usuario");

    const p = document.createElement("p");
    p.textContent = "Selecciona una historia para crear un nuevo capítulo.";

    const listaHistorias = document.createElement("div");
    listaHistorias.classList.add("lista_historias_usuario_overlay");


    // Si no hay historias, muestra mensaje y botón
    if (!historias || historias.length === 0) {
        const mensaje = document.createElement("div");
        mensaje.classList.add("mensaje_sin_historias");
        mensaje.textContent = "No tienes historias creadas todavía.";
        const btnCrear = document.createElement("button");
        btnCrear.classList.add("btn_crear_historia_overlay");
        btnCrear.textContent = "Crea una nueva Historia";
        btnCrear.onclick = () => {
            window.location.hash = "crear_historia";
            overlay.remove();
        };
        mensaje.appendChild(btnCrear);
        contenedor.append(buttonCerrar, titulo, mensaje);
        overlay.appendChild(contenedor);
        document.body.appendChild(overlay);

        // Cerrar overlay al hacer click fuera del contenedor
        overlay.onclick = (e) => {
            if (e.target === overlay) overlay.remove();
        };

        // Cerrar overlay al hacer click en el botón de cerrar
        buttonCerrar.onclick = () => {
            overlay.remove();
        };
        return;
    }

    historias.forEach(Historia => {

        const historiaItem = document.createElement("div");
        historiaItem.classList.add("historia_item_overlay");

        const historiaNombre = document.createElement("span");
        historiaNombre.textContent = Historia.titulo_Historia;

        const historiaIcon = document.createElement("div");
        historiaIcon.classList.add("historia_icon_overlay");

        const icono = document.createElement("img");
        icono.src = localhost + Historia.icono_Historia;

        const button = document.createElement("button");
        button.classList.add("btn_seleccionar_historia");
        button.textContent = "Seleccionar";
        button.onclick = () => {
            window.location.href = `/#subir_capitulo/${Historia.id}`;
            overlay.remove();
        };

        historiaIcon.appendChild(icono);
        historiaItem.append(historiaIcon, historiaNombre, button);
        listaHistorias.appendChild(historiaItem);
    });

    contenedor.append( buttonCerrar, titulo, p, listaHistorias);
    overlay.appendChild(contenedor);
    document.body.appendChild(overlay);

    // Cerrar overlay al hacer click fuera del contenedor
    overlay.onclick = (e) => {
        if (e.target === overlay) overlay.remove();
    };

    // Cerrar overlay al hacer click en el botón de cerrar
    buttonCerrar.onclick = () => {
        overlay.remove();
    };
}