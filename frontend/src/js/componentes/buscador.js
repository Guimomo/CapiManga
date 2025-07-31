export const Buscador = (contenedorPrincipal) => {
    const buscador = document.createElement("div");
    buscador.classList.add("buscador_seccion");

    const input = document.createElement("input");
    input.type = "text";
    input.classList.add("buscador_input");
    input.placeholder = "Buscar...";

    const icon = document.createElement("button");
    icon.classList.add("buscador_icon");
    icon.innerHTML = '<i class="ri-search-line"></i>';

    buscador.append(input, icon);

    const resultados = document.createElement("div");
    resultados.classList.add("buscador_resultados");

    const historiasSection = document.createElement("div");
    historiasSection.classList.add("buscador_resultados_historias");
    const historiasTitle = document.createElement("div");
    historiasTitle.classList.add("buscador_resultados_titulo");
    historiasSection.appendChild(historiasTitle);

    const usuariosSection = document.createElement("div");
    usuariosSection.classList.add("buscador_resultados_usuarios");
    const usuariosTitle = document.createElement("div");
    usuariosTitle.classList.add("buscador_resultados_titulo");
    // usuariosTitle.textContent = "Usuarios";
    usuariosSection.appendChild(usuariosTitle);

    resultados.append(historiasSection, usuariosSection);
    contenedorPrincipal.append(buscador, resultados);

    let lastValue = "";
    let debounceTimeout;

    const limpiarResultados = () => {
        historiasSection.querySelectorAll(".buscador_resultado_item, .buscador_resultado_vacio").forEach(el => el.remove());
        usuariosSection.querySelectorAll(".buscador_resultado_item, .buscador_resultado_vacio").forEach(el => el.remove());
    };

    const crearMensajeVacio = (section, mensaje) => {
        const empty = document.createElement("div");
        empty.classList.add("buscador_resultado_vacio");
        empty.textContent = mensaje;
        section.appendChild(empty);
    };

    input.addEventListener("input", () => {
        const value = input.value.trim().toLowerCase();
        if (value === lastValue) return;

        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(async () => {
            lastValue = value;
            limpiarResultados();

            if (!value) return;

            // Buscar historias
            try {
                const res = await fetch("http://localhost:3000/api/historias");
                const { data: historias = [] } = await res.json();

                const filtradas = historias.filter(hist => {
                    const titulo = (hist.titulo_Historia || hist.titulo_historia || hist.titulo || hist.nombre || "").toLowerCase();
                    return titulo.startsWith(value);
                });

                if (filtradas.length === 0) {
                    historiasTitle.textContent = "Historias";
                    crearMensajeVacio(historiasSection, "No se encontraron historias.");
                } else {
                    historiasTitle.textContent = "Historias";
                    filtradas.forEach(hist => {
                        const item = document.createElement("a");
                        item.classList.add("buscador_resultado_item");
                        item.textContent = hist.titulo_Historia || hist.titulo_historia || hist.titulo || hist.nombre || "(Sin título)";
                        item.href = `/#historia/${hist.id}`;
                        historiasSection.appendChild(item);
                    });
                }
            } catch (error) {
                console.error("Error cargando historias:", error);
                crearMensajeVacio(historiasSection, "Error al cargar historias.");
            }

            // Buscar usuarios
            try {
                const res = await fetch("http://localhost:3000/api/usuarios");
                const { data: usuarios = [] } = await res.json();

                const filtrados = usuarios.filter(user => {
                    const username = (user.user_Name || "").toLowerCase();
                    return username.startsWith(value);
                });

                if (filtrados.length === 0) {
                    usuariosTitle.textContent = "Usuarios";
                    crearMensajeVacio(usuariosSection, "No se encontraron usuarios.");
                } else {
                    usuariosTitle.textContent = "Usuarios";
                    filtrados.forEach(user => {
                        const link = document.createElement("a");
                        link.classList.add("buscador_resultado_item");
                        link.textContent = user.user_Name;
                        link.href = `/#perfil/${user.id}`;
                        usuariosSection.appendChild(link);
                    });
                }
            } catch (error) {
                console.error("Error cargando usuarios:", error);
                crearMensajeVacio(usuariosSection, "Error al cargar usuarios.");
            }
        }, 300); // Espera 300ms después de escribir
    });
};