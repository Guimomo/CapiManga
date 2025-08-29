import { getData } from "../../../helpers/auth";
import { misHistorias } from "./misHistorias";
import { opcionesPerfilController } from "./opcionesPerfilControllers"

export const miPerfilController = async () => {

    let { accessToken } = getData();

    opcionesPerfilController();

    console.log("Token:", accessToken);

    //Cargar datos de perfil y obtener el id del usuario logueado
    const ResponsePerfil = await fetch('http://localhost:3000/api/usuarios/perfil', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
    const { data: perfilData } = await ResponsePerfil.json();
    const idUsuarioLogueado = perfilData.id; // Aquí tienes el id del usuario logueado
    // Puedes usar idUsuarioLogueado donde lo necesites, por ejemplo:
    // enviarReacciones('comentario', comentario.id, reaccionesContenedor, idUsuarioLogueado);

    // DATOS DEL PERFIL
    const fotoMiPerfil = document.querySelector('.fotoMiPerfil');
    const miBanner = document.querySelector('.miBanner');
    const miNombre = document.querySelector('.nombre_perfil');
    const miUserName = document.querySelector('.user_Name');
    const miBiografia = document.querySelector('.biografia_texto');
    const contenedorHistorias = document.querySelector('.misHistorias');

    miNombre.textContent = perfilData.nombre;
    miUserName.textContent = "@"+perfilData.user_Name;
    miBiografia.textContent = perfilData.biografia_Usuario;

    // Ruta del icono por defecto
    const iconoDefault = '/src/assets/icon/user.svg';
    // const bannerDefault = '../../assets/banner_default.svg'; // Cambia si tienes un banner por defecto
    const backendUrl = 'http://localhost:3000';

    // Foto de perfil
    const imgPerfil = document.createElement('img');
    imgPerfil.alt = 'Foto de perfil';
    imgPerfil.classList.add('imgPerfil');
    imgPerfil.src = perfilData.foto_Perfil ? `${backendUrl}${perfilData.foto_Perfil}` : iconoDefault;
    fotoMiPerfil.innerHTML = '';
    fotoMiPerfil.appendChild(imgPerfil);

    // Banner
    miBanner.innerHTML = '';
    const imgBanner = document.createElement('img');
    imgBanner.alt = 'Banner de perfil';
    imgBanner.classList.add('imgBanner');
    imgBanner.src = perfilData.banner_Perfil ? `${backendUrl}${perfilData.banner_Perfil}` : null
    miBanner.appendChild(imgBanner);

    // MIS HISTORIAS

    const responseHistorias = await fetch(`http://localhost:3000/api/historias/autor/${perfilData.id}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    const { data: historias } = await responseHistorias.json();

    misHistorias( historias, backendUrl, contenedorHistorias);

}