import express from "express";
import TipoHistoriaController from "../controllers/tipoHistoriaController.js";
import { camposTipoHistoria, parcialesTipoHistoria } from "../middlewares/tipoHistoria/index.js";

const router = express.Router();

// Obtener todos los tipos de historia
router.get("/", TipoHistoriaController.getAllTiposHistoria);

// Obtener un tipo de historia por ID
router.get("/:id", TipoHistoriaController.getTipoHistoriaById);

// Crear un nuevo tipo de historia
router.post("/", camposTipoHistoria, TipoHistoriaController.createTipoHistoria);

// Actualizar un tipo de historia
router.put("/:id", camposTipoHistoria, TipoHistoriaController.updateTipoHistoria);

// Actualizar parcialmente un tipo de historia
router.patch("/:id", parcialesTipoHistoria, TipoHistoriaController.updateTipoHistoria);

// Eliminar un tipo de historia
router.delete("/:id", TipoHistoriaController.deleteTipoHistoria);

export default router;
