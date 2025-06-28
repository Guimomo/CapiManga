export const campos = [
  { name: "id_Usuario", required: true, type: "number" },
  { name: "tipo_objetivo", required: true, enum: ["publicacion", "comentario"] },
  { name: "id_objetivo", required: true, type: "number" },
  { name: "tipo_Reaccion", required: true, enum: ["me_gusta", "me_encanta", "muy_divertido", "que_increible", "que_triste", "no_me_parece"] }
];
