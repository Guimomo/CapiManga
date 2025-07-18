import { getData } from "../../helpers/auth";
import Swal from "sweetalert2";

export const publicacion = async (Contenedor, usuarioId) => {
    const { accessToken } = getData();

    // Contenedor principal de la publicación
    const publicacionCont = document.createElement("div");
    publicacionCont.classList.add("publicacion_cont");

    // Área de texto para la publicación
    const areaTexto = document.createElement("textarea");
    areaTexto.classList.add("publicacion_textarea");
    areaTexto.placeholder = "¿Qué quieres compartir?";

    // Contenedor para la imagen
    const imagenCont = document.createElement("div");
    imagenCont.classList.add("publicacion_img_cont");

    // Input para seleccionar imagen
    const inputImg = document.createElement("input");
    inputImg.type = "file";
    inputImg.accept = "image/*";
    inputImg.classList.add("publicacion_img_input");

    // Vista previa de la imagen
    const imgPreview = document.createElement("img");
    imgPreview.classList.add("publicacion_img_preview");
    imgPreview.style.display = "none";

    inputImg.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                imgPreview.src = ev.target.result;
                imgPreview.style.display = "block";
            };
            reader.readAsDataURL(file);
        } else {
            imgPreview.src = "";
            imgPreview.style.display = "none";
        }
    });

    imagenCont.append(inputImg, imgPreview);

    // Botón para publicar
    const btnPublicar = document.createElement("button");
    btnPublicar.innerHTML = '<i class="ri-send-plane-fill"></i> Publicar';
    btnPublicar.classList.add("btn_publicar");

    publicacionCont.append(areaTexto, imagenCont, btnPublicar);
    Contenedor.appendChild(publicacionCont);

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

        const formData = new FormData();
        formData.append("publicacion_Text", texto);
        formData.append("publicado_por", usuarioId);
        if (file) formData.append("publicacion_Img", file);

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
            } else {
                Swal.fire({
                    title: "Error",
                    text: resultado.message || "No se pudo crear la publicación.",
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
