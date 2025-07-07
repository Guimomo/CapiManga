import express from "express";
import { getAllUsuarios, getPerfil, updatePerfil, updateDatosPersonales, updatePrivacidad } from "../controllers/usuarioController.js";
import { verifyToken } from "../middlewares/auth/tokenMiddleware.js";
import { uploadUsuario } from "../middlewares/usuario/uploadUsuario.js";

const router = express.Router();

// Listar todos los usuarios
router.get("/", getAllUsuarios);

// Nueva ruta para perfil autenticado
router.get("/perfil", verifyToken, getPerfil);

// PATCH para actualizar perfil con imágenes
router.patch("/perfil", verifyToken, uploadUsuario.fields([
  { name: "foto_Perfil", maxCount: 1 },
  { name: "banner_Perfil", maxCount: 1 }
]), updatePerfil);

// PATCH para actualizar datos personales
router.patch("/datos", verifyToken, updateDatosPersonales);

// PATCH para actualizar privacidad
router.patch("/privacidad", verifyToken, updatePrivacidad);

export default router;
