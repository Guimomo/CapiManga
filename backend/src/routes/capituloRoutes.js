import express from "express";
import CapituloController from "../controllers/capituloController.js";
import { camposCapitulo, parcialesCapitulo } from "../middlewares/capitulo/index.js";

const router = express.Router();

// Obtener todos los capítulos
router.get("/", CapituloController.getAllCapitulos);

// Obtener un capítulo por ID
router.get("/:id", CapituloController.getCapituloById);

// Obtener capítulos por historia
router.get("/historia/:id_Historia", CapituloController.getCapitulosByHistoria);

// Crear un nuevo capítulo
router.post("/", camposCapitulo, CapituloController.createCapitulo);

// Actualizar un capítulo
router.put("/:id", camposCapitulo, CapituloController.updateCapitulo);

// Actualizar parcialmente un capítulo
router.patch("/:id", parcialesCapitulo, CapituloController.updateCapitulo);

// Eliminar un capítulo
router.delete("/:id", CapituloController.deleteCapitulo);

export default router;
