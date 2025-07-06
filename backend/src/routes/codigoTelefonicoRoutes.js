import express from 'express';
import codigoTelefonicoController from '../controllers/codigoTelefonicoController.js';

const router = express.Router();

router.get('/', codigoTelefonicoController.getAll);

export default router;
