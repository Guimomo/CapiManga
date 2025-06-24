import express from "express";

import serieController from "../controllers/serieController.js";
import { camposSerie } from "../middlewares/serie/index.js";
import { parcialesSerie } from "../middlewares/serie/parcialesSerie.js";

const router = express.Router();

// Obtener todos los productos
router.get("/", serieController.getAllSeries);

// Obtener un producto por ID
router.get("/:id", serieController.getSerieById);

// Crear un nuevo producto
router.post("/", camposSerie, serieController.createSerie);

router.put("/:id", camposSerie, serieController.updateSerie);

// Actualizar un producto
router.patch("/:id", parcialesSerie, serieController.updateSerie);

// Eliminar un producto
router.delete("/:id", serieController.deleteSerie);

export default router;