// const Header =()=> {

//     const header = document.querySelector("header");
//     const headerContent = document.querySelector(".header-content")
//     const opciones = document.querySelector(".opciones")

//     /**
//      *  ------------------------------------ #1: Logo
//      ************************************************/

//     // Crear enlace
//     // const logoLink = document.createElement("a");
//     // logoLink.setAttribute("href", "/");
//     // logoLink.classList.add("logo-link");

//     // const logoImg = document.createElement("img");
//     // logoImg.setAttribute("src", "src/assets/img/page_elements/logo/logo.png");
//     // logoImg.setAttribute("alt", "Logo");
//     // logoImg.classList.add("logo-img");
    
//     // logoLink.appendChild(logoImg);

//     // const menuCheck = document.createElement("div");
//     // menuCheck.classList.add("menu-check");


//     // // check menu
//     // const checkinput = document.createElement("input");
//     // checkinput.setAttribute("type", "checkbox");
//     // checkinput.setAttribute("id", "checkMenu");
//     // checkinput.classList.add("check--menu-checkbox");

//     // // Icono flecha izquierda
//     // const menuIcon = document.createElement("i");
//     // //arrowLeft.setAttribute("src", "src/assets/icon/arrow-drop-left.svg");
//     // menuIcon.classList.add("menu-icon_opciones", "ri-more-2-fill");

//     // // label check logo
//     // const labelCheckMenu = document.createElement("label");
//     // labelCheckMenu.setAttribute("for", "checkMenu");
//     // labelCheckMenu.classList.add("check--menu-label");
//     // labelCheckMenu.append(menuIcon);

//     // // Agregar el checkbox y el label al contenedor logoCheck
//     // menuCheck.append(checkinput, labelCheckMenu);

//     // headerContent.append( logoLink, menuCheck );
    

//     /**
//      * ------------------------------------ #2: Icono perfil
//      ********************************************************/

//     // const profileIcon = document.createElement("div");
//     // profileIcon.classList.add("icono--perfil");

//     // const iconoPerfil = document.createElement("img");
//     // iconoPerfil.setAttribute("src", "src/assets/icon/user.svg");

//     // const checkPerfil = document.createElement("input");
//     // checkPerfil.setAttribute("type", "checkbox");
//     // checkPerfil.setAttribute("id", "checkperfil");
//     // checkPerfil.classList.add("check--perfil-checkbox");

//     // const labelCheckPerfil = document.createElement("label");
//     // labelCheckPerfil.setAttribute("for", "checkperfil");
//     // labelCheckPerfil.classList.add("check--perfil-label");
//     // labelCheckPerfil.appendChild(iconoPerfil);

//     // profileIcon.append( checkPerfil, labelCheckPerfil );


    
//     /**
//      * ------------------------------------ #3: search bar
//      ****************************************************/

//     // const searchBar = document.createElement("div");
//     // searchBar.classList.add("search-bar");

//     // //form
//     // const formBuscar = document.createElement("form");
//     // formBuscar.setAttribute("action", "#");
//     // formBuscar.setAttribute("method", "get");
//     // formBuscar.classList.add("form--buscador");

//     // const buscadorInput = document.createElement("input");
//     // buscadorInput.setAttribute("type", "search");
//     // buscadorInput.setAttribute("placeholder", "Buscar...");
//     // buscadorInput.classList.add("buscador--input");

//     // const buscadorBoton = document.createElement("button");
//     // buscadorBoton.setAttribute("type", "submit");
//     // buscadorBoton.classList.add("buscador--boton");

//     // formBuscar.append(buscadorInput, buscadorBoton);
//     // searchBar.appendChild(formBuscar);


//     /** 
//      * ------------------------------------ #4: Agregar elementos de menu al header
//     */

//     // const menuHeader = document.createElement("div");
//     // menuHeader.classList.add("menu-header");

//     // const chiguigokuContent = document.createElement("div");
//     // chiguigokuContent.classList.add("chiguiGoku--content");

//     // const chiguiGokuImg = document.createElement("img");
//     // chiguiGokuImg.setAttribute("src", "src/assets/img/page_elements/menu_elements/chigoku.png");

//     // chiguigokuContent.appendChild(chiguiGokuImg)

//     // menuHeader.append(searchBar, chiguigokuContent)


    
//     // Menu Originals ------------------------------------------------>

//     // const menuOriginals = document.createElement("div");
//     // menuOriginals.classList.add("menu-item", "menu-originals");

//     // const checkOriginals = document.createElement("input");
//     // checkOriginals.setAttribute("type", "checkbox");
//     // checkOriginals.setAttribute("id", "check-originals");
//     // checkOriginals.classList.add("check--menu-originals");

//     // const labelOriginals = document.createElement("label");
//     // labelOriginals.setAttribute("for", "check-originals");
//     // labelOriginals.classList.add("label--menu","menu-originals-title");
//     // // labelOriginals.textContent = "Originals";

//     // const logoOriginal = document.createElement("img");
//     // logoOriginal.classList.add("logo--item");
//     // logoOriginal.setAttribute("src","src/assets/icon/logoOG.svg");

//     // labelOriginals.appendChild(logoOriginal);

//     // const tittleOriginal = document.createElement("div");
//     // tittleOriginal.classList.add("tittle-div","OG-tittle");

//     // tittleOriginal.append(checkOriginals, labelOriginals);

//     // const originalsOpciones = document.createElement("div");
//     // originalsOpciones.classList.add("menu-opciones","originals-opciones");

