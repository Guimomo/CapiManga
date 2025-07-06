import { isoToFlagEmoji } from "../helpers/isoFlagEmogi";

export const registroCotroller = async () => {

    const nombre = document.getElementById('nombre');
    const user_Name = document.getElementById('user_name');
    const genero_Usuario = document.getElementById('genero_Usuario');
    const email = document.getElementById('email');
    const telefono = document.getElementById('telefono');
    const codigo_pais = document.getElementById('codigo_pais');
    const fecha_Nacimiento = document.getElementById('fecha_Nacimiento');
    const contrasena = document.getElementById('contrasena');
    const confirmar_contrasena = document.getElementById('confirmar_contrasena');

    //Checkboxes para visualizar contraseñas
    const visualizarContrasena = document.getElementById('password');
    const visualizarConfirmarContrasena = document.getElementById('confirmar_password');

    //regex contraseña
    // const regexContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

    //regex email
    // const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    //Se llama a los codigos telefonicos

    const responseCodigos = await fetch("http://localhost:3000/api/codigos-telefonicos", {

        // headers: {
        //     'Authorization' : `Bearer ${accessToken}`
        // }
    });

    const { data: codigosTelefonicos } = await responseCodigos.json();

    codigosTelefonicos.forEach(codigo => {
        
        const opcion = document.createElement('option');
        const bandera = isoToFlagEmoji(codigo.iso);
        opcion.value = codigo.codigo;
        opcion.textContent = `${bandera}  ${codigo.codigo}`;
        codigo_pais.appendChild(opcion);
    });

}