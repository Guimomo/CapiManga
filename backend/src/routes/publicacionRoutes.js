import express from "express";
import PublicacionController from "../controllers/publicacionController.js";
import { camposPublicacion, parcialesPublicacion } from "../middlewares/publicacion/index.js";
import { verifyToken } from "../middlewares/auth/tokenMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, PublicacionController.getAllPublicaciones);

router.get("/:id", verifyToken, PublicacionController.getPublicacionById);

router.post("/", verifyToken, camposPublicacion, PublicacionController.createPublicacion);

router.put("/:id", verifyToken, camposPublicacion, PublicacionController.updatePublicacion);

router.patch("/:id", verifyToken, parcialesPublicacion, PublicacionController.updatePublicacion);

router.delete("/:id", verifyToken, PublicacionController.deletePublicacion);

export default router;
