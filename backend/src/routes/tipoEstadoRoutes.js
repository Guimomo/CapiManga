import express from "express";
import TipoEstadoController from "../controllers/tipoEstadoController.js";
import { camposTipoEstado, parcialesTipoEstado } from "../middlewares/tipoEstado/index.js";

const router = express.Router();

// Obtener todos los tipos de estado
router.get("/", TipoEstadoController.getAllTiposEstado);

// Obtener un tipo de estado por ID
router.get("/:id", TipoEstadoController.getTipoEstadoById);

// Crear un nuevo tipo de estado
router.post("/", camposTipoEstado, TipoEstadoController.createTipoEstado);

// Actualizar un tipo de estado
router.put("/:id", camposTipoEstado, TipoEstadoController.updateTipoEstado);

// Actualizar parcialmente un tipo de estado
router.patch("/:id", parcialesTipoEstado, TipoEstadoController.updateTipoEstado);

// Eliminar un tipo de estado
router.delete("/:id", TipoEstadoController.deleteTipoEstado);

export default router;
