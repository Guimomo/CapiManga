import { ResponseProvider } from "../providers/ResponseProvider.js";
import NotificacionService from "../services/NotificacionService.js";

class NotificacionController {
  static getNotificaciones = async (req, res) => {
    const { id_Usuario } = req.params;
    try {
      const response = await NotificacionService.getNotificaciones(id_Usuario);
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      } else {
        return ResponseProvider.success(res, response.data, response.message, response.code);
      }
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  static getNotificacionById = async (req, res) => {
    const { id } = req.params;
    try {
      const response = await NotificacionService.getNotificacionById(id);
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      } else {
        return ResponseProvider.success(res, response.data, response.message, response.code);
      }
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  static createNotificacion = async (req, res) => {
    try {
      const response = await NotificacionService.createNotificacion(req.body);
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      } else {
        return ResponseProvider.success(res, response.data, response.message, response.code);
      }
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  static updateLeida = async (req, res) => {
    const { id, id_Usuario } = req.body;
    try {
      const response = await NotificacionService.updateLeida(id, id_Usuario);
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      } else {
        return ResponseProvider.success(res, response.data, response.message, response.code);
      }
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  static deleteNotificacion = async (req, res) => {
    const { id, id_Usuario } = req.body;
    try {
      const response = await NotificacionService.deleteNotificacion(id, id_Usuario);
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

export default NotificacionController;
