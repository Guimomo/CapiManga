import express from "express";
import CapituloController from "../controllers/capituloController.js";
import { camposCapitulo, parcialesCapitulo } from "../middlewares/capitulo/index.js";
import { verifyToken } from "../middlewares/auth/tokenMiddleware.js";
import { uploadCapitulo } from "../middlewares/capitulo/uploadCapitulo.js";

const router = express.Router();

// Obtener todos los capítulos
router.get("/", CapituloController.getAllCapitulos);

// Obtener un capítulo por ID
router.get("/:id", CapituloController.getCapituloById);

// Obtener capítulos por historia
router.get("/historia/:id_Historia", CapituloController.getCapitulosByHistoria);

// Obtener capítulos por Historia y Capítulo
router.get("/:historiaId/:capituloId", CapituloController.getCapituloByHistoriaAndCapitulo);

// Crear un nuevo capítulo
router.post(
  "/",
  verifyToken,
  uploadCapitulo.fields([{ name: 'icono_Capitulo', maxCount: 1 }]),
  camposCapitulo,
  CapituloController.createCapitulo
);

// Actualizar un capítulo
router.put("/:id", camposCapitulo, verifyToken, CapituloController.updateCapitulo);

// Actualizar parcialmente un capítulo
router.patch("/:id", parcialesCapitulo, verifyToken, CapituloController.updateCapitulo);

// Eliminar un capítulo
router.delete("/:id", verifyToken, CapituloController.deleteCapitulo);

export default router;
