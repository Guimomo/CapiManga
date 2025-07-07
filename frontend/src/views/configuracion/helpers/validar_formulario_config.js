// Helpers de validación para formularios de configuración

/**
 * Muestra un mensaje de error en un campo de un formulario
 */
export const mostrar_error = (element, mensaje) => {
  let contenedor = element;
  if (element.name === 'contrasena' && element.closest('.password_cont')) {
    contenedor = element.closest('.password_cont');
    if (contenedor.nextElementSibling && contenedor.nextElementSibling.tagName === 'SPAN') {
      contenedor.nextElementSibling.remove();
    }
  } else if (element.name === 'confirmar_contrasena' && element.closest('.password_confirm_cont')) {
    contenedor = element.closest('.password_confirm_cont');
    if (contenedor.nextElementSibling && contenedor.nextElementSibling.tagName === 'SPAN') {
      contenedor.nextElementSibling.remove();
    }
  } else {
    if (element.nextElementSibling && element.nextElementSibling.tagName === 'SPAN') {
      element.nextElementSibling.remove();
    }
  }
  const mensaje_error = document.createElement("span");
  mensaje_error.textContent = mensaje;
  contenedor.insertAdjacentElement("afterend", mensaje_error);
  element.classList.add("form__input--error");
};

/**
 * Elimina un mensaje de error de un campo de un formulario
 */
export const eliminar_error = (element) => {
  let contenedor = element;
  if (element.name === 'contrasena' && element.closest('.password_cont')) {
    contenedor = element.closest('.password_cont');
    if (contenedor.nextElementSibling && contenedor.nextElementSibling.tagName === 'SPAN') {
      contenedor.nextElementSibling.remove();
    }
  } else if (element.name === 'confirmar_contrasena' && element.closest('.password_confirm_cont')) {
    contenedor = element.closest('.password_confirm_cont');
    if (contenedor.nextElementSibling && contenedor.nextElementSibling.tagName === 'SPAN') {
      contenedor.nextElementSibling.remove();
    }
  } else {
    if (element.nextElementSibling && element.nextElementSibling.tagName === 'SPAN') {
      element.nextElementSibling.remove();
    }
  }
  element.classList.remove("form__input--error");
};

/**
 * Valida los campos de un formulario (required/data-required) y retorna datos y errores
 */
