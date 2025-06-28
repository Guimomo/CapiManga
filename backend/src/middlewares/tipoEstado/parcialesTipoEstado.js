// Middleware para validación parcial de Tipo_Estado (PATCH)
import { ResponseProvider } from "../../providers/ResponseProvider.js";
import { campos } from "./campos.js";

export function parcialesTipoEstado(req, res, next) {
  const errors = [];
  const bodyKeys = Object.keys(req.body);
  const camposPermitidos = campos.map((c) => c.name);
  const camposPresentes = bodyKeys.filter((key) => camposPermitidos.includes(key));
  if (camposPresentes.length === 0) {
    return ResponseProvider.error(res, "Debe enviar al menos un campo válido para actualizar", 400);
  }
  for (const campo of campos) {
    const { name, required, minLength, maxLength } = campo;
    const valor = req.body[name];
    if (valor !== undefined) {
      if (required && valor === "") {
        errors.push({ campo: name, message: `El campo ${name} es obligatorio y no puede estar vacío.` });
        continue;
      }
      if (minLength && valor.length < minLength) {
        errors.push({ campo: name, message: `El campo ${name} debe tener al menos ${minLength} caracteres.` });
        continue;
      }
      if (maxLength && valor.length > maxLength) {
        errors.push({ campo: name, message: `El campo ${name} no puede tener más de ${maxLength} caracteres.` });
        continue;
      }
    }
  }
  if (errors.length > 0) {
    return ResponseProvider.error(res, "Error de validación", 400, errors);
  }
  next();
}
