import express from "express";
import { getAllUsuarios, getPerfil } from "../controllers/usuarioController.js";
import { verifyToken } from "../middlewares/auth/tokenMiddleware.js";

const router = express.Router();

// Listar todos los usuarios
router.get("/", getAllUsuarios);

// Nueva ruta para perfil autenticado
router.get("/perfil", verifyToken, getPerfil);

export default router;
