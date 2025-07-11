import express from "express";
import HistoriaController from "../controllers/historiaController.js";
import { camposHistoria, parcialesHistoria } from "../middlewares/historia/index.js";
import { verifyToken } from "../middlewares/auth/tokenMiddleware.js";
import { uploadHistoria } from "../middlewares/historia/uploadHistoria.js";

const router = express.Router();

// Obtener todas las historias
router.get("/", verifyToken, HistoriaController.getAllHistorias);

// Obtener una historia por ID
router.get("/:id", verifyToken, HistoriaController.getHistoriaById);

// Obtener historias por autor
router.get("/autor/:id", verifyToken, HistoriaController.getHistoriasByAutor);

// Crear una nueva historia
router.post(
  "/",
  verifyToken,
  uploadHistoria.fields([
    { name: "portada_Historia", maxCount: 1 },
    { name: "icono_Historia", maxCount: 1 },
    { name: "logo_Historia", maxCount: 1 }
  ]),
  HistoriaController.createHistoria
);

// Actualizar una historia
router.put("/:id", camposHistoria, verifyToken, HistoriaController.updateHistoria);

// Actualizar parcialmente una historia
router.patch("/:id", parcialesHistoria, verifyToken, HistoriaController.updateHistoria);

// Eliminar una historia
router.delete("/:id", verifyToken, HistoriaController.deleteHistoria);

export default router;
