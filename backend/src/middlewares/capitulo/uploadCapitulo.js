import multer from 'multer';
import fs from 'fs';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const userId = req.user.id;
    // Usar el título de la historia y el número de capítulo para la ruta
    const tituloHistoria = req.body.titulo_Historia || req.query.titulo_Historia;
    const numeroCapitulo = req.body.numero_Capitulo || req.query.numero_Capitulo;
    if (!tituloHistoria || !numeroCapitulo) {
      return cb(new Error('Faltan titulo_Historia o numero_Capitulo'), null);
    }
    // Sanitizar nombres
    const safeTitulo = String(tituloHistoria).replace(/[^a-zA-Z0-9-_]/g, '_');
    const safeNumero = String(numeroCapitulo).replace(/[^0-9-_.]/g, '_');
    const dir = path.join('uploads', String(userId), safeTitulo, safeNumero);
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    let name = file.fieldname + ext;
    cb(null, name);
  }
});

export const uploadCapitulo = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB por archivo
});