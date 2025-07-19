import { getData } from "../../helpers/auth";

export const crearHistoriaOverlay = async () => {

    const { accessToken } = getData();

    const ResponsePerfil = await fetch('http://localhost:3000/api/usuarios/perfil', {

        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    const { data: perfilData } = await ResponsePerfil.json();

    // Overlay principal
    const overlay = document.createElement("div");
    overlay.classList.add("overlay_crear_historia");

    // Contenedor de la publicación
    const contenedor = document.createElement("div");
    contenedor.classList.add("contenedor_crear_historia");

    // Botón cerrar
    const buttonCerrar = document.createElement("button");
    buttonCerrar.classList.add("btn_cerrar_crear_historia");
    buttonCerrar.innerHTML = '<i class="ri-close-line"></i>';

    // Título
    const titulo = document.createElement("h2");
    titulo.textContent = "Crear una nueva historia";
    titulo.classList.add("titulo_crear_historia");

    // Formulario de publicación
    const mensajeLink = document.createElement("p");
    mensajeLink.classList.add("crear_historia_mensaje");
    mensajeLink.textContent = "¿Qué tipo de historias deseas publicar?";

    const linksCont = document.createElement("div");
    linksCont.classList.add("crear_historia_links_cont");

    const CapiBoardLink = document.createElement("a");
    CapiBoardLink.href = '/#crear_historia';
    CapiBoardLink.classList.add("crear_historia_link", "CapiBoard_link");

    const OriginalLink = document.createElement("a");
    OriginalLink.href = '/#crear_historia_original';
    OriginalLink.classList.add("crear_historia_link", "Original_link");

    const imgCapiBoard = document.createElement("img");
    imgCapiBoard.src = "/src/assets/img/page_elements/logo/CapiBoard_Icon.png";

    const titleCapiBoard = document.createElement("h2");
    titleCapiBoard.textContent = "CapiBoard";
    titleCapiBoard.classList.add("crear_historia_title");

    const textCapiBoard = document.createElement("p");
    textCapiBoard.textContent = "Publica historias con la comunidad en CapiBoard";

    const imgOriginal = document.createElement("img");
    imgOriginal.src = "/src/assets/img/page_elements/logo/Originals_Icon.png";

    const titleOriginal = document.createElement("h2");
    titleOriginal.textContent = "Original";
    titleOriginal.classList.add("crear_historia_title");

    const textOriginal = document.createElement("p");
    textOriginal.textContent = "Publica historias originales y exclusivas";

    CapiBoardLink.append(imgCapiBoard, titleCapiBoard, textCapiBoard);
    OriginalLink.append(imgOriginal, titleOriginal, textOriginal);
    linksCont.append(CapiBoardLink, OriginalLink);
    contenedor.append(buttonCerrar, titulo, mensajeLink, linksCont);
    overlay.append(contenedor);
    document.body.appendChild(overlay);

    buttonCerrar.addEventListener("click", () => {
        overlay.remove();
    });

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
            overlay.remove();
        }
    });

    // Desactivar opción de publicar original si el usuario no está verificado
    if (perfilData && perfilData.rol_Usuario !== 'verificado') {
        OriginalLink.remove();
    }
}