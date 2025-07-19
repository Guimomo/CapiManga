import { getData } from "../../../helpers/auth";
import { listaDeCapitulos } from "./listaDeCapitulos";

export const historiaController = async () => {

    const { accessToken } = getData();

    const backendUrl = 'http://localhost:3000';
    const iconoDefault = '../../assets/user.svg';
    // Obtener el id de la historia desde el hash
    const hash = window.location.hash;
    const historiaId = hash.split('/')[1];
    const capituloId = hash.split('/')[2];

    const infoCont = document.querySelector('.historia_infoCont');
    const portaHistoria = document.querySelector('.historia_cover');
    const logoTitulo = document.querySelector('.historia_logoTitulo');
    const generosCont = document.querySelector('.historia_generos');
    const autorCont = document.querySelector('.historia_autor');
    const tipoVerificacion = document.querySelector('.historia_tipoVerificado');
    const argumento = document.querySelector('.historia_argumento');

    // Obtener datos de la historia
    const responceHistoria = await fetch(`${backendUrl}/api/historias/${historiaId}`);
    const { data: historia } = await responceHistoria.json();

    //cargar el tipo de historia, formato y su estado de verificación
    const responceFormato = await fetch(`${backendUrl}/api/tipo-historia/${historia.tipo_Historia}`);
    const { data: Formato } = await responceFormato.json();

    const tipoYFormato = document.createElement('p');
    tipoYFormato.textContent = `${historia.formato_Publicacion} • ${Formato.nombre_tipo}`;
    tipoYFormato.classList.add('historia_tipoYFormato');

    const estadoVerificacion = document.createElement('div');
    estadoVerificacion.classList.add('historia_estadoVerificacion');
    const iconoVerificacion = document.createElement('img');
    const textoVerificacion = document.createElement('span');
    textoVerificacion.textContent = historia.verificacion_Historia;
    if (historia.verificacion_Historia === 'CapiBoard') {
        iconoVerificacion.src = 'src/assets/img/page_elements/logo/CapiBoard_Icon.png';
        iconoVerificacion.alt = 'CapiBoard';
        estadoVerificacion.classList.add('verificacion_capiBoard');
    } else if (historia.verificacion_Historia === 'original') {
        iconoVerificacion.src = 'src/assets/img/page_elements/logo/Originals_Icon.png';
        iconoVerificacion.alt = 'Original';
        estadoVerificacion.classList.add('verificacion_original');
    }
    estadoVerificacion.append(iconoVerificacion, textoVerificacion);
    tipoVerificacion.append(tipoYFormato, estadoVerificacion);

    // Cargar portada de la historia
    const portadaImg = document.createElement('img');
    portadaImg.src = backendUrl + historia.portada_Historia;
    portadaImg.alt = 'cover';
    portaHistoria.appendChild(portadaImg);

    const LogoCont = document.createElement('div');
    LogoCont.classList.add('historia_logo');
    const logoImg = document.createElement('img');
    logoImg.src = backendUrl + historia.logo_Historia;
    logoImg.alt = 'logo';
    LogoCont.appendChild(logoImg);

    const tituloHistoria = document.createElement('h1');
    tituloHistoria.textContent = historia.titulo_Historia;
    tituloHistoria.classList.add('historia_titulo');

    logoTitulo.append(LogoCont, tituloHistoria);

    // Cargar generos y subgeneros (fetch a la API de generos)
    let generoNombre = '';
    let subgeneroNombre = '';

    if (historia.genero_Id) {
        try {
            const resGenero = await fetch(`${backendUrl}/api/generos/${historia.genero_Id}`);
            const { data: genero } = await resGenero.json();
            generoNombre = genero.nombre;
        } catch {}
    }
    if (historia.subgenero_Id) {
        try {
            const resSubgenero = await fetch(`${backendUrl}/api/generos/${historia.subgenero_Id}`);
            const { data: subgenero } = await resSubgenero.json();
            subgeneroNombre = subgenero.nombre;
        } catch {}
    }

    function normalizarClase(nombre) {
        if (!nombre) return '';
        return nombre
            .normalize('NFD').replace(/\p{Diacritic}/gu, '') // quitar tildes
            .replace(/\s+/g, '_') // espacios a guion bajo
            .replace(/[^a-zA-Z0-9_]/g, ''); // solo letras, números y guion bajo
    }

    const genero_historia = document.createElement('p');
    genero_historia.textContent = generoNombre;
    genero_historia.classList.add('genero', normalizarClase(generoNombre));

    const subgenero_historia = document.createElement('p');
    subgenero_historia.textContent = subgeneroNombre;
    subgenero_historia.classList.add('subgenero', 'sub' + normalizarClase(subgeneroNombre));

    generosCont.append(genero_historia, subgenero_historia);

    // Cargar autor con foto de perfil (público)

    const ResponsePerfilAuth = await fetch('http://localhost:3000/api/usuarios/perfil', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    const { data: perfilDataAuth } = await ResponsePerfilAuth.json();

    const ResponsePerfil = await fetch(`http://localhost:3000/api/usuarios/${historia.autor_Historia}`);

    const { data: perfilData } = await ResponsePerfil.json();

    const autorNombre = document.createElement('p');
    autorNombre.textContent = perfilData.nombre;
    autorNombre.classList.add('autor_Historia');

    const autorUsername = document.createElement('p');
    autorUsername.textContent =  '@' + perfilData.user_Name;

    const nombresAutor = document.createElement('div');
    nombresAutor.classList.add('historia_autor_nombres');
    nombresAutor.append(autorNombre, autorUsername);

    const autorFoto = document.createElement('div');
    autorFoto.classList.add('historia_autor_foto');

    const fotoImg = document.createElement('img');
    fotoImg.src =  backendUrl + perfilData.foto_Perfil ? `${backendUrl}${perfilData.foto_Perfil}` : iconoDefault;
    autorFoto.appendChild(fotoImg);

    const autorLink = document.createElement('a');
    autorLink.classList.add('autor_link_historia');
    autorLink.href = `/#perfil/${historia.autor_Historia}`;

    autorLink.append(autorFoto, nombresAutor);
    autorCont.appendChild(autorLink);

    // Cargar argumento de la historia
    argumento.textContent = historia.argumento_Historia;

    const capitulosCont = document.querySelector('.historia_capitulos');

    const ResponseCapitulos = await fetch(`http://localhost:3000/api/capitulos/historia/${historiaId}`);
    const { data: capitulos } = await ResponseCapitulos.json();

    listaDeCapitulos(capitulos, historiaId, backendUrl, capitulosCont, accessToken, perfilDataAuth);
}