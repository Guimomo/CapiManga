export const campos = [
    { name: "id_Usuario", required: true, type: "number" },
    { name: "contenido", required: true, minLength: 1, maxLength: 600 },
    { name: "tipo_objetivo", required: true, enum: ["historia", "capitulo", "publicacion", "comentario"] },
    { name: "id_objetivo", required: true, type: "number" }
];
