import express from "express";
import { getAllUsuarios } from "../controllers/usuarioController.js";

const router = express.Router();

// Listar todos los usuarios
router.get("/usuarios", getAllUsuarios);

export default router;
