import { getData } from "../../helpers/auth";
import Swal from "sweetalert2";
import { enviarReacciones } from "./reacciones";

export const publicacion = (usuarioId) => {
    // Overlay principal
    const overlay = document.createElement("div");
    overlay.classList.add("overlay_publicacion");

    // Contenedor de la publicación
    const contenedor = document.createElement("div");
    contenedor.classList.add("contenedor_publicacion_overlay");

    // Botón cerrar
    const buttonCerrar = document.createElement("button");
    buttonCerrar.classList.add("btn_cerrar_publicacion_overlay");
    buttonCerrar.innerHTML = '<i class="ri-close-line"></i>';

    // Título
    const titulo = document.createElement("h2");
    titulo.textContent = "Crear Publicación";
    titulo.classList.add("titulo_publicacion_overlay");

    // Formulario de publicación
    const areaTexto = document.createElement("textarea");
    areaTexto.classList.add("publicacion_textarea_overlay");
    areaTexto.placeholder = "¿Qué quieres compartir?";

    const imagenCont = document.createElement("div");
    imagenCont.classList.add("publicacion_img_cont_overlay");

    const uploadIcon = document.createElement("label");
    uploadIcon.classList.add("publicacion_img_upload_icon");
    uploadIcon.innerHTML = '<i class="ri-image-add-line"></i>';
    uploadIcon.htmlFor = "publicacion_img_input";

    const inputImg = document.createElement("input");
    inputImg.type = "file";
    inputImg.accept = "image/*";
    inputImg.id = "publicacion_img_input";
    inputImg.classList.add("publicacion_img_input_overlay");

    const imgPreview = document.createElement("img");
    imgPreview.classList.add("publicacion_img_preview_overlay");
    imgPreview.style.display = "none";

    const eliminarImagen = document.createElement("button");
    eliminarImagen.classList.add("eliminar_imagen_publicacion");
    eliminarImagen.innerHTML = '<i class="ri-delete-bin-5-line"></i>';

    eliminarImagen.onclick = () => {
        inputImg.value = ""; // Limpiar el input de archivo
        imgPreview.src = ""; // Limpiar la vista previa
        eliminarImagen.remove();
    }

    const cargarimagenCont = document.createElement("div");
    cargarimagenCont.classList.add("cargar_imagen_publicacion");
    cargarimagenCont.append(uploadIcon, inputImg);

    imagenCont.append(cargarimagenCont, imgPreview);

    inputImg.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                imgPreview.src = ev.target.result;
                imgPreview.style.display = "block";
                imagenCont.appendChild(eliminarImagen);
            };
            reader.readAsDataURL(file);
        } else {
            imgPreview.src = "";
            imgPreview.style.display = "none";
        }
    });

    // Botón publicar
    const btnPublicar = document.createElement("button");
    btnPublicar.innerHTML = '<i class="ri-send-plane-fill"></i> Publicar';
    btnPublicar.classList.add("btn_publicar_overlay");

    contenedor.append(buttonCerrar, titulo, areaTexto, imagenCont, btnPublicar);
    overlay.appendChild(contenedor);
    document.body.appendChild(overlay);

    // Cerrar overlay al hacer click fuera del contenedor
    overlay.onclick = (e) => {
        if (e.target === overlay) overlay.remove();
    };
    buttonCerrar.onclick = () => {
        overlay.remove();
    };

    // Publicar evento
    btnPublicar.addEventListener("click", async () => {
        const texto = areaTexto.value.trim();
        const file = inputImg.files[0];
        if (!texto && !file) {
            Swal.fire({
                title: "Error",
                text: "Debes escribir algo o seleccionar una imagen.",
                icon: "error",
                confirmButtonText: "Ok"
            });
            return;
        }
        const { accessToken } = getData();
        const formData = new FormData();
        formData.append("publicacion_Text", texto);
        formData.append("publicado_por", Number(usuarioId)); // Asegura que sea número
        if (file) formData.append("publicacion_Img", file);
        // LOG de los datos que se envían
        for (let pair of formData.entries()) {
            console.log("FormData:", pair[0], pair[1]);
        }
        try {
            const response = await fetch("http://localhost:3000/api/publicaciones", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                },
                body: formData
            });
            const resultado = await response.json();
            if (resultado.success) {
                areaTexto.value = "";
                inputImg.value = "";
                imgPreview.src = "";
                imgPreview.style.display = "none";
                Swal.fire({
                    title: "¡Publicado!",
                    text: "Tu publicación ha sido creada correctamente.",
                    icon: "success",
                    confirmButtonText: "Ok"
                });
                overlay.remove();
            } else {
                Swal.fire({
                    title: "Error",
                    text: Array.isArray(resultado.message)
                        ? resultado.message.map(e => e.message).join(', ')
                        : resultado.message || "No se pudo crear la publicación.",
                    icon: "error",
                    confirmButtonText: "Ok"
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Error de red al crear la publicación.",
                icon: "error",
                confirmButtonText: "Ok"
            });
        }
    });
};
