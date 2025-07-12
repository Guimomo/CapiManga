import multer from 'multer';
import fs from 'fs';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const userId = req.user.id;
    const tituloHistoria = req.body.titulo_Historia || req.query.titulo_Historia || 'historia_temp';
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
    // Nombra la página según el número recibido
    const paginaNum = req.body.pagina_numero || req.query.pagina_numero || '1';
    const ext = path.extname(file.originalname);
    cb(null, `${paginaNum}${ext}`);
  }
});

export const uploadPaginaCapitulo = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});