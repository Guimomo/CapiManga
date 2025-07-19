import { historiasUsuario } from "./historias";

export const perfilController = async () => {
    // Obtener id del usuario desde el hash
    const hash = window.location.hash;
    const idUsuario = hash.split("/")[1];

    const backendUrl = 'http://localhost:3000';
    const iconoDefault = '../../assets/user.svg';
    const bannerDefault = '../../assets/banner_default.svg';

    // Cargar datos del perfil
    const resPerfil = await fetch(`${backendUrl}/api/usuarios/${idUsuario}`);
    const { data: perfilData } = await resPerfil.json();

    // DATOS DEL PERFIL
    
    const fotoPerfil = document.querySelector('.fotoPerfil');
    const banner = document.querySelector('.Banner');
    const Nombre = document.querySelector('.nombre_perfil');
    const UserName = document.querySelector('.user_Name');
    const Biografia = document.querySelector('.biografia_texto');
    const contenedorHistorias = document.querySelector('.historias_usuario');
    
    Nombre.textContent = perfilData.nombre;
    UserName.textContent = "@" + perfilData.user_Name;
    Biografia.textContent = perfilData.biografia_Usuario;
    

    // Foto de perfil
    const imgPerfil = document.createElement('img');
    imgPerfil.alt = 'Foto de perfil';
    imgPerfil.classList.add('imgPerfil');
    imgPerfil.src = perfilData.foto_Perfil ? `${backendUrl}${perfilData.foto_Perfil}` : iconoDefault;
    fotoPerfil.innerHTML = '';
    fotoPerfil.appendChild(imgPerfil);

    // Banner
    banner.innerHTML = '';
    const imgBanner = document.createElement('img');
    imgBanner.alt = 'Banner de perfil';
    imgBanner.classList.add('imgBanner');
    imgBanner.src = perfilData.banner_Perfil ? `${backendUrl}${perfilData.banner_Perfil}` : bannerDefault;
    banner.appendChild(imgBanner);

    // Cargar historias del usuario
    const resHistorias = await fetch(`${backendUrl}/api/historias/autor/${idUsuario}`);
    const { data: historias } = await resHistorias.json();

    historiasUsuario(historias, backendUrl, contenedorHistorias);
};