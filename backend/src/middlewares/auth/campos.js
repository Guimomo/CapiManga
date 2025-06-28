export const campos = [
  {
    name: "nombre",
    required: true,
    minLength: 2,
    maxLength: 150
  },
  {
    name: "user_Name",
    required: true,
    minLength: 4,
    maxLength: 100
  },
  {
    name: "email_Usuario",
    required: true,
    minLength: 6,
    maxLength: 255,
    type: "email",
  },
  {
    name: "contrasena",
    required: true,
    minLength: 6,
    maxLength: 150
  },
  {
    name: "fecha_Nacimiento",
    required: true,
    minLength: 8,
    maxLength: 10,
    type: "date"
  }
];
