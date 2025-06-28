// Middleware para validación parcial de edad_Recomendada (PATCH)
import { ResponseProvider } from "../../providers/ResponseProvider.js";
import { campos } from "./campos.js";

export function parcialesEdadRecomendada(req, res, next) {
  const errors = [];
  const bodyKeys = Object.keys(req.body);
  const camposPermitidos = campos.map((c) => c.name);
  const camposPresentes = bodyKeys.filter((key) => camposPermitidos.includes(key));
  if (camposPresentes.length === 0) {
    return ResponseProvider.error(res, "Debe enviar al menos un campo válido para actualizar", 400);
  }
  for (const campo of campos) {
    const { name, minLength, maxLength, type } = campo;
    const value = req.body[name];
    if (value !== undefined) {
      if (type === "number" && typeof value !== "number") {
        errors.push({ campo: name, message: `El campo ${name} debe ser un número.` });
        continue;
      }
      if (minLength && value.length < minLength) {
        errors.push({ campo: name, message: `El campo ${name} debe tener al menos ${minLength} caracteres.` });
        continue;
      }
      if (maxLength && value.length > maxLength) {
        errors.push({ campo: name, message: `El campo ${name} no puede tener más de ${maxLength} caracteres.` });
        continue;
      }
    }
  }
  // Validación cruzada: edad_Minima <= edad_Maxima
  if (
    typeof req.body.edad_Minima === "number" &&
    typeof req.body.edad_Maxima === "number" &&
    req.body.edad_Minima > req.body.edad_Maxima
  ) {
    errors.push({ campo: "edad_Minima", message: "La edad_Minima no puede ser mayor que la edad_Maxima." });
  }
  if (errors.length > 0) {
    return ResponseProvider.error(res, "Error de validación", 400, errors);
  }
  next();
}
