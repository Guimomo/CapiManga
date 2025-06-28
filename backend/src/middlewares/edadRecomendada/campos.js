// Validaciones generales para Edad Recomendada
export const campos = [
  { name: "tipo_Recomendacion", required: true, minLength: 2, maxLength: 200 },
  { name: "edad_Minima", required: true, type: "number" },
  { name: "edad_Maxima", required: true, type: "number" }
];
