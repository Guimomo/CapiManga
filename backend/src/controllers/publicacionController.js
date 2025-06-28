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
    try {
      const response = await PublicacionService.createPublicacion(req.body);
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      } else {
        return ResponseProvider.success(res, response.data, response.message, response.code);
      }
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
