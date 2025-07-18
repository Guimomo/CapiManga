import express from "express";
import PublicacionController from "../controllers/publicacionController.js";
import { camposPublicacion, parcialesPublicacion } from "../middlewares/publicacion/index.js";
import { verifyToken } from "../middlewares/auth/tokenMiddleware.js";
import { uploadPublicacion } from "../middlewares/publicacion/uploadPublicacion.js";

const router = express.Router();

router.get("/", verifyToken, PublicacionController.getAllPublicaciones);

router.get("/:id", verifyToken, PublicacionController.getPublicacionById);

// Solo usar multer si hay imagen
router.post(
  "/",
  verifyToken,
  (req, res, next) => {
    // Si hay archivo, usar multer, si no, continuar
    if (req.headers["content-type"] && req.headers["content-type"].includes("multipart/form-data")) {
      uploadPublicacion.single("publicacion_Img")(req, res, next);
    } else {
      next();
    }
  },
  camposPublicacion,
  PublicacionController.createPublicacion
);

router.put("/:id", verifyToken, camposPublicacion, PublicacionController.updatePublicacion);

router.patch("/:id", verifyToken, parcialesPublicacion, PublicacionController.updatePublicacion);

router.delete("/:id", verifyToken, PublicacionController.deletePublicacion);

export default router;
