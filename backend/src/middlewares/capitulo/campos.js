// Validaciones generales para Capítulo
export const campos = [
  { name: "id_Historia", required: true, type: "number" },
  { name: "titulo_Capitulo", required: true, minLength: 2, maxLength: 200 },
  { name: "numero_Capitulo", required: true, type: "number" },
  { name: "argumento_Capitulo", required: false, maxLength: 150 },
  { name: "icono_Capitulo", required: false }
];
