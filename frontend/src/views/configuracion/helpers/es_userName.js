import { eliminar_error, mostrar_error } from "./validar_formulario_config.js";

export const es_userName = (event, element) => {
  // Declaramos la variable para asignar el elemento
  let elemento = element;
  // Validamos si el evento es de tipo blur
  if (event.type === "blur") {
    // Asignamos el elemento que disparo el evento
    elemento = event.target;
  } else {
    // Asignamos el elemento que se recibe por parametro
    elemento = element;
  }
  // Obtenemos el valor del campo
  const userName = elemento.value;
  const mensaje = "El nombre de usuario debe tener entre 3 y 20 caracteres: letras, números, punto o guion bajo.";
  const regexUserName = /^[a-zA-Z0-9._]{3,20}$/;
  
  // Validamos si el campo es un nombre de usuario válido
  if (!regexUserName.test(userName)) {
    // Mostramos un mensaje de error
    mostrar_error(elemento, mensaje);
    return false;
  } else {
    // Eliminamos el mensaje de error
    eliminar_error(elemento);
    return true;
  }
}