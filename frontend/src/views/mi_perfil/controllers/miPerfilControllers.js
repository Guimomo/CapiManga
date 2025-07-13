import { getData } from "../../../helpers/auth";
import { opcionesPerfilController } from "./opcionesPerfilControllers"

export const miPerfilController = async () => {

    let { accessToken } = getData();

    opcionesPerfilController();

    //Cargar datos de perfil
    const ResponsePerfil = await fetch('http://localhost:3000/api/usuarios/perfil', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    const { data: perfilData } = await ResponsePerfil.json();

    // DATOS DEL PERFIL
    const fotoMiPerfil = document.querySelector('.fotoMiPerfil');
    const miBanner = document.querySelector('.miBanner');
    const miNombre = document.querySelector('.nombre_perfil');
    const miUserName = document.querySelector('.user_Name');
    const miBiografia = document.querySelector('.biografia_texto');

    miNombre.textContent = perfilData.nombre;
    miUserName.textContent = "@"+perfilData.user_Name;
    miBiografia.textContent = perfilData.biografia_Usuario;

    // Ruta del icono por defecto
    const iconoDefault = '../../assets/user.svg'; // Ajusta la ruta si es necesario
    const bannerDefault = '../../assets/banner_default.svg'; // Cambia si tienes un banner por defecto
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
    imgBanner.src = perfilData.banner_Perfil ? `${backendUrl}${perfilData.banner_Perfil}` : bannerDefault;
    miBanner.appendChild(imgBanner);

    // MIS HISTORIAS

    

}