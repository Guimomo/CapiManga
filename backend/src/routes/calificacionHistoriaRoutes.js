import express from "express";
import CalificacionHistoriaController from "../controllers/calificacionHistoriaController.js";
import { camposCalificacionHistoria, parcialesCalificacionHistoria } from "../middlewares/calificacionHistoria/index.js";
import { verifyToken } from "../middlewares/auth/tokenMiddleware.js";

const router = express.Router();

router.get("/", verifyToken,CalificacionHistoriaController.getAllCalificaciones);

router.get("/:id_Historia/:calificada_por", verifyToken, CalificacionHistoriaController.getCalificacionById);

router.post("/", camposCalificacionHistoria, verifyToken, CalificacionHistoriaController.createCalificacion);

router.put("/:id_Historia/:calificada_por", camposCalificacionHistoria, verifyToken, CalificacionHistoriaController.updateCalificacion);

router.patch("/:id_Historia/:calificada_por", parcialesCalificacionHistoria, verifyToken, CalificacionHistoriaController.updateCalificacion);

router.delete("/:id_Historia/:calificada_por", verifyToken, CalificacionHistoriaController.deleteCalificacion);

export default router;
