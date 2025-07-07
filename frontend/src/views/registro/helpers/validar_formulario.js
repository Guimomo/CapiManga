import { es_correo } from "./es_correo.js";

/**
 * Función para mostrar un mensaje de error en un campo de un formulario
 * @param {*} campo 
 * @param {*} mensaje 
 */
export const mostrar_error = (element, mensaje) => {  
  // Eliminamos el mensaje para evitar duplicados
  let contenedor = element;
  // Si es input de contraseña, buscamos el contenedor padre adecuado
  if (element.name === 'contrasena' && element.closest('.password_cont')) {
    contenedor = element.closest('.password_cont');
    // Eliminamos solo spans de error, no otros elementos
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
  // Creamos un elemento span para mostrar el mensaje de error
  const mensaje_error = document.createElement("span");
  mensaje_error.textContent = mensaje;
  // Insertamos el mensaje después del contenedor adecuado
  contenedor.insertAdjacentElement("afterend", mensaje_error);
  // Agregamos una clase de error al elemento
  element.classList.add("form__input--error");
}

/**
 * Función para eliminar un mensaje de error de un campo de un formulario
 * @param {*} element 
 */
export const eliminar_error = (element) => {
  // Elimina solo el span de error, no otros elementos
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
}

/**
 * Realiza la validación de los campos de un formulario que tengan el atributo data-required
 * y retorna un objeto con los datos del formulario {campo: valor, campo: '', campo: array}
 * @param {HTMLFormElement} element
 * @returns {Object}
 */
export const validar_campos = (e) => {
  // Capturamos todos los campos del formulario que tengan el atributo required o data-required
  // EXCLUIMOS los checkboxes que no tengan atributo name (como los de mostrar/ocultar contraseña)
  const campos = [...e.elements].filter((el) => {
    const isRequired = el.hasAttribute("required") || [...el.attributes].some((attr) => attr.name.startsWith("data-required"));
    // Solo incluimos checkboxes si tienen name
    if (el.type === "checkbox" && !el.name) return false;
    return isRequired;
  });
  
  // Capturamos los campos de tipo radio
  const radios = [...campos].filter((el) => {
    return el.type === "radio";
  });

  
  // Creamos un objeto para almacenar los datos del formulario
  const obj = {};
  const errores = [];
  // Validamos que el campo radio tenga un valor seleccionado SOLO si hay radios en el formulario
  if (radios.length > 0) {
    const campo_radio = radios.find((radio) => radio.checked);
    if (!campo_radio) {
      if (radios[0].name) obj[radios[0].name] = "";
    } else {
      if (campo_radio.name) obj[campo_radio.name] = campo_radio.value;
    }
  }

  // Iteramos sobre los campos para validar que tengan datos
  campos.forEach((campo) => {
    // Validamos el tipo de campo
    switch (campo.tagName) {
      // Si el campo es un input de tipo text, email o password
      case "INPUT":        
        // Validación de campos vacíos
        if (
          campo.type === "text" ||
          campo.type === "password" ||
          campo.type === "number"
        ) {
          // Si el campo está vacío
          if (campo.value === "") {
            // Mostramos un mensaje de error
            mostrar_error(campo, `El campo ${campo.name} es obligatorio`);
            errores.push(`${campo.name}: obligatorio`);
            obj[campo.name] = "";
            return;
          } else {
            // Eliminamos el mensaje de error si el campo tiene datos
            eliminar_error(campo);
            // Si el campo tiene datos, se almacenan en el objeto
            obj[campo.name] = campo.value;
            // Removemos la clase de error del campo
            campo.classList.remove("form__input--error");
          }
        }
        // Validación de email
        if (campo.type === "email") {
          if (!es_correo(e, campo)) {
            mostrar_error(campo, `El correo no es válido`);
            errores.push(`${campo.name}: correo no válido`);
            obj[campo.name] = "";
            return;
          } else {
            eliminar_error(campo);
            obj[campo.name] = campo.value;
          }
        }
        // Validación de confirmación de contraseña

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

        // if (campo.name === "confirmar_contrasena") {
        //   const pass = e.elements['contrasena']?.value;
        //   if (campo.value !== pass) {
        //     mostrar_error(campo, `Las contraseñas no coinciden`);
        //     errores.push(`${campo.name}: no coincide con contraseña`);
        //     obj[campo.name] = "";
        //     return;
        //   } else {
        //     eliminar_error(campo);
        //     obj[campo.name] = campo.value;
        //   }
        // }
        // Validación de contraseña (mínimo 6 caracteres)
        if (campo.name === "contrasena" && campo.value.length < 6) {
          mostrar_error(campo, `La contraseña debe tener al menos 6 caracteres`);
          errores.push(`${campo.name}: menos de 6 caracteres`);
          obj[campo.name] = "";
          return;
        }
        // Validación de username (solo letras/números, mínimo 4 caracteres)
        if (campo.name === "user_Name") {
          if (!/^[a-zA-Z0-9._]{4,}$/.test(campo.value)) {
            mostrar_error(campo, `El usuario debe tener mínimo 4 caracteres y solo letras, números puntos o guiones bajos`);
            errores.push(`${campo.name}: formato inválido`);
            obj[campo.name] = "";
            return;
          }
        }
        // Validación de nombre (solo letras, mínimo 2 caracteres)
        if (campo.name === "nombre") {
          if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]{2,}$/.test(campo.value)) {
            mostrar_error(campo, `El nombre debe tener mínimo 2 letras y solo letras`);
            errores.push(`${campo.name}: formato inválido`);
            obj[campo.name] = "";
            return;
          }
        }
        // Validación de teléfono (solo números, opcional)
        if (campo.name === "telefono" && campo.value !== "") {
          if (!/^\d+$/.test(campo.value)) {
            mostrar_error(campo, `El teléfono solo debe contener números`);
            errores.push(`${campo.name}: solo números`);
            obj[campo.name] = "";
            return;
          }
        }
        // Validación de checkbox de términos
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
      // Si el campo es un select
      case "SELECT":
        // Si el campo no tiene un valor seleccionado
        if (campo.selectedIndex === 0) {
          // Mostramos un mensaje de error
          mostrar_error(campo, `El campo ${campo.name} es obligatorio`);
          errores.push(`${campo.name}: obligatorio`);
          obj[campo.name] = "";
        } else {
          // Eliminamos el mensaje de error si el campo tiene datos
          eliminar_error(campo);
          // Si el campo tiene un valor seleccionado, se almacena en el objeto
          obj[campo.name] = campo.value;
          // Removemos la clase de error del campo
          campo.classList.remove("form__input--error");
        }
        break;
    }
  });
  // Retornamos un objeto con los datos del formulario y los errores
  return { ...obj, _errores: errores };
};

/**
 * Función para validar que un objeto tenga valores
 * @param {*} obj 
 * @returns 
 */
export const tiene_valores = (obj) => { 
  // Validamos que todos los valores del objeto sean diferentes de vacío, null o indefinido
  return Object.values(obj).every(
  // Validamos que el valor sea diferente de vacío, null o indefinido
    (valor) => valor !== "" && valor !== null && valor !== undefined
  );
}