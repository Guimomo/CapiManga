import { ResponseProvider } from "../providers/ResponseProvider.js";
import TipoHistoriaService from "../services/TipoHistoriaService.js";

class TipoHistoriaController {
  // Obtener todos los tipos de historia
  static getAllTiposHistoria = async (req, res) => {
    try {
      const response = await TipoHistoriaService.getTiposHistoria();
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      } else {
        return ResponseProvider.success(res, response.data, response.message, response.code);
      }
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Obtener un tipo de historia por su ID
  static getTipoHistoriaById = async (req, res) => {
    const { id } = req.params;
    try {
      const response = await TipoHistoriaService.getTipoHistoriaById(id);
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      } else {
        return ResponseProvider.success(res, response.data, response.message, response.code);
      }
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Crear un nuevo tipo de historia
  static createTipoHistoria = async (req, res) => {
    const { nombre_tipo } = req.body;
    try {
      const response = await TipoHistoriaService.createTipoHistoria(nombre_tipo);
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      } else {
        return ResponseProvider.success(res, response.data, response.message, response.code);
      }
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Actualizar un tipo de historia
  static updateTipoHistoria = async (req, res) => {
    const { id } = req.params;
    const campos = req.body;
    try {
      const response = await TipoHistoriaService.updateTipoHistoria(id, campos);
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }
      return ResponseProvider.success(res, response.data, response.message, response.code);
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Eliminar un tipo de historia
  static deleteTipoHistoria = async (req, res) => {
    const { id } = req.params;
    try {
      const response = await TipoHistoriaService.deleteTipoHistoria(id);
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

export default TipoHistoriaController;
