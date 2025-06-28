import { ResponseProvider } from "../../providers/ResponseProvider.js";
// Campos personalizados para validar el login
const campos = [
  {
    name: "email_Usuario",
    required: true,
    minLength: 6,
    maxLength: 255,
    type: "email",
  },
  {
    name: "contrasena",
    required: true,
    minLength: 6,
    maxLength: 40,
  },
];

export const camposLogin = (req, res, next) => { 
  // Arreglo para almacenar los errores de validación
  const errors = [];

  // Recorremos el arreglo de campos a validar
  for (const campo of campos) {
    const { name, required, type, minLength, maxLength } = campo;
    // Capturamos el valor del campo del body de la petición
    const value = req.body[name];
    // Validar si el campo es requerido y está vacío
    if (required && (!value || value.trim() === "")) {
      errors.push({
        campo: name,
        message: `El campo ${name} es obligatorio y no puede estar vacío.`,
      });
      continue;
    }
    // Validar que el campo tenga la longitud mínima requerida
    if (minLength && value && value.length < minLength) {
      errors.push({
        campo: name,
        message: `El campo ${name} debe tener al menos ${minLength} caracteres.`,
      });
      continue;
    }
    // Validar que el campo no exceda la longitud máxima permitida
    if (maxLength && value && value.length > maxLength) {
      errors.push({
        campo: name,
        message: `El campo ${name} no puede tener más de ${maxLength} caracteres.`,
      });
      continue;
    }
    // Validar que el campo sea del tipo requerido en los campos de validación
    if (type === "email" && value) {
      // Validar que el campo sea un email válido
      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regexEmail.test(value)) {
        errors.push({
          campo: name,
          message: `El campo ${name} no es un email válido.`,
        });
        // Si el campo no es un email válido, continuamos al siguiente campo, evitando el resto de validaciones
        continue;
      }
    }
  }

  // Si hay errores, respondemos con un error
  if (errors.length > 0) {
    return ResponseProvider.error(res, "Error en los campos", 400, errors);
  }

  // Si no hay errores, continuamos con la siguiente función middleware
  next();
}