//     // const originalComics = document.createElement("a");
//     // originalComics.setAttribute("href", "#");
//     // originalComics.classList.add("item-originals");
//     // originalComics.textContent = "Comics";

//     // const originalNovels = document.createElement("a");
//     // originalNovels.setAttribute("href", "#");
//     // originalNovels.classList.add("item-originals");
//     // originalNovels.textContent = "Novelas";

//     // const originalWebcomics = document.createElement("a");
//     // originalWebcomics.setAttribute("href", "#");
//     // originalWebcomics.classList.add("item-originals");
//     // originalWebcomics.textContent = "Webcomics";

//     // const originalOneCapi = document.createElement("a");
//     // originalOneCapi.setAttribute("href", "#");
//     // originalOneCapi.classList.add("item-originals");
//     // originalOneCapi.textContent = "OneCapis";

//     // originalsOpciones.append(originalComics, originalNovels, originalWebcomics, originalOneCapi);
//     // menuOriginals.append(tittleOriginal, originalsOpciones);


//     // Menú Capiboard ------------------------------------------------>
//     // const menuCapiBoard = document.createElement("div");
//     // menuCapiBoard.classList.add("menu-item", "menu-capiboard");

//     // const checkCapiBoard = document.createElement("input");
//     // checkCapiBoard.setAttribute("type", "checkbox");
//     // checkCapiBoard.setAttribute("id", "check-capiboard");
//     // checkCapiBoard.classList.add("check--menu-capiboard");

//     // const labelCapiBoard = document.createElement("label");
//     // labelCapiBoard.setAttribute("for", "check-capiboard");
//     // labelCapiBoard.classList.add("label--menu", "menu-capiboard-title");

//     // const logoCapiBoard = document.createElement("img");
//     // logoCapiBoard.classList.add("logo--item");
//     // logoCapiBoard.setAttribute("src", "src/assets/icon/logoCB.svg");

//     // labelCapiBoard.appendChild(logoCapiBoard);

//     // const tittleCapiBoard = document.createElement("div");
//     // tittleCapiBoard.classList.add("tittle-div", "CB-tittle");

//     // tittleCapiBoard.append(checkCapiBoard, labelCapiBoard);

//     // const capiBoardOpciones = document.createElement("div");
//     // capiBoardOpciones.classList.add("menu-opciones", "capiboard-opciones");

//     // const capiBoardComics = document.createElement("a");
//     // capiBoardComics.setAttribute("href", "#");
//     // capiBoardComics.classList.add("item-capiboard");
//     // capiBoardComics.textContent = "Comics";

//     // const capiBoardNovels = document.createElement("a");
//     // capiBoardNovels.setAttribute("href", "#");
//     // capiBoardNovels.classList.add("item-capiboard");
//     // capiBoardNovels.textContent = "Novelas";

//     // const capiBoardWebcomics = document.createElement("a");
//     // capiBoardWebcomics.setAttribute("href", "#");
//     // capiBoardWebcomics.classList.add("item-capiboard");
//     // capiBoardWebcomics.textContent = "Webcomics";

//     // const capiBoardOneCapi = document.createElement("a");
//     // capiBoardOneCapi.setAttribute("href", "#");
//     // capiBoardOneCapi.classList.add("item-originals");
//     // capiBoardOneCapi.textContent = "OneCapis";

//     // capiBoardOpciones.append(capiBoardComics, capiBoardNovels, capiBoardWebcomics, capiBoardOneCapi);
//     // menuCapiBoard.append(tittleCapiBoard, capiBoardOpciones);

//     // Agregar los elementos de menu al header

//     // const menuExtra = document.createElement("div");
//     // menuExtra.classList.add("extra-menu-header");
//     // menuExtra.append(menuOriginals, menuCapiBoard);

//     // const cerrarOpciones = document.createElement("input");
//     // cerrarOpciones.setAttribute("type", "checkbox");
//     // cerrarOpciones.setAttribute("id", "checkOpciones");

//     // const labelCheckCerrar = document.createElement("label");
//     // labelCheckCerrar.setAttribute("for", "checkOpciones");
//     // labelCheckCerrar.classList.add("check--logo-label");

//     // const cerrarIcon = document.createElement("i");
//     // cerrarIcon.classList.add("close-icon_opciones", "ri-close-line");

//     // labelCheckCerrar.append(cerrarIcon);

//     // const checkCerrarOpciones = document.createElement ("div");
//     // checkCerrarOpciones.classList.add("check-cerrar_opciones");
//     // checkCerrarOpciones.append(labelCheckCerrar,cerrarOpciones)

//     // const perfilSeccion = document.createElement("div");
//     // perfilSeccion.classList.add("perfil_seccion");
//     // perfilSeccion.append(profileIcon, checkCerrarOpciones);

//     // // const opciones = document.createElement("div");
//     // opciones.append(perfilSeccion, menuHeader, menuExtra )

//     //     cerrarOpciones.addEventListener("change", () => {
        
//     //     if (cerrarOpciones.checked) {
            
//     //         checkinput.checked = false;
//     //         cerrarOpciones.checked = false; // Opcional: para que también se desmarque el close
//     //     }
//     // });

//     // header.append( headerContent, opciones );
// }

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

    const iconoPerfil = document.createElement("img");
    iconoPerfil.setAttribute("src", "src/assets/icon/user.svg");
    iconoPerfil.classList.add("icono-perfil");

    const perfilText = document.createElement("span");
    perfilText.textContent = "Perfil";
    perfilText.classList.add("perfil-text");

    perfilCont.append( iconoPerfil, perfilText );

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