import { ResponseProvider } from "../providers/ResponseProvider.js";
import TipoEstadoService from "../services/TipoEstadoService.js";

class TipoEstadoController {
  // Obtener todos los tipos de estado
  static getAllTiposEstado = async (req, res) => {
    try {
      const response = await TipoEstadoService.getTiposEstado();
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      } else {
        return ResponseProvider.success(res, response.data, response.message, response.code);
      }
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Obtener un tipo de estado por su ID
  static getTipoEstadoById = async (req, res) => {
    const { id } = req.params;
    try {
      const response = await TipoEstadoService.getTipoEstadoById(id);
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      } else {
        return ResponseProvider.success(res, response.data, response.message, response.code);
      }
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Crear un nuevo tipo de estado
  static createTipoEstado = async (req, res) => {
    const { nombre_Estado } = req.body;
    try {
      const response = await TipoEstadoService.createTipoEstado(nombre_Estado);
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      } else {
        return ResponseProvider.success(res, response.data, response.message, response.code);
      }
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Actualizar un tipo de estado
  static updateTipoEstado = async (req, res) => {
    const { id } = req.params;
    const campos = req.body;
    try {
      const response = await TipoEstadoService.updateTipoEstado(id, campos);
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }
      return ResponseProvider.success(res, response.data, response.message, response.code);
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Eliminar un tipo de estado
  static deleteTipoEstado = async (req, res) => {
    const { id } = req.params;
    try {
      const response = await TipoEstadoService.deleteTipoEstado(id);
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

export default TipoEstadoController;
