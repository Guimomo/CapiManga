import { ResponseProvider } from "../providers/ResponseProvider.js";
import ComentarioService from "../services/ComentarioService.js";

class ComentarioController {
  static getComentarios = async (req, res) => {
    const { tipo_objetivo, id_objetivo } = req.params;
    try {
      const response = await ComentarioService.getComentarios(tipo_objetivo, id_objetivo);
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      } else {
        return ResponseProvider.success(res, response.data, response.message, response.code);
      }
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  static getComentarioById = async (req, res) => {
    const { id } = req.params;
    try {
      const response = await ComentarioService.getComentarioById(id);
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      } else {
        return ResponseProvider.success(res, response.data, response.message, response.code);
      }
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  static createComentario = async (req, res) => {
    try {
      const response = await ComentarioService.createComentario(req.body);
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      } else {
        return ResponseProvider.success(res, response.data, response.message, response.code);
      }
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  static updateComentario = async (req, res) => {
    const { id } = req.params;
    const { contenido } = req.body;
    try {
      const response = await ComentarioService.updateComentario(id, contenido);
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      } else {
        return ResponseProvider.success(res, response.data, response.message, response.code);
      }
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  static deleteComentario = async (req, res) => {
    const { id, id_Usuario } = req.body;
    try {
      const response = await ComentarioService.deleteComentario(id, id_Usuario);
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      } else {
        return ResponseProvider.success(res, response.data, response.message, response.code);
      }
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  };

  static deleteComentarioById = async (req, res) => {
    const { id } = req.params;
    try {
      const response = await ComentarioService.deleteComentarioById(id);
      if (response.error) {
        return ResponseProvider.error(res, response.message, response.code);
      } else {
        return ResponseProvider.success(res, response.data, response.message, response.code);
      }
    } catch (error) {
      ResponseProvider.error(res, "Error interno en el servidor", 500);
    }
  }
}

export default ComentarioController;
