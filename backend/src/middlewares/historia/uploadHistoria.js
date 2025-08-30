import multer from 'multer';
import fs from 'fs';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Guardar en carpeta temporal por usuario y timestamp
    const userId = req.user.id;
    // Usar un timestamp único para evitar colisiones
    if (!req.tempFolder) {
      req.tempFolder = `temp_${Date.now()}`;
    }
    const dir = path.join('uploads', String(userId), req.tempFolder);
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
