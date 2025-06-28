export const campos = [
  { name: "publicado_por", required: true, type: "number" },
  { name: "publicacion_Text", required: true, minLength: 1, maxLength: 600 },
  { name: "publicacion_Img", required: false, maxLength: 255 },
  { name: "publicacion_Fecha", required: false }
];
