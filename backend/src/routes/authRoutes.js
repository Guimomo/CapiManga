import express from "express";
import {
  register,
  login,
  refreshToken,
  logout,
} from "../controllers/authController.js";
import {
  camposLogin,
  camposRegistro,
  verifyToken,
} from "../middlewares/auth/index.js";

const router = express.Router();

// Registro de usuario (campos requeridos: nombre, email_Usuario, contrasena, user_Name, fecha_Nacimiento)
router.post("/register", camposRegistro, register);

// Inicio de sesión (campos requeridos: email_Usuario, contrasena)
router.post("/login", camposLogin, login);

// Refrescar token (requiere header Authorization: Bearer <refreshToken>)
router.post("/refresh", refreshToken);

// Logout (requiere token de acceso válido)
router.post("/logout", verifyToken, logout);

// Faltan las rutas para recuperar la contraseña y verificar el email

export default router;
