import express from "express";
import HistoriaController from "../controllers/historiaController.js";
import { camposHistoria, parcialesHistoria } from "../middlewares/historia/index.js";
import { verifyToken } from "../middlewares/auth/tokenMiddleware.js";

const router = express.Router();

// Obtener todas las historias
router.get("/", verifyToken, HistoriaController.getAllHistorias);

// Obtener una historia por ID
router.get("/:id", verifyToken, HistoriaController.getHistoriaById);

// Crear una nueva historia
router.post("/", camposHistoria, verifyToken, HistoriaController.createHistoria);

// Actualizar una historia
router.put("/:id", camposHistoria, verifyToken, HistoriaController.updateHistoria);

// Actualizar parcialmente una historia
router.patch("/:id", parcialesHistoria, verifyToken, HistoriaController.updateHistoria);

// Eliminar una historia
router.delete("/:id", verifyToken, HistoriaController.deleteHistoria);

export default router;
