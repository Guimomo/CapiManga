import { ResponseProvider } from "../providers/ResponseProvider.js";
import PublicacionService from "../services/PublicacionService.js";

class PublicacionController {
  // Obtener todas las publicaciones
  static getAllPublicaciones = async (req, res) => {
    try {
      const response = await PublicacionService.getPublicaciones();
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      } else {
        return ResponseProvider.success(res, response.data, response.message, response.code);
      }
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Obtener una publicación por su ID
  static getPublicacionById = async (req, res) => {
    const { id } = req.params;
    try {
      const response = await PublicacionService.getPublicacionById(id);
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      } else {
        return ResponseProvider.success(res, response.data, response.message, response.code);
      }
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Crear una nueva publicación
  static createPublicacion = async (req, res) => {
    const fs = await import('fs/promises');
    const path = await import('path');
    try {
      // Guardar publicación (primero sin imagen definitiva)
      let data = { ...req.body };
      // Si no viene fecha, poner la actual
      if (!data.publicacion_Fecha) {
        data.publicacion_Fecha = new Date().toISOString().slice(0, 19).replace('T', ' ');
      }
      let tempImgPath = null;
      if (req.file) {
        tempImgPath = req.file.path;
        data.publicacion_Img = null; // Se actualizará después
      }
      const response = await PublicacionService.createPublicacion(data);
      if (response.error) {
        // Si hubo error y hay imagen temporal, eliminarla
        if (tempImgPath) await fs.unlink(tempImgPath).catch(() => {});
        return ResponseProvider.error(res, response.message, response.code);
      }
      // Si hay imagen, moverla a la carpeta definitiva
      if (req.file) {
        const userId = req.body.publicado_por;
        const pubId = response.data.id;
        const destDir = path.join('uploads', String(userId), 'publicaciones', String(pubId));
        await fs.mkdir(destDir, { recursive: true });
        const ext = path.extname(req.file.originalname);
        const destPath = path.join(destDir, 'publicacion_img' + ext);
        await fs.rename(tempImgPath, destPath);
        // Actualizar ruta en la base de datos
        const rutaRel = path.relative(process.cwd(), destPath).replace(/\\/g, '/');
        await PublicacionService.updatePublicacion(pubId, { publicacion_Img: rutaRel });
        response.data.publicacion_Img = rutaRel;
        // Eliminar carpeta tmp si queda vacía
        const tmpDir = path.join('uploads', String(userId), 'publicaciones', 'tmp');
        try {
          const files = await fs.readdir(tmpDir);
          if (files.length === 0) {
            await fs.rmdir(tmpDir);
          }
        } catch (e) { /* ignorar error si no existe */ }
      }
      return ResponseProvider.success(res, response.data, response.message, response.code);
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Actualizar una publicación
  static updatePublicacion = async (req, res) => {
    const { id } = req.params;
    const campos = req.body;
    try {
      const response = await PublicacionService.updatePublicacion(id, campos);
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }
      return ResponseProvider.success(res, response.data, response.message, response.code);
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Eliminar una publicación
  static deletePublicacion = async (req, res) => {
    const { id } = req.params;
    try {
      const response = await PublicacionService.deletePublicacion(id);
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      } else {
        return ResponseProvider.success(res, response.data, response.message, response.code);
      }
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };
}

export default PublicacionController;
