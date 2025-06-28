import express from "express";
import GeneroController from "../controllers/generoController.js";
import { camposGenero, parcialesGenero } from "../middlewares/generos/index.js";

const router = express.Router();

// Obtener todos los géneros
router.get("/", GeneroController.getAllGeneros);

// Obtener un género por ID
router.get("/:id", GeneroController.getGeneroById);

// Crear un nuevo género
router.post("/", camposGenero, GeneroController.createGenero);

// Actualizar un género
router.put("/:id", camposGenero, GeneroController.updateGenero);

// Actualizar parcialmente un género
router.patch("/:id", parcialesGenero, GeneroController.updateGenero);

// Eliminar un género
router.delete("/:id", GeneroController.deleteGenero);

export default router;
