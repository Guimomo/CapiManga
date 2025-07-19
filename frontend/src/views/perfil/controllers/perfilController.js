import Swal from "sweetalert2";
import { getData } from "../../../helpers/auth";
import { historiasUsuario } from "./historias";

export const perfilController = async () => {

    const { accessToken } = getData();

    // Obtener id del usuario desde el hash
    const hash = window.location.hash;
    const idUsuario = hash.split("/")[1];

    const backendUrl = 'http://localhost:3000';
    const iconoDefault = '/src/assets/icon/user.svg';
    // const bannerDefault = '../../assets/banner_default.svg';

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
    imgBanner.src = perfilData.banner_Perfil ? `${backendUrl}${perfilData.banner_Perfil}` : null;
    banner.appendChild(imgBanner);

    // Cargar historias del usuario
    let historias = [];
    try {
        const resHistorias = await fetch(`${backendUrl}/api/historias/autor/${idUsuario}`);
        if (resHistorias.ok) {
            const { data } = await resHistorias.json();
            if (Array.isArray(data)) historias = data;
        }
    } catch (e) {
        // Si hay error, historias queda como array vacío
    }
    historiasUsuario(historias, backendUrl, contenedorHistorias);

    // Boton seguir

    const ResponsePerfilAuth = await fetch('http://localhost:3000/api/usuarios/perfil', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    const { data: perfilDataAuth } = await ResponsePerfilAuth.json();

    const responseSeguir = await fetch(`http://localhost:3000/api/seguir-usuario/${perfilData.id}/${perfilDataAuth.id}`,{
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    const { data: follow } = await responseSeguir.json();

    if (!responseSeguir.ok) {
        console.log('no sigues a este usuario');
    }

    let siguiendo = false;
    siguiendo = !!follow; // true si hay datos, false si no
    //El doble signo de exclamación !! en JavaScript se usa para convertir cualquier valor a un booleano (true o false)
    const seguirBtn = document.querySelector('.seguirButton');
    seguirBtn.classList.toggle('siguiendo', siguiendo);
    
    const followSimbol = document.createElement('i');
    followSimbol.classList.add('ri-user-follow-line');

    const unfollowSimbol = document.createElement('i');
    unfollowSimbol.classList.add('ri-user-unfollow-line');
    // seguirBtn.textContent = siguiendo ? unfollowSimbol+'Dejar de seguir' : followSimbol+'Seguir';

    seguirBtn.innerHTML = '';
    if (siguiendo) {
       seguirBtn.appendChild(unfollowSimbol.cloneNode(true));
       seguirBtn.append('Dejar de seguir');
    } else {
        seguirBtn.appendChild(followSimbol.cloneNode(true));
        seguirBtn.append('Seguir');
    }

    seguirBtn.onclick = async () => {

        try {
            
            if (siguiendo) { // Si ya está siguiendo, dejar de seguir
                // Dejar de seguir al usuario
                const data = {
                    siguiendo_a: perfilData.id,
                    seguido_por: perfilDataAuth.id
                };

                const res = await fetch(`http://localhost:3000/api/seguir-usuario/${perfilData.id}/${perfilDataAuth.id}`, {
                    method: 'DELETE',
                    headers: { 
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                const {data: followData} = await res.json();

                if (!res.ok) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al dejar de seguir',
                        text: followData.message || 'No se pudo dejar de seguir al usuario.'+res.status
                    })
                }

                siguiendo = false;
                seguirBtn.classList.remove('siguiendo');
                seguirBtn.textContent = 'Seguir';
                
            } else {

                // Seguir al usuario

                const data = {
                    siguiendo_a: perfilData.id,
                    seguido_por: perfilDataAuth.id
                };

                const res = await fetch(`http://localhost:3000/api/seguir-usuario`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                
                const { data: followData } = await res.json();
                
                if (!res.ok) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al seguir',
                        text: followData.message || 'No se pudo seguir al usuario.'+res.status
                    });
                }

                siguiendo = true;
                seguirBtn.classList.add('siguiendo');
                seguirBtn.textContent = 'Dejar de seguir';
                
            }
        } catch (error) {

            console.error('Error al seguir/dejar de seguir:', error);
            
        }
    }

    // botones de seguidos y seguidores
    const seguidosBtn = document.querySelector('.siguiendoButton');
    const seguidoresBtn = document.querySelector('.seguidoresButton');

    const seguidosCount = document.querySelector('.siguiendoCount');
    const seguidoresCount = document.querySelector('.seguidoresCount');

    // const responseSeguir = await fetch(`http://localhost:3000/api/seguir-usuario/${perfilData.id}/${perfilDataAuth.id}`,{
    //     method: 'GET',
    //     headers: {
    //         Authorization: `Bearer ${accessToken}`
    //     }
    // });

    // Contar a quiénes sigue este usuario (seguidos)
    const resSeguidos = await fetch(`http://localhost:3000/api/seguir-usuario/seguido_por/${idUsuario}`);
    const seguidos_usuario = await resSeguidos.json();
    console.log('Seguidos response:', seguidos_usuario);
    let seguidosCountValue = Array.isArray(seguidos_usuario.data) ? seguidos_usuario.data.length : 0;
    seguidosCount.textContent = seguidosCountValue;
    console.log('Seguidos count:', seguidosCountValue);

    // Contar seguidores de este usuario
    const resSeguidores = await fetch(`http://localhost:3000/api/seguir-usuario/siguiendo_a/${idUsuario}`);
    const seguidores_usuario = await resSeguidores.json();
    console.log('Seguidores response:', seguidores_usuario);
    let seguidoresCountValue = Array.isArray(seguidores_usuario.data) ? seguidores_usuario.data.length : 0;
    seguidoresCount.textContent = seguidoresCountValue;
    console.log('Seguidores count:', seguidoresCountValue);

};