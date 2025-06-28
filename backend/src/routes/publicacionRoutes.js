import express from "express";
import PublicacionController from "../controllers/publicacionController.js";
import { camposPublicacion, parcialesPublicacion } from "../middlewares/publicacion/index.js";

const router = express.Router();

router.get("/", PublicacionController.getAllPublicaciones);

router.get("/:id", PublicacionController.getPublicacionById);

router.post("/", camposPublicacion, PublicacionController.createPublicacion);

router.put("/:id", camposPublicacion, PublicacionController.updatePublicacion);

router.patch("/:id", parcialesPublicacion, PublicacionController.updatePublicacion);

router.delete("/:id", PublicacionController.deletePublicacion);

export default router;
