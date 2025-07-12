import { ResponseProvider } from "../../providers/ResponseProvider.js";
import { campos } from "./campos.js";

export function camposPaginasCapitulo(req, res, next) {
  // Log de depuración para ver qué llega realmente
  console.log('BODY recibido en middleware:', req.body);
  console.log('FILE recibido en middleware:', req.file);
  const errors = [];
  for (const campo of campos) {
    const { name, required, minLength, maxLength, type } = campo;
    const value = req.body[name];
    // Si el campo es pagina_img y el archivo existe, omitir la validación de vacío
    if (name === "pagina_img" && req.file) continue; // ajusta la validación para que acepte el archivo si está en req.file y no en req.body.pagina_img Esto ya existe, pero asegúrate que la validación no rechace la petición si el archivo está en req.file.
    
    if (required && (value === undefined || value === null || value === "")) {
      errors.push({ campo: name, message: `El campo ${name} es obligatorio y no puede estar vacío.` });
      continue;
    }
    if (type === "number" && value !== undefined) {
      const numValue = typeof value === "number" ? value : parseFloat(value);
      if (isNaN(numValue)) {
        errors.push({ campo: name, message: `El campo ${name} debe ser un número válido.` });
        continue;
      }
      req.body[name] = numValue;
    }
    // Si el campo es pagina_img y es archivo, omitir minLength/maxLength
    if (name === "pagina_img" && req.file) continue;
    if (minLength && value && value.length < minLength) {
      errors.push({ campo: name, message: `El campo ${name} debe tener al menos ${minLength} caracteres.` });
      continue;
    }
    if (maxLength && value && value.length > maxLength) {
      errors.push({ campo: name, message: `El campo ${name} no puede tener más de ${maxLength} caracteres.` });
      continue;
    }
  }
  if (errors.length > 0) {
    return ResponseProvider.error(res, "Error de validación", 400, errors);
  }
  next();
}
