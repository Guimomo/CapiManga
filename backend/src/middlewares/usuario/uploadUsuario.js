import multer from "multer";
import fs from "fs";
import path from "path";

// Middleware para guardar imágenes en uploads/<userId>/
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const userId = req.user.id;
    const uploadPath = path.join("uploads", String(userId));
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    let name = file.fieldname;
    if (name === "foto_Perfil") name = "perfil";
    if (name === "banner_Perfil") name = "banner";
    cb(null, `${name}${ext}`);
  },
});

export const uploadUsuario = multer({ storage });
