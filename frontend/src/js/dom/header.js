import Swal from "sweetalert2";
import { Autenticado } from "../../helpers/auth";
import { router } from "../../router/router";

const Header =()=> {

    const header = document.querySelector("header");
    const headerContent = document.querySelector(".header-content");

    //Logo
    const logoLink = document.createElement("a");
    logoLink.setAttribute("href", "/");
    logoLink.classList.add("logo-link");

    const logoImg = document.createElement("img");
    logoImg.setAttribute("src", "src/assets/img/page_elements/logo/logo.png");
    logoImg.setAttribute("alt", "Logo");
    logoImg.classList.add("logo-img");

    logoLink.appendChild(logoImg);

    const menu = document.createElement("div");
    menu.classList.add("menuHeader");

    const perfilCont = document.createElement("div");
    perfilCont.classList.add("perfilCont");

    const iconoPerfilCont = document.createElement("div");
    iconoPerfilCont.classList.add("icono-perfil-cont");

    const iconoPerfil = document.createElement("img");
    iconoPerfil.setAttribute("src", "src/assets/icon/user.svg");
    iconoPerfil.classList.add("icono-perfil");

    const perfilText = document.createElement("span");
    perfilText.textContent = "Perfil";
    perfilText.classList.add("perfil-text");

    const perfilLabel = document.createElement("label");
    perfilLabel.setAttribute("for", "perfilLabel");
    perfilLabel.classList.add("perfil-label");

    const menuPerfilIcon = document.createElement("i");
    menuPerfilIcon.classList.add("ri-menu-4-line", "item_perfil--icon");

    const closeMenuPerfilIcon = document.createElement("i");
    closeMenuPerfilIcon.classList.add("ri-close-line", "item_perfil--icon");

    const perfilMenuIconsCont = document.createElement("div");
    perfilMenuIconsCont.classList.add("perfil-menu--icon");
    perfilMenuIconsCont.append(menuPerfilIcon, closeMenuPerfilIcon);

    const perfilCheckbox = document.createElement("input");
    perfilCheckbox.setAttribute("type", "checkbox");
    perfilCheckbox.setAttribute("id", "perfilLabel");
    perfilCheckbox.classList.add("perfil-checkbox");

    perfilLabel.append(iconoPerfilCont, perfilText, perfilMenuIconsCont, perfilCheckbox);

    iconoPerfilCont.appendChild(iconoPerfil);

    perfilCont.append( perfilLabel, );

    headerContent.append(logoLink, perfilCont);

    //Opciones de menú

    const biblio_Option = document.createElement("a");
    biblio_Option.setAttribute("href", "#");
    biblio_Option.classList.add("biblio-option", "menu-item");

    const biblioIcon = document.createElement("i");
    biblioIcon.classList.add("ri-booklet-fill", "biblio-icon");
    
    const biblioText = document.createElement("span");
    biblioText.textContent = "Biblioteca";
    biblioText.classList.add("biblio-text");

    biblio_Option.append(biblioIcon, biblioText);

    const buscador_Option = document.createElement("div");
    buscador_Option.classList.add("buscador-option", "menu-item");

    const buscadorIcon = document.createElement("i");
    buscadorIcon.classList.add("ri-search-eye-fill", "buscador-icon");

    const buscadorText = document.createElement("span");
    buscadorText.textContent = "Buscar";
    buscadorText.classList.add("buscador-text");

    buscador_Option.append(buscadorIcon, buscadorText);

    const Originals_Option = document.createElement("a");
    Originals_Option.setAttribute("href", "#");
    Originals_Option.classList.add("originals-option", "menu-item");

    const OriginalsIcon = document.createElement("img");
    OriginalsIcon.setAttribute("src", "src/assets/img/page_elements/logo/Originals_Icon.png");
    OriginalsIcon.classList.add("originals-icon", "menu-icons");

    const OriginalsText = document.createElement("span");
    OriginalsText.textContent = "Originales";
    OriginalsText.classList.add("originals-text");

    Originals_Option.append(OriginalsIcon, OriginalsText);

    const Capiboard_Option = document.createElement("a");
    Capiboard_Option.setAttribute("href", "#");
    Capiboard_Option.classList.add("capiboard-option", "menu-item");

    const CapiboardIcon = document.createElement("img");
    CapiboardIcon.setAttribute("src", "src/assets/img/page_elements/logo/Capiboard_Icon.png");
    CapiboardIcon.classList.add("capiboard-icon", "menu-icons");

    const CapiboardText = document.createElement("span");
    CapiboardText.textContent = "Capiboard";
    CapiboardText.classList.add("capiboard-text");

    Capiboard_Option.append(CapiboardIcon, CapiboardText);

    const comics_Option = document.createElement("a");
    comics_Option.setAttribute("href", "#");
    comics_Option.classList.add("comics-option", "menu-item");

    const comicsIcon = document.createElement("i");
    comicsIcon.classList.add("ri-book-open-line", "comics-icon");

    const comicsText = document.createElement("span");
    comicsText.textContent = "Comics";
    comicsText.classList.add("comics-text");

    comics_Option.append(comicsIcon, comicsText);

    const Webcomics_Option = document.createElement("a");
    Webcomics_Option.setAttribute("href", "#");
    Webcomics_Option.classList.add("webcomics-option", "menu-item");

    const WebcomicsIcon = document.createElement("i");
    WebcomicsIcon.classList.add("ri-scroll-to-bottom-fill", "webcomics-icon");

    const WebcomicsText = document.createElement("span");
    WebcomicsText.textContent = "Webcomics";
    WebcomicsText.classList.add("webcomics-text");

    Webcomics_Option.append(WebcomicsIcon, WebcomicsText);

    const novelas_Option = document.createElement("a");
    novelas_Option.setAttribute("href", "#");
    novelas_Option.classList.add("novelas-option", "menu-item");

    const novelasIcon = document.createElement("i");
    novelasIcon.classList.add("ri-book-2-fill", "novelas-icon");

    const novelasText = document.createElement("span");
    novelasText.textContent = "Novelas ligeras";
    novelasText.classList.add("novelas-text");

    novelas_Option.append(novelasIcon, novelasText);

    // Agregar opcion home al menu

    const menuHome = document.createElement("a");
    menuHome.setAttribute("href", "/");
    menuHome.classList.add("home-option", "menu-item");

    const homeIcon = document.createElement("img");
    homeIcon.setAttribute("src", "src/assets/img/page_elements/logo/logo.png");
    homeIcon.classList.add("home-icon", "menu-icons");

    // const homeText = document.createElement("span");
    // homeText.textContent = "Inicio";
    // homeText.classList.add("home-text");

    menuHome.append(homeIcon);

    menu.append( biblio_Option, buscador_Option, menuHome, Originals_Option, Capiboard_Option, comics_Option, Webcomics_Option, novelas_Option);

    headerContent.appendChild(menu);

    //------- Div de inicio de sesion y registro -------//

    const logOptions = document.createElement("div");
    logOptions.classList.add("log-options");

    const loginOption = document.createElement("a");
    loginOption.setAttribute("href", "#login");
    loginOption.classList.add("login-option", "log-item");
    loginOption.textContent = "Iniciar sesión";

    const registerOption = document.createElement("a");
    registerOption.setAttribute("href", "#register");
    registerOption.classList.add("register-option", "log-item");
    registerOption.textContent = "Registrarse";

    const chiguiCont = document.createElement("div");
    chiguiCont.classList.add("chigui-cont");

    const chigui = document.createElement("img");
    chigui.setAttribute("src", "/src/assets/img/page_elements/menu_elements/chigoku.png");

    chiguiCont.appendChild(chigui);

    logOptions.append(loginOption, registerOption, chiguiCont);

    header.appendChild(logOptions);

    window.addEventListener("DOMContentLoaded", () => {

        router(app);

        if (Autenticado()) {
            // Si el usuario está autenticado, ocultar las opciones de inicio de sesión y registro
            logOptions.style.display = "none";

            // Mostrar el menú de perfil
            const menuPerfil = document.createElement("div");
            menuPerfil.classList.add("perfil_menu_log");
            header.appendChild(menuPerfil);

            // opciones del menú de perfil
            const irAPerfil = document.createElement("a");
            irAPerfil.setAttribute("href", "#perfil");
            irAPerfil.classList.add("perfil-option", "menu-item");
            const perfilIcon = document.createElement("i");
            perfilIcon.classList.add("ri-user-smile-line", "menu-icon");
            irAPerfil.append(perfilIcon, " Ir a perfil");

            // Seguidos
            const seguidosLink = document.createElement("a");
            seguidosLink.setAttribute("href", "#seguido");
            seguidosLink.classList.add("seguidos-option", "menu-item");
            const seguidosIcon = document.createElement("i");
            seguidosIcon.classList.add("ri-user-follow-line", "menu-icon");
            seguidosLink.append(seguidosIcon, " Seguidos");

            // Seguidores
            const seguidoresLink = document.createElement("a");
            seguidoresLink.setAttribute("href", "#seguidores");
            seguidoresLink.classList.add("seguidores-option", "menu-item");
            const seguidoresIcon = document.createElement("i");
            seguidoresIcon.classList.add("ri-group-line", "menu-icon");
            seguidoresLink.append(seguidoresIcon, " Seguidores");

            const verNotificaciones = document.createElement("a");
            verNotificaciones.setAttribute("href", "#notificaciones");
            verNotificaciones.classList.add("notificaciones-option", "menu-item");
            const notiIcon = document.createElement("i");
            notiIcon.classList.add("ri-notification-3-line", "menu-icon");
            verNotificaciones.append(notiIcon, " Notificaciones");

            const verHistoriasGuardadas = document.createElement("a");
            verHistoriasGuardadas.setAttribute("href", "#historias-guardadas");
            verHistoriasGuardadas.classList.add("historias-guardadas-option", "menu-item");
            const guardadasIcon = document.createElement("i");
            guardadasIcon.classList.add("ri-bookmark-line", "menu-icon");
            verHistoriasGuardadas.append(guardadasIcon, " Historias guardadas");

            const verActividad = document.createElement("a");
            verActividad.setAttribute("href", "#actividad");
            verActividad.classList.add("actividad-option", "menu-item");
            const actividadIcon = document.createElement("i");
            actividadIcon.classList.add("ri-history-line", "menu-icon");
            verActividad.append(actividadIcon, " Actividad");

            const cerrarSesion = document.createElement("button");
            cerrarSesion.classList.add("cerrar-sesion-option", "menu-item");
            cerrarSesion.textContent = "Cerrar sesión";

            menuPerfil.append(
                irAPerfil,
                seguidosLink,
                seguidoresLink,
                verNotificaciones,
                verHistoriasGuardadas,
                verActividad,
                cerrarSesion
            );

            cerrarSesion.addEventListener("click", () => {
                // Aquí puedes agregar la lógica para cerrar sesión
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                
                Swal.fire({
                    title: 'Sesión cerrada',
                    text: 'Has cerrado sesión correctamente.',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    // router.navigate("/#");
                    window.location.href = "/"; // Redirigir a la página principal
                    menuPerfil.remove();
                    logOptions.style.display = "flex"; // Mostrar las opciones de inicio de sesión y registro
                });

            });


        }
    });

}

export default Header;