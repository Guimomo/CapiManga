import Swal from 'sweetalert2';
import { setData } from '../../../helpers/auth';
import { bienvenidaPerfil } from '../../../js/dom/bienvenidaPerfil';

export const loginController = () => {
    const form = document.getElementById('formLogin');
    const correo = document.getElementById('correo'); // Puede ser usuario o correo
    const contrasena = document.getElementById('contrasena');
    const btnLogin = document.querySelector('.btnLogin');
    const visualizarContrasena = document.getElementById('password');

    // Mostrar/ocultar contraseña
    visualizarContrasena.addEventListener('change', () => {
        if (visualizarContrasena.checked) {
            contrasena.type = 'text';
            contrasena.classList.add('input-password');
        } else {
            contrasena.type = 'password';
            contrasena.classList.remove('input-password');
        }
    });

    // Función separada para el submit
    const login = async (e) => {
        e.preventDefault();
        btnLogin.disabled = true;

        const value = correo.value.trim();

        const data = {
            email_Usuario: value,
            contrasena: contrasena.value
        };

        try {
            const solicitud = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });

            const respuestaLogin = await solicitud.json();

            if (respuestaLogin.success) {

                setData(respuestaLogin.data);

                try {

                    let { accessToken } = respuestaLogin.data;

                    const perfil_userName = await fetch(`http://localhost:3000/api/usuarios/perfil`, {
                        method: 'GET',
                        headers: {
                        'Authorization': `Bearer ${accessToken}`
                        }
                    });

                    const { data: respuestaPerfil } = await perfil_userName.json();

                    // Construir URL completa para la foto de perfil
                    let fotoPerfilUrl = '';
                    if (respuestaPerfil.foto_Perfil) {
                        fotoPerfilUrl = `http://localhost:3000${respuestaPerfil.foto_Perfil}`;
                    }
                    bienvenidaPerfil(
                        respuestaPerfil.user_Name,
                        fotoPerfilUrl // ahora sí es la URL completa
                    );

                } catch (error) {

                    bienvenidaPerfil( 'Usuario', '' );
                }

                setTimeout(() => {
                    window.location.href = '/'; // Redirigir a la página principal
                }, 3000); // espera a que termine la animación

                // // Aquí puedes llamar a la función bienvenidaPerfil con un desfase de tiempo para ir a la pagina principal
                // if (respuestaLogin.success) {
                //     setData(respuestaLogin.data);
                //     bienvenidaPerfil( respuestaLogin.data?.nombre || 'Usuario',
                //         respuestaLogin.data?.foto_Perfil // o el campo que uses para la foto
                //     );
                    
                //     setTimeout(() => {
                //         window.location.href = '/'; // o location.reload()
                //     }, 3000); // espera a que termine la animación
                // }
                // return; // Salir para no ejecutar el resto

            } else {
                Swal.fire({
                    title: 'Error',
                    text: respuestaLogin.message || 'Credenciales incorrectas',
                    icon: 'error',
                    confirmButtonText: 'Intentar de nuevo'
                });
            }
        } catch (err) {
            Swal.fire({
                title: 'Error',
                text: 'No se pudo conectar con el servidor.',
                icon: 'error',
                confirmButtonText: 'Intentar de nuevo'
            });
        }

        btnLogin.disabled = false;
        form.reset();
        contrasena.type = "password";
        contrasena.classList.remove("input-password");
    };

    form.addEventListener('submit', login);
};