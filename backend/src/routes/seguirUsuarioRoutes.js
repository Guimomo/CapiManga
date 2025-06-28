import express from "express";
import SeguirUsuarioController from "../controllers/seguirUsuarioController.js";
import { camposSeguirUsuario, parcialesSeguirUsuario } from "../middlewares/seguirUsuario/index.js";

const router = express.Router();

router.get("/", SeguirUsuarioController.getAllSeguimientos);
router.get("/:siguiendo_a/:seguido_por", SeguirUsuarioController.getSeguimientoById);
router.post("/", camposSeguirUsuario, SeguirUsuarioController.createSeguimiento);
router.put("/:siguiendo_a/:seguido_por", camposSeguirUsuario, SeguirUsuarioController.updateSeguimiento);
router.patch("/:siguiendo_a/:seguido_por", parcialesSeguirUsuario, SeguirUsuarioController.updateSeguimiento);
router.delete("/:siguiendo_a/:seguido_por", SeguirUsuarioController.deleteSeguimiento);

export default router;
