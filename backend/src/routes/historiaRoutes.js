import express from "express";
import HistoriaController from "../controllers/historiaController.js";
import { camposHistoria, parcialesHistoria } from "../middlewares/historia/index.js";

const router = express.Router();

// Obtener todas las historias
router.get("/", HistoriaController.getAllHistorias);

// Obtener una historia por ID
router.get("/:id", HistoriaController.getHistoriaById);

// Crear una nueva historia
router.post("/", camposHistoria, HistoriaController.createHistoria);

// Actualizar una historia
router.put("/:id", camposHistoria, HistoriaController.updateHistoria);

// Actualizar parcialmente una historia
router.patch("/:id", parcialesHistoria, HistoriaController.updateHistoria);

// Eliminar una historia
router.delete("/:id", HistoriaController.deleteHistoria);

export default router;
