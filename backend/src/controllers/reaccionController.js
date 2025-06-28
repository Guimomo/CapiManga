import { ResponseProvider } from "../providers/ResponseProvider.js";
import ReaccionService from "../services/ReaccionService.js";

class ReaccionController {
  static getReacciones = async (req, res) => {
    const { tipo_objetivo, id_objetivo } = req.params;
    try {
      const response = await ReaccionService.getReacciones(tipo_objetivo, id_objetivo);
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      } else {
        return ResponseProvider.success(res, response.data, response.message, response.code);
      }
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  static getReaccionById = async (req, res) => {
    const { id } = req.params;
    try {
      const response = await ReaccionService.getReaccionById(id);
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      } else {
        return ResponseProvider.success(res, response.data, response.message, response.code);
      }
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  static createReaccion = async (req, res) => {
    try {
      const response = await ReaccionService.createReaccion(req.body);
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      } else {
        return ResponseProvider.success(res, response.data, response.message, response.code);
      }
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  static deleteReaccion = async (req, res) => {
    const { id, id_Usuario } = req.body;
    try {
      const response = await ReaccionService.deleteReaccion(id, id_Usuario);
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

export default ReaccionController;
