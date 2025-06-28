import express from "express";
import { getAllUsuarios } from "../controllers/usuarioController.js";

const router = express.Router();

// Listar todos los usuarios
router.get("/", getAllUsuarios);

export default router;
