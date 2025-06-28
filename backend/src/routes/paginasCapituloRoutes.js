import express from "express";
import PaginasCapituloController from "../controllers/paginasCapituloController.js";
import { camposPaginasCapitulo, parcialesPaginasCapitulo } from "../middlewares/paginasCapitulo/index.js";

const router = express.Router();

router.get("/", PaginasCapituloController.getAllPaginas);

router.get("/:id", PaginasCapituloController.getPaginaById);

router.post("/", camposPaginasCapitulo, PaginasCapituloController.createPagina);

router.put("/:id", camposPaginasCapitulo, PaginasCapituloController.updatePagina);

router.patch("/:id", parcialesPaginasCapitulo, PaginasCapituloController.updatePagina);

router.delete("/:id", PaginasCapituloController.deletePagina);

export default router;
