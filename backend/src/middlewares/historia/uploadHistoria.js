import multer from 'multer';
import fs from 'fs';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // El id del usuario viene del token (req.user.id)
    // El id de la historia se genera después de guardar en la BD, pero para crear la carpeta antes, usamos el título temporalmente
    const userId = req.user.id;
    // Usar el título de la historia para la carpeta temporalmente (luego puedes renombrar por id si lo deseas)
    const titulo = req.body.titulo_Historia || 'historia_temp';
    // Sanitizar el nombre de la carpeta
    const safeTitulo = titulo.replace(/[^a-zA-Z0-9-_]/g, '_');
    const dir = path.join('uploads', String(userId), safeTitulo);
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    // Guardar cada archivo con su campo original
    let ext = path.extname(file.originalname);
    let name = file.fieldname + ext;
    cb(null, name);
  }
});

export const uploadHistoria = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB por archivo
});
