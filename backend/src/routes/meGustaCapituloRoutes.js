import express from "express";
import MeGustaCapituloController from "../controllers/meGustaCapituloController.js";
import { camposMeGustaCapitulo, parcialesMeGustaCapitulo } from "../middlewares/meGustaCapitulo/index.js";
import { verifyToken } from "../middlewares/auth/tokenMiddleware.js";

const router = express.Router();

router.get("/:id_Capitulo", verifyToken, MeGustaCapituloController.getMeGustas);
router.get("/:id_Capitulo/:id_Usuario", verifyToken, MeGustaCapituloController.getMeGustaById);
router.post("/", verifyToken, camposMeGustaCapitulo, MeGustaCapituloController.createMeGusta);
router.delete("/", verifyToken, MeGustaCapituloController.deleteMeGusta);

export default router;
