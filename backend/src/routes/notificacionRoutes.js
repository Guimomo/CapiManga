import express from "express";
import NotificacionController from "../controllers/notificacionController.js";
import { camposNotificacion, parcialesNotificacion } from "../middlewares/notificacion/index.js";

const router = express.Router();

router.get("/usuario/:id_Usuario", NotificacionController.getNotificaciones);

router.get("/:id", NotificacionController.getNotificacionById);

router.post("/", camposNotificacion, NotificacionController.createNotificacion);

router.patch("/leida", camposNotificacion, NotificacionController.updateLeida);

router.delete("/", NotificacionController.deleteNotificacion);

export default router;
