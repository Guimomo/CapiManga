import { getData } from "../../../helpers/auth";
import { listaDeCapitulos } from "./listaDeCapitulos";
import { resena } from "../../../js/objects/resena";

export const historiaController = async () => {

    const { accessToken } = getData();

    const backendUrl = 'http://localhost:3000';
    const iconoDefault = '/src/assets/icon/user.svg';
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
    const argumentoElements = document.querySelector('.historia_argumento_elements')

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
    } else if (historia.verificacion_Historia === 'Original') {
        iconoVerificacion.src = 'src/assets/img/page_elements/logo/Originals_Icon.png';
        iconoVerificacion.alt = 'Original';
        estadoVerificacion.classList.add('verificacion_original');
    }
    estadoVerificacion.append(iconoVerificacion, textoVerificacion);
    tipoVerificacion.append(tipoYFormato, estadoVerificacion);

    // Si es original, poner el banner como fondo
    if (historia.verificacion_Historia === "Original" ) {
        const bannerImg = document.createElement('img');
        bannerImg.src = backendUrl + historia.banner_Historia;
        bannerImg.classList.add('banner_Historia');
        infoCont.appendChild(bannerImg);

        const personajeImg = document.createElement('img');
        personajeImg.src = backendUrl + historia.personaje_Png;
        personajeImg.classList.add('personaje_Historia_Elements');
        argumentoElements.append(personajeImg);
    }

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
    fotoImg.src = perfilData.foto_Perfil ? `${backendUrl}${perfilData.foto_Perfil}` : iconoDefault;
    autorFoto.appendChild(fotoImg);

    const autorLink = document.createElement('a');
    autorLink.classList.add('autor_link_historia');
    autorLink.href = `/#perfil/${historia.autor_Historia}`;

    autorLink.append(autorFoto, nombresAutor);
    autorCont.appendChild(autorLink);

    // Cargar argumento de la historia
    argumento.textContent = historia.argumento_Historia;


    // --- GUARDADOS ---
    const guardadosCont = document.querySelector('.historia_guardados');
    // Botón guardar historia
    const guardarBtn = document.createElement('button');
    guardarBtn.classList.add('btn_guardar_historia');
    guardarBtn.innerHTML = '<i class="ri-bookmark-line"></i> Guardar';

    // Contador de guardados
    const guardadosCount = document.createElement('span');
    guardadosCount.classList.add('contador_guardados');

    // Obtener cantidad de guardados y si el usuario actual ya guardó la historia
    let guardados = 0;
    let yaGuardada = false;
    try {
        const resGuardados = await fetch(`${backendUrl}/api/guardar-historia/historia/${historiaId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        const { data: guardadosData } = await resGuardados.json();
        guardados = Array.isArray(guardadosData) ? guardadosData.length : 0;
        // Verificar si el usuario actual ya guardó la historia
        yaGuardada = guardadosData.some(g => g.guardada_por === perfilDataAuth.id);
    } catch {}
    guardadosCount.textContent = guardados;

    // Cambiar estado visual si ya está guardada
    if (yaGuardada) {
        guardarBtn.classList.add('guardada');
        guardarBtn.innerHTML = '<i class="ri-bookmark-fill"></i> Guardada';
    }

    // Toggle guardar/desguardar (estilo botón seguir)
    guardarBtn.onclick = async () => {
        if (!perfilDataAuth.id) return;
        guardarBtn.disabled = true;
        if (!yaGuardada) {
            // Guardar historia
            const data = {
                id_Historia: Number(historiaId),
                guardada_por: Number(perfilDataAuth.id)
            };
            try {
                const res = await fetch(`${backendUrl}/api/guardar-historia`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                const { data: guardarData, message } = await res.json();
                if (!res.ok) {
                    alert(message || 'No se pudo guardar la historia.');
                } else {
                    guardados++;
                    yaGuardada = true;
                    guardarBtn.classList.add('guardada');
                    guardarBtn.innerHTML = '<i class="ri-bookmark-fill"></i> Guardada';
                }
            } catch (error) {
                alert('Error al guardar la historia.');
            }
        } else {
            // Desguardar historia
            try {
                const res = await fetch(`${backendUrl}/api/guardar-historia/${historiaId}/${perfilDataAuth.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                const { data: guardarData, message } = await res.json();
                if (!res.ok) {
                    alert(message || 'No se pudo quitar el guardado.');
                } else {
                    guardados = Math.max(guardados - 1, 0);
                    yaGuardada = false;
                    guardarBtn.classList.remove('guardada');
                    guardarBtn.innerHTML = '<i class="ri-bookmark-line"></i> Guardar';
                }
            } catch (error) {
                alert('Error al quitar el guardado.');
            }
        }
        guardadosCount.textContent = guardados;
        guardarBtn.disabled = false;
    };

    guardadosCont.append(guardarBtn, guardadosCount);

    // --- RESEÑA ---
    const calificacionCont = document.querySelector('.historia_calificacion');
    const resenaBtn = document.createElement('button');
    resenaBtn.classList.add('btn_crear_resena');
    resenaBtn.innerHTML = '<i class="ri-chat-new-line"></i> Crear reseña';
    calificacionCont.appendChild(resenaBtn);
    resenaBtn.onclick = () => {
        resena(historiaId, perfilDataAuth.id);
    };

    // --- DATOS DE HISTORIA ---
    const datosCont = document.querySelector('.historia_datosDeHistoria');
    const datos = document.createElement('div');
    datos.classList.add('datos_historia');
    // Fecha de publicación
    const fecha = document.createElement('p');
    let fechaFormateada = '';
    if (historia.fecha_Publicacion_Historia) {
        const fechaObj = new Date(historia.fecha_Publicacion_Historia);
        fechaFormateada = fechaObj.toLocaleDateString('es-ES', {
            day: '2-digit', month: '2-digit', year: 'numeric'
        });
    } else {
        fechaFormateada = 'Desconocida';
    }
    fecha.innerHTML = `<b>Fecha de publicación:</b> ${fechaFormateada}`;
    // Estado de serie
    const estado = document.createElement('p');
    estado.innerHTML = `<b>Estado de serie:</b> ${historia.tipo_Serie}`;
    // Edad recomendada
    const edad = document.createElement('p');
    edad.innerHTML = `<b>Edad recomendada:</b> ${historia.edad_Recomendada}`;
    datos.append(fecha, estado, edad);
    datosCont.appendChild(datos);

    const capitulosCont = document.querySelector('.historia_capitulos');

    const ResponseCapitulos = await fetch(`${backendUrl}/api/capitulos/historia/${historiaId}`);
    const { data: capitulos } = await ResponseCapitulos.json();

    listaDeCapitulos(capitulos, historiaId, backendUrl, capitulosCont, accessToken, perfilDataAuth);
}