import express from "express";
import CalificacionHistoriaController from "../controllers/calificacionHistoriaController.js";
import { camposCalificacionHistoria, parcialesCalificacionHistoria } from "../middlewares/calificacionHistoria/index.js";

const router = express.Router();

router.get("/", CalificacionHistoriaController.getAllCalificaciones);

router.get("/:id_Historia/:calificada_por", CalificacionHistoriaController.getCalificacionById);

router.post("/", camposCalificacionHistoria, CalificacionHistoriaController.createCalificacion);

router.put("/:id_Historia/:calificada_por", camposCalificacionHistoria, CalificacionHistoriaController.updateCalificacion);

router.patch("/:id_Historia/:calificada_por", parcialesCalificacionHistoria, CalificacionHistoriaController.updateCalificacion);

router.delete("/:id_Historia/:calificada_por", CalificacionHistoriaController.deleteCalificacion);

export default router;
