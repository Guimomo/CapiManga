import { ResponseProvider } from "../providers/ResponseProvider.js";
import CalificacionHistoriaService from "../services/CalificacionHistoriaService.js";

class CalificacionHistoriaController {
  // Obtener todas las calificaciones
  static getAllCalificaciones = async (req, res) => {
    try {
      const response = await CalificacionHistoriaService.getCalificaciones();
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      } else {
        return ResponseProvider.success(res, response.data, response.message, response.code);
      }
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Obtener una calificación por su ID compuesto
  static getCalificacionById = async (req, res) => {
    const { id_Historia, calificada_por } = req.params;
    try {
      const response = await CalificacionHistoriaService.getCalificacionById(id_Historia, calificada_por);
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      } else {
        return ResponseProvider.success(res, response.data, response.message, response.code);
      }
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Crear una nueva calificación
  static createCalificacion = async (req, res) => {
    try {
      const response = await CalificacionHistoriaService.createCalificacion(req.body);
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      } else {
        return ResponseProvider.success(res, response.data, response.message, response.code);
      }
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Actualizar una calificación
  static updateCalificacion = async (req, res) => {
    const { id_Historia, calificada_por } = req.params;
    const campos = req.body;
    try {
      const response = await CalificacionHistoriaService.updateCalificacion(id_Historia, calificada_por, campos);
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      }
      return ResponseProvider.success(res, response.data, response.message, response.code);
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  // Eliminar una calificación
  static deleteCalificacion = async (req, res) => {
    const { id_Historia, calificada_por } = req.params;
    try {
      const response = await CalificacionHistoriaService.deleteCalificacion(id_Historia, calificada_por);
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

export default CalificacionHistoriaController;
