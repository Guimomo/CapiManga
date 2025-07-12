import express from "express";
import PaginasCapituloController from "../controllers/paginasCapituloController.js";
import { camposPaginasCapitulo, parcialesPaginasCapitulo } from "../middlewares/paginasCapitulo/index.js";
import { uploadPaginaCapitulo } from "../middlewares/paginasCapitulo/uploadPaginas.js";
import { verifyToken } from "../middlewares/auth/tokenMiddleware.js";

const router = express.Router();

router.get("/", PaginasCapituloController.getAllPaginas);

router.get("/:id", PaginasCapituloController.getPaginaById);

router.post(
  "/",
  verifyToken,
  uploadPaginaCapitulo.single('pagina_img'),
  camposPaginasCapitulo,
  (req, res, next) => {
    if (req.file) {
      req.body.pagina_img = '/' + req.file.path.replace(/\\/g, '/');
    }
    next();
  },
  PaginasCapituloController.createPagina
);

router.put("/:id", verifyToken, camposPaginasCapitulo, PaginasCapituloController.updatePagina);

router.patch("/:id", verifyToken, parcialesPaginasCapitulo, PaginasCapituloController.updatePagina);

router.delete("/:id", verifyToken, PaginasCapituloController.deletePagina);

export default router;
