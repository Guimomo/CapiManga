export const campos = [
  { name: "id_Historia", required: true, type: "number" },
  { name: "calificada_por", required: true, type: "number" },
  { name: "calificacion", required: true, enum: ["positivo", "negativo"] },
  { name: "reseña_Historia", required: false, maxLength: 600 }
];
