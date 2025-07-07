import { eliminar_error, mostrar_error } from "./validar_formulario_config.js";

export const es_contrasena = (event, element) => {
  let elemento = element;

  if (event.type === "blur") {
    elemento = event.target;
  } else {
    elemento = element;
  }

  const contrasena = elemento.value;
  const mensaje = "La contraseña debe tener al menos 7 caracteres, una mayúscula, una minúscula, un número y un carácter especial.";

  const regexContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{7,100}$/;

  if (!regexContrasena.test(contrasena)) {
    mostrar_error(elemento, mensaje);
    return false;
  } else {
    eliminar_error(elemento);
    return true;
  }
};