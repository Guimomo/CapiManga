import { mostrar_error, eliminar_error } from "./validar_formulario.js";

export const es_confirmarContrasena = (event, element, contrasenaElement) => {

  let elemento = element;
  if (event.type === "blur") {
    elemento = event.target;
  }

  const mensaje = "La contraseña no coincide con la contraseña ingresada anteriormente.";

  // Validamos si el campo de confirmación de contraseña coincide con el campo de contraseña
  if (elemento.value !== contrasenaElement.value) {
    mostrar_error(elemento, mensaje);
    return false;
  } else {
    eliminar_error(elemento);
    return true;
  }
};
