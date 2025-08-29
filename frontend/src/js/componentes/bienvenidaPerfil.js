export const bienvenidaPerfil = (nombre, foto) => {

    const overlay = document.createElement('div');
    overlay.classList.add('overlay_perfil');

    const contenedor = document.createElement('div');
    contenedor.classList.add('bienvenida_perfil_contenedor');

    //Si no hay foto, se usa un icono por defecto
    const imgPerfil = document.createElement('img');
    imgPerfil.setAttribute("src", (foto && foto.trim() !== "") ? foto : "src/assets/icon/user.svg");
    imgPerfil.setAttribute("alt", "Icono de usuario");
    imgPerfil.classList.add('icono_perfil_overlay');

    // Crear el texto de bienvenida
    const textoBienvenida = document.createElement('span');
    textoBienvenida.textContent = `¡Bienvenido, ${nombre}!`;
    textoBienvenida.classList.add('texto_bienvenida_overlay');

    contenedor.appendChild(imgPerfil);
    overlay.append(contenedor, textoBienvenida);
    document.body.appendChild(overlay);

    //Quitar la animación de bienvenida después de 3 segundos
    setTimeout(() => {

        overlay.remove();

    }, 3000); // 3 segundos de espera

};