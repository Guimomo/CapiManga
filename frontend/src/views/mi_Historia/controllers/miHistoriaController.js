import Swal from "sweetalert2";
import { getData } from "../../../helpers/auth"
import { listaDeCapitulos } from "./listaDeCapitulos";

export const miHistoriaController = async () => {

    const { accessToken } = getData();
    const backendUrl = 'http://localhost:3000';
    const iconoDefault = '../../assets/user.svg'; // Ajusta la ruta si es necesario

    // Obtener el id de la historia desde el hash
    const hash = window.location.hash;
    const historiaId = hash.split('/')[1];

    //Cargar datos de perfil
    const ResponsePerfil = await fetch('http://localhost:3000/api/usuarios/perfil', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    const { data: perfilData } = await ResponsePerfil.json();

    const responceHistoria = await fetch(`http://localhost:3000/api/historias/${historiaId}`, {
        headers: { 
            Authorization: `Bearer ${accessToken}` 
        }
    });

    const { data:historia } = await responceHistoria.json();

    if (historia.autor_Historia !== perfilData.id) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No tienes permiso para configurar la historia de otro usuario.',
            confirmButtonText: 'Aceptar',
        });
        
        window.location.hash = ''; // Redirige a inicio
        return;
    }

    const infoCont = document.querySelector('.miHistoria_infoCont');
    const portaHistoria = document.querySelector('.miHistoria_cover');
    const logoTitulo = document.querySelector('.miHistoria_logoTitulo');
    const generosCont = document.querySelector('.miHistoria_generos');
    const autorCont = document.querySelector('.miHistoria_autor');
    const tipoVerificacion = document.querySelector('.miHistoria_tipoVerificado');
    const argumento = document.querySelector('.miHistoria_argumento')

    
    //cargar el tipo de historia, formato y su estado de verificación
    const responceFormato = await fetch(`http://localhost:3000/api/tipo-historia/${historia.tipo_Historia}`, {

        headers: { 
            Authorization: `Bearer ${accessToken}` 
        }
    });
    const { data:Formato } = await responceFormato.json();
    
    const tipoYFormatoMiHistoria = document.createElement('p');
    tipoYFormatoMiHistoria.textContent = `${historia.formato_Publicacion} • ${Formato.nombre_tipo}`;
    tipoYFormatoMiHistoria.classList.add('miHistoria_tipoYFormato');

    const estadoVerificacion = document.createElement('div');
    estadoVerificacion.classList.add('miHistoria_estadoVerificacion');

    const iconoVerificacion = document.createElement('img');


    const textoVerificacion = document.createElement('span');
    textoVerificacion.textContent = historia.verificacion_Historia;

    if (historia.verificacion_Historia === 'CapiBoard') {

        iconoVerificacion.src = 'src/assets/img/page_elements/logo/CapiBoard_Icon.png';
        iconoVerificacion.alt = 'CapiBoard';
        estadoVerificacion.classList.add('verificacion_capiBoard');

    } else if (historia.verificación_Historia === 'original') {

        iconoVerificacion.src = 'src/assets/img/page_elements/logo/Originals_Icon.png';
        iconoVerificacion.alt = 'Original';
        estadoVerificacion.classList.add('verificacion_original');
    }

    estadoVerificacion.append(iconoVerificacion, textoVerificacion);
    tipoVerificacion.append(tipoYFormatoMiHistoria, estadoVerificacion);

    // Cargar portada de la historia
    const portadaImg = document.createElement('img');
    portadaImg.src = backendUrl + historia.portada_Historia;
    portadaImg.alt = 'cover';
    portaHistoria.appendChild(portadaImg);

    const LogoCont = document.createElement('div');
    LogoCont.classList.add('miHistoria_logo');
    const logoImg = document.createElement('img');
    logoImg.src = backendUrl + historia.logo_Historia;
    logoImg.alt = 'logo';
    LogoCont.appendChild(logoImg);

    const tituloHistoria = document.createElement('h1');
    tituloHistoria.textContent = historia.titulo_Historia;
    tituloHistoria.classList.add('miHistoria_titulo');

    logoTitulo.append(LogoCont, tituloHistoria);

    // Cargar generos y subgeneros (fetch a la API de generos)
    let generoNombre = '';
    let subgeneroNombre = '';

    if (historia.genero_Id) {
        try {
            const resGenero = await fetch(`http://localhost:3000/api/generos/${historia.genero_Id}`);
            const { data: genero } = await resGenero.json();
            generoNombre = genero.nombre;
        } catch {}
    }
    if (historia.subgenero_Id) {
        try {
            const resSubgenero = await fetch(`http://localhost:3000/api/generos/${historia.subgenero_Id}`);
            const { data: subgenero } = await resSubgenero.json();
            subgeneroNombre = subgenero.nombre;
        } catch {}
    }

    // Normalizar nombre para clase (mantener mayúsculas, usar guiones bajos para espacios, quitar tildes)
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

    // Cargar autor con foto de perfil

    const autorNombre = document.createElement('p');
    autorNombre.textContent = perfilData.nombre;
    autorNombre.classList.add('autor_MiHistoria');

    const autorUsername = document.createElement('p');
    autorUsername.textContent = "@" + perfilData.user_Name;

    const nombresAutor = document.createElement('div');
    nombresAutor.classList.add('miHistoria_autor_nombres');
    nombresAutor.append(autorNombre, autorUsername);

    const autorFoto = document.createElement('div');
    autorFoto.classList.add('miHistoria_autor_foto');

    const fotoImg = document.createElement('img');
    fotoImg.src = backendUrl + perfilData.foto_Perfil ? `${backendUrl}${perfilData.foto_Perfil}` : iconoDefault;
    // fotoImg.alt = 'foto de perfil';
    autorFoto.appendChild(fotoImg);

    const autorLink = document.createElement('a');
    autorLink.classList.add('autor_link_miHistoria');
    autorLink.href = `/#mi_perfil`;

    autorLink.append(autorFoto, nombresAutor);
    autorCont.appendChild(autorLink);

    // Cargar argumento de la historia

    argumento.textContent = historia.argumento_Historia;

    // cargar lista de capitulos

    const capitulosCont = document.querySelector('.miHistoria_capitulos');

    const ResponseCapitulos = await fetch(`http://localhost:3000/api/capitulos/historia/${historiaId}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    const { data: capitulos } = await ResponseCapitulos.json();

    listaDeCapitulos(capitulos, historiaId, backendUrl, capitulosCont, accessToken, perfilData);
}