import express from "express";
// import { getAllUsuarios, getPerfil, updatePerfil, updateDatosPersonales, updatePrivacidad, getUsuarioById } from "../controllers/usuarioController.js";
import UsuarioController from "../controllers/usuarioController.js";
import { verifyToken } from "../middlewares/auth/tokenMiddleware.js";
import { uploadUsuario } from "../middlewares/usuario/uploadUsuario.js";

const router = express.Router();

// Listar todos los usuarios
router.get("/", UsuarioController.getAllUsuarios);

router.get("/perfil", verifyToken, UsuarioController.getPerfil);

router.get("/:id", UsuarioController.getUsuarioById);

// PATCH para actualizar perfil con imágenes
router.patch("/perfil", verifyToken, uploadUsuario.fields([
  { name: "foto_Perfil", maxCount: 1 },
  { name: "banner_Perfil", maxCount: 1 }
]), UsuarioController.updatePerfil);

// PATCH para actualizar datos personales
router.patch("/datos", verifyToken, UsuarioController.updateDatosPersonales);

// PATCH para actualizar privacidad
router.patch("/privacidad", verifyToken, UsuarioController.updatePrivacidad);

export default router;
