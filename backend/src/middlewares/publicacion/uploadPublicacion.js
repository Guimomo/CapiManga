import multer from 'multer';
import fs from 'fs';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Solo crear carpeta si hay archivo
    if (!file) {
      return cb(null, false);
    }
    const userId = req.user.id;
    const tmpDir = path.join('uploads', String(userId), 'publicaciones', 'tmp');
    fs.mkdirSync(tmpDir, { recursive: true });
    cb(null, tmpDir);
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    let name = file.fieldname + ext;
    cb(null, name);
  }
});

export const uploadPublicacion = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB por archivo
});
