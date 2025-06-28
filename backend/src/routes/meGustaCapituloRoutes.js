import express from "express";
import MeGustaCapituloController from "../controllers/meGustaCapituloController.js";
import { camposMeGustaCapitulo, parcialesMeGustaCapitulo } from "../middlewares/meGustaCapitulo/index.js";

const router = express.Router();

router.get("/:id_Capitulo", MeGustaCapituloController.getMeGustas);
router.get("/:id_Capitulo/:id_Usuario", MeGustaCapituloController.getMeGustaById);
router.post("/", camposMeGustaCapitulo, MeGustaCapituloController.createMeGusta);
router.delete("/", MeGustaCapituloController.deleteMeGusta);

export default router;
