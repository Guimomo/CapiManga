// Middlewares de validación para Historia
import { ResponseProvider } from "../../providers/ResponseProvider.js";
import { campos } from "./campos.js";

export function camposHistoria(req, res, next) {
  const errors = [];
  for (const campo of campos) {
    const { name, required, minLength, maxLength, type, enum: enumValues } = campo;
    const value = req.body[name];
    if (required && (value === undefined || value === null || value === "")) {
      errors.push({ campo: name, message: `El campo ${name} es obligatorio y no puede estar vacío.` });
      continue;
    }
    if (type === "number" && value !== undefined && typeof value !== "number") {
      errors.push({ campo: name, message: `El campo ${name} debe ser un número.` });
      continue;
    }
    if (minLength && value && value.length < minLength) {
      errors.push({ campo: name, message: `El campo ${name} debe tener al menos ${minLength} caracteres.` });
      continue;
    }
    if (maxLength && value && value.length > maxLength) {
      errors.push({ campo: name, message: `El campo ${name} no puede tener más de ${maxLength} caracteres.` });
      continue;
    }
    if (enumValues && value && !enumValues.includes(value)) {
      errors.push({ campo: name, message: `El campo ${name} debe ser uno de: ${enumValues.join(", ")}.` });
      continue;
    }
  }
  if (errors.length > 0) {
    return ResponseProvider.error(res, "Error de validación", 400, errors);
  }
  next();
}
