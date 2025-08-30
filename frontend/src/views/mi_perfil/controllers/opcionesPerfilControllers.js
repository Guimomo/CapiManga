export const opcionesPerfilController = (colorUsuario = null) => {

    const opcionesPerfil = document.querySelector(".opcionesMiPerfil");

    const misHistorias = document.querySelector(".misHistoriasCont")

    //Secrean opciones del menú de perfil
    const verNotificaciones = document.createElement("a");
    verNotificaciones.setAttribute("href", "#notificaciones");
    verNotificaciones.classList.add("notificaciones-option", "menu-item");
    const notiIcon = document.createElement("i");
    notiIcon.classList.add("ri-notification-3-line", "menu-icon");
    verNotificaciones.append(notiIcon, " Notificaciones");

    const verHistoriasGuardadas = document.createElement("a");
    verHistoriasGuardadas.setAttribute("href", "#historias-guardadas");
    verHistoriasGuardadas.classList.add("historias-guardadas-option", "menu-item");
    const guardadasIcon = document.createElement("i");
    guardadasIcon.classList.add("ri-bookmark-line", "menu-icon");
    verHistoriasGuardadas.append(guardadasIcon, " Historias guardadas");

    const verActividad = document.createElement("a");
    verActividad.setAttribute("href", "#actividad");
    verActividad.classList.add("actividad-option", "menu-item");
    const actividadIcon = document.createElement("i");
    actividadIcon.classList.add("ri-history-line", "menu-icon");
    verActividad.append(actividadIcon, " Actividad");

    const verConfiguracion = document.createElement("a");
    verConfiguracion.setAttribute("href", "#configuracion");
    verConfiguracion.classList.add("configuracion-option", "menu-item");
    const configIcon = document.createElement("i");
    configIcon.classList.add("ri-settings-3-line", "menu-icon");
    verConfiguracion.append(configIcon, " Configuración de cuenta");

    const menuItems = [verNotificaciones, verHistoriasGuardadas, verActividad, verConfiguracion];

    menuItems.forEach(item => {

        item.addEventListener("mouseenter", () => {
            item.style.color = colorUsuario ? colorUsuario : 'var(--main_color)';
        });
        item.addEventListener("mouseleave", () => {
            item.style.color = '';
        });
    });


    // Agregar las opciones al menú de perfil
    opcionesPerfil.append(verNotificaciones, verHistoriasGuardadas, verActividad, verConfiguracion);

}