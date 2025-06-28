import { ResponseProvider } from "../../providers/ResponseProvider.js";
import { campos } from "./campos.js";

export function parcialesMeGustaCapitulo(req, res, next) {
  const errors = [];
  const bodyKeys = Object.keys(req.body);
  const camposPermitidos = campos.map((c) => c.name);
  const camposPresentes = bodyKeys.filter((key) => camposPermitidos.includes(key));
  if (camposPresentes.length === 0) {
    return ResponseProvider.error(res, "Debe enviar al menos un campo válido para actualizar", 400);
  }
  for (const campo of campos) {
    const { name, type } = campo;
    const value = req.body[name];
    if (value !== undefined) {
      if (type === "number" && isNaN(Number(value))) {
        errors.push({ campo: name, message: `El campo ${name} debe ser un número.` });
        continue;
      }
    }
  }
  if (errors.length > 0) {
    return ResponseProvider.error(res, errors, 400);
  }
  next();
}
