import Swal from "sweetalert2";
import { getData } from "../../helpers/auth";

export const resena = (historiaId, usuarioId) => {
    // Overlay principal
    const overlay = document.createElement("div");
    overlay.classList.add("overlay_resena");

    // Contenedor de la reseña
    const contenedor = document.createElement("div");
    contenedor.classList.add("contenedor_resena_overlay");

    // Botón cerrar
    const buttonCerrar = document.createElement("button");
    buttonCerrar.classList.add("btn_cerrar_resena_overlay");
    buttonCerrar.innerHTML = '<i class="ri-close-line"></i>';

    // Título
    const titulo = document.createElement("h2");
    titulo.textContent = "Calificar y reseñar historia";
    titulo.classList.add("titulo_resena_overlay");

    // Sección de calificación
    const calificacionCont = document.createElement("div");
    calificacionCont.classList.add("calificacion_radio_overlay");

    // Radio positivo
    const radioPositivo = document.createElement("input");
    radioPositivo.type = "radio";
    radioPositivo.name = "calificacion";
    radioPositivo.id = "radio_positivo";
    radioPositivo.value = "positivo";

    const labelPositivo = document.createElement("label");
    labelPositivo.htmlFor = "radio_positivo";
    labelPositivo.innerHTML = '<i class="ri-thumb-up-line"></i> Me gusta';

    // Radio negativo
    const radioNegativo = document.createElement("input");
    radioNegativo.type = "radio";
    radioNegativo.name = "calificacion";
    radioNegativo.id = "radio_negativo";
    radioNegativo.value = "negativo";

    const labelNegativo = document.createElement("label");
    labelNegativo.htmlFor = "radio_negativo";
    labelNegativo.innerHTML = '<i class="ri-thumb-down-line"></i> No me gusta';

    calificacionCont.append(radioPositivo, labelPositivo, radioNegativo, labelNegativo);

    // Textarea para reseña
    const areaTexto = document.createElement("textarea");
    areaTexto.classList.add("resena_textarea_overlay");
    areaTexto.placeholder = "Escribe tu reseña (opcional, máx 600 caracteres)";
    areaTexto.maxLength = 600;

    // Botón enviar reseña
    const btnEnviar = document.createElement("button");
    btnEnviar.innerHTML = '<i class="ri-send-plane-fill"></i> Enviar reseña';
    btnEnviar.classList.add("btn_enviar_resena_overlay");

    contenedor.append(buttonCerrar, titulo, calificacionCont, areaTexto, btnEnviar);
    overlay.appendChild(contenedor);
    document.body.appendChild(overlay);

    // Cerrar overlay al hacer click fuera del contenedor
    overlay.onclick = (e) => {
        if (e.target === overlay) overlay.remove();
    };
    buttonCerrar.onclick = () => {
        overlay.remove();
    };

    // Enviar reseña
    btnEnviar.addEventListener("click", async () => {
        const calificacion = radioPositivo.checked ? "positivo" : radioNegativo.checked ? "negativo" : null;
        const reseña = areaTexto.value.trim();
        if (!calificacion) {
            Swal.fire({
                title: "Error",
                text: "Debes seleccionar Me gusta o No me gusta.",
                icon: "error",
                confirmButtonText: "Ok"
            });
            return;
        }
        const { accessToken } = getData();
        const body = {
            id_Historia: Number(historiaId),
            calificada_por: Number(usuarioId),
            calificacion,
            resena_Historia: reseña || null
        };
        try {
            const response = await fetch("http://localhost:3000/api/calificaciones", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });
            const resultado = await response.json();
            if (resultado.success) {
                areaTexto.value = "";
                radioPositivo.checked = false;
                radioNegativo.checked = false;
                Swal.fire({
                    title: "¡Reseña enviada!",
                    text: "Tu calificación y reseña han sido guardadas.",
                    icon: "success",
                    confirmButtonText: "Ok"
                });
                overlay.remove();
            } else {
                Swal.fire({
                    title: "Error",
                    text: Array.isArray(resultado.message)
                        ? resultado.message.map(e => e.message).join(', ')
                        : resultado.message || "No se pudo enviar la reseña.",
                    icon: "error",
                    confirmButtonText: "Ok"
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Error de red al enviar la reseña.",
                icon: "error",
                confirmButtonText: "Ok"
            });
        }
    });
};
