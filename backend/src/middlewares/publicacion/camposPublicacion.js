import { ResponseProvider } from "../../providers/ResponseProvider.js";
import { campos } from "./campos.js";

export function camposPublicacion(req, res, next) {
  const errors = [];
  // Parsear publicado_por a número si existe
  if (req.body.publicado_por !== undefined) {
    const num = Number(req.body.publicado_por);
    if (!isNaN(num)) req.body.publicado_por = num;
  }
  for (const campo of campos) {
    const { name, required, type, minLength, maxLength } = campo;
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
  }
  if (errors.length > 0) {
    return ResponseProvider.error(res, "Error de validación", 400, errors);
  }
  next();
}
