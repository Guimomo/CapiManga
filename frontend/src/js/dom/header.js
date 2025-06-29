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

}

export default Header;