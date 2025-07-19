import express from "express";
import GuardarHistoriaController from "../controllers/guardarHistoriaController.js";
import { camposGuardarHistoria, parcialesGuardarHistoria } from "../middlewares/guardarHistoria/index.js";
import { verifyToken } from "../middlewares/auth/tokenMiddleware.js";

const router = express.Router();


// Nuevo endpoint: obtener todos los guardados de una historia por su id
router.get("/historia/:id_Historia", GuardarHistoriaController.getGuardadosByHistoriaId);

router.get("/", verifyToken, GuardarHistoriaController.getAllGuardados);

router.get("/:id_Historia/:guardada_por", verifyToken, GuardarHistoriaController.getGuardadoById);

router.post("/", camposGuardarHistoria, verifyToken, GuardarHistoriaController.createGuardado);

router.put("/:id_Historia/:guardada_por", camposGuardarHistoria, verifyToken, GuardarHistoriaController.updateGuardado);

router.patch("/:id_Historia/:guardada_por", parcialesGuardarHistoria, verifyToken, GuardarHistoriaController.updateGuardado);

router.delete("/:id_Historia/:guardada_por", verifyToken, GuardarHistoriaController.deleteGuardado);

export default router;
