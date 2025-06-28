import express from "express";
import ComentarioController from "../controllers/comentarioController.js";
import { camposComentario, parcialesComentario } from "../middlewares/comentario/index.js";

const router = express.Router();

router.get("/:tipo_objetivo/:id_objetivo", ComentarioController.getComentarios);

router.get("/:id", ComentarioController.getComentarioById);

router.post("/", camposComentario, ComentarioController.createComentario);

router.put("/", camposComentario, ComentarioController.updateComentario);

router.delete("/", ComentarioController.deleteComentario);

export default router;
