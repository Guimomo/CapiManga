import { ResponseProvider } from "../providers/ResponseProvider.js";
import GuardarHistoriaService from "../services/GuardarHistoriaService.js";

class GuardarHistoriaController {
  // Obtener todos los guardados
  static getAllGuardados = async (req, res) => {
    try {
      const response = await GuardarHistoriaService.getGuardados();
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      } else {
        return ResponseProvider.success(res, response.data, response.message, response.code);
      }
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Obtener un guardado por su ID compuesto
  static getGuardadoById = async (req, res) => {
    const { id_Historia, guardada_por } = req.params;
    try {
      const response = await GuardarHistoriaService.getGuardadoById(id_Historia, guardada_por);
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      } else {
        return ResponseProvider.success(res, response.data, response.message, response.code);
      }
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Crear un nuevo guardado
  static createGuardado = async (req, res) => {
    try {
      const response = await GuardarHistoriaService.createGuardado(req.body);
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      } else {
        return ResponseProvider.success(res, response.data, response.message, response.code);
      }
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Actualizar un guardado
  static updateGuardado = async (req, res) => {
    const { id_Historia, guardada_por } = req.params;
    const campos = req.body;
    try {
      const response = await GuardarHistoriaService.updateGuardado(id_Historia, guardada_por, campos);
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }
      return ResponseProvider.success(res, response.data, response.message, response.code);
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Eliminar un guardado
  static deleteGuardado = async (req, res) => {
    const { id_Historia, guardada_por } = req.params;
    try {
      const response = await GuardarHistoriaService.deleteGuardado(id_Historia, guardada_por);
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

export default GuardarHistoriaController;
