import express from "express";
import GuardarHistoriaController from "../controllers/guardarHistoriaController.js";
import { camposGuardarHistoria, parcialesGuardarHistoria } from "../middlewares/guardarHistoria/index.js";

const router = express.Router();

router.get("/", GuardarHistoriaController.getAllGuardados);

router.get("/:id_Historia/:guardada_por", GuardarHistoriaController.getGuardadoById);

router.post("/", camposGuardarHistoria, GuardarHistoriaController.createGuardado);

router.put("/:id_Historia/:guardada_por", camposGuardarHistoria, GuardarHistoriaController.updateGuardado);

router.patch("/:id_Historia/:guardada_por", parcialesGuardarHistoria, GuardarHistoriaController.updateGuardado);

router.delete("/:id_Historia/:guardada_por", GuardarHistoriaController.deleteGuardado);

export default router;
