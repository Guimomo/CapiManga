import { ResponseProvider } from "../providers/ResponseProvider.js";
import HistoriaService from "../services/HistoriaService.js";

class HistoriaController {
  // Obtener todas las historias
  static getAllHistorias = async (req, res) => {
    try {
      const response = await HistoriaService.getHistorias();
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      } else {
        return ResponseProvider.success(res, response.data, response.message, response.code);
      }
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Obtener una historia por su ID
  static getHistoriaById = async (req, res) => {
    const { id } = req.params;
    try {
      const response = await HistoriaService.getHistoriaById(id);
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      } else {
        return ResponseProvider.success(res, response.data, response.message, response.code);
      }
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Crear una nueva historia
  static createHistoria = async (req, res) => {
    // Guardar rutas de imágenes subidas en el body
    if (req.files && req.files.portada_Historia) {
      req.body.portada_Historia = '/' + req.files.portada_Historia[0].path.replace(/\\/g, '/');
    }
    if (req.files && req.files.icono_Historia) {
      req.body.icono_Historia = '/' + req.files.icono_Historia[0].path.replace(/\\/g, '/');
    }
    if (req.files && req.files.logo_Historia) {
      req.body.logo_Historia = '/' + req.files.logo_Historia[0].path.replace(/\\/g, '/');
    }
    // Asignar el autor desde el usuario autenticado
    const data = { ...req.body, autor_Historia: req.user.id };
    try {
      const response = await HistoriaService.createHistoria(data);
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      } else {
        return ResponseProvider.success(res, response.data, response.message, response.code);
      }
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Actualizar una historia
  static updateHistoria = async (req, res) => {
    const { id } = req.params;
    const campos = req.body;
    try {
      const response = await HistoriaService.updateHistoria(id, campos);
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }
      return ResponseProvider.success(res, response.data, response.message, response.code);
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Eliminar una historia
  static deleteHistoria = async (req, res) => {
    const { id } = req.params;
    try {
      const response = await HistoriaService.deleteHistoria(id);
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

export default HistoriaController;
