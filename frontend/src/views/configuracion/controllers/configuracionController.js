import Swal from 'sweetalert2';
import { getData } from '../../../helpers/auth';
import { isoToFlagEmoji } from '../helpers/isoFlagEmogi';
import { configSeleccion } from './configSeleccion';

export const configuracionController = async (datos) => {

    configSeleccion();
    
    // Obtener token
    const { accessToken } = getData();
    // console.log('TOKEN ENVIADO:', accessToken);

    //Cargar datos de perfil
    const ResponsePerfil = await fetch('http://localhost:3000/api/usuarios/perfil', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    const { data: perfilData } = await ResponsePerfil.json();

    //cargar codigo telefonico
    const ResponseCodigoTelefonico = await fetch('http://localhost:3000/api/codigos-telefonicos', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    const { data: codigosTelefonicos } = await ResponseCodigoTelefonico.json();

    // Cargar lista de códigos telefónicos
    const selectCodigoTelefono = document.getElementById('codigo_pais');
    selectCodigoTelefono.innerHTML = '<option value="" selected> País </option>';
    codigosTelefonicos.forEach(codigo => {
        
        const opcion = document.createElement('option');
        const bandera = isoToFlagEmoji(codigo.iso);
        opcion.value = codigo.codigo;
        opcion.textContent = `${bandera}  ${codigo.codigo}`;
        selectCodigoTelefono.appendChild(opcion);
    });


    // DATOS DEL PERFIL
    const form = document.getElementById('formDatosPerfil');
    const user_Name = document.getElementById('user_Name');
    const biografia = document.getElementById('biografia_perfil');
    const fotoPerfil = document.getElementById('foto_perfil');
    const fotoBanner = document.getElementById('foto_banner');



    user_Name.value = perfilData.user_Name;
    biografia.value = perfilData.biografia_Usuario || '';
    // Cargar foto de perfil y banner
    if (perfilData.foto_Perfil) {
        fotoPerfil.src = perfilData.foto_Perfil;
    }
    if (perfilData.banner_Perfil) {
        fotoBanner.src = perfilData.banner_Perfil;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('user_Name', user_Name.value);
        formData.append('biografia_Usuario', biografia.value);
        if (fotoPerfil.files[0]) formData.append('foto_Perfil', fotoPerfil.files[0]);
        if (fotoBanner.files[0]) formData.append('banner_Perfil', fotoBanner.files[0]);

        try {
            const res = await fetch('http://localhost:3000/api/usuarios/perfil', {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
                body: formData
            });
            const result = await res.json();
            if (result.success) {
                Swal.fire('¡Listo!', 'Perfil actualizado correctamente', 'success');
            } else {
                Swal.fire('Error', result.message || 'No se pudo actualizar', 'error');
            }
        } catch (err) {
            Swal.fire('Error', 'No se pudo conectar con el servidor', 'error');
        }
    });

    // DATOS PERSONALES
    const formDatosUsuario = document.getElementById('formDatosUsuario');
    const nombre = document.getElementById('nombre');
    const genero_Usuario = document.getElementById('genero_Usuario');
    const fecha_Nacimiento = document.getElementById('fecha_nacimiento');
    const email = document.getElementById('email_Usuario');
    const telefono = document.getElementById('telefono');
    const nueva_contrasena = document.getElementById('nueva_contrasena');
    const confirmarNuevaContrasena = document.getElementById('confirmar_nueva_contrasena');
    const checkContrasena = document.getElementById('visualizar_nueva_contrasena');
    

    const modal = document.getElementById('modal_contrasena_actual');
    const inputContrasenaActual = document.getElementById('input_contrasena_actual');
    const btnConfirmar = document.getElementById('btn_confirmar_contrasena_actual');
    const btnCancelar = document.getElementById('btn_cancelar_contrasena_actual');
    let datosPendientes = null;


    //Cargar Datos personales
    nombre.value = perfilData.nombre;
    genero_Usuario.value = perfilData.genero_Usuario;
    fecha_Nacimiento.value = perfilData.fecha_Nacimiento ? new Date(perfilData.fecha_Nacimiento).toISOString().split('T')[0] : '';
    email.value = perfilData.email_Usuario;
    telefono.value = perfilData.telefono ? perfilData.telefono.replace(/^\+/, '') : ''; // Eliminar el símbolo '+' si existe

    

    // formDatosUsuario.addEventListener('submit', async (e) => {
    //     e.preventDefault();
    //     // Recoge los datos del formulario
    //     const datos = Object.fromEntries(new FormData(formDatosUsuario));
    //     // Si el usuario quiere cambiar la contraseña
    //     if (nuevaContrasena.value || confirmarNuevaContrasena.value) {
    //         if (nuevaContrasena.value.length < 6) {
    //             Swal.fire('Error', 'La nueva contraseña debe tener al menos 6 caracteres', 'error');
    //             return;
    //         }
    //         if (nuevaContrasena.value !== confirmarNuevaContrasena.value) {
    //             Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
    //             return;
    //         }
    //         // Guarda los datos pendientes y muestra el modal
    //         datosPendientes = datos;
    //         modal.style.display = 'flex';
    //         inputContrasenaActual.value = '';
    //         inputContrasenaActual.focus();
    //         return;
    //     }
    //     // Si no hay cambio de contraseña, envía normalmente
    //     await enviarDatosPersonales(datos);
    // });

    // btnConfirmar.addEventListener('click', async () => {
    //     if (!inputContrasenaActual.value || inputContrasenaActual.value.length < 6) {
    //         Swal.fire('Error', 'Debes ingresar tu contraseña actual', 'error');
    //         return;
    //     }
    //     // Agrega la contraseña actual a los datos pendientes
    //     datosPendientes.contrasena_actual = inputContrasenaActual.value;
    //     await enviarDatosPersonales(datosPendientes);
    //     modal.style.display = 'none';
    //     datosPendientes = null;
    // });

    // btnCancelar.addEventListener('click', () => {
    //     modal.style.display = 'none';
    //     datosPendientes = null;
    // });

    // Mostrar/ocultar contraseña con el checkbox
    checkContrasena.addEventListener('change', () => {
        if (checkContrasena.checked) {
            nueva_contrasena.type = 'text';
        } else {
            nueva_contrasena.type = 'password';
        }
    });
};