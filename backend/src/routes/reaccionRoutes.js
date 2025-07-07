import express from "express";
import ReaccionController from "../controllers/reaccionController.js";
import { camposReaccion } from "../middlewares/reaccion/index.js";
import { verifyToken } from "../middlewares/auth/tokenMiddleware.js";

const router = express.Router();

router.get("/:tipo_objetivo/:id_objetivo", verifyToken, ReaccionController.getReacciones);

router.get("/:id", verifyToken, ReaccionController.getReaccionById);

router.post("/", verifyToken, camposReaccion, ReaccionController.createReaccion);

router.delete("/", verifyToken, ReaccionController.deleteReaccion);

export default router;
