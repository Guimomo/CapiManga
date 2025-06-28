import express from "express";
import EdadRecomendadaController from "../controllers/edadRecomendadaController.js";
import { camposEdadRecomendada, parcialesEdadRecomendada } from "../middlewares/edadRecomendada/index.js";

const router = express.Router();

// Obtener todas las edades recomendadas
router.get("/", EdadRecomendadaController.getAllEdadesRecomendadas);

// Obtener una edad recomendada por ID
router.get("/:id", EdadRecomendadaController.getEdadRecomendadaById);

// Crear una nueva edad recomendada
router.post("/", camposEdadRecomendada, EdadRecomendadaController.createEdadRecomendada);

// Actualizar una edad recomendada
router.put("/:id", camposEdadRecomendada, EdadRecomendadaController.updateEdadRecomendada);

// Actualizar parcialmente una edad recomendada
router.patch("/:id", parcialesEdadRecomendada, EdadRecomendadaController.updateEdadRecomendada);

// Eliminar una edad recomendada
router.delete("/:id", EdadRecomendadaController.deleteEdadRecomendada);

export default router;
