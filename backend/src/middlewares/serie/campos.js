export const campos = [
  { name: "titulo", required: true, minLength: 3, maxLength: 200 },
  { name: "descripcion", required: false, maxLength: 500 },
  { name: "id_autor", required: true, type: "number" },
  { name: "portada_path", required: false, maxLength: 300 },
  { name: "banner_path", required: false, maxLength: 300 },
  { name: "tipo_contenido", required: true, enum: ["webcomic", "novela", "comic", "manga"] },
];