import express from "express";
import CapituloController from "../controllers/capituloController.js";
import { camposCapitulo, parcialesCapitulo } from "../middlewares/capitulo/index.js";
import { verifyToken } from "../middlewares/auth/tokenMiddleware.js";

const router = express.Router();

// Obtener todos los capítulos
router.get("/", verifyToken, CapituloController.getAllCapitulos);

// Obtener un capítulo por ID
router.get("/:id", verifyToken, CapituloController.getCapituloById);

// Obtener capítulos por historia
router.get("/historia/:id_Historia", verifyToken, CapituloController.getCapitulosByHistoria);

// Crear un nuevo capítulo
router.post("/", camposCapitulo, verifyToken, CapituloController.createCapitulo);

// Actualizar un capítulo
router.put("/:id", camposCapitulo, verifyToken, CapituloController.updateCapitulo);

// Actualizar parcialmente un capítulo
router.patch("/:id", parcialesCapitulo, verifyToken, CapituloController.updateCapitulo);

// Eliminar un capítulo
router.delete("/:id", verifyToken, CapituloController.deleteCapitulo);

export default router;
