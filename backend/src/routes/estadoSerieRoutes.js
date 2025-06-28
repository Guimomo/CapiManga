import express from "express";
import EstadoSerieController from "../controllers/estadoSerieController.js";
import { camposEstadoSerie, parcialesEstadoSerie } from "../middlewares/estadoSerie/index.js";

const router = express.Router();

router.get("/", EstadoSerieController.getAllEstadosSerie);

router.get("/:id", EstadoSerieController.getEstadoSerieById);

router.post("/", camposEstadoSerie, EstadoSerieController.createEstadoSerie);

router.put("/:id", camposEstadoSerie, EstadoSerieController.updateEstadoSerie);

router.patch("/:id", parcialesEstadoSerie, EstadoSerieController.updateEstadoSerie);

router.delete("/:id", EstadoSerieController.deleteEstadoSerie);

export default router;
