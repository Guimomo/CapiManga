import { isoToFlagEmoji } from "../helpers/isoFlagEmogi";
import Swal from 'sweetalert2';
import { validar_campos, tiene_valores } from "../helpers/validar_formulario";

import { 
    son_letras,
    es_numero,
    es_correo,
    es_contrasena,
    es_userName,
    es_fechaNacimiento,
    es_confirmarContrasena 
} from "../helpers/index";

export const registroCotroller = async () => {

    const form = document.getElementById('formRegistro');
    const nombre = document.getElementById('nombre');
    const user_Name = document.getElementById('user_Name');
    const genero_Usuario = document.getElementById('genero_Usuario');
    const email = document.getElementById('email');
    const telefono = document.getElementById('telefono');
    const codigo_pais = document.getElementById('codigo_pais');
    const fecha_Nacimiento = document.getElementById('fecha_Nacimiento');
    const contrasena = document.getElementById('contrasena');
    const confirmar_contrasena = document.getElementById('confirmar_contrasena');

    const btnRegistro = document.querySelector('.btnRegistro');

    //Checkboxes para visualizar contraseñas
    const visualizarContrasena = document.getElementById('password');
    const visualizarConfirmarContrasena = document.getElementById('confirmar_password');
    
    //Evento para visualizar contraseñas

    visualizarContrasena.addEventListener('change', () => {
        if (visualizarContrasena.checked) {
            contrasena.type = 'text';
            contrasena.classList.add('input-password');
        } else {
            contrasena.type = 'password';
            contrasena.classList.remove('input-password');
        }
    });

    visualizarConfirmarContrasena.addEventListener('change', () => {
        if (visualizarConfirmarContrasena.checked) {
            confirmar_contrasena.type = 'text';
            confirmar_contrasena.classList.add('input-password');
        } else {
            confirmar_contrasena.type = 'password';
            confirmar_contrasena.classList.remove('input-password');
        }
    });

    //checkbox de terminos y condiciones
    const terminos = document.getElementById('terminos');

    user_Name.addEventListener('blur', es_userName);
    fecha_Nacimiento.addEventListener('blur', es_fechaNacimiento)


    terminos.addEventListener('change', () => {
        // btnRegistro.disabled = !terminos.checked;
        if (terminos.checked) {
            btnRegistro.removeAttribute('disabled');
        } else {
            btnRegistro.setAttribute('disabled', true);
        }
    });
    
    //Se llama a los codigos telefonicos

    const responseCodigos = await fetch("http://localhost:3000/api/codigos-telefonicos");

    const { data: codigosTelefonicos } = await responseCodigos.json();

    codigosTelefonicos.forEach(codigo => {
        
        const opcion = document.createElement('option');
        const bandera = isoToFlagEmoji(codigo.iso);
        opcion.value = codigo.codigo;
        opcion.textContent = `${bandera}  ${codigo.codigo}`;
        codigo_pais.appendChild(opcion);
    });


    // Validación en tiempo real para solo letras y solo números
    nombre.addEventListener('keydown', son_letras);
    telefono.addEventListener('keydown', es_numero);
    email.addEventListener('blur', es_correo);

    contrasena.addEventListener('blur', es_contrasena);
    confirmar_contrasena.addEventListener('blur', (e) => {
        // es_contrasena(e, confirmar_contrasena);
        es_confirmarContrasena(e, confirmar_contrasena, contrasena);
    });


    // Evento para enviar el formulario

    const guardar = async (e) => {
    
        e.preventDefault();

        // Validar campos antes de enviar
        const datosValidados = validar_campos(form);
        // Log de depuración para ver qué falla
        console.log('Resultado de validar_campos:', datosValidados);
        if (!tiene_valores(datosValidados)) {
            let errores = datosValidados._errores || [];
            console.log('Errores de validación:', errores);
            let mensaje = 'Por favor corrige los errores del formulario.';
            if (errores.length > 0) {
                mensaje += '\n\n' + errores.map(e => '- ' + e).join('\n');
            }
            Swal.fire({
                title: 'Error',
                text: mensaje,
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            return;
        }

        let telefonoCompleto = "";
        if (telefono.value) {
            telefonoCompleto = `${codigo_pais.value}${telefono.value}`;
        }

        const data = {

            nombre: nombre.value,
            user_Name: user_Name.value,
            genero_Usuario: genero_Usuario.value,
            email_Usuario: email.value,
            telefono: telefono.value ? telefonoCompleto : null,
            fecha_Nacimiento: fecha_Nacimiento.value,
            contrasena: contrasena.value,
        }

        // Log para depuración
        console.log('Datos enviados al backend:', data);

        const solicitud = await fetch("http://localhost:3000/api/auth/register", {
            
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
        });

        const respuestaRegister = await solicitud.json();
        // Log de la respuesta completa
        console.log('Respuesta backend:', respuestaRegister);
        if (respuestaRegister.success) {
            Swal.fire({
                title: '¡Bienvenido!',
                text: respuestaRegister.message || 'Login exitoso',
                icon: 'success',
                confirmButtonText: 'Continuar'
            }).then(() => {
                location.reload(); // Recargar la página
            });

            // setData(respuestaRegister.data); // No es necesario, línea comentada
        } else {
            // Si hay errores detallados del backend, muéstralos
            // let mensaje = respuestaRegister.message || 'Credenciales incorrectas';
            // if (Array.isArray(respuestaRegister.errors) && respuestaRegister.errors.length > 0) {
            //     mensaje += '\n\n' + respuestaRegister.errors.map(e => `- ${e.message || JSON.stringify(e)}`).join('\n');
            // }
            Swal.fire({
                title: 'Error',
                text: mensaje || 'Credenciales incorrectas',
                icon: 'error',
                confirmButtonText: 'Intentar de nuevo'
            });
        }
    
        form.reset(); // Limpiar el formulario
    }

    form.addEventListener('submit', guardar);


}