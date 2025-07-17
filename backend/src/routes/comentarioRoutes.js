import express from "express";
import ComentarioController from "../controllers/comentarioController.js";
import { camposComentario, parcialesComentario } from "../middlewares/comentario/index.js";
import { verifyToken } from "../middlewares/auth/tokenMiddleware.js";

const router = express.Router();

router.get("/:tipo_objetivo/:id_objetivo", verifyToken, ComentarioController.getComentarios);

router.get("/:id", verifyToken, ComentarioController.getComentarioById);

router.post("/:id", camposComentario, verifyToken, ComentarioController.createComentario);

router.put("/:id", parcialesComentario, verifyToken, ComentarioController.updateComentario);

router.delete("/", verifyToken, ComentarioController.deleteComentario);

router.delete("/:id", verifyToken, ComentarioController.deleteComentarioById);

export default router;