export const validar_campos = (e) => {
  const campos = [...e.elements].filter((el) => {
    const isRequired = el.hasAttribute("required") || [...el.attributes].some((attr) => attr.name.startsWith("data-required"));
    if (el.type === "checkbox" && !el.name) return false;
    return isRequired;
  });
  const radios = [...campos].filter((el) => el.type === "radio");
  const obj = {};
  const errores = [];
  if (radios.length > 0) {
    const campo_radio = radios.find((radio) => radio.checked);
    if (!campo_radio) {
      if (radios[0].name) obj[radios[0].name] = "";
    } else {
      if (campo_radio.name) obj[campo_radio.name] = campo_radio.value;
    }
  }
  campos.forEach((campo) => {
    switch (campo.tagName) {
      case "INPUT":
        if (campo.type === "text" || campo.type === "password" || campo.type === "number") {
          if (campo.value === "") {
            mostrar_error(campo, `El campo ${campo.name} es obligatorio`);
            errores.push(`${campo.name}: obligatorio`);
            obj[campo.name] = "";
            return;
          } else {
            eliminar_error(campo);
            obj[campo.name] = campo.value;
            campo.classList.remove("form__input--error");
          }
        }
        if (campo.type === "email") {
          if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(campo.value)) {
            mostrar_error(campo, `El correo no es válido`);
            errores.push(`${campo.name}: correo no válido`);
            obj[campo.name] = "";
            return;
          } else {
            eliminar_error(campo);
            obj[campo.name] = campo.value;
          }
        }
        if (campo.name === "confirmar_contrasena") {
          const pass = e.elements['contrasena']?.value;
          if (campo.value !== pass) {
            mostrar_error(campo, `Las contraseñas no coinciden`);
            errores.push(`${campo.name}: no coincide con contraseña`);
            obj[campo.name] = "";
            return;
          } else {
            eliminar_error(campo);
            obj[campo.name] = campo.value;
          }
        }
        if (campo.name === "contrasena" && campo.value.length < 6) {
          mostrar_error(campo, `La contraseña debe tener al menos 6 caracteres`);
          errores.push(`${campo.name}: menos de 6 caracteres`);
          obj[campo.name] = "";
          return;
        }
        if (campo.name === "user_Name") {
          if (!/^[a-zA-Z0-9._]{4,}$/.test(campo.value)) {
            mostrar_error(campo, `El usuario debe tener mínimo 4 caracteres y solo letras, números puntos o guiones bajos`);
            errores.push(`${campo.name}: formato inválido`);
            obj[campo.name] = "";
            return;
          }
        }
        if (campo.name === "nombre") {
          if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]{2,}$/.test(campo.value)) {
            mostrar_error(campo, `El nombre debe tener mínimo 2 letras y solo letras`);
            errores.push(`${campo.name}: formato inválido`);
            obj[campo.name] = "";
            return;
          }
        }
        if (campo.name === "telefono" && campo.value !== "") {
          if (!/^\d+$/.test(campo.value)) {
            mostrar_error(campo, `El teléfono solo debe contener números`);
            errores.push(`${campo.name}: solo números`);
            obj[campo.name] = "";
            return;
          }
        }
        if (campo.type === "checkbox" && campo.hasAttribute("data-required")) {
          if (!campo.checked) {
            mostrar_error(campo, `Debes aceptar los términos y condiciones`);
            errores.push(`${campo.name}: no aceptado`);
            obj[campo.name] = "";
            return;
          } else {
            eliminar_error(campo);
            obj[campo.name] = campo.checked;
          }
        }
        break;
      case "SELECT":
        if (campo.selectedIndex === 0) {
          mostrar_error(campo, `El campo ${campo.name} es obligatorio`);
          errores.push(`${campo.name}: obligatorio`);
          obj[campo.name] = "";
        } else {
          eliminar_error(campo);
          obj[campo.name] = campo.value;
          campo.classList.remove("form__input--error");
        }
        break;
    }
  });
  return { ...obj, _errores: errores };
};

/**
 * Valida que un objeto tenga todos los valores completos
 */
export const tiene_valores = (obj) => {
  return Object.values(obj).every(
    (valor) => valor !== "" && valor !== null && valor !== undefined
  );
};

// Validación para el formulario de perfil público
export function validarPerfil({ user_Name, biografia }) {
  const errores = {};
  if (!user_Name || user_Name.length < 4 || user_Name.length > 100) {
    errores.user_Name = "El nombre de usuario debe tener entre 4 y 100 caracteres.";
  }
  if (biografia && biografia.length > 500) {
    errores.biografia = "La biografía no puede superar los 500 caracteres.";
  }
  return errores;
}

// Validación para el formulario de datos personales
export function validarDatosPersonales({ nombre, genero_Usuario, fecha_nacimiento, email_Usuario, telefono, nueva_contrasena }) {
  const errores = {};
  if (!nombre || nombre.length < 2 || nombre.length > 255) {
    errores.nombre = "El nombre debe tener entre 2 y 255 caracteres.";
  }
  if (!genero_Usuario || !["femenino", "masculino", "ninguno", "otro"].includes(genero_Usuario)) {
    errores.genero_Usuario = "Selecciona un género válido.";
  }
  if (!fecha_nacimiento) {
    errores.fecha_nacimiento = "La fecha de nacimiento es obligatoria.";
  }
  if (!email_Usuario || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email_Usuario)) {
    errores.email_Usuario = "El email no es válido.";
  }
  if (telefono && telefono.length > 100) {
    errores.telefono = "El teléfono no puede superar los 100 caracteres.";
  }
  if (nueva_contrasena && nueva_contrasena.length > 0 && nueva_contrasena.length < 6) {
    errores.nueva_contrasena = "La nueva contraseña debe tener al menos 6 caracteres.";
  }
  return errores;
}

// Validación para privacidad
export function validarPrivacidad({ visibilidad_Usuario }) {
  if (!visibilidad_Usuario || !["publico", "privado"].includes(visibilidad_Usuario)) {
    return { visibilidad_Usuario: "Selecciona una opción de privacidad válida." };
  }
  return {};
}
