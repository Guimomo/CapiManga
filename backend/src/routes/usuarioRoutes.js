import express from "express";
import UsuarioController from "../controllers/usuarioController.js";
import { camposUsuario, parcialesUsuario } from "../middlewares/usuario/index.js";



const router = express.Router();
// Creamos una instancia del controlador

// Obtener todas las categorías
router.get("/", UsuarioController.getAllUsuarios);

// Obtener una categoría por ID
router.get("/:id", UsuarioController.getUsuarioById);

// Crear una nueva categoría
//router.post("/", camposUsuario, UsuarioController.createUsuario);

// Actualizar una categoría
router.put("/:id", camposUsuario, UsuarioController.updateUsuario);

// Actualizar parcialmente una categoría
router.patch("/:id", parcialesUsuario, UsuarioController.updateUsuario);

// Eliminar una categoría
router.delete("/:id", UsuarioController.deleteUsuario);

export default router;
