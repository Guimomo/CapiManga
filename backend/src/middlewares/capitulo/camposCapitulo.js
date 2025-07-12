// Middlewares de validación para Capitulo
import { ResponseProvider } from "../../providers/ResponseProvider.js";
import { campos } from "./campos.js";

export function camposCapitulo(req, res, next) {
  const errors = [];
  for (const campo of campos) {
    const { name, required, minLength, maxLength, type } = campo;
    const value = req.body[name];
    if (required && (value === undefined || value === null || value === "")) {
      errors.push({ campo: name, message: `El campo ${name} es obligatorio y no puede estar vacío.` });
      continue;
    }
    // Si el campo es tipo número, intenta convertirlo antes de validar (acepta decimales)
    if (type === "number" && value !== undefined) {
      const numValue = typeof value === "number" ? value : parseFloat(value);
      if (isNaN(numValue)) {
        errors.push({ campo: name, message: `El campo ${name} debe ser un número válido.` });
        continue;
      }
      req.body[name] = numValue;
    }
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
