// Validaciones generales para Historia
export const campos = [
  { name: "titulo_Historia", required: true, minLength: 2, maxLength: 255 },
  { name: "formato_Publicacion", required: true, enum: ["serie", "one-Shot"] },
  { name: "portada_Historia", required: true },
  { name: "icono_Historia", required: true },
  { name: "logo_Historia", required: true },
  { name: "genero_Id", required: true, type: "number" },
  { name: "subgenero_Id", required: true, type: "number" },
  { name: "argumento_Historia", required: true, minLength: 2, maxLength: 500 },
  { name: "tipo_Serie", required: true, type: "number" },
  { name: "edad_Recomendada", required: true, type: "number" },
  { name: "visibilidad_Historia", required: true, enum: ["publica", "privada"] },
  { name: "tipo_Historia", required: true, type: "number" },
  { name: "verificación_Historia", required: true, enum: ["original", "capiBoard"] }
];
