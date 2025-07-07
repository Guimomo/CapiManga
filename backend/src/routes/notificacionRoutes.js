import express from "express";
import NotificacionController from "../controllers/notificacionController.js";
import { camposNotificacion, parcialesNotificacion } from "../middlewares/notificacion/index.js";
import { verifyToken } from "../middlewares/auth/tokenMiddleware.js";

const router = express.Router();

router.get("/usuario/:id_Usuario", verifyToken, NotificacionController.getNotificaciones);

router.get("/:id", verifyToken, NotificacionController.getNotificacionById);

router.post("/", verifyToken, camposNotificacion, NotificacionController.createNotificacion);

router.patch("/leida", verifyToken, camposNotificacion, NotificacionController.updateLeida);

router.delete("/", verifyToken, NotificacionController.deleteNotificacion);

export default router;
