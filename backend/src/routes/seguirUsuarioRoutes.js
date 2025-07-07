import express from "express";
import SeguirUsuarioController from "../controllers/seguirUsuarioController.js";
import { camposSeguirUsuario, parcialesSeguirUsuario } from "../middlewares/seguirUsuario/index.js";
import { verifyToken } from "../middlewares/auth/tokenMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, SeguirUsuarioController.getAllSeguimientos);
router.get("/:siguiendo_a/:seguido_por", verifyToken, SeguirUsuarioController.getSeguimientoById);
router.post("/", verifyToken, camposSeguirUsuario, SeguirUsuarioController.createSeguimiento);
router.put("/:siguiendo_a/:seguido_por", verifyToken, camposSeguirUsuario, SeguirUsuarioController.updateSeguimiento);
router.patch("/:siguiendo_a/:seguido_por", verifyToken, parcialesSeguirUsuario, SeguirUsuarioController.updateSeguimiento);
router.delete("/:siguiendo_a/:seguido_por", verifyToken, SeguirUsuarioController.deleteSeguimiento);

export default router;
