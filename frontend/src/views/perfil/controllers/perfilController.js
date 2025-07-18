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
    document.querySelector('.nombre_perfil').textContent = perfilData.nombre;
    document.querySelector('.user_Name').textContent = "@" + perfilData.user_Name;
    document.querySelector('.biografia_texto').textContent = perfilData.biografia_Usuario;

    // Foto de perfil
    const fotoPerfil = document.querySelector('.fotoPerfil');
    const imgPerfil = document.createElement('img');
    imgPerfil.alt = 'Foto de perfil';
    imgPerfil.classList.add('imgPerfil');
    imgPerfil.src = perfilData.foto_Perfil ? `${backendUrl}${perfilData.foto_Perfil}` : iconoDefault;
    fotoPerfil.innerHTML = '';
    fotoPerfil.appendChild(imgPerfil);

    // Banner
    const banner = document.querySelector('.Banner');
    banner.innerHTML = '';
    const imgBanner = document.createElement('img');
    imgBanner.alt = 'Banner de perfil';
    imgBanner.classList.add('imgBanner');
    imgBanner.src = perfilData.banner_Perfil ? `${backendUrl}${perfilData.banner_Perfil}` : bannerDefault;
    banner.appendChild(imgBanner);

    // Cargar historias del usuario
    const resHistorias = await fetch(`${backendUrl}/api/historias/autor/${idUsuario}`);
    const { data: historias } = await resHistorias.json();
    const contenedorHistorias = document.querySelector('.Historias');
    contenedorHistorias.innerHTML = '';
    historias.forEach(historia => {
        const historiaItem = document.createElement("a");
        historiaItem.classList.add("mi_historia_item");
        historiaItem.textContent = historia.titulo_Historia;
        historiaItem.href = `/#historia/${historia.id}`;
        contenedorHistorias.appendChild(historiaItem);
    });
};