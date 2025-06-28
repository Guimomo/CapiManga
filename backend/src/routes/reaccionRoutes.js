import express from "express";
import ReaccionController from "../controllers/reaccionController.js";
import { camposReaccion } from "../middlewares/reaccion/index.js";

const router = express.Router();

router.get("/:tipo_objetivo/:id_objetivo", ReaccionController.getReacciones);

router.get("/:id", ReaccionController.getReaccionById);

router.post("/", camposReaccion, ReaccionController.createReaccion);

router.delete("/", ReaccionController.deleteReaccion);

export default router;
